import type { Metadata } from "next";
import { Outfit, Rubik } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
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
      <body className="bg-corvix-bg text-corvix-text font-body antialiased">
        {children}
      </body>
    </html>
  );
}
