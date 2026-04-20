import type { Metadata } from "next";
import { Outfit, Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatePresenceWrapper from "@/components/AnimatePresenceWrapper";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://corvix.com"),
  title: {
    default: "Corvix — Build. Deploy. Scale.",
    template: "%s | Corvix",
  },
  description: "Corvix helps businesses build, deploy, and scale with AI-integrated solutions and seamless business setup.",
  keywords: ["Web Development", "AI Integration", "Mobile Apps", "Business Setup", "LLC Formation"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://corvix.com",
    siteName: "Corvix",
    title: "Corvix — Build. Deploy. Scale.",
    description: "AI-integrated solutions and business setup services.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Corvix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corvix — Build. Deploy. Scale.",
    description: "AI-integrated solutions and business setup services.",
    images: ["/og-image.png"],
    creator: "@corvix",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Corvix",
    "url": "https://corvix.com",
    "logo": "https://corvix.com/logo.png",
    "sameAs": [
      "https://twitter.com/corvix",
      "https://github.com/corvix"
    ],
    "description": "Corvix helps businesses build, deploy, and scale with AI-integrated solutions."
  };

  return (
    <html lang="en" className={`${outfit.variable} ${rubik.variable}`}>
      <body className="bg-corvix-bg text-corvix-text font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <AnimatePresenceWrapper>
          {children}
        </AnimatePresenceWrapper>
        <Footer />
      </body>
    </html>
  );
}
