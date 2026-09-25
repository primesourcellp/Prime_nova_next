import {
  getSubscriptionApiBase,
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
  feature_codes?: string[];
  login?: {
    username?: string;
    email?: string;
    temporary_password?: string;
    email_sent?: boolean;
    provisioned?: boolean;
    message?: string;
  };
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
    `${getSubscriptionApiBase()}/api/v1/tenants/access/`,
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
}): Promise<TenantRegisterResult> {
  const res = await fetch(
    `${getSubscriptionApiBase()}/api/v1/tenants/register/`,
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
  companyName: string;
  email: string;
  applicationCode: string;
  applicationName?: string;
  planCode?: string | null;
  planName?: string | null;
  tenantId: number;
  launchUrl: string;
  login?: TenantRegisterResult["login"];
  created: boolean;
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
