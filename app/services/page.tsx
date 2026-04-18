"use client";
import { useRef } from "react";
import PageWrapper from "@/components/PageWrapper";
import ServiceCard from "@/components/ServiceCard";
import { useReveal } from "@/hooks/useReveal";
import { services } from "@/data/services";

export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  useReveal(pageRef);

  return (
    <PageWrapper>
      <div ref={pageRef} className="max-w-6xl mx-auto px-6 pt-12 pb-32">
        <p data-reveal className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-5">
          What We Offer
        </p>
        <h1 data-reveal className="font-display font-extrabold text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight text-corvix-text mb-8">
          Services
        </h1>
        <p data-reveal className="text-corvix-muted text-xl max-w-2xl mb-20 leading-relaxed">
          From idea to infrastructure — we handle every layer of your digital product and business.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s.slug} data-reveal>
              <ServiceCard service={s} />
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
