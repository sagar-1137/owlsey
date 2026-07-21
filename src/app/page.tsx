import type { Metadata } from "next";
import HomeContent from "@/components/page/HomeContent";

export const metadata: Metadata = {
  title: { absolute: "Owlsey | Custom Software & Digital Solutions" },
  description:
    "Owlsey builds custom software, web applications, mobile apps, and internal tools — engineered for scale and reliability. Turning your product vision into a production-ready reality.",
  alternates: { canonical: "https://owlsey.com" },
  keywords: [
    "custom software development",
    "web application development",
    "mobile app development",
    "full stack development",
    "React Next.js development",
    "Flutter app development",
    "scalable software solutions",
    "internal tools development",
    "SaaS development agency",
    "product engineering",
    "UI UX design",
    "software consulting",
  ],
  openGraph: {
    title: "Owlsey | Custom Software & Digital Solutions",
    description:
      "Owlsey builds custom software, web applications, mobile apps, and internal tools — engineered for scale and reliability.",
    url: "https://owlsey.com",
    siteName: "Owlsey",
    images: [
      {
        url: "https://owlsey.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Owlsey — Custom Software & Digital Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Owlsey | Custom Software & Digital Solutions",
    description:
      "Owlsey builds custom software, web applications, mobile apps, and internal tools — engineered for scale and reliability.",
    images: ["https://owlsey.com/twitter-image"],
  },
};

export default function Home() {
  return <HomeContent />;
}
