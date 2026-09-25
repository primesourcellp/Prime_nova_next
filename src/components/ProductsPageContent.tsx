"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import {
  type CatalogApplication,
  fetchPublicCatalog,
} from "@/lib/subscription";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; applications: CatalogApplication[] };

const accents = [
  "bg-pipeline-mint",
  "bg-primary-soft",
  "bg-pipeline-lavender",
  "bg-pipeline-grey",
] as const;

function planNames(app: CatalogApplication): string[] {
  return app.plans.map((p) => p.name);
}

function lowestPrice(app: CatalogApplication): string | null {
  if (app.plans.length === 0) return null;
  const prices = app.plans
    .map((p) => Number(p.monthly_price))
    .filter((n) => Number.isFinite(n));
  if (prices.length === 0) return null;
  const min = Math.min(...prices);
  const currency = app.plans[0]?.currency ?? "INR";
  try {
    return `From ${new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(min)}/mo`;
  } catch {
    return `From ${currency} ${min}/mo`;
  }
}

export function ProductsPageContent() {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetchPublicCatalog()
      .then((applications) => {
        if (!cancelled) setState({ status: "ready", applications });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            status: "error",
            message:
              err instanceof Error ? err.message : "Unable to load products",
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {/* Hero — one composition: brand, headline, line, CTAs, visual plane */}
      <section className="hero-atmosphere relative overflow-hidden border-b border-border/40">
        <div className="relative mx-auto grid max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
            <Reveal>
              <p className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-medium italic leading-none tracking-[-0.03em] text-teal">
                Primenova
              </p>
              <h1 className="mt-5 max-w-xl font-serif text-[clamp(2.35rem,5.2vw,3.85rem)] font-medium leading-[1.05] tracking-[-0.035em] text-foreground">
                Products for every stage of{" "}
                <span className="text-teal">structured hiring</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Live plans and pricing from the Subscription Module — pick a
                product and start hiring with clarity.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#catalog">Browse catalog</Button>
                <Button href="/#demo" variant="secondary">
                  Request a demo
                </Button>
              </div>
            </Reveal>
          </div>

          <div
            className="hero-visual-plane relative min-h-[280px] border-t border-border/30 lg:min-h-full lg:border-l lg:border-t-0"
            aria-hidden
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -right-8 top-[12%] h-40 w-40 rounded-full bg-teal/10 blur-2xl" />
              <div className="absolute bottom-[8%] left-[10%] h-32 w-48 rounded-full bg-[rgba(253,167,4,0.08)] blur-2xl" />
            </div>

            <div className="relative flex h-full items-center justify-center px-8 py-12 sm:px-12 lg:py-16">
              <div className="animate-gentle-float w-full max-w-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/45">
                  Catalog preview
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    { label: "Pipeline", tone: "bg-pipeline-mint", w: "72%" },
                    {
                      label: "Screening",
                      tone: "bg-primary-soft",
                      w: "58%",
                    },
                    {
                      label: "Insights",
                      tone: "bg-pipeline-lavender",
                      w: "84%",
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-3">
                      <span
                        className={`h-10 w-10 shrink-0 rounded-lg ${row.tone}`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground/80">
                          {row.label}
                        </p>
                        <div
                          className="mt-1.5 h-1.5 rounded-full bg-foreground/10"
                          style={{ width: row.w }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-end justify-between border-t border-foreground/10 pt-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-light">
                      Starting at
                    </p>
                    <p className="mt-1 font-serif text-2xl font-medium text-foreground">
                      Live pricing
                    </p>
                  </div>
                  <span className="mb-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-white">
                    →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog — one job: choose a product */}
      <section
        id="catalog"
        className="scroll-mt-20 border-b border-border/40 bg-[linear-gradient(180deg,#f7fafb_0%,#ffffff_55%,#f3f6f7_100%)]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                Catalog
              </p>
              <h2 className="mt-3 font-serif text-[clamp(1.85rem,3.2vw,2.5rem)] font-medium tracking-[-0.03em] text-foreground">
                Choose a <span className="text-teal">product</span>
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                Open a product for plans and features, or sign in if you already
                have access.
              </p>
            </div>
            {state.status === "ready" && state.applications.length > 0 && (
              <p className="shrink-0 text-sm tabular-nums text-muted">
                {String(state.applications.length).padStart(2, "0")} available
              </p>
            )}
          </Reveal>

          {state.status === "loading" && (
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border/60 bg-surface p-6"
                >
                  <div className="h-12 w-12 animate-pulse rounded-xl bg-surface-soft" />
                  <div className="mt-5 space-y-3">
                    <div className="h-3 w-20 animate-pulse rounded bg-surface-soft" />
                    <div className="h-6 w-40 animate-pulse rounded bg-surface-soft" />
                    <div className="h-3 w-full animate-pulse rounded bg-surface-soft" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-surface-soft" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {state.status === "error" && (
            <Reveal className="mt-14 border-t border-border pt-10">
              <p className="font-serif text-2xl font-medium tracking-tight text-foreground">
                Couldn’t load products
              </p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                {state.message}
              </p>
              <p className="mt-2 text-sm text-muted">
                Check that the Subscription Module API is running, then refresh.
              </p>
            </Reveal>
          )}

          {state.status === "ready" && state.applications.length === 0 && (
            <Reveal className="mt-14 border-t border-border pt-10">
              <p className="font-serif text-2xl font-medium tracking-tight text-foreground">
                No products published yet
              </p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                Publish applications in the Subscription Module admin to list
                them here.
              </p>
            </Reveal>
          )}

          {state.status === "ready" && state.applications.length > 0 && (
            <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {state.applications.map((app, index) => {
                const price = lowestPrice(app);
                const plans = planNames(app);

                return (
                  <Reveal
                    key={app.application_code}
                    as="li"
                    delay={index * 80}
                    className="group flex h-full"
                  >
                    <article className="flex h-full w-full flex-col rounded-2xl border border-border/70 bg-surface p-6 shadow-[0_12px_32px_-24px_rgba(12,22,32,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_18px_40px_-22px_rgba(12,22,32,0.28)] sm:p-7">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${accents[index % accents.length]}`}
                        aria-hidden
                      >
                        <span className="font-serif text-base font-medium text-foreground/75">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-light">
                        {app.application_code}
                      </p>
                      <h3 className="mt-1.5 font-serif text-[clamp(1.35rem,2vw,1.65rem)] font-medium tracking-[-0.02em] text-foreground transition-colors duration-300 group-hover:text-primary">
                        {app.name}
                      </h3>

                      {plans.length > 0 ? (
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                          <span className="text-foreground/70">
                            {plans.length} plan
                            {plans.length === 1 ? "" : "s"}
                          </span>
                          <span className="mx-2 text-border">·</span>
                          {plans.join(", ")}
                        </p>
                      ) : (
                        <p className="mt-3 flex-1 text-sm text-muted">
                          Plans coming soon
                        </p>
                      )}

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-5">
                        {price ? (
                          <p className="text-sm font-semibold tabular-nums text-foreground">
                            {price}
                          </p>
                        ) : (
                          <span />
                        )}
                        <div className="flex items-center gap-4">
                          <Link
                            href={`/products/${encodeURIComponent(app.application_code)}`}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-2.5 hover:underline"
                          >
                            View product
                            <span aria-hidden>→</span>
                          </Link>
                          <Link
                            href={`/login?application=${encodeURIComponent(app.application_code)}`}
                            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                          >
                            Sign in
                          </Link>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
