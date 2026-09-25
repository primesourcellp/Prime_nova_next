"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { PlanComparison } from "./PlanComparison";
import { RegisterPageContent } from "./RegisterPageContent";
import {
  type CatalogApplication,
  fetchApplicationByCode,
  formatMoney,
} from "@/lib/subscription";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "notfound" }
  | { status: "ready"; application: CatalogApplication };

export function ProductDetailContent({ code }: { code: string }) {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const registerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetchApplicationByCode(code)
      .then((application) => {
        if (cancelled) return;
        if (!application) {
          setState({ status: "notfound" });
          return;
        }
        setState({ status: "ready", application });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState({
          status: "error",
          message:
            err instanceof Error ? err.message : "Unable to load product",
        });
      });
    return () => {
      cancelled = true;
    };
  }, [code]);

  useEffect(() => {
    if (!selectedPlan || !registerRef.current) return;
    registerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedPlan]);

  const openRegister = (planCode: string) => {
    setSelectedPlan(planCode);
  };

  return (
    <section className="border-b border-border/70 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <Reveal>
          <Link
            href="/products"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            ← All products
          </Link>
        </Reveal>

        {state.status === "loading" && (
          <div className="mt-10 space-y-6">
            <div className="h-10 w-64 animate-pulse rounded bg-surface-soft" />
            <div className="h-6 w-full max-w-xl animate-pulse rounded bg-surface-soft" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-xl border border-border bg-surface"
                />
              ))}
            </div>
          </div>
        )}

        {state.status === "error" && (
          <div className="mt-10 rounded-xl border border-border bg-surface px-6 py-8">
            <p className="text-sm font-semibold text-foreground">
              Couldn’t load this product
            </p>
            <p className="mt-2 text-sm text-muted">{state.message}</p>
          </div>
        )}

        {state.status === "notfound" && (
          <div className="mt-10 rounded-xl border border-border bg-surface px-6 py-8">
            <p className="text-sm font-semibold text-foreground">
              Product not found
            </p>
            <p className="mt-2 text-sm text-muted">
              No active application matched{" "}
              <code className="rounded bg-surface-soft px-1.5 py-0.5 text-xs">
                {code}
              </code>
              .
            </p>
            <Link
              href="/products"
              className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Back to products
            </Link>
          </div>
        )}

        {state.status === "ready" && (
          <>
            <Reveal className="mt-8 max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {state.application.application_code}
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                {state.application.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                {state.application.plans.length > 0
                  ? `Choose a plan for ${state.application.name}. Pricing and features are loaded live from the Subscription Module.`
                  : `${state.application.name} is in the catalog. Publish active plans in Subscription Module to show pricing here.`}
              </p>
            </Reveal>

            {state.application.plans.length > 0 && (
              <>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <div className="inline-flex rounded-lg border border-border bg-surface p-1">
                    <button
                      type="button"
                      onClick={() => setBilling("monthly")}
                      className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
                        billing === "monthly"
                          ? "bg-primary text-white"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBilling("yearly")}
                      className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
                        billing === "yearly"
                          ? "bg-primary text-white"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      Yearly
                    </button>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {state.application.plans.map((plan, index) => {
                    const price =
                      billing === "monthly"
                        ? plan.monthly_price
                        : plan.yearly_price;
                    const period = billing === "monthly" ? "/mo" : "/yr";
                    const isSelected = selectedPlan === plan.code;

                    return (
                      <Reveal
                        key={plan.id}
                        as="article"
                        delay={index * 80}
                        className={`flex flex-col rounded-xl border bg-surface p-6 transition-colors duration-300 ${
                          isSelected
                            ? "border-primary shadow-[0_12px_32px_-20px_rgba(15,118,110,0.35)]"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        <h2 className="text-lg font-bold text-foreground">
                          {plan.name}
                        </h2>
                        {plan.description ? (
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            {plan.description}
                          </p>
                        ) : null}

                        <p className="mt-5 flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold tracking-tight text-foreground">
                            {formatMoney(price, plan.currency)}
                          </span>
                          <span className="text-sm text-muted">{period}</span>
                        </p>

                        {plan.trial_days > 0 && (
                          <p className="mt-2 text-xs font-medium text-primary">
                            {plan.trial_days}-day trial
                          </p>
                        )}

                        <ul className="mt-6 flex-1 space-y-2.5">
                          {plan.features.map((feature) => (
                            <li
                              key={feature.feature_code}
                              className="flex gap-2.5 text-sm text-muted"
                            >
                              <span
                                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white"
                                aria-hidden
                              >
                                <svg
                                  width="11"
                                  height="11"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M20 6 9 17l-5-5" />
                                </svg>
                              </span>
                              <span>
                                {feature.name}
                                {feature.limit_value != null
                                  ? ` · ${feature.limit_value}`
                                  : ""}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8">
                          <button
                            type="button"
                            onClick={() => openRegister(plan.code)}
                            className={`inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 ease-out ${
                              isSelected
                                ? "bg-primary text-white shadow-sm shadow-primary/20"
                                : "bg-primary text-white shadow-sm shadow-primary/20 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md hover:shadow-primary/25 active:translate-y-0"
                            }`}
                          >
                            {isSelected ? "Selected" : "Get started"}
                          </button>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>

                {selectedPlan && (
                  <div
                    ref={registerRef}
                    id="register"
                    className="mt-14 scroll-mt-24 border-t border-border/50 bg-[linear-gradient(180deg,#f7fafb_0%,#ffffff_55%,#f3f6f7_100%)]"
                  >
                    <div className="mx-auto max-w-2xl px-1 py-12 sm:py-14">
                      <RegisterPageContent
                        key={`${state.application.application_code}-${selectedPlan}-${billing}`}
                        presetApplication={
                          state.application.application_code
                        }
                        presetPlan={selectedPlan}
                        presetBilling={
                          billing === "yearly" ? "YEARLY" : "MONTHLY"
                        }
                        lockApplication
                        embedded
                        onClose={() => setSelectedPlan(null)}
                      />
                    </div>
                  </div>
                )}

                <PlanComparison
                  plans={state.application.plans}
                  applicationCode={state.application.application_code}
                  billing={billing}
                  onSelectPlan={openRegister}
                />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
