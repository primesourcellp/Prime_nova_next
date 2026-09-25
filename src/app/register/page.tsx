import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RegisterPageContent } from "@/components/RegisterPageContent";

export const metadata: Metadata = {
  title: "Register — PRIMENOVA",
  description:
    "Create a Primenova tenant account and start an application plan via the Subscription Module.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Primenova home">
            <Image
              src="/images/primenova-logo.png"
              alt="Primenova"
              width={160}
              height={42}
              className="h-9 w-auto"
              priority
            />
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Sign in
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-7 sm:p-9">
          <RegisterPageContent />
        </div>
      </main>
    </div>
  );
}
