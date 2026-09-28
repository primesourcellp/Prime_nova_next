import Image from "next/image";
import type {
  PortfolioProject,
  ProjectTone,
  ProjectVisualKind,
} from "@/data/portfolio";

const toneClass: Record<ProjectTone, string> = {
  teal: "bg-[linear-gradient(160deg,#e7f6f3_0%,#d7ebe6_42%,#f3eee4_100%)]",
  mint: "bg-[linear-gradient(165deg,#e8f3f1_0%,#f7fafb_48%,#e3eef3_100%)]",
  sand: "bg-[linear-gradient(160deg,#f6f1e8_0%,#eef4f2_58%,#e6eef1_100%)]",
  slate: "bg-[linear-gradient(165deg,#e7eef1_0%,#f6f7f4_46%,#dfe8ea_100%)]",
};

export function ProjectMedia({
  project,
  shot = 0,
  showVideo = false,
  className = "",
}: {
  project: PortfolioProject;
  shot?: number;
  showVideo?: boolean;
  className?: string;
}) {
  if (showVideo && project.video && shot === 0) {
    return (
      <div
        className={`relative flex min-h-[560px] items-center justify-center overflow-hidden py-8 ${toneClass[project.tone]} ${className ?? ""}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,118,110,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,0.045)_1px,transparent_1px)] bg-[size:22px_22px]" />
        <PhoneVideo src={project.video} label={project.projectName} />
      </div>
    );
  }

  const src = project.images[shot];
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-surface-soft ${className}`}>
        <Image
          src={src}
          alt={`${project.projectName} interface`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
    );
  }

  return (
    <ProjectVisual
      kind={project.visual}
      tone={project.tone}
      label={project.projectName}
      shot={shot}
      className={className}
    />
  );
}

export function ProjectVisual({
  kind,
  tone,
  label,
  shot = 0,
  className = "",
}: {
  kind: ProjectVisualKind;
  tone: ProjectTone;
  label: string;
  shot?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${toneClass[tone]} ${className}`}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,118,110,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,0.045)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <div className="relative flex h-full items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md rounded-2xl border border-white/80 bg-surface/85 p-3.5 shadow-[0_18px_40px_-24px_rgba(12,22,32,0.45)] backdrop-blur-sm sm:p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#e7b4ae]" />
            <span className="h-2 w-2 rounded-full bg-[#ecd49a]" />
            <span className="h-2 w-2 rounded-full bg-[#b7d7c9]" />
            <span className="ml-1 truncate text-[10px] font-medium uppercase tracking-[0.12em] text-muted-light">
              {label}
            </span>
          </div>
          <Scene kind={kind} shot={shot} />
        </div>
      </div>
    </div>
  );
}

function PhoneVideo({ src, label }: { src: string; label: string }) {
  return (
    <div className="animate-gentle-float relative z-10 w-[200px] sm:w-[220px]">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] border-[3px] border-[#9ec5c2] bg-[linear-gradient(160deg,#e8f5f3,#cfe8e4)] p-2 shadow-[0_30px_60px_rgba(15,118,110,0.22),inset_0_0_0_2px_rgba(255,255,255,0.85)]">
        <video
          className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-[1.35rem] object-cover object-top"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          aria-label={`${label} mobile website scrolling`}
        />
        <div className="absolute left-1/2 top-3 z-20 h-2 w-[30%] -translate-x-1/2 rounded-full bg-teal/80" />
      </div>
    </div>
  );
}

function Scene({ kind, shot }: { kind: ProjectVisualKind; shot: number }) {
  if (kind === "mobile") return <MobileScene shot={shot} />;
  if (kind === "commerce") return <CommerceScene shot={shot} />;
  if (kind === "design") return <DesignScene shot={shot} />;
  if (kind === "workflow") return <WorkflowScene shot={shot} />;
  if (kind === "crm") return <CrmScene shot={shot} />;
  return <DashboardScene shot={shot} />;
}

function CrmScene({ shot }: { shot: number }) {
  const columns = [
    ["Lead", "Qualified"],
    ["Discovery", "Proposal"],
    ["Negotiation", "Won"],
  ][shot % 3] ?? ["Lead", "Qualified"];

  return (
    <div className="grid grid-cols-3 gap-2">
      {columns.concat(["Review"]).slice(0, 3).map((title, index) => (
        <div key={title} className="rounded-lg bg-surface-soft/80 p-2">
          <p className="text-[10px] font-semibold text-foreground/70">{title}</p>
          <div className="mt-2 space-y-1.5">
            <div className={`h-8 rounded-md ${index === 0 ? "bg-primary/15" : "bg-white"}`} />
            <div className="h-8 rounded-md bg-white" />
          </div>
        </div>
      ))}
    </div>
  );
}

function DashboardScene({ shot }: { shot: number }) {
  const widths = [
    ["78%", "56%", "64%"],
    ["48%", "82%", "40%"],
    ["90%", "44%", "70%"],
  ][shot % 3];

  return (
    <div className="grid grid-cols-[72px_1fr] gap-2">
      <div className="space-y-1.5 rounded-lg bg-surface-soft/80 p-2">
        <div className="h-2 rounded-full bg-primary/30" />
        <div className="h-2 rounded-full bg-foreground/10" />
        <div className="h-2 rounded-full bg-foreground/10" />
        <div className="h-2 rounded-full bg-foreground/10" />
      </div>
      <div className="space-y-2">
        {widths.map((width) => (
          <div key={width} className="rounded-lg bg-white p-2">
            <div className="h-1.5 rounded-full bg-primary/25" style={{ width }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileScene({ shot }: { shot: number }) {
  const rows = shot % 2 === 0 ? 4 : 3;
  return (
    <div className="mx-auto w-[46%] min-w-[120px] rounded-[1.25rem] border border-foreground/10 bg-white p-2.5 shadow-sm">
      <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-foreground/15" />
      <div className="space-y-1.5">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="flex items-center gap-2 rounded-md bg-surface-soft px-2 py-1.5">
            <span className="h-5 w-5 shrink-0 rounded-md bg-primary/15" />
            <span className="h-1.5 flex-1 rounded-full bg-foreground/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CommerceScene({ shot }: { shot: number }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-lg bg-white">
          <div
            className={`h-14 ${index === shot % 3 ? "bg-primary/20" : "bg-pipeline-mint"}`}
          />
          <div className="space-y-1.5 p-2">
            <div className="h-1.5 w-4/5 rounded-full bg-foreground/10" />
            <div className="h-1.5 w-1/2 rounded-full bg-primary/25" />
          </div>
        </div>
      ))}
    </div>
  );
}

function WorkflowScene({ shot }: { shot: number }) {
  const steps = ["Intake", "Active", "Blocked", "Done"];
  const active = shot % steps.length;
  return (
    <ol className="space-y-2">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-2">
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${
              index <= active
                ? "bg-primary text-white"
                : "bg-surface-soft text-muted"
            }`}
          >
            {index + 1}
          </span>
          <span className="h-2 flex-1 rounded-full bg-white">
            <span
              className="block h-2 rounded-full bg-primary/20"
              style={{ width: index <= active ? "100%" : "35%" }}
            />
          </span>
          <span className="w-14 text-[10px] font-medium text-foreground/70">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function DesignScene({ shot }: { shot: number }) {
  return (
    <div className="relative h-36">
      <div
        className="absolute left-0 top-3 h-28 w-[70%] rounded-xl border border-white bg-white p-3 shadow-sm"
        style={{ transform: `rotate(${shot % 2 === 0 ? -2 : 1.5}deg)` }}
      >
        <div className="h-2 w-1/3 rounded-full bg-primary/25" />
        <div className="mt-3 h-10 rounded-md bg-pipeline-lavender/70" />
        <div className="mt-2 h-1.5 w-4/5 rounded-full bg-foreground/10" />
      </div>
      <div className="absolute bottom-0 right-0 h-24 w-[48%] rounded-xl border border-white bg-surface p-3 shadow-sm">
        <div className="h-8 rounded-md bg-primary-soft" />
        <div className="mt-2 h-1.5 w-2/3 rounded-full bg-foreground/10" />
      </div>
    </div>
  );
}
