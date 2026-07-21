import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LoaderWrapper } from "@/components/common/LoaderWrapper";
import { CustomCursor } from "@/components/common/CustomCursor";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { CookieConsent } from "@/components/common/CookieConsent";

// Body / UI sans. Headings (EB Garamond), labels (Geist Mono) and the brand
// display (Bebas Neue) are self-hosted via @font-face in globals.css.
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const SITE_URL = "https://owlsey.com";
const SITE_NAME = "Owlsey";
const TITLE = "Owlsey | Custom Software & Digital Solutions";
const DESCRIPTION =
  "Owlsey builds custom software, web applications, mobile apps, and internal tools — engineered for scale and reliability. Turning your product vision into a production-ready reality.";

/* ── Structured data (JSON-LD) ─────────────────────────────
   Organization + WebSite entities surface Owlsey as a knowledge
   graph entity and strengthen AI/LLM citation. */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "Owlsey Software",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/icons/favicon.svg`,
        contentUrl: `${SITE_URL}/icons/favicon.svg`,
        caption: SITE_NAME,
      },
      image: { "@id": `${SITE_URL}/#logo` },
      description: DESCRIPTION,
      slogan: "Software that fits.",
      email: "hello@owlsey.com",
      areaServed: { "@type": "Place", name: "Worldwide" },
      knowsAbout: [
        "Custom software development",
        "Web application development",
        "Mobile app development",
        "Internal tools development",
        "Software integrations",
        "Product engineering",
        "React",
        "Next.js",
        "Flutter",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@owlsey.com",
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
      sameAs: ["https://twitter.com/owlsey"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  /* ── Core ─────────────────────────────────────────────── */
  title: {
    default: TITLE,
    template: "%s | Owlsey",
  },
  description: DESCRIPTION,
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
    "owlsey",
  ],
  authors: [{ name: "Owlsey", url: SITE_URL }],
  creator: "Owlsey",
  publisher: "Owlsey",
  category: "Technology",

  /* ── Canonical & Robots ────────────────────────────────── */
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Icons ─────────────────────────────────────────────── */
  icons: {
    icon: [
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/icons/apple-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icons/favicon.svg",
  },

  /* ── Open Graph ────────────────────────────────────────── */
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Owlsey — Custom Software & Digital Solutions",
        type: "image/png",
      },
    ],
  },

  /* ── Twitter / X Card ──────────────────────────────────── */
  twitter: {
    card: "summary_large_image",
    site: "@owlsey",
    creator: "@owlsey",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/twitter-image",
        alt: "Owlsey — Custom Software & Digital Solutions",
      },
    ],
  },

  /* ── App / Browser Theming ─────────────────────────────── */
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#050505" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`js ${geist.variable} bg-background scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("owlsey:intro-seen")&&!location.search.includes("intro=1"))document.documentElement.classList.add("owlsey-intro-seen")}catch(e){}`,
          }}
        />
        {/* JS-disabled fallback: strip the `js` class so GSAP intro hides
            never lock the content out. */}
        <noscript>
          <style>{`html.js [data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        suppressHydrationWarning
        className="bg-background text-foreground min-h-screen relative font-sans antialiased"
      >
        <ThemeProvider>
          <SmoothScroll />
          <LoaderWrapper />
          <CustomCursor />
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
