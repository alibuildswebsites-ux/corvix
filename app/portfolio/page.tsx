"use client";
import { useRef } from "react";
import PageWrapper from "@/components/PageWrapper";
import PortfolioCard from "@/components/PortfolioCard";
import { useReveal } from "@/hooks/useReveal";
import { portfolioItems } from "@/data/portfolio";

export default function PortfolioPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  useReveal(pageRef);

  return (
    <PageWrapper>
      <div ref={pageRef} className="max-w-6xl mx-auto px-6 pt-12 pb-32">
        <p data-reveal className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-5">
          Our Work
        </p>
        <h1 data-reveal className="font-display font-extrabold text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight text-corvix-text mb-8">
          Portfolio
        </h1>
        <p data-reveal className="text-corvix-muted text-xl max-w-2xl mb-20 leading-relaxed">
          A selection of projects we&apos;ve built — from web apps to AI agents to mobile products.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {portfolioItems.map((item) => (
            <div key={item.id} data-reveal>
              <PortfolioCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
