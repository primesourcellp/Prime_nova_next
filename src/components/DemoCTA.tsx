import { Button } from "./Button";
import { Reveal } from "./Reveal";

export function DemoCTA() {
  return (
    <section
      id="demo"
      className="scroll-mt-20 border-t border-border/70 bg-foreground text-background"
    >
      <Reveal className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:px-10 lg:py-20">
        <div className="max-w-xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            See PRIMENOVA in action
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
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
            className="!border-white/30 !bg-transparent !text-white hover:!border-white/60 hover:!bg-white/10"
          >
            Explore Products
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
