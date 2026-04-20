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
  title: "Corvix — We build software that scales.",
  description:
    "Elite digital agency for founders. We deliver web apps, mobile products, and AI integrations — purpose-built for speed and scale.",
  metadataBase: new URL('https://alibuildswebsites.me'),
  openGraph: {
    title: "Corvix — We build software that scales.",
    description: "Elite digital agency for founders. We deliver web apps, mobile products, and AI integrations.",
    images: '/og-image.png',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${rubik.variable}`}>
      <body className="bg-corvix-bg text-corvix-text font-body antialiased">
        <Navbar />
        <AnimatePresenceWrapper>
          {children}
        </AnimatePresenceWrapper>
        <Footer />
      </body>
    </html>
  );
}
