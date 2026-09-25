import Link from "next/link";
import type { CatalogPlan } from "@/lib/subscription";
import {
  buildComparisonMatrix,
  pickHighlightedPlanId,
  planPriceLabel,
} from "@/lib/planComparison";

type Props = {
  plans: CatalogPlan[];
  applicationCode: string;
  billing: "monthly" | "yearly";
};

function FeatureBadge({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
        enabled
          ? "bg-primary-soft text-primary"
          : "bg-surface-soft text-muted-light"
      }`}
      aria-label={enabled ? "Included" : "Not included"}
    >
      {enabled ? "✓" : "✕"}
    </span>
  );
}

export function PlanComparison({ plans, applicationCode, billing }: Props) {
  if (plans.length < 2) return null;

  const rows = buildComparisonMatrix(plans);
  const highlightedPlanId = pickHighlightedPlanId(plans);

  return (
    <section
      className="mt-16 scroll-mt-20 border-t border-border/70 pt-14"
      aria-labelledby="plan-comparison-title"
    >
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          Compare
        </p>
        <h2
          id="plan-comparison-title"
          className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl"
        >
          Feature comparison
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Every feature side by side for this product — same matrix style as
          Prime Nova.
        </p>
      </header>

      <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-soft/60">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-surface-soft/95 px-4 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-muted-light sm:px-5"
              >
                Feature
              </th>
              {plans.map((plan) => {
                const highlighted = plan.id === highlightedPlanId;
                return (
                  <th
                    key={plan.id}
                    scope="col"
                    className={`min-w-[160px] px-4 py-4 align-bottom sm:px-5 ${
                      highlighted ? "bg-primary-soft/50" : ""
                    }`}
                  >
                    <div className="text-base font-bold text-foreground">
                      {plan.name}
                    </div>
                    <div className="mt-1 text-xs font-medium text-muted">
                      {planPriceLabel(plan, billing)}
                    </div>
                    <Link
                      href={`/register?application=${encodeURIComponent(applicationCode)}&plan=${encodeURIComponent(plan.code)}`}
                      className={`mt-3 inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        highlighted
                          ? "bg-primary text-white hover:bg-primary-hover"
                          : "border border-border bg-background text-foreground hover:border-primary/40"
                      }`}
                    >
                      {plan.trial_days > 0 ? "Start trial" : "Get started"}
                    </Link>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row.code}
                className={
                  rowIndex % 2 === 0
                    ? "border-b border-border/70"
                    : "border-b border-border/70 bg-background/50"
                }
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-inherit px-4 py-3.5 text-sm font-medium text-foreground sm:px-5"
                >
                  {row.name}
                </th>
                {row.cells.map((cell) => {
                  const highlighted = cell.planId === highlightedPlanId;
                  return (
                    <td
                      key={`${row.code}-${cell.planId}`}
                      className={`px-4 py-3.5 sm:px-5 ${
                        highlighted ? "bg-primary-soft/30" : ""
                      }`}
                    >
                      <span
                        className={`inline-flex items-center gap-2 ${
                          cell.enabled ? "text-foreground" : "text-muted-light"
                        }`}
                      >
                        <FeatureBadge enabled={cell.enabled} />
                        <span className="text-sm">
                          {cell.enabled ? cell.label : "No"}
                        </span>
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
