import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software, AI & Mobile Development Portfolio",
  description: "Explore Corvix projects across web development, mobile apps, AI systems, SaaS products, and digital experiences.",
  alternates: { canonical: "/portfolio" },
  openGraph: { title: "Software, AI & Mobile Development Portfolio", description: "Explore Corvix projects across web development, mobile apps, AI systems, SaaS products, and digital experiences.", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
