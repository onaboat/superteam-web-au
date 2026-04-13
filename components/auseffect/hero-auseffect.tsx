"use client";

import { useEffect, useRef } from "react";

type Shape = {
  x: number;
  y: number;
  angle: number;
  size: number;
  scale: number;
  maxScale: number;
  svgIndex: number;
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
    let rafId = 0;
    let frameCount = 0;
    let activity = 0;
    let pointer: { x: number; y: number } | null = null;
    let maskRects: DOMRect[] = [];
    let maskOverride = false;
    let waveClearTimer: number | null = null;
    const waves: Wave[] = [];
    let shapes: Shape[] = [];
    let loadedSvgs: LoadedSvg[] = [];
    const section = canvasEl.parentElement;

    async function loadSvgImages() {
      const results = await Promise.all(
        SVG_SOURCES.flatMap((src, sourceIndex) =>
          TINTS.map(
            (tint) =>
              new Promise<LoadedSvg | null>((resolve) => {
                fetch(src)
                  .then((response) => response.text())
                  .then((svgText) => {
                    const tinted = svgText.replace(
                      /(<(?:path|circle|polygon)\b[^>]*?)fill="white"/g,
                      `$1fill="${tint}"`,
                    );
                    const img = new Image();
                    img.onload = () => {
                      const w = img.naturalWidth || 1;
                      const h = img.naturalHeight || 1;
                      resolve({
                        img,
                        aspect: w / h,
                        sourceIndex,
                        tintIndex: TINTS.indexOf(tint),
                      });
                    };
                    img.onerror = () => resolve(null);
                    img.src = `data:image/svg+xml;base64,${btoa(tinted)}`;
                  })
                  .catch(() => resolve(null));
              }),
          ),
        ),
      );
      loadedSvgs = results.filter((result): result is LoadedSvg => result !== null);
    }

    function buildGrid() {
      const cols = Math.floor(width / GAP);
      const rows = Math.floor(height / GAP);
      const offsetX = (width - (cols - 1) * GAP) / 2;
      const offsetY = (height - (rows - 1) * GAP) / 2;
      const grid2d: number[][] = [];

      const nextShapes: Shape[] = [];
      for (let row = 0; row < rows; row += 1) {
        grid2d[row] = [];
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

          nextShapes.push({
            x: offsetX + col * GAP,
            y: offsetY + row * GAP,
            angle: rnd(0, Math.PI * 2),
            size: GAP * 0.65,
            scale: REST_SCALE,
            maxScale: rnd(MIN_HOVER_SCALE, MAX_HOVER_SCALE),
            svgIndex,
          });
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

    function tick() {
      frameCount += 1;
      activity *= 0.93;
      ctx.clearRect(0, 0, width, height);

      if (frameCount % 10 === 0) {
        maskRects = Array.from(
          (section ?? document).querySelectorAll("[data-shape-mask]"),
        ).map((node) => node.getBoundingClientRect());
      }

      const radius = Math.min(width, height) * (RADIUS_VMIN / 100);
      const now = performance.now();
      const hasActiveWave = waves.length > 0;

      if (hasActiveWave) {
        const wave = waves[0];
        const elapsed = (now - wave.startTime) / 1000;
        const diag = Math.sqrt(width * width + height * height);
        const duration = (diag + WAVE_WIDTH) / WAVE_SPEED;
        const progress = Math.min(elapsed / duration, 1);
        const front = progress * (diag + WAVE_WIDTH) - WAVE_WIDTH * 0.5;
        const tail = front - WAVE_WIDTH;

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

      for (const shape of shapes) {
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
        if (pointer && activity > 0.001) {
          const dx = shape.x - pointer.x;
          const dy = shape.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = smoothstep(1 - dist / radius) * activity;
          if (influence > 0.05) {
            hoverTarget =
              REST_SCALE + influence * (shape.maxScale - REST_SCALE);
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
    loadSvgImages().finally(() => {
      if (!isMounted) return;
      init();
      triggerWave();
      rafId = window.requestAnimationFrame(tick);
    });

    window.addEventListener("resize", init);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      isMounted = false;
      window.cancelAnimationFrame(rafId);
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
