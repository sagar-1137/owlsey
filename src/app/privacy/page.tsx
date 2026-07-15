import type { Metadata } from "next";
import PrivacyContent from "@/components/page/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Owlsey",
  description:
    "Owlsey's Privacy Policy - Learn how we collect, use, and protect your personal information when you use our software development services.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal information",
    "GDPR compliance",
    "software development privacy",
  ],
  openGraph: {
    title: "Privacy Policy | Owlsey",
    description:
      "Owlsey's Privacy Policy - Learn how we collect, use, and protect your personal information.",
    url: "https://owlsey.com/privacy",
    siteName: "Owlsey",
    images: [
      {
        url: "https://owlsey.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Owlsey Privacy Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Owlsey",
    description:
      "Owlsey's Privacy Policy - Learn how we collect, use, and protect your personal information.",
    images: ["https://owlsey.com/twitter-image"],
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyContent />;
}
