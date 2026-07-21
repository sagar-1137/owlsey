import type { Metadata } from "next";
import TermsContent from "@/components/page/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Owlsey's Terms of Service - Read our terms and conditions for using our custom software development services and digital solutions.",
  alternates: { canonical: "https://owlsey.com/terms" },
  keywords: [
    "terms of service",
    "terms and conditions",
    "legal terms",
    "software development terms",
    "service agreement",
  ],
  openGraph: {
    title: "Terms of Service | Owlsey",
    description:
      "Owlsey's Terms of Service - Read our terms and conditions for using our custom software development services.",
    url: "https://owlsey.com/terms",
    siteName: "Owlsey",
    images: [
      {
        url: "https://owlsey.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Owlsey Terms of Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Owlsey",
    description:
      "Owlsey's Terms of Service - Read our terms and conditions for using our custom software development services.",
    images: ["https://owlsey.com/twitter-image"],
  },
};

export default function TermsOfServicePage() {
  return <TermsContent />;
}
