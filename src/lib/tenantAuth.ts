import {
  subscriptionApiUrl,
  type CatalogApplication,
} from "./subscription";

export type TenantSession = {
  email: string;
  companyName: string;
  externalRef: string;
  tenantId?: number;
};

export type ProductAccess = {
  tenant_id: number;
  tenant_code: string;
  external_ref: string;
  company_name: string;
  email: string;
  application_code: string;
  application_name: string;
  subscription_id: number | null;
  subscription_status: string;
  plan_code: string | null;
  plan_name: string | null;
  app_base_url: string;
  catalog_base_url: string;
  launch_url: string;
  feature_codes?: string[];
  access_granted: boolean;
  login?: {
    username?: string;
    email?: string;
    temporary_password?: string;
    email_sent?: boolean;
    provisioned?: boolean;
    message?: string;
  };
};

export type TenantRegisterResult = {
  tenant_id: number;
  tenant_code: string;
  company_name: string;
  email: string;
  external_ref: string;
  status: string;
  created: boolean;
  subscription_id: number | null;
  subscription_status: string | null;
  plan_code: string | null;
  plan_name?: string | null;
  application_code?: string | null;
  app_base_url?: string | null;
  launch_url?: string | null;
  workspace_url?: string | null;
  slug?: string | null;
  feature_codes?: string[];
  login?: {
    username?: string;
    email?: string;
    temporary_password?: string;
    email_sent?: boolean;
    provisioned?: boolean;
    message?: string;
  };
  invoice_id?: number | null;
  invoice_number?: string | null;
  invoice_token?: string | null;
  invoice_filename?: string | null;
};

type Envelope<T> = {
  success?: boolean;
  message?: string;
  error_code?: string;
  data?: T;
};

const SESSION_KEY = "primenova_tenant_session";

export function externalRefForEmail(email: string): string {
  return `prime-nova:${email.trim().toLowerCase()}`;
}

export function getTenantSession(): TenantSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TenantSession;
  } catch {
    return null;
  }
}

export function saveTenantSession(session: TenantSession): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearTenantSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

async function parseEnvelope<T>(res: Response): Promise<Envelope<T>> {
  try {
    return (await res.json()) as Envelope<T>;
  } catch {
    return {};
  }
}

function apiError(body: Envelope<unknown>, status: number, fallback: string) {
  if (body.error_code === "TENANT_DISABLED") {
    return new Error(
      "This account is disabled. Contact support or ask an admin to reactivate it.",
    );
  }
  return new Error(body.message || `${fallback} (${status})`);
}

/** Application login — Subscription Module access (do not use register for login). */
export async function accessProduct(options: {
  application: string;
  email?: string;
  externalRef?: string;
  companyName?: string;
  tenantId?: number;
  provision?: boolean;
}): Promise<ProductAccess> {
  const res = await fetch(
    subscriptionApiUrl("tenants/access"),
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        application: options.application,
        email: options.email || "",
        externalRef: options.externalRef || "",
        companyName: options.companyName || "",
        tenantId: options.tenantId,
        provision: options.provision ?? true,
      }),
    },
  );

  const body = await parseEnvelope<ProductAccess>(res);
  if (!res.ok || !body.data) {
    throw apiError(body, res.status, "Could not sign in to application");
  }
  return body.data;
}

/** DNS-safe company slug from company name (e.g. Demo&Co → democo). */
export function slugFromCompanyName(companyName: string): string {
  const base = companyName
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 63);
  return base || "company";
}

/** First-time register — Subscription Module tenants/register. */
export async function registerTenant(options: {
  companyName: string;
  email: string;
  phone?: string;
  externalRef?: string;
  application?: string;
  planCode?: string;
  billingCycle?: "MONTHLY" | "YEARLY";
  startTrial?: boolean;
  slug?: string;
}): Promise<TenantRegisterResult> {
  const slug =
    (options.slug || "").trim() ||
    slugFromCompanyName(options.companyName);
  const res = await fetch(
    subscriptionApiUrl("tenants/register"),
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName: options.companyName,
        email: options.email,
        phone: options.phone || "",
        externalRef:
          options.externalRef || externalRefForEmail(options.email),
        application: options.application || undefined,
        planCode: options.planCode || undefined,
        billingCycle: options.billingCycle,
        startTrial: options.startTrial,
        slug,
      }),
    },
  );

  const body = await parseEnvelope<TenantRegisterResult>(res);
  if (!res.ok || !body.data) {
    throw apiError(body, res.status, "Could not register");
  }
  return body.data;
}

export function buildFallbackLaunchUrl(options: {
  appBaseUrl?: string | null;
  tenantId?: number | null;
  applicationCode: string;
  planCode?: string | null;
}): string {
  const base = (options.appBaseUrl || "").replace(/\/$/, "");
  if (!base) return "";
  const login = base.toLowerCase().endsWith("/login") ? base : `${base}/login`;
  const params = new URLSearchParams({
    application: options.applicationCode,
    from: "prime-nova",
  });
  if (options.tenantId) {
    params.set("subscription_tenant_id", String(options.tenantId));
    params.set("tenant_id", String(options.tenantId));
  }
  if (options.planCode) params.set("plan", options.planCode);
  return `${login}?${params.toString()}`;
}

export function openLaunchUrl(url: string): void {
  window.location.assign(url);
}

/** First product screen unlocked by the selected plan. */
const ATS_FEATURE_PATHS: { code: string; path: string }[] = [
  { code: "JOB_POSTING", path: "/jobs" },
  { code: "CANDIDATE_PIPELINE", path: "/candidates" },
  { code: "INTERVIEW_SCHEDULING", path: "/interviews" },
  { code: "CLIENTS", path: "/clients" },
  { code: "REPORTS", path: "/reports" },
  { code: "AI_RESUME_MATCHING", path: "/resume-matching" },
  { code: "SUBMISSION_EMAIL", path: "/submission-emails" },
  { code: "ALLOCATIONS", path: "/allocations" },
  { code: "TIME_TRACKING", path: "/time-tracking" },
];

const BILLING_FEATURE_PATHS: { code: string; path: string }[] = [
  { code: "CLIENTS", path: "/clients" },
  { code: "INVOICES", path: "/invoices" },
  { code: "RECEIVABLES", path: "/receivables" },
  { code: "REPORTS", path: "/reports/sales" },
  { code: "INVENTORY", path: "/inventory" },
  { code: "USERS", path: "/users" },
];

export function firstPlanFeaturePath(
  featureCodes?: string[] | null,
  applicationCode?: string | null,
): string {
  const enabled = new Set(
    (featureCodes ?? []).map((code) => code.trim().toUpperCase()),
  );
  const billing = (applicationCode || "").toLowerCase().includes("billing");
  const table = billing ? BILLING_FEATURE_PATHS : ATS_FEATURE_PATHS;
  const match = table.find((item) => enabled.has(item.code));
  if (match) return match.path;
  return billing ? "/dashboard" : "";
}

/** Keep the provisioned product login URL, and land on the first plan module. */
export function productSignInUrl(
  launchUrl: string,
  options?: {
    applicationCode?: string | null;
    featureCodes?: string[] | null;
  },
): string {
  if (!launchUrl) return "";
  try {
    const url = new URL(launchUrl);
    const next = firstPlanFeaturePath(
      options?.featureCodes,
      options?.applicationCode,
    );
    if (next && !url.searchParams.get("next")) {
      url.searchParams.set("next", next);
    }
    return url.toString();
  } catch {
    return launchUrl;
  }
}

export function resolveLaunchUrl(
  access: ProductAccess,
  app?: CatalogApplication | null,
): string {
  if (access.launch_url) return access.launch_url;
  return buildFallbackLaunchUrl({
    appBaseUrl: access.app_base_url || app?.app_base_url,
    tenantId: access.tenant_id,
    applicationCode: access.application_code,
    planCode: access.plan_code,
  });
}

export function resolveRegisterLaunchUrl(
  result: TenantRegisterResult,
  app?: CatalogApplication | null,
): string {
  if (result.workspace_url) return result.workspace_url;
  if (result.launch_url) return result.launch_url;
  const applicationCode =
    result.application_code || app?.application_code || "";
  if (!applicationCode) return "";
  return buildFallbackLaunchUrl({
    appBaseUrl: result.app_base_url || app?.app_base_url,
    tenantId: result.tenant_id,
    applicationCode,
    planCode: result.plan_code,
  });
}

const REGISTER_SUCCESS_KEY = "primenova_register_success";

export type RegisterSuccessPayload = {
  fullName?: string;
  companyName: string;
  email: string;
  phone?: string;
  applicationCode: string;
  applicationName?: string;
  planCode?: string | null;
  planName?: string | null;
  tenantId: number;
  launchUrl: string;
  login?: TenantRegisterResult["login"];
  created: boolean;
  featureCodes?: string[];
  invoiceId?: number | null;
  invoiceToken?: string | null;
  invoiceFilename?: string | null;
};

export function saveRegisterSuccess(payload: RegisterSuccessPayload): void {
  sessionStorage.setItem(REGISTER_SUCCESS_KEY, JSON.stringify(payload));
}

export function getRegisterSuccess(): RegisterSuccessPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(REGISTER_SUCCESS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as RegisterSuccessPayload;
  } catch {
    return null;
  }
}

export function clearRegisterSuccess(): void {
  sessionStorage.removeItem(REGISTER_SUCCESS_KEY);
}

export async function downloadSignupInvoice(options: {
  invoiceId: number;
  token: string;
  filename: string;
}): Promise<void> {
  // Open synchronously from the click gesture so popup blockers allow the PDF tab.
  const preview = window.open("about:blank", "_blank");
  const params = new URLSearchParams({
    invoice: String(options.invoiceId),
    token: options.token,
  });

  try {
    const response = await fetch(
      subscriptionApiUrl("invoices/public-document", params.toString()),
    );
    if (!response.ok) {
      throw new Error("Could not download the invoice.");
    }

    const contentType = (response.headers.get("Content-Type") || "").toLowerCase();
    const blob = await response.blob();
    // Hostinger HTML 403 / JSON errors must not be saved as a fake PDF.
    if (
      contentType.includes("text/html") ||
      contentType.includes("application/json") ||
      blob.size < 100
    ) {
      throw new Error("Could not download the invoice.");
    }

    const pdfBlob =
      contentType.includes("application/pdf") || blob.type === "application/pdf"
        ? blob
        : new Blob([blob], { type: "application/pdf" });
    const url = URL.createObjectURL(pdfBlob);
    const filename = options.filename || "invoice.pdf";
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();

    if (preview && !preview.closed) {
      preview.location.href = url;
    }
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  } catch (err) {
    if (preview && !preview.closed) {
      preview.close();
    }
    throw err;
  }
}
