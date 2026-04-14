// Web worker for loading and tinting SVGs off the main thread

type LoadRequest = {
  sources: string[];
  tints: string[];
};

type LoadedSvgData = {
  dataUrl: string;
  sourceIndex: number;
  tintIndex: number;
};

self.onmessage = async (event: MessageEvent<LoadRequest>) => {
  const { sources, tints } = event.data;

  const results: LoadedSvgData[] = [];

  // Process all SVGs in parallel
  const promises = sources.flatMap((src, sourceIndex) =>
    tints.map(async (tint, tintIndex) => {
      try {
        const response = await fetch(src);
        const svgText = await response.text();

        // Tint the SVG by replacing fill="white" with the tint color
        const tinted = svgText.replace(
          /(<(?:path|circle|polygon)\b[^>]*?)fill="white"/g,
          `$1fill="${tint}"`
        );

        // Convert to base64 data URL
        const dataUrl = `data:image/svg+xml;base64,${btoa(tinted)}`;

        return { dataUrl, sourceIndex, tintIndex };
      } catch {
        return null;
      }
    })
  );

  const loaded = await Promise.all(promises);

  for (const item of loaded) {
    if (item) results.push(item);
  }

  self.postMessage(results);
};
