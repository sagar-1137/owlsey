import type { Metadata } from "next";
import ContactContent from "@/components/page/ContactContent";

export const metadata: Metadata = {
  title: "Start a Project | Owlsey",
  description:
    "Share your software requirement, product context, or current constraint with Owlsey. We will help shape the right technical route.",
  keywords: [
    "contact owlsey",
    "software development contact",
    "web development inquiry",
    "custom software quote",
    "mobile app development contact",
  ],
  openGraph: {
    title: "Start a Project | Owlsey",
    description:
      "Bring the requirement. Owlsey will help shape the right technical route.",
    url: "https://owlsey.com/contact",
    siteName: "Owlsey",
    images: [
      {
        url: "https://owlsey.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Contact Owlsey",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Start a Project | Owlsey",
    description:
      "Bring the requirement. Owlsey will help shape the right technical route.",
    images: ["https://owlsey.com/twitter-image"],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
