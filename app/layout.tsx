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
    default: "Corvix | Software Development & AI Engineering Agency",
    template: "%s | Corvix",
  },
  description: "Corvix is an Austin-based software development and AI engineering agency building web apps, mobile products, AI agents, and business setup solutions for startups and growing companies.",
  keywords: [
    "software development agency",
    "AI engineering agency",
    "custom software development",
    "AI agent development",
    "web application development",
    "mobile app development",
    "software development Austin",
    "AI development Austin"
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
    title: "Corvix | Software Development & AI Engineering Agency",
    description: "Custom software, web and mobile development, AI agent engineering, and business setup support from an Austin-based team.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Corvix Austin TX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corvix | Software Development & AI Engineering Agency",
    description: "Custom software engineering, AI agent workflows, and US business formation.",
    images: ["/og-image.png"],
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
  email: "alibuildswebsites@gmail.com",
  areaServed: [
    { "@type": "City", name: "Austin" },
    { "@type": "State", name: "Texas" },
    { "@type": "Country", name: "United States" },
  ],
  description:
    "Corvix is a software development, AI engineering, and business setup agency based in Austin, Texas.",
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
