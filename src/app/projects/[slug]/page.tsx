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
      title: { absolute: "Project not found | Owlsey" },
    };
  }

  return {
    title: { absolute: `${project.title} | Owlsey Projects` },
    description: project.summary,
    alternates: {
      canonical: `https://owlsey.com/projects/${project.slug}`,
    },
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

  const projectUrl = `https://owlsey.com/projects/${project.slug}`;

  const caseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${projectUrl}#case`,
        name: project.title,
        headline: project.title,
        description: project.summary,
        url: projectUrl,
        genre: project.label,
        keywords: project.scope.join(", "),
        abstract: project.challenge,
        text: project.body,
        creator: { "@id": "https://owlsey.com/#organization" },
        author: { "@id": "https://owlsey.com/#organization" },
        publisher: { "@id": "https://owlsey.com/#organization" },
        about: project.system,
        image: "https://owlsey.com/opengraph-image",
        inLanguage: "en-US",
        isPartOf: { "@id": "https://owlsey.com/#website" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${projectUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://owlsey.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: "https://owlsey.com/projects",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: projectUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseSchema) }}
      />
      <ProjectDetailContent project={project} />
    </>
  );
}
