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
      className="scroll-mt-20 border-t border-border/40 bg-[linear-gradient(165deg,#e8f3f1_0%,#f3f6f7_42%,#f4efe8_100%)]"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            Technology
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2rem,3.5vw,2.75rem)] font-medium tracking-[-0.03em] text-foreground">
            Recruitment technology with a{" "}
            <span className="text-teal">product focus</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Primenova brings product discovery, industry solutions, and enquiry
            journeys together — so organizations evaluate and adopt hiring
            software with clarity.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-14">
          {pillars.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              as="article"
              delay={index * 100}
              className="relative"
            >
              <div className="solution-bar mb-6 h-0.5 w-12 bg-primary" />
              <h3 className="text-lg font-bold tracking-tight text-foreground">
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
