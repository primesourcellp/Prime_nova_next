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
        <div className="relative mx-auto grid max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
            <Reveal>
              <p className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-medium italic leading-none tracking-[-0.03em] text-teal">
                Primenova
              </p>
              <h1 className="mt-5 max-w-xl font-serif text-[clamp(2.35rem,5.2vw,3.85rem)] font-medium leading-[1.05] tracking-[-0.035em] text-foreground">
                Portfolio of{" "}
                <span className="text-teal">structured hiring</span> work
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
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

          <div
            className="hero-visual-plane relative flex min-h-[360px] items-center justify-center border-t border-border/30 px-6 py-12 sm:min-h-[420px] sm:px-10 lg:min-h-full lg:border-l lg:border-t-0 lg:py-16"
            aria-hidden
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -right-8 top-[12%] h-44 w-44 rounded-full bg-teal/25 blur-2xl" />
              <div className="absolute bottom-[8%] left-[10%] h-36 w-52 rounded-full bg-[rgba(253,167,4,0.18)] blur-2xl" />
              <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
            </div>

            <div className="animate-gentle-float relative z-10 w-[min(100%,220px)] sm:w-[240px]">
              <div className="relative overflow-hidden rounded-[2rem] border-[3px] border-[#9ec5c2] bg-[linear-gradient(160deg,#e8f5f3,#cfe8e4)] p-2 shadow-[0_30px_60px_rgba(15,118,110,0.22),inset_0_0_0_2px_rgba(255,255,255,0.85)]">
                <div className="absolute left-1/2 top-3 z-20 h-2 w-[30%] -translate-x-1/2 rounded-full bg-teal/80" />
                <video
                  className="block h-auto w-full rounded-[1.5rem]"
                  src="/images/portfolio-hero.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          </div>
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
