import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Layers,
  Search,
  Shield,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";
import {
  portfolioCta,
  type FeatureIcon,
  type PortfolioProject,
} from "@/data/portfolio";
import { ProjectMedia } from "./ProjectVisual";

const featureIcons: Record<FeatureIcon, LucideIcon> = {
  users: Users,
  chart: BarChart3,
  shield: Shield,
  flow: Workflow,
  layers: Layers,
  search: Search,
};

export function ProjectDetailView({ project }: { project: PortfolioProject }) {
  const shots =
    project.images.length > 0
      ? project.images.map((_, index) => index)
      : [0, 1, 2];

  return (
    <>
      <article className="border-b border-border/40 bg-[linear-gradient(180deg,#f7fafb_0%,#ffffff_28%)]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <Link
            href="/portfolio#projects"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} aria-hidden />
            All projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {(project.categories ?? [project.category]).join(" · ")}
            </p>
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                project.status === "Ongoing"
                  ? "bg-[#f8f1e3] text-[#7a5b24]"
                  : "bg-primary-soft text-primary"
              }`}
            >
              {project.status}
            </span>
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.035em] text-foreground">
            {project.projectName}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {project.description}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-foreground/10 pt-6 sm:grid-cols-4">
            {[
              ["Client", project.clientName],
              ["Industry", project.industry],
              ["Duration", project.duration],
              ["Year", project.year],
            ]
              .filter((item): item is [string, string] => Boolean(item[1]))
              .map(([label, value]) => (
                <Meta key={label} label={label} value={value} />
              ))}
          </dl>
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-10">
          <ProjectMedia
            project={project}
            showVideo
            className={
              project.video
                ? "rounded-3xl"
                : "aspect-[16/8] min-h-[240px] rounded-3xl border border-white/70"
            }
          />
        </div>
      </article>

      <section className="border-b border-border/40 bg-surface">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:px-8 md:grid-cols-2 lg:px-10 lg:py-20">
          <div className="rounded-2xl border border-border/70 bg-background p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-medium tracking-[-0.03em] text-foreground">
              Challenge
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              {project.challenge}
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-[linear-gradient(180deg,#f7fafb,#ffffff)] p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-medium tracking-[-0.03em] text-foreground">
              Our solution
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border/40">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <h2 className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] font-medium tracking-[-0.03em] text-foreground">
            Key features
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {project.features.map((feature) => {
              const Icon = featureIcons[feature.icon];
              return (
                <li
                  key={feature.title}
                  className="rounded-2xl border border-border/70 bg-surface p-5 shadow-[0_10px_30px_-26px_rgba(12,22,32,0.5)]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon size={18} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-medium tracking-[-0.02em] text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {project.technologies.length > 0 && (
        <section className="border-b border-border/40 bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
            <h2 className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] font-medium tracking-[-0.03em] text-foreground">
              Technology stack
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium text-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-b border-border/40">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <h2 className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] font-medium tracking-[-0.03em] text-foreground">
            Screenshots
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {shots.map((shot) => (
              <li
                key={shot}
                className="overflow-hidden rounded-2xl border border-border/70"
              >
                <ProjectMedia
                  project={project}
                  shot={shot}
                  showVideo
                  className={project.video && shot === 0 ? undefined : "aspect-[4/3]"}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border/40 bg-[linear-gradient(180deg,#f7fafb,#ffffff)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <h2 className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] font-medium tracking-[-0.03em] text-foreground">
            Results
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {project.results.map((result) => (
              <li
                key={result}
                className="rounded-2xl border border-border/70 bg-surface p-5 text-sm leading-relaxed text-foreground/80"
              >
                {result}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            {project.projectUrl && (
              <Button href={project.projectUrl}>
                Visit project
                <ArrowUpRight size={16} aria-hidden />
              </Button>
            )}
            <Button
              href="#project-contact"
              variant={project.projectUrl ? "secondary" : "primary"}
            >
              Contact Us
            </Button>
            <Button href="/portfolio#projects" variant="secondary">
              Back to portfolio
            </Button>
          </div>
        </div>
      </section>

      <section
        id="project-contact"
        className="scroll-mt-20 bg-[linear-gradient(120deg,#0f766e_0%,#0d635c_48%,#124e57_100%)] text-white"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:px-10 lg:py-20">
          <div className="max-w-xl">
            <h2 className="font-serif text-[clamp(2rem,3.8vw,3rem)] font-medium tracking-[-0.03em]">
              {portfolioCta.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              {portfolioCta.body}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={portfolioCta.primary.href}>{portfolioCta.primary.label}</Button>
            <Button
              href="#contact"
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

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-light">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
