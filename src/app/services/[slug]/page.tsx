import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailContent from "@/components/page/ServiceDetailContent";
import { getServicePage, SERVICE_PAGES } from "@/data/servicePages";

const SITE_URL = "https://owlsey.com";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return { title: { absolute: "Service not found | Owlsey" } };

  const url = `${SITE_URL}/services/${page.slug}`;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: "Owlsey",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: page.name }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [`${SITE_URL}/twitter-image`],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const url = `${SITE_URL}/services/${page.slug}`;
  const parent = page.parent ? getServicePage(page.parent) : undefined;

  /* Service + breadcrumb + FAQ, all tied to the site-wide Organization so
     search engines read this as Owlsey's (Surat) service, not a stray page. */
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.name,
        serviceType: page.name,
        description: page.metaDescription,
        url,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "City", name: "Surat" },
          { "@type": "Country", name: "India" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Services", item: `${SITE_URL}/services` },
          ...(parent
            ? [{ "@type": "ListItem", position: 2, name: parent.name, item: `${SITE_URL}/services/${parent.slug}` }]
            : []),
          { "@type": "ListItem", position: parent ? 3 : 2, name: page.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ServiceDetailContent page={page} />
    </>
  );
}
