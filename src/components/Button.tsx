import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-sm shadow-primary/20 hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/25 active:translate-y-0",
  secondary:
    "bg-surface text-foreground border border-foreground/20 hover:border-foreground/40 hover:bg-surface-soft hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "group bg-transparent text-primary hover:text-primary-hover",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300 ease-out ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
