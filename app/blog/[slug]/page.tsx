import { blogPosts } from "@/data/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Simple related posts logic
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <article className="min-h-screen bg-corvix-bg text-corvix-text pt-32 pb-20">
      {/* Reading Progress Bar (Visual Only for now) */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60]">
        <div className="h-full bg-corvix-accent w-0 transition-all duration-300" id="progress-bar" />
      </div>

      <div className="w-full max-w-[800px] mx-auto px-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-corvix-muted hover:text-corvix-accent text-sm font-medium mb-12 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 text-corvix-accent text-sm font-semibold uppercase tracking-wider mb-6">
            <span>{post.category}</span>
            {post.targetLocation && (
              <>
                <span className="w-1 h-1 rounded-full bg-corvix-muted" />
                <span>{post.targetLocation}</span>
              </>
            )}
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] tracking-tight text-white mb-8">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-corvix-muted text-sm border-y border-white/5 py-6">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{post.readingTime} read</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>{post.author}</span>
            </div>
          </div>
        </header>

        {/* Blog Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-gray-300 prose-strong:text-corvix-accent prose-a:text-corvix-accent hover:prose-a:underline">
          {/* In a real scenario, we'd use a Markdown parser like next-mdx-remote or react-markdown */}
          {/* For this specific task, I will render the content directly with basic formatting */}
          <div className="whitespace-pre-wrap leading-relaxed">
            {post.content}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <footer className="mt-24 pt-12 border-t border-white/5">
            <h2 className="font-display font-bold text-2xl text-white mb-8">Related Technical Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group p-6 rounded-2xl bg-corvix-surface border border-white/5 hover:border-corvix-accent/30 transition-all"
                >
                  <p className="text-corvix-accent text-xs font-bold uppercase mb-2">{p.category}</p>
                  <h3 className="text-white font-bold group-hover:text-corvix-accent transition-colors mb-3">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-1 text-corvix-muted text-xs group-hover:translate-x-1 transition-transform">
                    Read Post <ChevronRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          </footer>
        )}
      </div>
    </article>
  );
}
