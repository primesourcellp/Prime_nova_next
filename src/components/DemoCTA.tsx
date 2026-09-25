import { Button } from "./Button";
import { Reveal } from "./Reveal";

export function DemoCTA() {
  return (
    <section
      id="demo"
      className="scroll-mt-20 border-t border-border/40 bg-[linear-gradient(120deg,#0f766e_0%,#0d635c_48%,#124e57_100%)] text-white"
    >
      <Reveal className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:px-10 lg:py-24">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
            Get started
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2rem,3.8vw,3rem)] font-medium tracking-[-0.03em]">
            See Primenova{" "}
            <span className="italic text-white/85">in action</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
            Request a demo to explore how product-focused recruitment software
            can bring structure to your hiring process.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            href="#contact"
            className="!bg-white !text-foreground hover:!bg-white/90"
          >
            Request a Demo
          </Button>
          <Button
            href="/products"
            variant="secondary"
            className="!border-white/35 !bg-transparent !text-white hover:!border-white/60 hover:!bg-white/10"
          >
            Explore Products
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
