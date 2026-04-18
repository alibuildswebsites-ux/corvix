import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="group flex flex-col glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)] cursor-pointer relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
      
      {/* Colored placeholder image area */}
      <div className={`h-48 ${item.bgColor} flex items-center justify-center relative z-10`}>
        <span className="font-display font-bold text-2xl text-white/20 select-none">
          {item.title}
        </span>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-corvix-accent rounded-full p-1.5">
            <ArrowUpRight size={14} className="text-black" />
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 relative z-10">
        <p className="text-corvix-muted text-xs font-medium tracking-widest uppercase mb-2">
          {item.client}
        </p>
        <h3 className="font-display font-bold text-corvix-text text-lg mb-3 group-hover:text-corvix-accent transition-colors duration-200">
          {item.title}
        </h3>
        <p className="text-corvix-muted text-sm leading-relaxed flex-1 mb-4">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-corvix-bg text-corvix-accent px-2.5 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
