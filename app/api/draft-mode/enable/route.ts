import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { sanityClient } from "@/lib/sanity/client";

const readToken = process.env.SANITY_API_READ_TOKEN?.trim();

/**
 * Preview secret validation calls the Content Lake; a Viewer token is required.
 * Empty string was causing TypeError → 500 and a broken Presentation iframe.
 */
const draftHandlers = readToken
  ? defineEnableDraftMode({
      client: sanityClient.withConfig({ token: readToken }),
    })
  : null;

export async function GET(request: Request) {
  if (!draftHandlers) {
    return new Response(
      JSON.stringify({
        error:
          "Missing SANITY_API_READ_TOKEN. Create a token with Viewer access at https://www.sanity.io/manage (API → Tokens) and add it to .env.local",
      }),
      { status: 503, headers: { "content-type": "application/json" } },
    );
  }
  return draftHandlers.GET(request);
}
