import type { Metadata } from "next";
import CookiesContent from "@/components/page/CookiesContent";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Owlsey's Cookie Policy - Learn how we use cookies and similar technologies to improve your experience on our website.",
  alternates: { canonical: "https://owlsey.com/cookies" },
  keywords: [
    "cookie policy",
    "cookie usage",
    "website cookies",
    "tracking cookies",
    "GDPR cookies",
  ],
  openGraph: {
    title: "Cookie Policy | Owlsey",
    description:
      "Owlsey's Cookie Policy - Learn how we use cookies and similar technologies to improve your experience.",
    url: "https://owlsey.com/cookies",
    siteName: "Owlsey",
    images: [
      {
        url: "https://owlsey.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Owlsey Cookie Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | Owlsey",
    description:
      "Owlsey's Cookie Policy - Learn how we use cookies and similar technologies to improve your experience.",
    images: ["https://owlsey.com/twitter-image"],
  },
};

export default function CookiePolicyPage() {
  return <CookiesContent />;
}
