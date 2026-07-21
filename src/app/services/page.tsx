import type { Metadata } from "next";
import ServicesContent from "@/components/page/ServicesContent";

export const metadata: Metadata = {
  title: "Custom Software Development Services",
  description:
    "Custom platforms, internal tools, integrations, and delivery architecture shaped around your requirements and practical engineering judgement.",
  alternates: { canonical: "https://owlsey.com/services" },
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

const SERVICE_OFFERINGS = [
  {
    name: "Custom software development",
    description:
      "Bespoke platforms and systems engineered around your requirement, not a reused template.",
  },
  {
    name: "Web application development",
    description:
      "Production-grade web applications built with React and Next.js, engineered for scale and reliability.",
  },
  {
    name: "Mobile app development",
    description:
      "Native-feeling iOS and Android apps delivered with Flutter from a single codebase.",
  },
  {
    name: "Internal tools development",
    description:
      "Operations software, admin systems, and workflow automation that replace scattered manual work.",
  },
  {
    name: "Software integrations",
    description:
      "Delivery architecture that connects the tools a business already runs on.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://owlsey.com/services#service",
      name: "Owlsey — Custom Software Engineering",
      url: "https://owlsey.com/services",
      description:
        "Custom platforms, internal tools, integrations, and delivery architecture shaped around your requirements and practical engineering judgement.",
      provider: { "@id": "https://owlsey.com/#organization" },
      areaServed: { "@type": "Place", name: "Worldwide" },
      serviceType: SERVICE_OFFERINGS.map((s) => s.name),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software engineering services",
        itemListElement: SERVICE_OFFERINGS.map((offering) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: offering.name,
            description: offering.description,
            provider: { "@id": "https://owlsey.com/#organization" },
          },
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://owlsey.com/services#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://owlsey.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://owlsey.com/services",
        },
      ],
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServicesContent />
    </>
  );
}
