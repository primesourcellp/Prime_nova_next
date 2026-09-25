import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RegisterPageContent } from "@/components/RegisterPageContent";

export const metadata: Metadata = {
  title: "Register — Primenova",
  description:
    "Create a Primenova tenant account and start an application plan via the Subscription Module.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-full flex-col bg-[linear-gradient(165deg,#eef5f4_0%,#f7fafb_40%,#f3f6f7_100%)]">
      <header className="border-b border-border/40 bg-background/70 backdrop-blur-sm">
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
      <main className="flex flex-1 items-center justify-center px-5 py-14 sm:px-8 sm:py-20">
        <div className="w-full max-w-xl border-t border-border/40 bg-surface/80 px-6 py-10 backdrop-blur-sm sm:px-10 sm:py-12">
          <RegisterPageContent />
        </div>
      </main>
    </div>
  );
}
