"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "1",
    question: "What is Superteam Australia",
    answer:
      "Superteam Australia is the regional chapter of Superteam on Solana — a community of builders, founders, and partners helping teams ship products, win grants and bounties, and grow the ecosystem Down Under.",
  },
  {
    id: "2",
    question: "How can i get involved",
    answer:
      "Join events and build sessions, contribute to open bounties, or introduce your project in Discord. Whether you code, design, or organise, there is a path to participate — start by following announcements and showing up to a meetup.",
  },
  {
    id: "3",
    question: "What opportunities are avaliable ?",
    answer:
      "Members can access hackathons, grants, educational workshops, and partner introductions. Opportunities rotate with each programme — check the events feed and community channels for what is open right now.",
  },
  {
    id: "4",
    question: "How can institutions engage with Superteam Australia ?",
    answer:
      "Policy teams, universities, and enterprises can collaborate on pilots, research, and ecosystem programmes. Reach out through the site or community leads to scope education, deployment, or co-hosted initiatives.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="w-full scroll-mt-24 bg-background py-14 sm:py-18">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-10 lg:px-16">
        <h2 className="text-headdingbig">
          Frequently Asked Questions
        </h2>
        <p className="text-subheading">
          Everything you need to know about Superteam Australia.
        </p>

        <Accordion
          type="single"
          collapsible
          className="mt-10 flex w-full flex-col gap-2"
        >
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger
                className="flex w-full items-center justify-between gap-4 border-b-2 border-l-2 border-chart-1 bg-primary px-4 py-4 text-left hover:no-underline focus-visible:ring-2 focus-visible:ring-chart-1 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <span className="text-base font-bold text-chart-1 sm:text-lg">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="border-b-2 border-l-2 border-chart-1 bg-chart-1 px-4 py-4 text-sm leading-relaxed text-background sm:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
