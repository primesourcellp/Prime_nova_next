import { Reveal } from "./Reveal";

const products = [
  {
    title: "Talent Pipeline",
    description:
      "Visualize every stage of hiring with structured pipelines that keep teams aligned from application to offer.",
  },
  {
    title: "Role Workspace",
    description:
      "Create role briefs, scorecards, and hiring plans in one workspace designed for faster, clearer decisions.",
  },
  {
    title: "Enquiry Hub",
    description:
      "Capture interest, route demos, and guide prospects through product discovery without losing context.",
  },
];

export function Products() {
  return (
    <section id="products" className="scroll-mt-20 border-t border-border/70 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            Products
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Software built around how teams actually hire
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Explore focused products that bring structure to recruitment —
            without forcing every organization into the same workflow.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {products.map((product, index) => (
            <Reveal
              key={product.title}
              as="article"
              delay={index * 100}
              className="border-t border-border pt-6 transition-colors duration-300 hover:border-primary/40"
            >
              <span className="text-xs font-semibold text-muted-light">
                0{index + 1}
              </span>
              <h3 className="mt-3 text-xl font-bold text-foreground">
                {product.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {product.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
