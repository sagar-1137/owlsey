import type { Metadata } from "next";
import ServicesContent from "@/components/page/ServicesContent";

export const metadata: Metadata = {
  title: "Services | Owlsey",
  description:
    "Custom platforms, internal tools, integrations, and delivery architecture shaped around your requirements and practical engineering judgement.",
  keywords: [
    "custom software solutions",
    "custom platforms",
    "internal tools development",
    "software integrations",
    "workflow automation",
    "product engineering services",
  ],
  openGraph: {
    title: "Services | Owlsey",
    description:
      "Custom platforms, internal tools, integrations, and delivery architecture shaped around your requirements.",
    url: "https://owlsey.com/services",
    siteName: "Owlsey",
    images: [
      {
        url: "https://owlsey.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Owlsey Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Owlsey",
    description:
      "Discover Owlsey's comprehensive software development services including web development, mobile apps, cloud solutions, and digital transformation.",
    images: ["https://owlsey.com/twitter-image"],
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
