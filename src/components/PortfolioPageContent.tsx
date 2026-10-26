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
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { ProjectCatalog } from "./portfolio/ProjectCatalog";
import {
  portfolioCta,
  portfolioIndustries,
  portfolioProjects,
  portfolioTechnologies,
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
  return (
    <>
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
            {portfolioTechnologies.map((tech, index) => (
              <Reveal
                key={tech}
                as="li"
                delay={(index % 4) * 60}
                className="rounded-2xl border border-border/70 bg-background px-4 py-4 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_30px_-22px_rgba(12,22,32,0.45)]"
              >
                {tech}
              </Reveal>
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
            {portfolioIndustries.map((name, index) => {
              const Icon = industryIcons[name] ?? Building2;
              return (
                <Reveal key={name} as="li" delay={(index % 3) * 70}>
                  <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_12px_30px_-22px_rgba(15,118,110,0.45)]">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Icon size={18} aria-hidden />
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {name}
                    </span>
                  </div>
                </Reveal>
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

