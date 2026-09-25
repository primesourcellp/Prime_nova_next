"use client";

import Link from "next/link";
import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchPublicCatalog, type CatalogApplication } from "@/lib/subscription";
import {
  externalRefForEmail,
  registerTenant,
  resolveRegisterLaunchUrl,
  saveRegisterSuccess,
  saveTenantSession,
} from "@/lib/tenantAuth";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const presetApp = searchParams.get("application") || "";
  const presetPlan = searchParams.get("plan") || "";

  const [apps, setApps] = useState<CatalogApplication[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [application, setApplication] = useState(presetApp);
  const [planCode, setPlanCode] = useState(presetPlan);
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY">(
    "MONTHLY",
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchPublicCatalog()
      .then((list) => {
        if (cancelled) return;
        setApps(list);
        if (!presetApp && list[0]) {
          setApplication(list[0].application_code);
        }
      })
      .catch(() => {
        if (!cancelled) setApps([]);
      });
    return () => {
      cancelled = true;
    };
  }, [presetApp]);

  useEffect(() => {
    if (presetApp) setApplication(presetApp);
  }, [presetApp]);

  useEffect(() => {
    if (presetPlan) setPlanCode(presetPlan);
  }, [presetPlan]);

  const selectedApp = useMemo(
    () => apps.find((a) => a.application_code === application),
    [apps, application],
  );

  useEffect(() => {
    if (!selectedApp) return;
    if (planCode && selectedApp.plans.some((p) => p.code === planCode)) {
      return;
    }
    setPlanCode(selectedApp.plans[0]?.code || "");
  }, [selectedApp, planCode]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const externalRef = externalRefForEmail(email);
      const hasPlan = Boolean(application && planCode);

      const result = await registerTenant({
        companyName: companyName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        externalRef,
        application: hasPlan ? application : undefined,
        planCode: hasPlan ? planCode : undefined,
        billingCycle: hasPlan ? billingCycle : undefined,
        startTrial: hasPlan ? true : undefined,
      });

      saveTenantSession({
        email: result.email || email.trim(),
        companyName: result.company_name || companyName.trim(),
        externalRef: result.external_ref || externalRef,
        tenantId: result.tenant_id,
      });

      const launchUrl = resolveRegisterLaunchUrl(result, selectedApp);
      const applicationCode =
        result.application_code || application || selectedApp?.application_code || "";

      saveRegisterSuccess({
        companyName: result.company_name || companyName.trim(),
        email: result.email || email.trim(),
        applicationCode,
        applicationName: selectedApp?.name,
        planCode: result.plan_code,
        planName: result.plan_name,
        tenantId: result.tenant_id,
        launchUrl,
        login: result.login,
        created: result.created,
      });

      router.push("/register/success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          Create account
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
          Register for an application
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Creates a tenant in the Subscription Module (Prime Nova register
          flow). After register you continue to open the product app.
        </p>
      </header>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </div>
      )}

      <label className="block">
        <span className="text-sm font-medium text-foreground">Company name</span>
        <input
          type="text"
          required
          autoComplete="organization"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Email</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">
          Phone <span className="font-normal text-muted">(optional)</span>
        </span>
        <input
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Application</span>
        <select
          value={application}
          onChange={(e) => setApplication(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
        >
          {apps.length === 0 && <option value="">Loading…</option>}
          {apps.map((app) => (
            <option key={app.application_code} value={app.application_code}>
              {app.name} ({app.application_code})
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Plan</span>
        <select
          value={planCode}
          onChange={(e) => setPlanCode(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
        >
          {(selectedApp?.plans.length ?? 0) === 0 && (
            <option value="">No plans available</option>
          )}
          {selectedApp?.plans.map((plan) => (
            <option key={plan.code} value={plan.code}>
              {plan.name} ({plan.code})
            </option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend className="text-sm font-medium text-foreground">
          Billing cycle
        </legend>
        <div className="mt-2 flex gap-2">
          {(["MONTHLY", "YEARLY"] as const).map((cycle) => (
            <button
              key={cycle}
              type="button"
              onClick={() => setBillingCycle(cycle)}
              className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                billingCycle === cycle
                  ? "border-primary bg-primary text-white"
                  : "border-border text-muted hover:text-foreground"
              }`}
            >
              {cycle === "MONTHLY" ? "Monthly" : "Yearly"}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={submitting || !companyName || !email}
        className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Creating account…" : "Register & continue"}
      </button>

      <p className="text-center text-sm text-muted">
        Already registered?{" "}
        <Link
          href={
            application
              ? `/login?application=${encodeURIComponent(application)}`
              : "/login"
          }
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

export function RegisterPageContent() {
  return (
    <Suspense
      fallback={
        <div className="h-64 animate-pulse rounded-xl bg-surface-soft" />
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
