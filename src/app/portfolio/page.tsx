import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PortfolioPageContent } from "@/components/PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio — Primenova",
  description:
    "Explore the digital solutions and innovative products we've built for businesses across different industries.",
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PortfolioPageContent />
      </main>
      <Footer />
    </>
  );
}
