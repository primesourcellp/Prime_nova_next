"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import type { PortfolioProject } from "@/data/portfolio";
import { ProjectMedia } from "./ProjectVisual";

export function ScreenshotGallery({ project }: { project: PortfolioProject }) {
  const count = project.images.length > 0 ? project.images.length : 3;
  const shots = Array.from({ length: count }, (_, index) => index);
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setOpen((current) => {
        if (current === null || count === 0) return current;
        return (current + dir + count) % count;
      });
    },
    [count],
  );

  useEffect(() => {
    if (open === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  if (count === 0) return null;

  return (
    <>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shots.map((shot) => (
          <Reveal key={shot} as="li" delay={shot * 70}>
            <button
              type="button"
              onClick={() => setOpen(shot)}
              className="group block w-full overflow-hidden rounded-2xl border border-border/70 bg-surface text-left shadow-[0_10px_30px_-26px_rgba(12,22,32,0.45)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(12,22,32,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={`Open screenshot ${shot + 1} of ${project.projectName}`}
            >
              <ProjectMedia
                project={project}
                shot={shot}
                className="aspect-[4/3] transition duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </Reveal>
        ))}
      </ul>

      {open !== null && (
        <div
          className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-[#0c1620]/80 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.projectName} screenshot ${open + 1} of ${count}`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-foreground shadow-md transition duration-200 hover:scale-105"
            aria-label="Close screenshot"
          >
            <X size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-foreground shadow-md transition duration-200 hover:scale-105 sm:left-6"
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-foreground shadow-md transition duration-200 hover:scale-105 sm:right-6"
            aria-label="Next screenshot"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
          <div
            key={open}
            className="animate-float-in w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <ProjectMedia
              project={project}
              shot={open}
              className="aspect-[16/10] min-h-[220px] sm:min-h-[360px]"
            />
            <p className="px-4 py-3 text-center text-xs font-medium text-muted">
              {open + 1} / {count}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
