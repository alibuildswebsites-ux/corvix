import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Corvix | Austin Software & AI Engineering Agency",
  description: "Learn about Corvix, an Austin-based software development and AI engineering agency serving startups, founders, and growing businesses.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Corvix | Austin Software & AI Engineering Agency", description: "Learn about Corvix, an Austin-based software development and AI engineering agency serving startups, founders, and growing businesses.", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
