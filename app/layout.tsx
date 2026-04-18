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
  title: "Corvix — Build. Deploy. Scale.",
  description:
    "Corvix is a full-service digital agency offering web development, mobile apps, AI integrations, and business setup services.",
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
