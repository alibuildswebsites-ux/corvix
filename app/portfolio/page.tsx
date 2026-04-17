import PortfolioCard from "@/components/PortfolioCard";
import { portfolioItems } from "@/data/portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Corvix",
  description: "Case studies and projects from Corvix.",
};

export default function PortfolioPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-32">
      <p className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-5">
        Our Work
      </p>
      <h1 className="font-display font-extrabold text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight text-corvix-text mb-8">
        Portfolio
      </h1>
      <p className="text-corvix-muted text-xl max-w-2xl mb-20 leading-relaxed">
        A selection of projects we&apos;ve built — from web apps to AI agents to mobile products.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {portfolioItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
