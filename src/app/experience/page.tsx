import type { Metadata } from "next";
import ExperienceContent from "@/components/page/ExperienceContent";

export const metadata: Metadata = {
  title: "Software Development Process & Experience",
  description:
    "Learn about Owlsey's development process, methodology, and expertise in building scalable custom software solutions.",
  alternates: { canonical: "https://owlsey.com/experience" },
  keywords: [
    "software development process",
    "agile development methodology",
    "custom software expertise",
    "product development lifecycle",
    "software engineering best practices",
  ],
  openGraph: {
    title: "Our Experience | Owlsey",
    description:
      "Learn about Owlsey's development process, methodology, and expertise in building scalable custom software solutions.",
    url: "https://owlsey.com/experience",
    siteName: "Owlsey",
    images: [
      {
        url: "https://owlsey.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Owlsey Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Experience | Owlsey",
    description:
      "Learn about Owlsey's development process, methodology, and expertise in building scalable custom software solutions.",
    images: ["https://owlsey.com/twitter-image"],
  },
};

export default function ExperiencePage() {
  return <ExperienceContent />;
}
