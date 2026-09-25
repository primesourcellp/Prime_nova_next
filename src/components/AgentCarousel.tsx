"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

const CARD_WIDTH = 260;
const CARD_GAP = 20;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
/** Start on Hiring Insights so left + right neighbors are both visible */
const INITIAL_INDEX = 2;
/** Viewport heights of scroll room per slide transition */
const SCROLL_VH_PER_SLIDE = 55;

export function AgentCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const landedRef = useRef(false);
  const [active, setActive] = useState(INITIAL_INDEX);
  const [progress, setProgress] = useState(INITIAL_INDEX);
  const [scrollLinked, setScrollLinked] = useState(true);
  const count = slides.length;

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const section = sectionRef.current;
      if (!section) return;

      const clamped = ((index % count) + count) % count;
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setActive(clamped);
        setProgress(clamped);
        return;
      }

      const top =
        section.offsetTop + (clamped / Math.max(1, count - 1)) * scrollable;
      window.scrollTo({ top, behavior });
    },
    [count],
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setScrollLinked(!reduced.matches);
    syncMotion();
    reduced.addEventListener("change", syncMotion);
    return () => reduced.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    if (!scrollLinked) {
      setActive(INITIAL_INDEX);
      setProgress(INITIAL_INDEX);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const snapToInitial = () => {
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setActive(INITIAL_INDEX);
        setProgress(INITIAL_INDEX);
        return;
      }
      const top =
        section.offsetTop +
        (INITIAL_INDEX / Math.max(1, count - 1)) * scrollable;
      window.scrollTo({ top, behavior: "auto" });
      setActive(INITIAL_INDEX);
      setProgress(INITIAL_INDEX);
    };

    const update = () => {
      frame = 0;
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = window.scrollY - section.offsetTop;

      // Still above the carousel — keep the centered initial composition
      if (scrolled < 0) {
        setProgress(INITIAL_INDEX);
        setActive(INITIAL_INDEX);
        return;
      }

      const raw = Math.min(1, Math.max(0, scrolled / scrollable));

      // First time the sticky section pins: land on middle (L + center + R)
      if (!landedRef.current) {
        landedRef.current = true;
        if (raw < 0.2) {
          snapToInitial();
          return;
        }
      }

      const slideProgress = raw * (count - 1);
      setProgress(slideProgress);
      setActive(Math.round(slideProgress));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [count, scrollLinked]);

  const translateIndex = scrollLinked ? progress : active;
  const sectionHeight = scrollLinked
    ? `${100 + (count - 1) * SCROLL_VH_PER_SLIDE}vh`
    : undefined;

  return (
    <section
      ref={sectionRef}
      className="carousel-band relative border-t border-border/40"
      style={sectionHeight ? { height: sectionHeight } : undefined}
    >
      <div
        className={
          scrollLinked
            ? "sticky top-0 flex min-h-screen items-center overflow-hidden"
            : "relative overflow-hidden"
        }
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Product suite
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.85rem,3.4vw,2.75rem)] font-medium tracking-[-0.03em] text-foreground">
              Built for every stage of{" "}
              <span className="text-teal">structured hiring</span>
            </h2>
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => scrollToIndex(active - 1)}
              className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/10 bg-surface text-foreground shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:left-1 sm:h-11 sm:w-11 lg:left-0"
            >
              <Chevron direction="prev" />
            </button>

            <button
              type="button"
              aria-label="Next slide"
              onClick={() => scrollToIndex(active + 1)}
              className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/10 bg-surface text-foreground shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:right-1 sm:h-11 sm:w-11 lg:right-0"
            >
              <Chevron direction="next" />
            </button>

            <div className="overflow-hidden px-8 py-8 sm:px-12 sm:py-10 lg:px-14">
              <div
                className="flex items-center will-change-transform"
                style={{
                  gap: `${CARD_GAP}px`,
                  transform: `translateX(calc(50% - ${CARD_STEP / 2}px - ${translateIndex * CARD_STEP}px))`,
                  transition: scrollLinked
                    ? undefined
                    : "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {slides.map((slide, index) => {
                  const distance = Math.abs(index - translateIndex);
                  const isActive = index === active;
                  // Neighbors readable but clearly recessed (matches reference)
                  const opacity =
                    distance < 0.5
                      ? 1
                      : distance < 1.5
                        ? 0.48
                        : Math.max(0.28, 1 - distance * 0.42);
                  const scale =
                    distance < 0.5
                      ? 1.03
                      : distance < 1.5
                        ? 0.9
                        : Math.max(0.84, 1.03 - distance * 0.12);

                  return (
                    <div
                      key={slide.id}
                      className="w-[260px] max-w-[72vw] shrink-0"
                      style={{
                        opacity,
                        transform: `scale(${scale})`,
                        transformOrigin: "center center",
                        transition: scrollLinked
                          ? undefined
                          : "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s ease",
                        zIndex: isActive
                          ? 10
                          : Math.max(1, 5 - Math.round(distance)),
                      }}
                    >
                      <article
                        role="button"
                        tabIndex={0}
                        aria-current={isActive ? "true" : undefined}
                        onClick={() => {
                          if (!isActive) scrollToIndex(index);
                        }}
                        onKeyDown={(e) => {
                          if (
                            (e.key === "Enter" || e.key === " ") &&
                            !isActive
                          ) {
                            e.preventDefault();
                            scrollToIndex(index);
                          }
                        }}
                        className={`flex min-h-[340px] flex-col rounded-[1.35rem] p-4 sm:min-h-[360px] sm:p-5 ${
                          isActive
                            ? "bg-surface shadow-[0_22px_48px_-18px_rgba(12,22,32,0.3)]"
                            : "cursor-pointer bg-[#e8eef0] shadow-[0_8px_24px_-16px_rgba(12,22,32,0.18)]"
                        }`}
                      >
                        <CardVisual accent={slide.accent} active={isActive} />

                        <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">
                          {slide.title}
                        </h3>
                        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">
                          {slide.description}
                        </p>

                        <a
                          href={slide.href}
                          className={`mt-4 inline-block text-sm font-semibold underline underline-offset-4 transition-colors ${
                            isActive
                              ? "text-foreground hover:text-primary"
                              : "pointer-events-none text-foreground/70"
                          }`}
                          onClick={(e) => {
                            if (!isActive) {
                              e.preventDefault();
                              return;
                            }
                            e.stopPropagation();
                          }}
                          tabIndex={isActive ? 0 : -1}
                          aria-hidden={!isActive}
                        >
                          Learn more
                        </a>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to ${slide.title}`}
                onClick={() => scrollToIndex(i)}
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
      width="16"
      height="16"
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
      className={`relative min-h-[112px] overflow-hidden rounded-xl ${tones.panel} p-3`}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <span
          className={`rounded-md px-2 py-1 text-[9px] font-semibold ${tones.chip}`}
        >
          View pipeline
        </span>
        <span className="rounded-md bg-surface/90 px-2 py-1 text-[9px] font-medium text-muted shadow-sm">
          + Add role
        </span>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className={`h-2 w-[78%] rounded-full ${tones.line}`} />
        <div className={`h-2 w-[54%] rounded-full ${tones.line}`} />
      </div>

      <div className="mt-3 flex gap-2">
        <div className={`h-8 flex-1 rounded-md ${tones.soft}`} />
        <div className={`h-8 w-8 rounded-md ${tones.soft} opacity-70`} />
      </div>

      <div
        className={`absolute bottom-2.5 right-2.5 h-5 w-5 rounded-full border-2 border-surface bg-primary/30 shadow-sm transition-transform duration-500 ${
          active ? "scale-110" : "scale-95 opacity-80"
        }`}
        aria-hidden
      />
    </div>
  );
}
