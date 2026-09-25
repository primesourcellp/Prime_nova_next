import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductsPageContent } from "@/components/ProductsPageContent";

export const metadata: Metadata = {
  title: "Products — PRIMENOVA",
  description:
    "Explore Primenova products synced from the Subscription Module catalog, including plans and pricing.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductsPageContent />
      </main>
      <Footer />
    </>
  );
}
