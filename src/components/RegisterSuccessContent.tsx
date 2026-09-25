"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getRegisterSuccess,
  openLaunchUrl,
  type RegisterSuccessPayload,
} from "@/lib/tenantAuth";

function withAutoLoginParams(
  launchUrl: string,
  payload: RegisterSuccessPayload,
): string {
  if (!launchUrl) return "";
  try {
    const url = new URL(launchUrl);
    if (payload.email && !url.searchParams.get("email")) {
      url.searchParams.set("email", payload.email);
    }
    const password = payload.login?.temporary_password;
    if (password) {
      url.searchParams.set("password", password);
      url.searchParams.set("auto_login", "1");
    }
    if (payload.tenantId && !url.searchParams.get("subscription_tenant_id")) {
      url.searchParams.set("subscription_tenant_id", String(payload.tenantId));
      url.searchParams.set("tenant_id", String(payload.tenantId));
    }
    if (payload.planCode && !url.searchParams.get("plan")) {
      url.searchParams.set("plan", payload.planCode);
    }
    if (!url.searchParams.get("from")) {
      url.searchParams.set("from", "prime-nova");
    }
    if (payload.applicationCode && !url.searchParams.get("application")) {
      url.searchParams.set("application", payload.applicationCode);
    }
    return url.toString();
  } catch {
    return launchUrl;
  }
}

export function RegisterSuccessContent() {
  const router = useRouter();
  const [payload, setPayload] = useState<RegisterSuccessPayload | null>(null);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const data = getRegisterSuccess();
    if (!data) {
      router.replace("/register");
      return;
    }
    setPayload(data);

    const launch = withAutoLoginParams(data.launchUrl, data);
    if (launch && data.login?.temporary_password) {
      setOpening(true);
      const timer = window.setTimeout(() => openLaunchUrl(launch), 600);
      return () => window.clearTimeout(timer);
    }
  }, [router]);

  if (!payload) {
    return (
      <div className="h-40 animate-pulse rounded-xl bg-surface-soft" />
    );
  }

  const launchUrl = withAutoLoginParams(payload.launchUrl, payload);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          Next step
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
          {payload.created ? "Account created" : "Account linked"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {opening
            ? "Opening your application dashboard…"
            : `Your Subscription Module tenant is ready${
                payload.applicationName
                  ? ` for ${payload.applicationName}`
                  : payload.applicationCode
                    ? ` for ${payload.applicationCode}`
                    : ""
              }${payload.planName ? ` on the ${payload.planName} plan` : ""}.`}
        </p>
      </header>

      {opening && (
        <div className="flex flex-col items-center rounded-xl border border-border bg-background px-4 py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          <p className="mt-3 text-sm font-medium text-foreground">
            Signing you in and loading the dashboard
          </p>
        </div>
      )}

      <div className="rounded-xl border border-border bg-background px-4 py-4 text-sm">
        <dl className="space-y-2">
          {payload.fullName && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Name</dt>
              <dd className="font-medium text-foreground">{payload.fullName}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Company</dt>
            <dd className="font-medium text-foreground">{payload.companyName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Email</dt>
            <dd className="font-medium text-foreground">{payload.email}</dd>
          </div>
          {payload.phone && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Phone</dt>
              <dd className="font-medium text-foreground">{payload.phone}</dd>
            </div>
          )}
          {payload.planCode && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Plan</dt>
              <dd className="font-medium text-foreground">
                {payload.planName || payload.planCode}
              </dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Tenant ID</dt>
            <dd className="font-medium text-foreground">{payload.tenantId}</dd>
          </div>
        </dl>
      </div>

      {payload.login?.temporary_password && (
        <div
          role="status"
          className="rounded-lg border border-primary/20 bg-primary-soft px-4 py-3 text-sm text-foreground"
        >
          <p className="font-semibold">Product login credentials</p>
          <p className="mt-1 text-muted">
            Username:{" "}
            <span className="font-medium text-foreground">
              {payload.login.username || payload.login.email || payload.email}
            </span>
          </p>
          <p className="mt-1 text-muted">
            Temporary password:{" "}
            <span className="font-mono font-medium text-foreground">
              {payload.login.temporary_password}
            </span>
          </p>
          {payload.login.email_sent ? (
            <p className="mt-2 text-xs text-muted">
              A welcome email was also sent with these details.
            </p>
          ) : null}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {launchUrl ? (
          <button
            type="button"
            onClick={() => openLaunchUrl(launchUrl)}
            className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            {opening ? "Opening…" : "Open dashboard"}
          </button>
        ) : (
          <p className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted">
            No app URL is configured yet. Set{" "}
            <code className="rounded bg-surface-soft px-1 text-xs">
              app_base_url
            </code>{" "}
            for this application in Subscription Module admin, then sign in.
          </p>
        )}

        <Link
          href={`/login?application=${encodeURIComponent(payload.applicationCode)}`}
          className="inline-flex w-full items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/40"
        >
          Go to marketing sign in
        </Link>

        <Link
          href={`/products/${encodeURIComponent(payload.applicationCode)}`}
          className="text-center text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Back to product page
        </Link>
      </div>
    </div>
  );
}
