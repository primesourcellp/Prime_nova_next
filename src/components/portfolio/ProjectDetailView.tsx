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
import { Reveal } from "@/components/Reveal";
import type { FeatureIcon, PortfolioProject } from "@/data/portfolio";
import { ScrollFrame } from "@/components/ScrollFrame";
import { ProjectMedia } from "./ProjectVisual";
import { ScreenshotGallery } from "./ScreenshotGallery";

const featureIcons: Record<FeatureIcon, LucideIcon> = {
  users: Users,
  chart: BarChart3,
  shield: Shield,
  flow: Workflow,
  layers: Layers,
  search: Search,
};

export function ProjectDetailView({ project }: { project: PortfolioProject }) {
  const categories = project.categories ?? [project.category];
  const stack = (project.stack ?? []).filter((group) => group.items.length > 0);
  const facts = [
    ["Project type", categories.join(" · ")],
    ["Industry", project.industry],
    ["Development year", project.year],
    ["Duration", project.duration],
    [
      "Technology stack",
      project.technologies.length > 0 ? project.technologies.join(", ") : "",
    ],
    ["Project status", project.status],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <>
      <article className="border-b border-border/40 bg-[linear-gradient(180deg,#f7fafb_0%,#ffffff_36%)]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <Link
            href="/portfolio#projects"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} aria-hidden />
            All projects
          </Link>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.7fr)] lg:gap-14">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((category) => (
                  <p
                    key={category}
                    className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary"
                  >
                    {category}
                  </p>
                ))}
                {project.industry && (
                  <p className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                    {project.industry}
                  </p>
                )}
              </div>

              <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.035em] text-foreground">
                {project.projectName}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {project.shortDescription}
              </p>

              {project.technologies.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-[13px] font-medium text-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#project-contact">Contact Us</Button>
                {project.projectUrl && (
                  <Button href={project.projectUrl} variant="secondary">
                    Visit project
                    <ArrowUpRight size={16} aria-hidden />
                  </Button>
                )}
              </div>
            </Reveal>

            <Reveal
              delay={120}
              className="rounded-3xl border border-border/70 bg-surface p-6 shadow-[0_16px_40px_-30px_rgba(12,22,32,0.45)]"
            >
              <h2 className="font-serif text-xl font-medium tracking-[-0.02em] text-foreground">
                Project information
              </h2>
              <dl className="mt-5 space-y-4">
                {facts.map(([label, value]) => (
                  <div
                    key={label}
                    className="border-t border-border/70 pt-4 first:border-t-0 first:pt-0"
                  >
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-light">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-10">
          <Reveal className="overflow-hidden rounded-3xl border border-white/80 shadow-[0_24px_60px_-36px_rgba(12,22,32,0.45)]">
            <ScrollFrame>
              <ProjectMedia
                project={project}
                className="aspect-[16/8] min-h-[240px]"
              />
            </ScrollFrame>
          </Reveal>
        </div>
      </article>

      <section className="border-b border-border/40">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Overview
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.7rem,3vw,2.4rem)] font-medium tracking-[-0.03em] text-foreground">
              Project overview
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Reveal delay={60} className="h-full">
              <OverviewCard title="What the project is" body={project.description} />
            </Reveal>
            <Reveal delay={120} className="h-full">
              <OverviewCard
                title="Business purpose"
                body={project.shortDescription}
              />
            </Reveal>
            {project.audience && (
              <Reveal delay={180} className="h-full">
                <OverviewCard title="Who it is for" body={project.audience} />
              </Reveal>
            )}
            {project.objectives && project.objectives.length > 0 && (
              <Reveal
                delay={240}
                className="h-full rounded-2xl border border-border/70 bg-surface p-6"
              >
                <h3 className="font-serif text-xl font-medium tracking-[-0.02em] text-foreground">
                  Main objectives
                </h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                  {project.objectives.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-border/40 bg-surface">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:px-8 md:grid-cols-2 lg:px-10 lg:py-20">
          <Reveal className="rounded-2xl border border-border/70 bg-background p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Before
            </p>
            <h2 className="mt-3 font-serif text-2xl font-medium tracking-[-0.03em] text-foreground">
              Challenge
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              {project.challenge}
            </p>
          </Reveal>
          <Reveal
            delay={80}
            className="rounded-2xl border border-border/70 bg-[linear-gradient(180deg,#f7fafb,#ffffff)] p-6 sm:p-8"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              PrimeSource Consulting LLP
            </p>
            <h2 className="mt-3 font-serif text-2xl font-medium tracking-[-0.03em] text-foreground">
              Solution
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              {project.solution}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border/40">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Product
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.7rem,3vw,2.4rem)] font-medium tracking-[-0.03em] text-foreground">
              Key features
            </h2>
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.features.map((feature, index) => {
              const Icon = featureIcons[feature.icon];
              return (
                <Reveal
                  key={feature.title}
                  as="li"
                  delay={index * 70}
                  className="group rounded-2xl border border-border/70 bg-surface p-5 shadow-[0_10px_30px_-26px_rgba(12,22,32,0.5)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(12,22,32,0.35)]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary transition duration-300 group-hover:scale-105">
                    <Icon size={18} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-medium tracking-[-0.02em] text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {stack.length > 0 && (
        <section className="border-b border-border/40 bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                Build
              </p>
              <h2 className="mt-3 font-serif text-[clamp(1.7rem,3vw,2.4rem)] font-medium tracking-[-0.03em] text-foreground">
                Technology stack
              </h2>
            </Reveal>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stack.map((group, index) => (
                <Reveal
                  key={group.group}
                  as="li"
                  delay={index * 80}
                  className="rounded-2xl border border-border/70 bg-background p-5 transition duration-300 hover:-translate-y-0.5"
                >
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                    {group.group}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-b border-border/40">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Interface
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.7rem,3vw,2.4rem)] font-medium tracking-[-0.03em] text-foreground">
              Project screenshots
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Open a screen to view it larger. Use the arrows or keyboard to move
              between screens.
            </p>
          </Reveal>
          <ScreenshotGallery project={project} />
        </div>
      </section>

      <section className="border-b border-border/40 bg-[linear-gradient(180deg,#f7fafb,#ffffff)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Outcome
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.7rem,3vw,2.4rem)] font-medium tracking-[-0.03em] text-foreground">
              Results and business value
            </h2>
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {project.results.map((result, index) => (
              <Reveal
                key={result}
                as="li"
                delay={index * 80}
                className="rounded-2xl border border-border/70 bg-surface p-5 text-sm leading-relaxed text-foreground/80 transition duration-300 hover:-translate-y-0.5"
              >
                {result}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="project-contact"
        className="scroll-mt-20 bg-[linear-gradient(120deg,#0f766e_0%,#0d635c_48%,#124e57_100%)] text-white"
      >
        <Reveal className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:px-10 lg:py-20">
          <div className="max-w-xl">
            <h2 className="font-serif text-[clamp(2rem,3.8vw,3rem)] font-medium tracking-[-0.03em]">
              Have a similar project in mind?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              Let&apos;s build the right digital solution for your business.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/#demo">Start a Project</Button>
            <Button
              href="#contact"
              variant="secondary"
              className="!border-white/35 !bg-transparent !text-white hover:!border-white/60 hover:!bg-white/10"
            >
              Contact Us
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function OverviewCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="h-full rounded-2xl border border-border/70 bg-surface p-6 transition duration-300 hover:-translate-y-0.5">
      <h3 className="font-serif text-xl font-medium tracking-[-0.02em] text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
        {body}
      </p>
    </div>
  );
}
