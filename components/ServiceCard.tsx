import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import type { Service } from "@/data/services";

export default function ServiceCard({ service }: { service: Service }) {
  // Dynamically resolve Lucide icon by name
  const Icon = (Icons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[service.iconName] ?? Icons.Zap;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col bg-corvix-surface border border-corvix-surface hover:border-corvix-accent rounded-2xl p-6 transition-colors duration-200 cursor-pointer"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-corvix-bg mb-5">
        <Icon size={20} className="text-corvix-accent" />
      </div>
      <h3 className="font-display font-bold text-corvix-text text-lg mb-2 group-hover:text-corvix-accent transition-colors duration-200">
        {service.title}
      </h3>
      <p className="text-corvix-muted text-sm leading-relaxed flex-1">
        {service.tagline}
      </p>
      <div className="flex items-center gap-1 mt-5 text-corvix-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Learn more <ArrowRight size={14} />
      </div>
    </Link>
  );
}
