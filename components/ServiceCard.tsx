import Link from "next/link";
import { ArrowRight, Bot, Building2, Globe, Smartphone, Zap, type LucideIcon } from "lucide-react";
import type { Service } from "@/data/services";

const ICONS: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Bot,
  Building2,
};

export default function ServiceCard({ service }: { service: Service }) {
  // Dynamically resolve Lucide icon by name
  const Icon = ICONS[service.iconName] ?? Zap;

  return (
    <Link
      href={`/services/${service.slug}`}
      data-reveal className="group flex flex-col linear-card rounded-2xl p-6 transition-all duration-300 hover:bg-[#ffffff03] active:scale-[0.99] cursor-pointer"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#ffffff08] border border-[rgba(255,255,255,0.05)] mb-6">
        <Icon size={20} className="text-corvix-text group-hover:text-white transition-colors duration-200" />
      </div>
      <h3 className="font-display font-bold text-corvix-text text-lg mb-2 group-hover:text-white transition-colors duration-200">
        {service.title}
      </h3>
      <p className="text-corvix-muted text-sm leading-relaxed flex-1">
        {service.tagline}
      </p>
      <div className="flex items-center gap-1 mt-5 text-corvix-accent text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
        Learn more <ArrowRight size={14} />
      </div>
    </Link>
  );
}
