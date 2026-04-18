import { services } from "@/data/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import * as Icons from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Not Found" };
  return {
    title: `${service.title} — Corvix`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[service.iconName] ?? Icons.Zap;

  return (
    <div className="max-w-4xl mx-auto px-6 pt-12 pb-20 md:pb-32">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-corvix-muted hover:text-corvix-accent text-sm font-medium mb-12 transition-colors duration-200 cursor-pointer"
      >
        <ArrowLeft size={16} /> All Services
      </Link>

      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-corvix-surface mb-8">
        <Icon size={24} className="text-corvix-accent" />
      </div>

      <h1 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-tight text-corvix-text mb-4">
        {service.title}
      </h1>
      <p className="text-corvix-accent text-lg font-semibold mb-8">
        {service.tagline}
      </p>
      <p className="text-corvix-muted text-xl leading-relaxed mb-16 max-w-2xl">
        {service.description}
      </p>

      <h2 className="font-display font-bold text-2xl text-corvix-text mb-8">
        What&apos;s included
      </h2>
      <ul className="space-y-4 mb-20">
        {service.details.map((detail) => (
          <li key={detail} className="flex items-start gap-3">
            <div className="w-5 h-5 flex items-center justify-center rounded-full bg-corvix-accent/10 mt-0.5 shrink-0">
              <Check size={12} className="text-corvix-accent" />
            </div>
            <span className="text-corvix-muted leading-relaxed">{detail}</span>
          </li>
        ))}
      </ul>

      <div className="bg-corvix-surface border border-corvix-surface rounded-2xl p-10 text-center">
        <h3 className="font-display font-bold text-2xl text-corvix-text mb-3">
          Ready to get started?
        </h3>
        <p className="text-corvix-muted mb-8">
          Tell us about your project — we&apos;ll respond within 24 hours.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-black font-semibold px-8 py-4 rounded-xl transition-colors duration-200 cursor-pointer"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
