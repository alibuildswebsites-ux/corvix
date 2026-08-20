import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Development & AI Services",
  description: "Explore Corvix services: custom web development, mobile app development, AI agents and integrations, and U.S. business setup support.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Software Development & AI Services", description: "Explore Corvix services: custom web development, mobile app development, AI agents and integrations, and U.S. business setup support.", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
