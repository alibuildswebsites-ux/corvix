import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="group flex flex-col linear-card rounded-2xl overflow-hidden transition-all duration-300 hover:bg-[#ffffff03] cursor-pointer">
      {/* Colored placeholder image area */}
      <div className={`h-48 ${item.bgColor} flex items-center justify-center relative`}>
        <span className="font-display font-bold text-2xl text-white/20 select-none">
          {item.title}
        </span>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-corvix-accent rounded-full p-1.5">
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
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
