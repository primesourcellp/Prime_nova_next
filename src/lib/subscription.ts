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

export function getSubscriptionApiBase(): string {
  return (
    process.env.NEXT_PUBLIC_SUBSCRIPTION_API_URL?.replace(/\/$/, "") ||
    "http://localhost:8000"
  );
}

export async function fetchPublicCatalog(
  applicationCode?: string,
): Promise<CatalogApplication[]> {
  const base = getSubscriptionApiBase();
  const query = applicationCode
    ? `?application=${encodeURIComponent(applicationCode)}`
    : "";
  const url = `${base}/api/v1/plans/public/${query}`;

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

/** Used at build time for static export of /products/[code] */
export async function getProductStaticParams(): Promise<{ code: string }[]> {
  try {
    const apps = await fetchPublicCatalog();
    if (apps.length > 0) {
      return apps.map((app) => ({ code: app.application_code }));
    }
  } catch {
    // fall through to defaults when API is offline during build
  }

  return [
    { code: "ATS" },
    { code: "PG" },
    { code: "PrimeInvoice" },
    { code: "Timesheet" },
  ];
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
