import type { Metadata } from "next";
import { DemoCTA } from "@/components/DemoCTA";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductsPageContent } from "@/components/ProductsPageContent";

export const metadata: Metadata = {
  title: "Products — Primenova",
  description:
    "Explore Primenova products synced from the Subscription Module catalog, including plans and pricing.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductsPageContent />
        <DemoCTA />
      </main>
      <Footer />
    </>
  );
}
