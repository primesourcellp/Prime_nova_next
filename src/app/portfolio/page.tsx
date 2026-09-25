import type { Metadata } from "next";
import { DemoCTA } from "@/components/DemoCTA";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PortfolioPageContent } from "@/components/PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio — Primenova",
  description:
    "Selected work and product engagements from Primenova — hiring systems built around how teams actually work.",
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PortfolioPageContent />
        <DemoCTA />
      </main>
      <Footer />
    </>
  );
}
