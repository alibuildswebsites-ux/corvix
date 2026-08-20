import type { Metadata, Viewport } from "next";
import { Outfit, Rubik } from "next/font/google";
import "animate.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://corvix-pi.vercel.app/"),
  title: {
    default: "Corvix | Software Development & AI Agency Austin, TX",
    template: "%s | Corvix Austin",
  },
  description: "Corvix is a premier custom software development, AI agent engineering, and business setup agency based in Austin, TX. We build web apps, mobile products, and LLM integrations.",
  keywords: [
    "Web Development Austin TX",
    "AI Agency Austin Texas",
    "Custom Software Development Austin",
    "Mobile App Developers Austin",
    "LLC Formation Texas",
    "AI Agent Engineering",
    "Next.js Development Agency"
  ],
  alternates: {
    canonical: "/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Corvix",
    title: "Corvix | Software Development & AI Agency Austin, TX",
    description: "Custom web development, mobile apps, custom AI agent integrations, and Texas business setup in Austin, TX.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Corvix Austin TX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corvix | Software Development & AI Agency Austin, TX",
    description: "Custom software engineering, AI agent workflows, and US business formation.",
    images: ["/og-image.png"],
    creator: "@corvix",
  },
  verification: {
    google: "ERq6avX3oinIrgvwQwQGesI9r5EMvHMJk_3z02BYVIE",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Corvix",
  url: "https://corvix-pi.vercel.app",
  logo: "https://corvix-pi.vercel.app/apple-touch-icon.png",
  image: "https://corvix-pi.vercel.app/og-image.png",
  telephone: "+1-512-555-0199",
  email: "alibuildswebsites@gmail.com",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Austin",
    addressRegion: "TX",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.2672,
    longitude: -97.7431,
  },
  areaServed: [
    {
      "@type": "City",
      name: "Austin",
      sameAs: "https://en.wikipedia.org/wiki/Austin,_Texas",
    },
    {
      "@type": "State",
      name: "Texas",
    },
    {
      "@type": "Country",
      name: "United States",
    },
  ],
  sameAs: [
    "https://twitter.com/corvix",
    "https://github.com/corvix",
    "https://linkedin.com/company/corvix",
    "https://instagram.com/corvix",
  ],
  description:
    "Corvix is a software development and AI engineering agency in Austin, TX building custom web applications, mobile apps, enterprise RAG AI agents, and Texas business formations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${rubik.variable} [color-scheme:dark]`}>
      <body className="bg-corvix-bg text-corvix-text font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:p-4 focus:bg-white focus:text-black focus:rounded-xl focus:font-medium"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
