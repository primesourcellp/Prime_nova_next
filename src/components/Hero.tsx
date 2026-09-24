import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import AnimatedHero from "./animated-hero";

export function Hero() {
  return (
    <section className="hero-source-band">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span>✳</span> SOFTWARE. WITH POSSIBILITIES.
          </div>

          <h1 className="hero-title">
            Built for today.
            <br />
            Engineered for
            <br />
            <span className="text-teal">
              what&apos;s next<span className="text-amber">.</span>
            </span>
          </h1>

          <p className="hero-description">
            We turn ambitious ideas into powerful software.
            <br className="hidden xl:block" /> Custom solutions. Thoughtful
            products. Lasting impact.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#products" className="button">
              Explore our services
              <ArrowUpRight size={18} aria-hidden />
            </Link>
            <Link href="#demo" className="button button-secondary">
              Discover our products
              <ArrowUpRight size={18} aria-hidden />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--color-muted)]">
            <span className="flex items-center gap-2">
              <Check className="text-teal" size={14} /> Built around your
              business
            </span>
            <span className="flex items-center gap-2">
              <Check className="text-teal" size={14} /> Designed for people
            </span>
          </div>
        </div>

        <AnimatedHero />
      </div>
    </section>
  );
}
