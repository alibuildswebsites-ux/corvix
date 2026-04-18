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
    "Corvix is a full-service digital agency offering web development, mobile apps, cloud infrastructure, AI integrations, and business setup services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${rubik.variable}`}>
      <body className="bg-corvix-bg text-corvix-text font-body antialiased relative">
        {/* Subtle background ambient orbs for glassmorphism effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[rgba(255,255,255,0.02)] blur-[120px]" />
          <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-[rgba(255,255,255,0.015)] blur-[100px]" />
          <div className="absolute top-[40%] left-[20%] w-[20%] h-[20%] rounded-full bg-[rgba(0,119,255,0.03)] blur-[150px]" />
        </div>

        <div className="relative z-10">
          <Navbar />
          <AnimatePresenceWrapper>
            {children}
          </AnimatePresenceWrapper>
          <Footer />
        </div>
      </body>
    </html>
  );
}
