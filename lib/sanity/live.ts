import { defineLive } from "next-sanity/live";

import { sanityClient } from "@/lib/sanity/client";

const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient,
  serverToken: token || false,
  browserToken: token || false,
});
