import type { PortfolioItem } from "@/data/portfolio";
import { ExternalLink, Code2 } from "lucide-react";

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="flex flex-col linear-card rounded-2xl overflow-hidden group">
      {/* Visual Header with Gradient Mesh & Preview Art */}
      <div className={`h-52 ${item.gradient} flex flex-col justify-between p-6 relative overflow-hidden border-b border-[rgba(255,255,255,0.06)]`}>
        <div className={`absolute inset-0 bg-gradient-to-tr ${item.bgColor} pointer-events-none`} />
        
        {/* Abstract window controls or status indicator */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <Code2 size={15} />
            </a>
          )}
        </div>

        {/* Center Title / Preview Title */}
        <div className="z-10 mt-auto">
          <span className="text-corvix-accent text-xs font-mono uppercase tracking-widest block mb-1">
            {item.client}
          </span>
          <h4 className="font-display font-bold text-xl text-white tracking-tight group-hover:text-corvix-accent transition-colors">
            {item.title}
          </h4>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-corvix-muted text-sm leading-relaxed flex-1 mb-6">
          {item.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-corvix-bg text-corvix-accent px-3 py-1 rounded-full font-medium border border-[rgba(255,255,255,0.04)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {item.githubUrl && (
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-corvix-accent transition-colors mt-auto"
          >
            <span>View Source & Details</span>
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  );
}
