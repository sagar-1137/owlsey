import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LoaderWrapper } from "@/components/common/LoaderWrapper";
import { PageTransitionLoader } from "@/components/common/PageTransitionLoader";
import { CustomCursor } from "@/components/common/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const retrograde = localFont({
  src: "../../public/fonts/retrograde.woff",
  display: "swap",
  variable: "--font-retrograde-local",
});

const redaction = localFont({
  src: "../../public/fonts/Redaction-Bold.woff",
  display: "swap",
  variable: "--font-redaction-local",
});

const SITE_URL = "https://owlsey.com";
const SITE_NAME = "Owlsey";
const TITLE = "Owlsey | Custom Software & Digital Solutions";
const DESCRIPTION =
  "Owlsey builds custom software, web applications, mobile apps, and internal tools — engineered for scale and reliability. Turning your product vision into a production-ready reality.";

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
  maximumScale: 5,
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
      className={`js ${inter.variable} ${geist.variable} ${retrograde.variable} ${redaction.variable} bg-background scroll-smooth`}
    >
      <head>
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
          <LoaderWrapper />
          <PageTransitionLoader />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
