"use client";

import Link from "next/link";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchPublicCatalog, type CatalogApplication } from "@/lib/subscription";
import {
  accessProduct,
  externalRefForEmail,
  getTenantSession,
  openLaunchUrl,
  resolveLaunchUrl,
  saveTenantSession,
} from "@/lib/tenantAuth";

function LoginForm() {
  const searchParams = useSearchParams();
  const presetApp = searchParams.get("application") || "";

  const [apps, setApps] = useState<CatalogApplication[]>([]);
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [application, setApplication] = useState(presetApp);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const session = getTenantSession();
    if (session) {
      setEmail(session.email);
      setCompanyName(session.companyName);
    }
  }, []);

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

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);

    try {
      const externalRef = externalRefForEmail(email);
      const access = await accessProduct({
        application,
        email: email.trim(),
        externalRef,
        companyName: companyName.trim(),
        provision: true,
      });

      saveTenantSession({
        email: access.email || email.trim(),
        companyName: access.company_name || companyName.trim(),
        externalRef: access.external_ref || externalRef,
        tenantId: access.tenant_id,
      });

      if (!access.access_granted) {
        setError(
          "No active subscription for this product. Register with a plan first, or pick another application.",
        );
        return;
      }

      const app = apps.find((a) => a.application_code === application);
      const launchUrl = resolveLaunchUrl(access, app);

      if (!launchUrl) {
        setInfo(
          access.login?.message ||
            "Access granted, but this product has no app URL configured yet. Set app_base_url in Subscription Module admin.",
        );
        return;
      }

      if (access.login?.temporary_password) {
        setInfo(
          `Opening ${access.application_name}… Check your email for login credentials if this is your first provision.`,
        );
      }

      openLaunchUrl(launchUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          Application login
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
          Sign in to your product
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Uses Subscription Module tenant access (same flow as Prime Nova). You
          will be redirected to the selected application.
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
      {info && (
        <div
          role="status"
          className="rounded-lg border border-primary/20 bg-primary-soft px-4 py-3 text-sm text-foreground"
        >
          {info}
        </div>
      )}

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
          Company name{" "}
          <span className="font-normal text-muted">(optional)</span>
        </span>
        <input
          type="text"
          autoComplete="organization"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Application</span>
        <select
          required
          value={application}
          onChange={(e) => setApplication(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
        >
          {apps.length === 0 && <option value="">Loading applications…</option>}
          {apps.map((app) => (
            <option key={app.application_code} value={app.application_code}>
              {app.name} ({app.application_code})
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        disabled={submitting || !application}
        className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Signing in…" : "Sign in to application"}
      </button>

      <p className="text-center text-sm text-muted">
        New here?{" "}
        <Link
          href={
            application
              ? `/register?application=${encodeURIComponent(application)}`
              : "/register"
          }
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}

export function LoginPageContent() {
  return (
    <Suspense
      fallback={
        <div className="h-64 animate-pulse rounded-xl bg-surface-soft" />
      }
    >
      <LoginForm />
    </Suspense>
  );
}
