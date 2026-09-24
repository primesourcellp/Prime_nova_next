import { CountUp } from "./CountUp";

export function PipelineCard() {
  return (
    <div className="animate-gentle-float relative w-full max-w-md lg:max-w-none">
      <div
        className="animate-glow-pulse absolute -inset-6 rounded-[2rem] bg-primary/10 blur-2xl"
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-surface p-5 shadow-[0_20px_50px_-20px_rgba(20,20,20,0.18)] transition-shadow duration-500 hover:shadow-[0_28px_60px_-22px_rgba(15,118,110,0.28)] sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#d4d4d4]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d4d4d4]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d4d4d4]" />
          </div>
          <p className="text-sm font-semibold text-foreground">
            Candidate Pipeline
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <PipelineColumn
            label="Applied"
            cards={["grey", "grey", "grey"]}
            delayBase={0}
          />
          <PipelineColumn
            label="Screening"
            cards={["lavender", "grey"]}
            delayBase={3}
          />
          <PipelineColumn
            label="Interview"
            cards={["mint"]}
            delayBase={5}
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <StatBox value={128} label="Active candidates" />
          <StatBox value={6} label="Open roles" />
        </div>
      </div>
    </div>
  );
}

function PipelineColumn({
  label,
  cards,
  delayBase,
}: {
  label: string;
  cards: Array<"grey" | "lavender" | "mint">;
  delayBase: number;
}) {
  const tones = {
    grey: "bg-pipeline-grey",
    lavender: "bg-pipeline-lavender",
    mint: "bg-pipeline-mint",
  };

  return (
    <div>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-light sm:text-[11px]">
        {label}
      </p>
      <div className="flex flex-col gap-2.5">
        {cards.map((tone, i) => (
          <div
            key={`${label}-${i}`}
            className={`pipeline-card-item h-11 rounded-lg transition-transform duration-300 hover:-translate-y-0.5 sm:h-12 ${tones[tone]}`}
            style={{ animationDelay: `${0.55 + (delayBase + i) * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function StatBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-surface-soft/60 px-4 py-3.5 transition-colors duration-300 hover:bg-primary-soft/70">
      <p className="text-2xl font-bold tracking-tight text-foreground sm:text-[1.65rem]">
        <CountUp value={value} />
      </p>
      <p className="mt-0.5 text-xs text-muted sm:text-[13px]">{label}</p>
    </div>
  );
}
