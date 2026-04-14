"use client";

import { useEffect, useRef } from "react";

type Shape = {
  x: number;
  y: number;
  angle: number;
  size: number;
  scale: number;
  prevScale: number;
  maxScale: number;
  svgIndex: number;
  gridCol: number;
  gridRow: number;
};

type Wave = {
  x: number;
  y: number;
  startTime: number;
};

type LoadedSvg = {
  img: HTMLImageElement;
  aspect: number;
  sourceIndex: number;
  tintIndex: number;
};

const GAP = 25;
const REST_SCALE = 0.09;
const MIN_HOVER_SCALE = 0.9;
const MAX_HOVER_SCALE = 1.4;
const RADIUS_VMIN = 40;
const SPEED_IN = 0.5;
const SPEED_OUT = 0.6;
const WAVE_SPEED = 1200;
const WAVE_WIDTH = 180;
const POINTER_THROTTLE_MS = 32; // ~30fps for pointer updates
const TARGET_FPS = 30; // Cap at 30fps
const FRAME_TIME = 1000 / TARGET_FPS;
const SVG_SOURCES = [
  new URL("./svg/Solana Logomark - White.svg", import.meta.url).toString(),
  new URL("./svg/Australia.svg", import.meta.url).toString(),
  new URL("./svg/Emu.svg", import.meta.url).toString(),
  new URL("./svg/Kangaroo.svg", import.meta.url).toString(),
  new URL("./svg/Frill-Lizzard.svg", import.meta.url).toString(),
  new URL("./svg/Lizzard.svg", import.meta.url).toString(),
  new URL("./svg/K-Bird.svg", import.meta.url).toString(),
  new URL("./svg/G-Bird.svg", import.meta.url).toString(),
  new URL("./svg/Echidna.svg", import.meta.url).toString(),
  new URL("./svg/Platypus.svg", import.meta.url).toString(),
];
const TINTS = ["#FECE00", "#00833E"];

function rnd(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pick<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function durationToFactor(seconds: number) {
  if (seconds <= 0) return 1;
  return 1 - Math.pow(0.05, 1 / (60 * seconds));
}

export function HeroAusEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;
    const canvasEl: HTMLCanvasElement = currentCanvas;
    const canvasCtx = canvasEl.getContext("2d");
    if (!canvasCtx) return;
    const ctx: CanvasRenderingContext2D = canvasCtx;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let rafId = 0;
    let lastFrameTime = 0;
    let activity = 0;
    let pointer: { x: number; y: number } | null = null;
    let lastPointerUpdate = 0;
    let lastMaskUpdate = 0;
    let maskRects: DOMRect[] = [];
    let maskOverride = false;
    let waveClearTimer: number | null = null;
    const waves: Wave[] = [];
    let shapes: Shape[] = [];
    let shapeGrid: Shape[][] = []; // 2D grid for spatial lookup
    let loadedSvgs: LoadedSvg[] = [];
    const section = canvasEl.parentElement;

    async function loadSvgImages(): Promise<void> {
      return new Promise((resolve) => {
        // Use web worker to load SVGs off main thread
        const worker = new Worker(
          new URL("./svg-loader.worker.ts", import.meta.url)
        );

        worker.onmessage = (
          event: MessageEvent<
            Array<{ dataUrl: string; sourceIndex: number; tintIndex: number }>
          >
        ) => {
          const data = event.data;
          worker.terminate();

          // Create Image objects on main thread (can't be done in worker)
          let loaded = 0;
          const total = data.length;

          if (total === 0) {
            resolve();
            return;
          }

          for (const item of data) {
            const img = new Image();
            img.onload = () => {
              const w = img.naturalWidth || 1;
              const h = img.naturalHeight || 1;
              loadedSvgs.push({
                img,
                aspect: w / h,
                sourceIndex: item.sourceIndex,
                tintIndex: item.tintIndex,
              });
              loaded++;
              if (loaded === total) resolve();
            };
            img.onerror = () => {
              loaded++;
              if (loaded === total) resolve();
            };
            img.src = item.dataUrl;
          }
        };

        worker.onerror = () => {
          worker.terminate();
          resolve();
        };

        worker.postMessage({ sources: SVG_SOURCES, tints: TINTS });
      });
    }

    function buildGrid() {
      cols = Math.floor(width / GAP);
      rows = Math.floor(height / GAP);
      const offsetX = (width - (cols - 1) * GAP) / 2;
      const offsetY = (height - (rows - 1) * GAP) / 2;
      const grid2d: number[][] = [];

      const nextShapes: Shape[] = [];
      shapeGrid = [];

      for (let row = 0; row < rows; row += 1) {
        grid2d[row] = [];
        shapeGrid[row] = [];
        for (let col = 0; col < cols; col += 1) {
          let svgIndex = -1;
          if (loadedSvgs.length > 0) {
            const neighborIndexes: number[] = [];
            if (col > 0) neighborIndexes.push(grid2d[row][col - 1]);
            if (row > 0) neighborIndexes.push(grid2d[row - 1][col]);

            const avoidSource = new Set<number>();
            const avoidTint = new Set<number>();
            for (const idx of neighborIndexes) {
              if (idx < 0 || !loadedSvgs[idx]) continue;
              avoidSource.add(loadedSvgs[idx].sourceIndex);
              avoidTint.add(loadedSvgs[idx].tintIndex);
            }

            let candidates = loadedSvgs
              .map((_, idx) => idx)
              .filter(
                (idx) =>
                  !avoidSource.has(loadedSvgs[idx].sourceIndex) &&
                  !avoidTint.has(loadedSvgs[idx].tintIndex),
              );

            // Fallback: only avoid exact same variant as neighbors.
            if (candidates.length === 0) {
              candidates = loadedSvgs
                .map((_, idx) => idx)
                .filter((idx) => !neighborIndexes.includes(idx));
            }

            svgIndex =
              candidates.length > 0
                ? pick(candidates)
                : Math.floor(Math.random() * loadedSvgs.length);
          }
          grid2d[row][col] = svgIndex;

          const shape: Shape = {
            x: offsetX + col * GAP,
            y: offsetY + row * GAP,
            angle: rnd(0, Math.PI * 2),
            size: GAP * 0.65,
            scale: REST_SCALE,
            prevScale: REST_SCALE,
            maxScale: rnd(MIN_HOVER_SCALE, MAX_HOVER_SCALE),
            svgIndex,
            gridCol: col,
            gridRow: row,
          };
          nextShapes.push(shape);
          shapeGrid[row][col] = shape;
        }
      }
      shapes = nextShapes;
    }

    function init() {
      const rect = section?.getBoundingClientRect();
      width = Math.round(rect?.width ?? window.innerWidth);
      height = Math.round(rect?.height ?? window.innerHeight);
      const dpr = window.devicePixelRatio || 1;

      canvasEl.width = width * dpr;
      canvasEl.height = height * dpr;
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Refresh mask rects on resize
      maskRects = Array.from(
        (section ?? document).querySelectorAll("[data-shape-mask]"),
      ).map((node) => node.getBoundingClientRect());

      buildGrid();
    }

    function triggerWave(x = width / 2, y = height / 2) {
      waves.push({ x, y, startTime: performance.now() });
      maskOverride = true;
      const delay =
        Math.sqrt(width * width + height * height) / WAVE_SPEED + WAVE_WIDTH / WAVE_SPEED;
      if (waveClearTimer) window.clearTimeout(waveClearTimer);
      waveClearTimer = window.setTimeout(() => {
        maskOverride = false;
      }, delay * 1000);
    }

    function onPointerMove(event: PointerEvent) {
      const now = performance.now();
      if (now - lastPointerUpdate < POINTER_THROTTLE_MS) return;
      lastPointerUpdate = now;

      const rect = canvasEl.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      activity = 1;
    }

    function onPointerDown(event: PointerEvent) {
      const rect = canvasEl.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > width || y > height) return;
      triggerWave(x, y);
    }

    // Get shapes near a point using spatial grid (O(1) instead of O(n))
    function getShapesInRadius(px: number, py: number, radius: number): Shape[] {
      const cellRadius = Math.ceil(radius / GAP);
      const centerCol = Math.floor(px / GAP);
      const centerRow = Math.floor(py / GAP);
      const result: Shape[] = [];

      for (let r = -cellRadius; r <= cellRadius; r++) {
        for (let c = -cellRadius; c <= cellRadius; c++) {
          const row = centerRow + r;
          const col = centerCol + c;
          if (row >= 0 && row < rows && col >= 0 && col < cols) {
            result.push(shapeGrid[row][col]);
          }
        }
      }
      return result;
    }

    function tick(timestamp: number) {
      // Cap at 30fps
      const elapsed = timestamp - lastFrameTime;
      if (elapsed < FRAME_TIME) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }
      lastFrameTime = timestamp - (elapsed % FRAME_TIME);

      activity *= 0.93;
      ctx.clearRect(0, 0, width, height);

      const hasActiveWave = waves.length > 0;
      const hasHoverActivity = activity > 0.001;

      // Cache mask rects every ~1 second
      if (timestamp - lastMaskUpdate > 1000) {
        lastMaskUpdate = timestamp;
        maskRects = Array.from(
          (section ?? document).querySelectorAll("[data-shape-mask]"),
        ).map((node) => node.getBoundingClientRect());
      }

      const radius = Math.min(width, height) * (RADIUS_VMIN / 100);
      const now = performance.now();

      // Process wave animation
      if (hasActiveWave) {
        const wave = waves[0];
        const elapsed = (now - wave.startTime) / 1000;
        const diag = Math.sqrt(width * width + height * height);
        const duration = (diag + WAVE_WIDTH) / WAVE_SPEED;
        const progress = Math.min(elapsed / duration, 1);
        const front = progress * (diag + WAVE_WIDTH) - WAVE_WIDTH * 0.5;
        const tail = front - WAVE_WIDTH;

        // Only process shapes that could be affected by wave
        for (const shape of shapes) {
          const dx = shape.x - wave.x;
          const dy = shape.y - wave.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= tail && dist <= front) {
            const local = smoothstep((dist - tail) / WAVE_WIDTH);
            const waveScale = REST_SCALE + local * (shape.maxScale - REST_SCALE);
            shape.scale = Math.max(shape.scale, waveScale);
          }
        }

        if (progress >= 1) waves.length = 0;
      }

      const lerpIn = durationToFactor(SPEED_IN);
      const lerpOut = durationToFactor(SPEED_OUT);
      const sectionRect = section?.getBoundingClientRect();

      // Get shapes near pointer for hover effect (spatial lookup)
      const hoverShapes = pointer && hasHoverActivity
        ? new Set(getShapesInRadius(pointer.x, pointer.y, radius))
        : null;

      for (const shape of shapes) {
        shape.prevScale = shape.scale;

        const pad = GAP / 2;
        const absX = (sectionRect?.left ?? 0) + shape.x;
        const absY = (sectionRect?.top ?? 0) + shape.y;

        const masked =
          !maskOverride &&
          maskRects.some(
            (rect) =>
              absX >= rect.left - pad &&
              absX <= rect.right + pad &&
              absY >= rect.top - pad &&
              absY <= rect.bottom + pad,
          );

        if (masked) {
          shape.scale += (0 - shape.scale) * lerpOut;
          if (shape.scale < 0.005) shape.scale = 0;
          continue;
        }

        let hoverTarget = REST_SCALE;

        // Only calculate hover for shapes near pointer (from spatial lookup)
        if (hoverShapes?.has(shape) && pointer) {
          const dx = shape.x - pointer.x;
          const dy = shape.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = smoothstep(1 - dist / radius) * activity;
          if (influence > 0.05) {
            hoverTarget = REST_SCALE + influence * (shape.maxScale - REST_SCALE);
          }
        }

        if (!hasActiveWave) {
          const factor = hoverTarget > shape.scale ? lerpIn : lerpOut;
          shape.scale += (hoverTarget - shape.scale) * factor;
        } else if (hoverTarget > shape.scale) {
          shape.scale += (hoverTarget - shape.scale) * lerpIn;
        }

        if (shape.scale < REST_SCALE * 0.15) continue;

        if (shape.svgIndex < 0 || !loadedSvgs[shape.svgIndex]) continue;
        const svgData = loadedSvgs[shape.svgIndex];
        let drawH = shape.size * 2 * shape.scale;
        let drawW = drawH * svgData.aspect;
        const maxCell = GAP * 0.92;
        if (drawH > maxCell) {
          drawH = maxCell;
          drawW = drawH * svgData.aspect;
        }
        if (drawW > maxCell) {
          drawW = maxCell;
          drawH = drawW / svgData.aspect;
        }
        ctx.drawImage(svgData.img, shape.x - drawW / 2, shape.y - drawH / 2, drawW, drawH);
      }

      rafId = window.requestAnimationFrame(tick);
    }

    let isMounted = true;
    let started = false;
    let isVisible = false;
    let isPaused = true;

    function resumeAnimation() {
      if (!isPaused || !started) return;
      isPaused = false;
      lastFrameTime = performance.now();
      rafId = window.requestAnimationFrame(tick);
    }

    function pauseAnimation() {
      if (isPaused) return;
      isPaused = true;
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }

    function startAnimation() {
      if (started || !isMounted) return;
      started = true;
      init();
      triggerWave();
      window.addEventListener("resize", init);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown);

      // Only start if visible
      if (isVisible) {
        resumeAnimation();
      }
    }

    // Observer for pause/resume based on visibility
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible) {
          if (!started && document.readyState === "complete") {
            loadSvgImages().finally(startAnimation);
          } else if (started) {
            resumeAnimation();
          }
        } else {
          pauseAnimation();
        }
      },
      { threshold: 0 }
    );

    function onLoad() {
      // Check if already visible and start
      const rect = canvasEl.getBoundingClientRect();
      isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        loadSvgImages().finally(startAnimation);
      }
    }

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }
    visibilityObserver.observe(canvasEl);

    return () => {
      isMounted = false;
      visibilityObserver.disconnect();
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", init);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      if (waveClearTimer) window.clearTimeout(waveClearTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-85"
    />
  );
}
