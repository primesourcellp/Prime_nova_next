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
        className="scroll-mt-20 border-t border-border/40 bg-[linear-gradient(180deg,#f7fafb_0%,#ffffff_100%)]"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Solutions
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,3.5vw,2.75rem)] font-medium tracking-[-0.03em] text-foreground">
              Hiring systems shaped by how teams{" "}
              <span className="text-teal">actually work</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Whether you scale teams internally or place talent for clients,
              Primenova adapts to the rhythm of your organization.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-3">
            {solutions.map((item, index) => (
              <Reveal
                key={item.title}
                as="article"
                delay={index * 100}
                className="flex flex-col border-t border-foreground/10 pt-6"
              >
                <span className="font-serif text-3xl font-medium text-primary/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground">
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
        className="scroll-mt-20 border-t border-border/40 bg-background"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Industries
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,3.5vw,2.75rem)] font-medium tracking-[-0.03em] text-foreground">
              Built for modern hiring{" "}
              <span className="text-teal">across sectors</span>
            </h2>
          </Reveal>

          <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-0 sm:grid-cols-3 lg:grid-cols-6">
            {industries.map((industry, index) => (
              <Reveal
                key={industry}
                as="li"
                delay={index * 50}
                className="border-t border-border py-5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
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
