import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailContent from "@/components/page/ProjectDetailContent";
import { getProjectCase, PROJECT_CASES } from "@/data/projectCases";

type ProjectCasePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return PROJECT_CASES.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectCasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectCase(slug);

  if (!project) {
    return {
      title: "Project not found | Owlsey",
    };
  }

  return {
    title: `${project.title} | Owlsey Projects`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Owlsey Projects`,
      description: project.summary,
      url: `https://owlsey.com/projects/${project.slug}`,
      siteName: "Owlsey",
      images: [
        {
          url: "https://owlsey.com/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${project.title} by Owlsey`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Owlsey Projects`,
      description: project.summary,
      images: ["https://owlsey.com/twitter-image"],
    },
  };
}

export default async function ProjectCasePage({ params }: ProjectCasePageProps) {
  const { slug } = await params;
  const project = getProjectCase(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
}
