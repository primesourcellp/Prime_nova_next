"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import {
  type CatalogApplication,
  fetchPublicCatalog,
} from "@/lib/subscription";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; applications: CatalogApplication[] };

function planSummary(app: CatalogApplication): string {
  if (app.plans.length === 0) {
    return "Plans coming soon — product is registered in the catalog.";
  }
  return `${app.plans.length} plan${app.plans.length === 1 ? "" : "s"}: ${app.plans.map((p) => p.name).join(", ")}`;
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
              err instanceof Error
                ? err.message
                : "Unable to load products",
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="border-b border-border/70 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            Products
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Explore our product catalog
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Every product below is synced from the Subscription Module. Open a
            product to see live plans, pricing, and features.
          </p>
        </Reveal>

        {state.status === "loading" && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-xl border border-border bg-surface"
              />
            ))}
          </div>
        )}

        {state.status === "error" && (
          <div className="mt-14 rounded-xl border border-border bg-surface px-6 py-8">
            <p className="text-sm font-semibold text-foreground">
              Couldn’t load products
            </p>
            <p className="mt-2 text-sm text-muted">{state.message}</p>
          </div>
        )}

        {state.status === "ready" && state.applications.length === 0 && (
          <div className="mt-14 rounded-xl border border-border bg-surface px-6 py-8">
            <p className="text-sm text-muted">
              No active products found. Publish applications in the Subscription
              Module admin.
            </p>
          </div>
        )}

        {state.status === "ready" && state.applications.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {state.applications.map((app, index) => (
              <Reveal
                key={app.application_code}
                as="article"
                delay={index * 80}
                className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-primary/40"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-light">
                  {app.application_code}
                </p>
                <h2 className="mt-2 text-xl font-bold text-foreground">
                  {app.name}
                </h2>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                  {planSummary(app)}
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href={`/products/${encodeURIComponent(app.application_code)}`}
                    className="inline-flex text-sm font-semibold text-primary underline-offset-4 transition-colors group-hover:underline"
                  >
                    View product →
                  </Link>
                  <Link
                    href={`/login?application=${encodeURIComponent(app.application_code)}`}
                    className="inline-flex text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
