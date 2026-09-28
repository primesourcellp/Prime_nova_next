"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  portfolioCategories,
  projectPath,
  type PortfolioCategory,
  type PortfolioProject,
} from "@/data/portfolio";
import { ProjectMedia } from "./ProjectVisual";

export function ProjectCatalog({ projects }: { projects: PortfolioProject[] }) {
  const [category, setCategory] = useState<PortfolioCategory>("All");

  const visible = useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((project) =>
            (project.categories ?? [project.category]).includes(category),
          ),
    [category, projects],
  );

  return (
    <section
      id="projects"
      className="scroll-mt-20 border-b border-border/40 bg-[linear-gradient(180deg,#f7fafb_0%,#ffffff_42%,#f3f6f7_100%)]"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Projects
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.85rem,3.2vw,2.6rem)] font-medium tracking-[-0.03em] text-foreground">
              Work across products and industries
            </h2>
          </div>
          <p className="text-sm tabular-nums text-muted">
            {visible.length} {visible.length === 1 ? "project" : "projects"}
          </p>
        </div>

        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap"
          role="group"
          aria-label="Filter projects by category"
        >
          {portfolioCategories.map((item) => {
            const selected = item === category;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  selected
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-surface text-foreground/80 hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="mt-12 text-sm text-muted">
            No projects in this category yet.
          </p>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const href = projectPath(project);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-[0_10px_30px_-24px_rgba(12,22,32,0.45)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(12,22,32,0.4)]">
      <div className="overflow-hidden">
        <ProjectMedia
          project={project}
          className="aspect-[16/10] transition duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
            {(project.categories ?? [project.category]).join(" · ")}
          </p>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="mt-3 font-serif text-2xl font-medium tracking-[-0.03em] text-foreground">
          <Link href={href} className="transition-colors hover:text-primary">
            {project.projectName}
          </Link>
        </h3>
        <p className="mt-1 text-[12px] font-medium text-muted">{project.industry}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {project.shortDescription}
        </p>
        {project.technologies.length > 0 && (
          <p className="mt-4 text-[12px] font-medium tracking-wide text-foreground/75">
            {project.technologies.join(" | ")}
          </p>
        )}
        <Link
          href={href}
          className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          View Project
          <ArrowUpRight size={16} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: PortfolioProject["status"] }) {
  const ongoing = status === "Ongoing";
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${
        ongoing
          ? "bg-[#f8f1e3] text-[#7a5b24]"
          : "bg-primary-soft text-primary"
      }`}
    >
      {status}
    </span>
  );
}
