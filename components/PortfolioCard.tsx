import type { PortfolioItem } from "@/data/portfolio";
import { ExternalLink, Code2 } from "lucide-react";
import Image from "next/image";

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="flex flex-col linear-card rounded-2xl overflow-hidden group active:scale-[0.99] transition-transform duration-200">
      {/* Visual Header with Real Project Image Preview */}
      <div className="h-56 relative overflow-hidden border-b border-[rgba(255,255,255,0.06)] bg-corvix-bg">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-black/30 pointer-events-none" />
        
        {/* Top Controls / Links */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="text-[10px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md text-corvix-accent px-3 py-1 rounded-full border border-white/10">
            {item.client}
          </span>
          <div className="flex items-center gap-2">
            {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md hover:bg-white/20 flex items-center justify-center text-white border border-white/10 transition-colors"
              >
                <Code2 size={14} />
              </a>
            )}
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Preview"
                className="w-8 h-8 rounded-full bg-corvix-accent hover:bg-corvix-accent-hover flex items-center justify-center text-black border border-white/10 transition-colors"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 bg-corvix-card">
        <h3 className="font-display font-bold text-xl text-corvix-text tracking-tight group-hover:text-white transition-colors mb-2">
          {item.title}
        </h3>
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

        {item.liveUrl && (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-corvix-accent transition-colors mt-auto"
          >
            <span>Visit Live Website</span>
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  );
}
