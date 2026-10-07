import type { Metadata } from "next";
import AboutContent from "@/components/page/AboutContent";

const TITLE = "About Owlsey — Custom Software Studio in Surat, India";
const DESCRIPTION =
  "Owlsey is a custom software studio in Surat, Gujarat, building web apps, mobile apps and internal tools since 2020. 28+ projects, 7–8 core engineers.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "https://owlsey.com/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://owlsey.com/about",
    siteName: "Owlsey",
    images: [{ url: "https://owlsey.com/opengraph-image", width: 1200, height: 630, alt: "About Owlsey" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://owlsey.com/twitter-image"],
  },
};

/* AboutPage pointing at the site-wide Organization entity, so search engines
   and AI assistants tie this page to the same Owlsey (and not to similarly
   named companies elsewhere). */
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://owlsey.com/about#webpage",
  url: "https://owlsey.com/about",
  name: TITLE,
  description: DESCRIPTION,
  about: { "@id": "https://owlsey.com/#organization" },
  isPartOf: { "@id": "https://owlsey.com/#website" },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <AboutContent />
    </>
  );
}
