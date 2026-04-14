import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { MembersDirectory } from "@/components/members-directory";
import { Navbar } from "@/components/navbar";
import { getPublishedProfiles } from "@/lib/data/members";

export const metadata: Metadata = {
  title: "Members | Superteam Australia",
  description:
    "Discover builders and operators in the Superteam Australia community — filter by skill area.",
};

export const revalidate = 60;

export default async function MembersPage() {
  const profiles = await getPublishedProfiles();

  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans">
      <Navbar />
      <main className="flex flex-1 flex-col px-5 pb-24 pt-28 sm:px-10 sm:pt-32 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="text-4xl font-black leading-none text-chart-1 sm:text-5xl">
            Members
          </h1>
          <p className="mt-4 max-w-2xl text-base font-bold leading-relaxed text-foreground sm:text-lg">
            People in the directory chose to be listed after joining through Get Involved. Use search
            and filters to find collaborators by skill area.
          </p>
          <div className="mt-12">
            <MembersDirectory profiles={profiles} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
