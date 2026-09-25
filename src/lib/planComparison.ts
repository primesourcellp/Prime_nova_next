import type { CatalogFeature, CatalogPlan } from "./subscription";
import { formatMoney } from "./subscription";

export type ComparisonCell = {
  planId: number;
  enabled: boolean;
  label: string;
};

export type ComparisonFeatureRow = {
  code: string;
  name: string;
  cells: ComparisonCell[];
};

function formatFeatureLimit(feature: CatalogFeature): string {
  if (feature.limit_value == null) return "Included";
  return feature.limit_value.toLocaleString("en-IN");
}

/** Highlight middle plan when 3+ exist; otherwise the first plan. */
export function pickHighlightedPlanId(plans: CatalogPlan[]): number | null {
  if (plans.length === 0) return null;
  if (plans.length >= 3) return plans[1].id;
  return plans[0].id;
}

/**
 * Build a feature × plan matrix from Subscription Module catalog plans.
 * Feature order follows first appearance across plans.
 */
export function buildComparisonMatrix(
  plans: CatalogPlan[],
): ComparisonFeatureRow[] {
  const order: string[] = [];
  const names = new Map<string, string>();
  const byPlan = new Map<number, Map<string, CatalogFeature>>();

  for (const plan of plans) {
    const featureMap = new Map<string, CatalogFeature>();
    for (const feature of plan.features) {
      featureMap.set(feature.feature_code, feature);
      if (!names.has(feature.feature_code)) {
        names.set(feature.feature_code, feature.name);
        order.push(feature.feature_code);
      }
    }
    byPlan.set(plan.id, featureMap);
  }

  return order.map((code) => ({
    code,
    name: names.get(code) ?? code,
    cells: plans.map((plan) => {
      const feature = byPlan.get(plan.id)?.get(code);
      if (!feature) {
        return { planId: plan.id, enabled: false, label: "—" };
      }
      return {
        planId: plan.id,
        enabled: true,
        label: formatFeatureLimit(feature),
      };
    }),
  }));
}

export function planPriceLabel(
  plan: CatalogPlan,
  billing: "monthly" | "yearly",
): string {
  const amount =
    billing === "yearly" ? plan.yearly_price : plan.monthly_price;
  const formatted = formatMoney(amount, plan.currency);
  return billing === "yearly" ? `${formatted}/year` : `${formatted}/month`;
}
