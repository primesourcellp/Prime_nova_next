import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { label: "All products", href: "/products" },
      { label: "Request a Demo", href: "/#demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Resources", href: "/#resources" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Solutions", href: "/#solutions" },
      { label: "Industries", href: "/#industries" },
      { label: "Technology", href: "/#technology" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div id="about">
            <Image
              src="/images/primenova-logo.png"
              alt="Primenova"
              width={180}
              height={48}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Recruitment technology for smarter, more structured hiring —
              bringing product discovery and industry solutions together.
            </p>
            <p id="contact" className="mt-6 scroll-mt-24 text-sm text-muted">
              <a
                href="mailto:hello@primenova.com"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                hello@primenova.com
              </a>
            </p>
          </div>

          {columns.map((column) => (
            <div
              key={column.title}
              id={column.title === "Company" ? "resources" : undefined}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-light">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-light">
            © {new Date().getFullYear()} PRIMENOVA. All rights reserved.
          </p>
          <p className="text-xs text-muted-light">
            Recruitment software for structured hiring.
          </p>
        </div>
      </div>
    </footer>
  );
}
