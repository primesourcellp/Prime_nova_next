import { Reveal } from "./Reveal";

const solutions = [
  {
    title: "Enterprise Hiring",
    description:
      "Coordinate multi-team recruitment with shared pipelines, approvals, and consistent candidate experiences.",
  },
  {
    title: "Agency Workflows",
    description:
      "Manage client roles, candidate shortlists, and placement progress in a single structured view.",
  },
  {
    title: "High-Volume Roles",
    description:
      "Keep screening moving with clear stages, fast filters, and visibility across large applicant pools.",
  },
];

const industries = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "Professional Services",
  "Manufacturing",
  "Education",
];

export function Solutions() {
  return (
    <>
      <section
        id="solutions"
        className="scroll-mt-20 border-t border-border/70 bg-surface"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Solutions
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Solutions shaped by hiring context
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Whether you scale teams internally or place talent for clients,
              PRIMENOVA adapts to the way your organization works.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {solutions.map((item, index) => (
              <Reveal
                key={item.title}
                as="article"
                delay={index * 120}
                className="flex flex-col"
              >
                <div className="solution-bar mb-5 h-1 w-10 rounded-full bg-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="industries"
        className="scroll-mt-20 border-t border-border/70 bg-background"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                Industries
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Built for modern hiring across sectors
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-muted lg:justify-self-end">
              From regulated industries to fast-moving tech teams, explore
              approaches designed around the realities of each hiring
              environment.
            </p>
          </Reveal>

          <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
            {industries.map((industry, index) => (
              <Reveal
                key={industry}
                as="li"
                delay={index * 60}
                className="border-t border-border pt-4 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                {industry}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
