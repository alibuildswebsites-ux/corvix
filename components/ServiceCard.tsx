import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import type { Service } from "@/data/services";

export default function ServiceCard({ service }: { service: Service }) {
  // Dynamically resolve Lucide icon by name
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[service.iconName] ?? Icons.Zap;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col glass-card rounded-2xl p-6 transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)] cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#ffffff08] border border-[rgba(255,255,255,0.05)] mb-6 relative z-10">
        <Icon size={20} className="text-corvix-text group-hover:text-white transition-colors duration-200" />
      </div>
      <h3 className="font-display font-bold text-corvix-text text-lg mb-2 group-hover:text-white transition-colors duration-200 relative z-10">
        {service.title}
      </h3>
      <p className="text-corvix-muted text-sm leading-relaxed flex-1 relative z-10">
        {service.tagline}
      </p>
      <div className="flex items-center gap-1 mt-5 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 relative z-10">
        Learn more <ArrowRight size={14} />
      </div>
    </Link>
  );
}
