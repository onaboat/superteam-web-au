import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { GetInvolvedForm } from "@/components/get-involved-form";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Get Involved | Superteam Australia",
  description:
    "Join the Superteam Australia community — tell us about your skills and what you're looking for.",
};

export default function GetInvolvedPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans">
      <Navbar />
      <main className="flex flex-1 flex-col px-5 pb-24 pt-28 sm:px-10 sm:pt-32 lg:px-16">
        <div className="mx-auto w-full max-w-2xl">
          <h1 className="text-4xl font-black leading-none text-chart-1 sm:text-5xl">
            Get involved
          </h1>
          <p className="mt-4 text-base font-bold leading-relaxed text-foreground sm:text-lg">
            A few quick steps — we use this to match builders with opportunities and to grow the
            community intentionally.
          </p>
          <div className="mt-10 border-2 border-chart-1 bg-background/40 p-4 sm:p-6">
            <GetInvolvedForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
