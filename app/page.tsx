import { Builders } from "@/components/builders";
import { Community } from "@/components/community";
import { Events } from "@/components/events";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Ticker } from "@/components/ticker";
import { WhatWeDo } from "@/components/what-we-do";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans">
      <Navbar />
      <main className="flex w-full flex-1 flex-col">
        <Hero />
        <Ticker />
        <WhatWeDo />
        <Events />
        <Builders />
        <Community />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
