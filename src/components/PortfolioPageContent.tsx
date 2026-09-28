import {
  Building2,
  Cpu,
  Factory,
  GraduationCap,
  HeartPulse,
  House,
  Landmark,
  ShoppingBag,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { ProjectCatalog } from "./portfolio/ProjectCatalog";
import { ProjectMedia } from "./portfolio/ProjectVisual";
import {
  getFeaturedProjects,
  portfolioCta,
  portfolioHero,
  portfolioIndustries,
  portfolioProjects,
  portfolioStats,
  portfolioTechnologies,
  projectPath,
} from "@/data/portfolio";

const industryIcons: Record<string, LucideIcon> = {
  Healthcare: HeartPulse,
  Finance: Landmark,
  Education: GraduationCap,
  Recruitment: Users,
  Retail: ShoppingBag,
  Manufacturing: Factory,
  Logistics: Truck,
  "Real Estate": House,
  Technology: Cpu,
};

export function PortfolioPageContent() {
  const featured = getFeaturedProjects();

  return (
    <>
      <section className="hero-atmosphere relative overflow-hidden border-b border-border/40">
        <div className="relative mx-auto grid max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {portfolioHero.kicker}
              </p>
              <h1 className="mt-4 max-w-xl font-serif text-[clamp(2.5rem,5.4vw,4rem)] font-medium leading-[1.05] tracking-[-0.035em] text-foreground">
                Our{" "}
                <span className="italic text-teal">Portfolio</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                {portfolioHero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={portfolioHero.primary.href}>
                  {portfolioHero.primary.label}
                </Button>
                <Button href={portfolioHero.secondary.href} variant="secondary">
                  {portfolioHero.secondary.label}
                </Button>
              </div>
            </Reveal>
          </div>

          <div
            className="hero-visual-plane relative min-h-[320px] overflow-hidden border-t border-border/30 lg:min-h-full lg:border-l lg:border-t-0"
            aria-hidden
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,118,110,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
            <div className="relative flex h-full items-center justify-center px-8 py-14 sm:px-12">
              <div className="animate-gentle-float w-full max-w-sm space-y-3">
                <Panel label="Applications" width="82%" />
                <Panel label="Platforms" width="64%" delay />
                <Panel label="Products" width="74%" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/40 bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Featured
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.85rem,3.2vw,2.6rem)] font-medium tracking-[-0.03em] text-foreground">
              Featured projects
            </h2>
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {featured.map((project, index) => (
              <Reveal key={project.id} as="li" delay={index * 70}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-background shadow-[0_16px_40px_-28px_rgba(12,22,32,0.45)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_46px_-28px_rgba(12,22,32,0.4)]">
                  <ProjectMedia
                    project={project}
                    className="aspect-[16/9] transition duration-500 group-hover:scale-[1.015]"
                  />
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                      {project.industry}
                    </p>
                    <h3 className="mt-2 font-serif text-[clamp(1.5rem,2vw,1.85rem)] font-medium tracking-[-0.03em] text-foreground">
                      {project.projectName}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-[15px]">
                      {project.shortDescription}
                    </p>
                    {project.technologies.length > 0 && (
                      <p className="mt-4 text-[12px] font-medium text-foreground/70">
                        {project.technologies.join(" · ")}
                      </p>
                    )}
                    <Link
                      href={projectPath(project)}
                      className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      View Case Study
                      <ArrowUpRight size={16} aria-hidden />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border/40 bg-[linear-gradient(180deg,#f3f6f7,#ffffff)]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
          <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {portfolioStats.map((stat, index) => (
              <Reveal key={stat.label} as="li" delay={index * 60}>
                <p className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-medium tracking-[-0.04em] text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ProjectCatalog projects={portfolioProjects} />

      <section className="border-b border-border/40 bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Technology
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.85rem,3.2vw,2.5rem)] font-medium tracking-[-0.03em] text-foreground">
              Technologies we build with
            </h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {portfolioTechnologies.map((tech) => (
              <li
                key={tech}
                className="rounded-2xl border border-border/70 bg-background px-4 py-4 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_30px_-22px_rgba(12,22,32,0.45)]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border/40">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Industries
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.85rem,3.2vw,2.5rem)] font-medium tracking-[-0.03em] text-foreground">
              Industries we have worked with
            </h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioIndustries.map((name) => {
              const Icon = industryIcons[name] ?? Building2;
              return (
                <li key={name}>
                  <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_12px_30px_-22px_rgba(15,118,110,0.45)]">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Icon size={18} aria-hidden />
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {name}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        id="start"
        className="bg-[linear-gradient(120deg,#0f766e_0%,#0d635c_48%,#124e57_100%)] text-white"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:px-10 lg:py-24">
          <Reveal className="max-w-xl">
            <h2 className="font-serif text-[clamp(2rem,3.8vw,3rem)] font-medium tracking-[-0.03em]">
              {portfolioCta.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              {portfolioCta.body}
            </p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            <Button href={portfolioCta.primary.href}>
              {portfolioCta.primary.label}
            </Button>
            <Button
              href={portfolioCta.secondary.href}
              variant="secondary"
              className="!border-white/35 !bg-transparent !text-white hover:!border-white/60 hover:!bg-white/10"
            >
              {portfolioCta.secondary.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Panel({
  label,
  width,
  delay = false,
}: {
  label: string;
  width: string;
  delay?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/80 bg-surface/80 p-4 shadow-[0_16px_36px_-24px_rgba(12,22,32,0.4)] backdrop-blur-sm ${
        delay ? "ml-6 sm:ml-10" : ""
      }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-light">
        {label}
      </p>
      <div className="mt-3 h-1.5 rounded-full bg-primary/20" style={{ width }} />
      <div className="mt-2 h-1.5 w-1/2 rounded-full bg-foreground/10" />
    </div>
  );
}
