import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProjectDetailView } from "@/components/portfolio/ProjectDetailView";
import {
  getPortfolioStaticParams,
  getProjectBySlug,
} from "@/data/portfolio";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPortfolioStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project — Primenova" };
  }
  return {
    title: `${project.projectName} — Portfolio — Primenova`,
    description: project.shortDescription,
  };
}

export default async function PortfolioProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProjectDetailView project={project} />
      </main>
      <Footer />
    </>
  );
}
