import { defineQuery } from "next-sanity";

/**
 * Prefer singleton id `home`; fall back to any homePage so older drafts still resolve.
 */
export const homePageQuery = defineQuery(`
  coalesce(
    *[_type == "homePage" && _id == "home"][0],
    *[_type == "homePage"] | order(_updatedAt desc)[0]
  ) {
    _id,
    sections[] {
      _key,
      _type,
      ...
    }
  }
`);
