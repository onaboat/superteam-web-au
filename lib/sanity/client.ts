import { createClient } from "next-sanity";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "bhh819h2";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Studio URL for visual-editing overlays (stega); must match where editors open Sanity. */
const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "http://localhost:3333";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  stega: {
    studioUrl,
  },
});
