import { AgentCarousel } from "@/components/AgentCarousel";
import { DemoCTA } from "@/components/DemoCTA";
import { ExpandingPanels } from "@/components/ExpandingPanels";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Solutions } from "@/components/Solutions";
import { Technology } from "@/components/Technology";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AgentCarousel />
        <ExpandingPanels />
        <Solutions />
        <Technology />
        <DemoCTA />
      </main>
      <Footer />
    </>
  );
}
