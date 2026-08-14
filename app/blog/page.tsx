import Link from "next/link";
import { blogPosts } from "@/data/blogs";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Engineering & AI Insights",
  description:
    "Technical breakdowns and strategic thinking from the Corvix team. Performance engineering, AI agents, and US business setup.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 pt-40 md:pt-48 pb-20 md:pb-32">
      <p className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-5">
        Engineering &amp; AI Insights
      </p>
      <h1 className="font-display font-extrabold text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight text-corvix-text mb-8">
        Blog
      </h1>
      <p className="text-corvix-muted text-xl max-w-2xl mb-20 leading-relaxed">
        Technical breakdowns and strategic thinking from the Corvix team. Scaling, performance,
        AI agents, and business setup.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl p-6 bg-white/[0.03] border border-[rgba(255,255,255,0.08)] transition-colors duration-300 hover:bg-[#ffffff06] hover:border-corvix-accent/30 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-corvix-accent text-xs font-semibold uppercase tracking-wider mb-4">
              <span>{post.category}</span>
              {post.targetLocation && (
                <>
                  <span className="w-1 h-1 rounded-full bg-corvix-muted" />
                  <span>{post.targetLocation}</span>
                </>
              )}
            </div>

            <h3 className="font-display font-bold text-corvix-text text-lg mb-2 group-hover:text-white transition-colors duration-200">
              {post.title}
            </h3>

            <p className="text-corvix-muted text-sm leading-relaxed flex-1">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between mt-5 pt-5 border-t border-white/5">
              <div className="flex items-center gap-4 text-corvix-muted text-xs">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {post.readingTime}
                </span>
              </div>
              <span className="flex items-center gap-1 text-white text-sm font-medium opacity-100 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 transition-opacity duration-200">
                Read <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}