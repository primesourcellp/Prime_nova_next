"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./Button";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Industries", href: "/#industries" },
  { label: "Technology", href: "/#technology" },
  { label: "Resources", href: "/#resources" },
  { label: "About", href: "/#about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "nav-scrolled bg-background/95" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center transition-opacity hover:opacity-80"
          aria-label="Primenova home"
        >
          <Image
            src="/images/primenova-logo.png"
            alt="Primenova"
            width={180}
            height={48}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={
                link.label === "About"
                  ? "rounded border border-foreground/70 px-2.5 py-1 text-[13px] font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background"
                  : "relative text-[13px] font-medium text-foreground/80 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/#contact"
            className="text-[13px] font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Contact
          </Link>
          <Button href="/#demo" className="py-2! text-[13px]!">
            Request a Demo
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-surface-soft lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-4 flex-col gap-1">
            <span
              className={`h-0.5 w-full bg-foreground transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-full bg-foreground transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-full bg-foreground transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      <div
        className={`overflow-hidden border-border bg-background transition-all duration-300 ease-out lg:hidden ${
          open ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-5" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-soft"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-soft"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <div className="mt-3 px-1" onClick={() => setOpen(false)}>
            <Button href="/#demo" className="w-full">
              Request a Demo
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
