/** Block types for the home page builder (keep in sync with studio schema). */

export type HeroSectionBlock = {
  _key: string;
  _type: "heroSection";
  headlineLine1?: string | null;
  headlineLine2Prefix?: string | null;
  headlineLine3?: string | null;
  tagline?: string | null;
};

export type TickerSectionBlock = {
  _key: string;
  _type: "tickerSection";
};

export type WhatWeDoSectionBlock = {
  _key: string;
  _type: "whatWeDoSection";
};

export type EventsSectionBlock = {
  _key: string;
  _type: "eventsSection";
};

export type BuildersSectionBlock = {
  _key: string;
  _type: "buildersSection";
};

export type CommunitySectionBlock = {
  _key: string;
  _type: "communitySection";
};

export type FaqSectionBlock = {
  _key: string;
  _type: "faqSection";
};

export type HomeSectionBlock =
  | HeroSectionBlock
  | TickerSectionBlock
  | WhatWeDoSectionBlock
  | EventsSectionBlock
  | BuildersSectionBlock
  | CommunitySectionBlock
  | FaqSectionBlock;

export type HomePageDocument = {
  _id: string;
  sections?: HomeSectionBlock[] | null;
};
