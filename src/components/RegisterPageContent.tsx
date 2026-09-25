"use client";

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

export type RegisterFormProps = {
  presetApplication?: string;
  presetPlan?: string;
  presetBilling?: "MONTHLY" | "YEARLY";
  lockApplication?: boolean;
  embedded?: boolean;
  onClose?: () => void;
  className?: string;
};

const fieldClass =
  "mt-2 w-full border-0 border-b border-border/80 bg-transparent px-0 py-2.5 text-[15px] text-foreground outline-none transition placeholder:text-muted-light focus:border-primary";

function RegisterForm({
  presetApplication: presetAppProp,
  presetPlan: presetPlanProp,
  presetBilling,
  lockApplication = false,
  embedded = false,
  onClose,
  className = "",
}: RegisterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const presetApp = presetAppProp ?? searchParams.get("application") ?? "";
  const presetPlan = presetPlanProp ?? searchParams.get("plan") ?? "";

  const [apps, setApps] = useState<CatalogApplication[]>([]);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [application, setApplication] = useState(presetApp);
  const [planCode, setPlanCode] = useState(presetPlan);
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY">(
    presetBilling ?? "MONTHLY",
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

  useEffect(() => {
    if (presetBilling) setBillingCycle(presetBilling);
  }, [presetBilling]);

  const selectedApp = useMemo(
    () => apps.find((a) => a.application_code === application),
    [apps, application],
  );

  const selectedPlan = useMemo(
    () => selectedApp?.plans.find((p) => p.code === planCode),
    [selectedApp, planCode],
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
      if (!fullName.trim()) {
        setError("Full name is required.");
        return;
      }
      if (!companyName.trim()) {
        setError("Company name is required.");
        return;
      }
      if (!email.trim()) {
        setError("Work email is required.");
        return;
      }
      if (!phone.trim()) {
        setError("Phone number is required.");
        return;
      }

      const externalRef = externalRefForEmail(email);
      const hasPlan = Boolean(application && planCode);

      const result = await registerTenant({
        companyName: companyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
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
        result.application_code ||
        application ||
        selectedApp?.application_code ||
        "";

      saveRegisterSuccess({
        fullName: fullName.trim(),
        companyName: result.company_name || companyName.trim(),
        email: result.email || email.trim(),
        phone: phone.trim(),
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

  const canSubmit =
    Boolean(fullName.trim()) &&
    Boolean(companyName.trim()) &&
    Boolean(email.trim()) &&
    Boolean(phone.trim()) &&
    !submitting;

  return (
    <form onSubmit={onSubmit} className={`relative ${className}`}>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close register form"
          className="absolute -top-1 right-0 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          Close
        </button>
      )}

      <header className={onClose ? "pr-14" : undefined}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          Get started
        </p>
        <h2
          className={`mt-2 font-serif font-medium tracking-[-0.03em] text-foreground ${
            embedded
              ? "text-[clamp(1.65rem,2.8vw,2.1rem)]"
              : "text-[clamp(1.9rem,3.6vw,2.5rem)]"
          }`}
        >
          Create your{" "}
          <span className="italic text-teal">account</span>
        </h2>
      </header>

      {(selectedApp || selectedPlan) && (
        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          {selectedApp && (
            <span className="font-medium text-foreground">
              {selectedApp.name}
            </span>
          )}
          {selectedApp && selectedPlan && (
            <span className="text-border" aria-hidden>
              ·
            </span>
          )}
          {selectedPlan && (
            <span>
              {selectedPlan.name}
              {billingCycle === "YEARLY" ? " · Yearly" : " · Monthly"}
            </span>
          )}
        </p>
      )}

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-lg border border-red-200/80 bg-red-50/80 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </div>
      )}

      <section className="mt-8 space-y-6">
        {!lockApplication && (
          <label className="block">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
              Application
            </span>
            <select
              value={application}
              onChange={(e) => setApplication(e.target.value)}
              className={`${fieldClass} cursor-pointer`}
            >
              {apps.length === 0 && <option value="">Loading…</option>}
              {apps.map((app) => (
                <option key={app.application_code} value={app.application_code}>
                  {app.name}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
              Full name
            </span>
            <input
              type="text"
              required
              autoComplete="name"
              placeholder="Alex Morgan"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={fieldClass}
            />
          </label>

          <label className="block">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
              Company
            </span>
            <input
              type="text"
              required
              autoComplete="organization"
              placeholder="Acme Hiring Ltd"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={fieldClass}
            />
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
              Work email
            </span>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
          </label>

          <label className="block">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
              Phone
            </span>
            <input
              type="tel"
              required
              autoComplete="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={fieldClass}
            />
          </label>
        </div>
      </section>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-55"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>
        <p className="text-xs leading-relaxed text-muted sm:max-w-[14rem] sm:text-right">
          We’ll set up your workspace and open the product when you’re ready.
        </p>
      </div>
    </form>
  );
}

export function RegisterPageContent(props: RegisterFormProps = {}) {
  return (
    <Suspense
      fallback={
        <div className="h-72 animate-pulse rounded-2xl bg-surface-soft/60" />
      }
    >
      <RegisterForm {...props} />
    </Suspense>
  );
}
