import type { PortfolioItem } from "@/data/portfolio";

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="flex flex-col linear-card rounded-2xl overflow-hidden">
      {/* Monochrome placeholder area */}
      <div className={`h-48 ${item.bgColor} flex items-center justify-center relative`}>
        <span className="font-display font-bold text-xl md:text-2xl text-white/20 select-none text-center px-4">
          {item.title}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-corvix-muted text-xs font-medium tracking-widest uppercase mb-2">
          {item.client}
        </p>
        <h3 className="font-display font-bold text-corvix-text text-lg mb-3">
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
