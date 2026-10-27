export type CatalogFeature = {
  feature_code: string;
  name: string;
  description: string;
  limit_value: number | null;
};

export type CatalogPlan = {
  id: number;
  code: string;
  name: string;
  description: string;
  monthly_price: string;
  yearly_price: string;
  currency: string;
  trial_days: number;
  max_users: number | null;
  max_storage: number | null;
  features: CatalogFeature[];
};

export type CatalogApplication = {
  application_code: string;
  name: string;
  app_base_url: string;
  catalog_base_url: string;
  plans: CatalogPlan[];
};

type PublicCatalogResponse = {
  success: boolean;
  message?: string;
  data?:
    | CatalogPlan[]
    | {
        applications: CatalogApplication[];
      };
};

const PRODUCTION_SUBSCRIPTION_API_URL =
  "https://subscriptionapi.primesourcellp.com";

export function getSubscriptionApiBase(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SUBSCRIPTION_API_URL?.replace(
    /\/$/,
    "",
  );
  if (fromEnv) return fromEnv;
  return process.env.NODE_ENV === "production"
    ? PRODUCTION_SUBSCRIPTION_API_URL
    : "http://localhost:8000";
}

/**
 * Same-origin URL for subscription API calls from the browser.
 * Hostinger/LiteSpeed returns HTML 403 for /api/* before PHP runs, so
 * production browsers hit subscription-proxy.php instead.
 *
 * @param path - e.g. "plans/public" or "tenants/access" (no /api/v1 prefix)
 * @param query - optional query string without leading "?"
 */
export function subscriptionApiUrl(path: string, query = ""): string {
  const cleaned = path.replace(/^\/+/, "").replace(/\/+$/, "");
  const qs = query.replace(/^\?/, "");

  if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
    const params = new URLSearchParams(qs);
    params.set("__path", cleaned);
    return `/subscription-proxy.php?${params.toString()}`;
  }

  const base = getSubscriptionApiBase();
  return qs
    ? `${base}/api/v1/${cleaned}/?${qs}`
    : `${base}/api/v1/${cleaned}/`;
}

export async function fetchPublicCatalog(
  applicationCode?: string,
): Promise<CatalogApplication[]> {
  const query = applicationCode
    ? `application=${encodeURIComponent(applicationCode)}`
    : "";
  const url = subscriptionApiUrl("plans/public", query);

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Subscription catalog failed (${res.status})`);
  }

  const json = (await res.json()) as PublicCatalogResponse;

  if (!json.success || json.data == null) {
    throw new Error(json.message || "Invalid catalog response");
  }

  // Filtered: data is Plan[]
  if (Array.isArray(json.data)) {
    if (!applicationCode) return [];
    return [
      {
        application_code: applicationCode,
        name: applicationCode,
        app_base_url: "",
        catalog_base_url: "",
        plans: json.data,
      },
    ];
  }

  return json.data.applications ?? [];
}

export async function fetchApplicationByCode(
  code: string,
): Promise<CatalogApplication | null> {
  const apps = await fetchPublicCatalog();
  const match = apps.find(
    (app) => app.application_code.toLowerCase() === code.toLowerCase(),
  );
  return match ?? null;
}

const FALLBACK_PRODUCT_CODES = [
  "ATS",
  "PG",
  "PrimeInvoice",
  "Timesheet",
  "Billing",
  "Billing Application",
];

/** Used at build time for static export of /products/[code] */
export async function getProductStaticParams(): Promise<{ code: string }[]> {
  const codes = new Set(FALLBACK_PRODUCT_CODES);
  try {
    const apps = await fetchPublicCatalog();
    for (const app of apps) {
      if (app.application_code) codes.add(app.application_code);
    }
  } catch {
    // Keep the fallback codes when the catalog API is offline during build.
  }

  return [...codes].map((code) => ({ code }));
}

export function formatMoney(amount: string | number, currency = "INR"): string {
  const value = typeof amount === "string" ? Number(amount) : amount;
  if (!Number.isFinite(value)) return String(amount);

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
}
