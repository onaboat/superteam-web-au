const items = [
  {
    title: "Builder & Founder Support",
    body: "Product and technical guidance to help teams ship. Support across hackathons, bounties and ecosystem program",
  },
  {
    title: "Capital & Fundraising",
    body: "Connecting capital with investable, scalable projects. Supporting founders with positioning and investor",
  },
  {
    title: "Growth & Distribution",
    body: "Go-to-market and growth support. Access to ecosystem distribution and community",
  },
  {
    title: "Talent & Hiring",
    body: "Connecting teams with developers, designers and operators. Supporting team formation and scaling.",
  },
  {
    title: "Institutional Engagement",
    body: "Bridging builders with institutions. Engaging policymakers and supporting real-world deployments.",
  },
];

export function WhatWeDo() {
  return (
    <section className="w-full bg-background py-14 sm:py-18">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-10 lg:px-16">
        <div className="max-w-5xl space-y-8 sm:space-y-10">
          <h2 className="text-headdingbig">
            What We Do
          </h2>

          <p className="text-subheading ">
            We exist to accelerate builders, founders, creatives and
            institutions working towards internet capital markets on Solana.
          </p>

          <div className="space-y-2 pt-4 text-2xl leading-snug">
            {items.map((item) => (
              <p key={item.title} className="text-white/95">
                <span className="font-medium text-chart-1">{item.title}</span>
                <span className="px-2 text-chart-1" aria-hidden>
                  •
                </span>
                <span>{item.body}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
