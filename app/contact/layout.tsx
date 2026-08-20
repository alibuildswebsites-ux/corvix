import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Corvix | Austin Software & AI Development",
  description: "Talk to Corvix about your software, AI, mobile, or business setup project. Our Austin-based team responds within 24 hours on business days.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Corvix | Austin Software & AI Development", description: "Talk to Corvix about your software, AI, mobile, or business setup project. Our Austin-based team responds within 24 hours on business days.", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
