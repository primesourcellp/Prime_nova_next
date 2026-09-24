import { Reveal } from "./Reveal";

const pillars = [
  {
    title: "Structured by design",
    description:
      "Stages, scorecards, and role definitions that keep hiring decisions consistent and auditable.",
  },
  {
    title: "Product-led discovery",
    description:
      "Help buyers explore the right software path before committing — with clear journeys from interest to demo.",
  },
  {
    title: "Connected enquiry flows",
    description:
      "Route questions, demos, and follow-ups into one place so no hiring conversation gets lost.",
  },
];

export function Technology() {
  return (
    <section
      id="technology"
      className="scroll-mt-20 border-t border-border/70 bg-surface"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            Technology
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Recruitment technology with a product focus
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            PRIMENOVA brings product discovery, industry solutions, and enquiry
            journeys together — so organizations can evaluate and adopt hiring
            software with clarity.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} as="article" delay={index * 100}>
              <h3 className="text-lg font-bold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
