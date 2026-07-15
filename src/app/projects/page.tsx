import type { Metadata } from "next";
import ProjectsContent from "@/components/page/ProjectsContent";

export const metadata: Metadata = {
  title: "Projects | Owlsey",
  description:
    "Selected system patterns from Owlsey: operations tools, client portals, integrations, and release frameworks shaped around real requirements.",
  keywords: [
    "custom software case studies",
    "internal tools case studies",
    "software integration examples",
    "client portal development",
    "operations software projects",
  ],
  openGraph: {
    title: "Projects | Owlsey",
    description:
      "Selected system patterns from Owlsey: operations tools, client portals, integrations, and release frameworks.",
    url: "https://owlsey.com/projects",
    siteName: "Owlsey",
    images: [
      {
        url: "https://owlsey.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Owlsey Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Owlsey",
    description:
      "Selected system patterns from Owlsey shaped around real requirements.",
    images: ["https://owlsey.com/twitter-image"],
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
