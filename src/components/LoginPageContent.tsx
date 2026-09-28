"use client";

import Link from "next/link";
import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchPublicCatalog, type CatalogApplication } from "@/lib/subscription";
import {
  accessProduct,
  externalRefForEmail,
  getTenantSession,
  firstPlanFeaturePath,
  resolveLaunchUrl,
  saveTenantSession,
} from "@/lib/tenantAuth";

/** Ensure launch URL always carries email (+ password for ATS auto-login). */
function withDirectSignParams(
  launchUrl: string,
  options: {
    email: string;
    password?: string;
    tenantId?: number;
    application?: string;
    planCode?: string | null;
    nextPath?: string;
  },
): string {
  if (!launchUrl) return "";
  try {
    const url = new URL(launchUrl);
    if (options.email) url.searchParams.set("email", options.email.trim());
    if (options.password) {
      url.searchParams.set("password", options.password);
      url.searchParams.set("auto_login", "1");
    }
    if (options.tenantId) {
      url.searchParams.set("subscription_tenant_id", String(options.tenantId));
      url.searchParams.set("tenant_id", String(options.tenantId));
    }
    if (options.application) {
      url.searchParams.set("application", options.application);
    }
    if (options.planCode) {
      url.searchParams.set("plan", options.planCode);
    }
    if (options.nextPath) {
      url.searchParams.set("next", options.nextPath);
    }
    url.searchParams.set("from", "prime-nova");
    return url.toString();
  } catch {
    return launchUrl;
  }
}

const fieldClass =
  "mt-2 w-full border-0 border-b border-border/80 bg-transparent px-0 py-2.5 text-[15px] text-foreground outline-none transition placeholder:text-muted-light focus:border-primary";

/** Open a URL in a new tab with an anchor `target`, not the current tab. */
function openLinkInNewTab(url: string, tab: Window | null) {
  if (tab && !tab.closed) {
    tab.location.href = url;
    return;
  }
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function LoginForm() {
  const searchParams = useSearchParams();
  const presetApp = searchParams.get("application") || "";
  const presetEmail = searchParams.get("email") || "";

  const [apps, setApps] = useState<CatalogApplication[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [application, setApplication] = useState(presetApp);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const session = getTenantSession();
    if (presetEmail) setEmail(presetEmail);
    else if (session) setEmail(session.email);
    if (session) setCompanyName(session.companyName);
  }, [presetEmail]);

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

  const selectedApp = useMemo(
    () => apps.find((a) => a.application_code === application),
    [apps, application],
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);
    const productTab = window.open("about:blank", "_blank");

    try {
      if (!application) {
        productTab?.close();
        setError("Select an application to continue.");
        return;
      }
      if (!email.trim()) {
        productTab?.close();
        setError("Email is required.");
        return;
      }
      if (!password.trim()) {
        productTab?.close();
        setError(
          "Enter the password from your email to open your plan.",
        );
        return;
      }

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
        productTab?.close();
        setError(
          "No active subscription for this product. Register with a plan first, or pick another application.",
        );
        return;
      }

      const app = apps.find((a) => a.application_code === application);
      let launchUrl = resolveLaunchUrl(access, app);

      // Prefer provisioned temp password when present; otherwise use form password
      const productPassword =
        access.login?.temporary_password?.trim() || password.trim();

      launchUrl = withDirectSignParams(launchUrl, {
        email: access.email || email.trim(),
        password: productPassword,
        tenantId: access.tenant_id,
        application: access.application_code || application,
        planCode: access.plan_code,
        nextPath: firstPlanFeaturePath(access.feature_codes),
      });

      if (!launchUrl) {
        productTab?.close();
        setError(
          access.login?.message ||
            "Access granted, but this product has no app URL configured. Set app_base_url in Subscription Module admin.",
        );
        return;
      }

      if (
        access.login?.message &&
        /compilation|error|failed/i.test(access.login.message) &&
        !access.login.temporary_password
      ) {
        setInfo(
          "If the product does not open, restart the ATS backend and try again.",
        );
      }

      openLinkInNewTab(launchUrl, productTab);
    } catch (err) {
      productTab?.close();
      const message = err instanceof Error ? err.message : "Sign in failed.";
      if (/tenant not found/i.test(message)) {
        setError(
          "No account found for this email. Create an account first, then sign in.",
        );
      } else {
        setError(message);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <Link
        href="/products"
        className="absolute -top-1 right-0 text-sm font-medium text-muted transition-colors hover:text-foreground"
      >
        Close
      </Link>

      <header className="pr-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          Sign in
        </p>
        <h1 className="mt-2 font-serif text-[clamp(1.9rem,3.6vw,2.5rem)] font-medium tracking-[-0.03em] text-foreground">
          Sign in to your{" "}
          <span className="italic text-teal">account</span>
        </h1>
      </header>

      {selectedApp && (
        <p className="mt-4 text-sm text-muted">
          <span className="font-medium text-foreground">{selectedApp.name}</span>
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
      {info && (
        <div
          role="status"
          className="mt-5 rounded-lg border border-primary/20 bg-primary-soft px-4 py-3 text-sm text-foreground"
        >
          {info}
        </div>
      )}

      <section className="mt-8 space-y-6">
        <label className="block">
          <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
            Email
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
            Password
          </span>
          <input
            type="password"
            required
            autoComplete="current-password"
            placeholder="Password from your email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldClass}
          />
        </label>

        {!presetApp && (
          <label className="block">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
              Application
            </span>
            <select
              required
              value={application}
              onChange={(e) => setApplication(e.target.value)}
              className={`${fieldClass} cursor-pointer`}
            >
              {apps.length === 0 && (
                <option value="">Loading applications…</option>
              )}
              {apps.map((app) => (
                <option key={app.application_code} value={app.application_code}>
                  {app.name}
                </option>
              ))}
            </select>
          </label>
        )}
      </section>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting || !application}
          className="inline-flex items-center justify-center rounded-lg bg-[#7eaea2] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#6d9d91] disabled:cursor-not-allowed disabled:opacity-55"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
        <p className="text-xs leading-relaxed text-muted sm:max-w-[14rem] sm:text-right">
          Sign in opens your product in a new tab.
        </p>
      </div>
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
