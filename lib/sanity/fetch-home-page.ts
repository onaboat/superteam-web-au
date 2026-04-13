import { homePageQuery } from "@/lib/sanity/queries";
import { sanityFetch } from "@/lib/sanity/live";
import type { HomePageDocument } from "@/lib/sanity/types";

export async function fetchHomePage(): Promise<HomePageDocument | null> {
  try {
    const { data } = await sanityFetch({
      query: homePageQuery,
    });
    return data;
  } catch (err) {
    console.error("Sanity fetch homePage failed:", err);
    return null;
  }
}
