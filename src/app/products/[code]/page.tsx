import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductDetailContent } from "@/components/ProductDetailContent";
import { getProductStaticParams } from "@/lib/subscription";

type PageProps = {
  params: Promise<{ code: string }>;
};

export async function generateStaticParams() {
  return getProductStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `${decodeURIComponent(code)} — PRIMENOVA Products`,
    description: `View plans and pricing for ${decodeURIComponent(code)} from the Primenova Subscription Module.`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { code } = await params;
  const decoded = decodeURIComponent(code);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductDetailContent code={decoded} />
      </main>
      <Footer />
    </>
  );
}
