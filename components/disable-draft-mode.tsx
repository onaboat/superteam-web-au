"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool) return null;

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed right-4 bottom-4 z-[100] rounded-full bg-neutral-900 px-4 py-2 text-sm text-white shadow-lg"
    >
      Disable draft mode
    </a>
  );
}
