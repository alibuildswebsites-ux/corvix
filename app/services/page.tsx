import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Corvix",
  description: "Web development, mobile apps, cloud infrastructure, AI integrations, and business setup.",
};

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-32">
      <p className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-5">
        What We Offer
      </p>
      <h1 className="font-display font-extrabold text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight text-corvix-text mb-8">
        Services
      </h1>
      <p className="text-corvix-muted text-xl max-w-2xl mb-20 leading-relaxed">
        From idea to infrastructure — we handle every layer of your digital product and business.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </div>
  );
}
