"use client";

import { useCallback, useEffect, useState } from "react";

type Slide = {
  id: string;
  title: string;
  description: string;
  href: string;
  accent: "teal" | "sky" | "slate";
};

const slides: Slide[] = [
  {
    id: "pipeline",
    title: "Talent Pipeline",
    description:
      "Visualize every hiring stage, move candidates with clarity, and keep teams aligned from apply to offer.",
    href: "/products",
    accent: "teal",
  },
  {
    id: "screening",
    title: "Screening Workspace",
    description:
      "Score applicants against role criteria, surface the strongest fits, and move faster with structured reviews.",
    href: "/products",
    accent: "sky",
  },
  {
    id: "insights",
    title: "Hiring Insights",
    description:
      "Know which roles are stalling, where talent pools are strongest, and what needs attention next.",
    href: "/products",
    accent: "slate",
  },
  {
    id: "enquiry",
    title: "Enquiry Hub",
    description:
      "Capture interest, route demos, and guide prospects through product discovery without losing context.",
    href: "#demo",
    accent: "teal",
  },
  {
    id: "roles",
    title: "Role Workspace",
    description:
      "Create briefs, scorecards, and hiring plans in one place designed for clearer, faster decisions.",
    href: "#solutions",
    accent: "sky",
  },
  {
    id: "subscription",
    title: "Subscription Module",
    description:
      "Configure plans, track renewals, and control entitlements so every customer stays on the right subscription.",
    href: "/products",
    accent: "slate",
  },
];

const AUTO_MS = 4500;
const CARD_STEP = 340; // card width + gap

export function AgentCarousel() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const count = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % count) + count) % count);
    },
    [count],
  );

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((i) => (i + dir + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [playing, go]);

  return (
    <section className="carousel-band relative overflow-hidden border-t border-border/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            Product suite
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Built for every stage of structured hiring
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => {
              setPlaying(false);
              go(-1);
            }}
            className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/10 bg-surface text-foreground shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:left-1 sm:h-12 sm:w-12 lg:left-0"
          >
            <Chevron direction="prev" />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={() => {
              setPlaying(false);
              go(1);
            }}
            className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/10 bg-surface text-foreground shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:right-1 sm:h-12 sm:w-12 lg:right-0"
          >
            <Chevron direction="next" />
          </button>

          <div className="overflow-hidden px-10 py-8 sm:px-16 lg:px-20">
            <div
              className="flex items-stretch will-change-transform"
              style={{
                gap: "1.25rem",
                transform: `translateX(calc(50% - ${CARD_STEP / 2}px - ${active * CARD_STEP}px))`,
                transition:
                  "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {slides.map((slide, index) => {
                const distance = Math.abs(index - active);
                const isActive = index === active;

                return (
                  <div
                    key={slide.id}
                    className="w-[320px] max-w-[78vw] shrink-0"
                    style={{
                      opacity: isActive ? 1 : distance === 1 ? 0.55 : 0.28,
                      transform: isActive
                        ? "scale(1.06)"
                        : distance === 1
                          ? "scale(0.92)"
                          : "scale(0.86)",
                      transition:
                        "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s ease",
                      zIndex: isActive ? 10 : 1,
                    }}
                  >
                    <article
                      role="button"
                      tabIndex={0}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => {
                        if (!isActive) {
                          setPlaying(false);
                          goTo(index);
                        }
                      }}
                      onKeyDown={(e) => {
                        if ((e.key === "Enter" || e.key === " ") && !isActive) {
                          e.preventDefault();
                          setPlaying(false);
                          goTo(index);
                        }
                      }}
                      className={`flex h-full flex-col rounded-[1.75rem] p-5 sm:p-6 ${
                        isActive
                          ? "bg-surface shadow-[0_22px_50px_-20px_rgba(12,22,32,0.28)]"
                          : "cursor-pointer bg-surface/60 shadow-sm"
                      }`}
                    >
                      <CardVisual accent={slide.accent} active={isActive} />

                      <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">
                        {slide.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                        {slide.description}
                      </p>

                      <div
                        className={`mt-5 overflow-hidden transition-all duration-500 ${
                          isActive
                            ? "max-h-8 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <a
                          href={slide.href}
                          className="inline-block text-sm font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Learn more
                        </a>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label={playing ? "Pause autoplay" : "Play autoplay"}
            onClick={() => setPlaying((p) => !p)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-surface/80 text-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:bg-surface"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to ${slide.title}`}
                onClick={() => {
                  setPlaying(false);
                  goTo(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Chevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={direction === "next" ? "rotate-180" : ""}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function CardVisual({
  accent,
  active,
}: {
  accent: Slide["accent"];
  active: boolean;
}) {
  const tones = {
    teal: {
      panel: "bg-primary-soft",
      chip: "bg-primary text-white",
      soft: "bg-pipeline-lavender",
      line: "bg-primary/20",
    },
    sky: {
      panel: "bg-[#e8f2f8]",
      chip: "bg-[#0e7490] text-white",
      soft: "bg-pipeline-mint",
      line: "bg-[#0e7490]/20",
    },
    slate: {
      panel: "bg-surface-soft",
      chip: "bg-foreground text-background",
      soft: "bg-pipeline-grey",
      line: "bg-foreground/12",
    },
  }[accent];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${tones.panel} p-4 ${
        active ? "min-h-[148px]" : "min-h-[132px]"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-md px-2.5 py-1 text-[10px] font-semibold ${tones.chip}`}
        >
          View pipeline
        </span>
        <span className="rounded-md bg-surface/80 px-2 py-1 text-[10px] font-medium text-muted">
          + Add role
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className={`h-2.5 w-[80%] rounded-full ${tones.line}`} />
        <div className={`h-2.5 w-[58%] rounded-full ${tones.line}`} />
      </div>

      <div className="mt-4 flex gap-2">
        <div className={`h-10 flex-1 rounded-lg ${tones.soft}`} />
        <div className={`h-10 w-10 rounded-lg ${tones.soft} opacity-70`} />
      </div>

      <div
        className={`absolute bottom-3 right-3 h-6 w-6 rounded-full border-2 border-surface bg-primary/25 shadow-sm transition-transform duration-500 ${
          active ? "scale-110" : "scale-90 opacity-70"
        }`}
        aria-hidden
      />
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
    </svg>
  );
}
