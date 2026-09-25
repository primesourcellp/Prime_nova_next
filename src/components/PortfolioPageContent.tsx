import Link from "next/link";
import { Reveal } from "./Reveal";
import { Button } from "./Button";

const projects = [
  {
    title: "Enterprise hiring platform",
    sector: "Technology",
    summary:
      "Multi-team pipelines, shared scorecards, and role templates for a global hiring org.",
  },
  {
    title: "Agency placement workspace",
    sector: "Professional services",
    summary:
      "Client roles, shortlists, and placement progress in one structured view for recruiters.",
  },
  {
    title: "High-volume screening flow",
    sector: "Healthcare",
    summary:
      "Fast filters and clear stages for large applicant pools without losing decision clarity.",
  },
];

export function PortfolioPageContent() {
  return (
    <>
      <section className="hero-atmosphere relative overflow-hidden border-b border-border/40">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <Reveal className="max-w-2xl">
            <p className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-medium italic leading-none tracking-[-0.03em] text-teal">
              Primenova
            </p>
            <h1 className="mt-5 font-serif text-[clamp(2.35rem,5.2vw,3.85rem)] font-medium leading-[1.05] tracking-[-0.035em] text-foreground">
              Portfolio of{" "}
              <span className="text-teal">structured hiring</span> work
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Selected engagements and product builds that show how Primenova
              shapes hiring around the way teams operate.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/products">Explore products</Button>
              <Button href="/#demo" variant="secondary">
                Request a demo
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border/40 bg-[linear-gradient(180deg,#f7fafb_0%,#ffffff_55%,#f3f6f7_100%)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Selected work
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.85rem,3.2vw,2.5rem)] font-medium tracking-[-0.03em] text-foreground">
              Built with teams, not{" "}
              <span className="text-teal">around them</span>
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal
                key={project.title}
                as="li"
                delay={index * 80}
                className="flex h-full"
              >
                <article className="flex h-full w-full flex-col rounded-2xl border border-border/70 bg-surface p-6 sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-light">
                    {project.sector}
                  </p>
                  <h3 className="mt-2 font-serif text-[clamp(1.25rem,2vw,1.5rem)] font-medium tracking-[-0.02em] text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>
                  <Link
                    href="/products"
                    className="mt-6 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    View products →
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
