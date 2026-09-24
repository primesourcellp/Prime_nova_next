"use client";

import Image from "next/image";
import { useState } from "react";

type Panel = {
  id: string;
  caption: string;
  detail: string;
  image: string;
  imageAlt: string;
  overlay: "pipeline" | "calendar" | "ai";
};

const panels: Panel[] = [
  {
    id: "data",
    caption: "All your hiring data, right at your fingertips.",
    detail:
      "See candidates, roles, and pipeline activity in one live view — so every decision starts with clear context.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Hiring manager reviewing candidates on a phone",
    overlay: "pipeline",
  },
  {
    id: "aligned",
    caption: "Recruiting, screening, and offers — finally on the same page.",
    detail:
      "Keep talent, hiring managers, and leadership aligned with shared stages, scorecards, and next steps.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Professional smiling during a collaboration meeting",
    overlay: "calendar",
  },
  {
    id: "control",
    caption: "Technology you control. Hiring you can trust.",
    detail:
      "Structure every stage with product-focused tools designed for clarity — not black-box decisions.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Team working together on laptops",
    overlay: "ai",
  },
];

export function ExpandingPanels() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-border/70 bg-background"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            In practice
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Hover to explore how PRIMENOVA fits your hiring flow
          </h2>
        </div>

        {/* Desktop / tablet: horizontal expand */}
        <div
          className="hidden h-[520px] gap-2 overflow-hidden rounded-2xl md:flex lg:h-[580px]"
          onMouseLeave={() => setActive(0)}
        >
          {panels.map((panel, index) => {
            const expanded = active === index;

            return (
              <article
                key={panel.id}
                onMouseEnter={() => setActive(index)}
                className={`group relative min-w-0 cursor-pointer overflow-hidden rounded-xl transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  expanded ? "flex-[3.2]" : "flex-[1]"
                }`}
              >
                <Image
                  src={panel.image}
                  alt={panel.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  className={`object-cover transition-transform duration-700 ease-out ${
                    expanded ? "scale-105" : "scale-100"
                  }`}
                  priority={index === 0}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

                <div
                  className={`absolute inset-x-0 top-[12%] flex justify-center px-4 transition-all duration-500 ${
                    expanded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0 pointer-events-none"
                  }`}
                >
                  <PanelOverlay type={panel.overlay} />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7">
                  <p className="font-serif text-[1.35rem] leading-snug text-white lg:text-[1.65rem]">
                    {panel.caption}
                  </p>
                  <p
                    className={`mt-3 max-w-md text-sm leading-relaxed text-white/80 transition-all duration-500 ${
                      expanded
                        ? "max-h-24 opacity-100"
                        : "max-h-0 overflow-hidden opacity-0"
                    }`}
                  >
                    {panel.detail}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile: tap to expand stacked */}
        <div className="flex flex-col gap-3 md:hidden">
          {panels.map((panel, index) => {
            const expanded = active === index;

            return (
              <article
                key={panel.id}
                onClick={() => setActive(index)}
                className={`relative overflow-hidden rounded-xl transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  expanded ? "h-[420px]" : "h-[160px]"
                }`}
              >
                <Image
                  src={panel.image}
                  alt={panel.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div
                  className={`absolute inset-x-0 top-8 flex justify-center px-4 transition-opacity duration-500 ${
                    expanded ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <PanelOverlay type={panel.overlay} />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-serif text-xl leading-snug text-white">
                    {panel.caption}
                  </p>
                  <p
                    className={`mt-2 text-sm leading-relaxed text-white/80 transition-all duration-500 ${
                      expanded
                        ? "max-h-28 opacity-100"
                        : "max-h-0 overflow-hidden opacity-0"
                    }`}
                  >
                    {panel.detail}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PanelOverlay({ type }: { type: Panel["overlay"] }) {
  return (
    <div className="relative w-full max-w-[280px]">
      <div className="overflow-hidden rounded-2xl border border-white/40 bg-white/85 p-4 shadow-2xl backdrop-blur-md">
        {type === "pipeline" && (
          <>
            <div className="flex gap-3 border-b border-foreground/10 pb-2 text-[10px] font-semibold text-muted">
              <span className="text-foreground">Pipeline</span>
              <span>Candidates</span>
              <span>Roles</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-2 w-[80%] rounded-full bg-primary/20" />
              <div className="h-2 w-[60%] rounded-full bg-primary/15" />
              <div className="mt-3 flex gap-2">
                <div className="h-8 flex-1 rounded-lg bg-pipeline-lavender" />
                <div className="h-8 flex-1 rounded-lg bg-pipeline-mint" />
              </div>
            </div>
          </>
        )}

        {type === "calendar" && (
          <>
            <p className="text-[11px] font-bold text-foreground">
              Interview schedule
            </p>
            <div className="mt-3 grid grid-cols-4 gap-1.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-7 rounded-md ${
                    i === 2 || i === 5
                      ? "bg-primary/25"
                      : "bg-surface-soft"
                  }`}
                />
              ))}
            </div>
            <div className="mt-3 rounded-lg bg-primary/10 px-2.5 py-2 text-[10px] font-medium text-foreground">
              Screening · Today 2:00 PM
            </div>
          </>
        )}

        {type === "ai" && (
          <>
            <p className="text-[11px] font-bold text-foreground">
              Decision summary
            </p>
            <div className="mt-3 space-y-2">
              <div className="rounded-lg bg-primary-soft px-2.5 py-2 text-[10px] text-foreground">
                Scorecard aligned · 4/5 criteria met
              </div>
              <div className="rounded-lg bg-surface-soft px-2.5 py-2 text-[10px] text-muted">
                Next step: panel interview
              </div>
            </div>
          </>
        )}
      </div>

      <div
        className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/90 text-foreground shadow-lg"
        aria-hidden
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}
