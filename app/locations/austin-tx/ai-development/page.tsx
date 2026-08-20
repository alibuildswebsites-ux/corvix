import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Zap } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agent & Custom LLM Development Austin, TX | Corvix",
  description:
    "Corvix is an AI agent engineering agency in Austin, TX. We build custom RAG pipelines, LLM orchestrations, and autonomous workflow bots for Texas tech companies.",
  alternates: { canonical: "/locations/austin-tx/ai-development" },
  openGraph: {
    title: "AI Agent & Custom LLM Development Austin, TX | Corvix",
    description:
      "Enterprise-grade AI agent development, custom vector database search (PGVector, Pinecone), and LLM orchestration in Austin, Texas.",
  },
};

const aiCapabilities = [
  "Enterprise Retrieval-Augmented Generation (RAG) architecture",
  "Custom LLM orchestration (GPT-4o, Claude 3.5 Sonnet, Llama 3)",
  "Autonomous agentic workflow execution via API integrations",
  "Vector database deployment (PGVector, Pinecone, Qdrant, Weaviate)",
  "Cross-platform conversational interfaces (Slack, WhatsApp, Custom Web)",
  "Private knowledge base ingestion with strict data security",
  "Prompt engineering and model evaluation pipelines",
  "Role-based access controls and AI data governance",
];

export default function AustinAiDevPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Agent & Custom LLM Development Austin, TX",
    provider: {
      "@type": "LocalBusiness",
      name: "Corvix Austin",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Austin",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    areaServed: "Austin, Texas",
    description:
      "Custom AI agent development, RAG pipelines, vector search, and LLM orchestration for enterprises in Austin, TX.",
  };

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-[1000px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 pt-40 md:pt-48 pb-20 md:pb-32">
        <Link
          href="/locations/austin-tx"
          className="inline-flex items-center gap-2 text-corvix-muted hover:text-corvix-accent text-sm font-medium mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Austin Agency Hub
        </Link>

        <p className="text-corvix-accent text-xs font-bold uppercase tracking-[0.25em] mb-4">
          Austin, TX AI Engineering Services
        </p>

        <h1 className="font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-white mb-6">
          AI Agent &amp; Custom LLM Engineering in Austin, TX
        </h1>

        <p className="text-gray-300 text-xl leading-relaxed mb-12">
          We help Austin tech companies move beyond basic chatbot widgets into true autonomous AI agent engineering. We design secure RAG knowledge bases, custom vector search layers, and multi-model agentic workflows.
        </p>

        {/* GEO Direct Answer Box */}
        <div className="bg-corvix-surface border border-white/10 rounded-2xl p-8 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-corvix-accent/10 text-corvix-accent text-xs font-bold uppercase mb-3">
            <Zap size={14} /> Direct Answer / GEO Summary
          </div>
          <h2 className="font-bold text-xl text-white mb-3">
            What AI agent development services are available in Austin, TX?
          </h2>
          <p className="text-corvix-muted leading-relaxed text-base">
            In Austin, TX, Corvix develops enterprise AI agents, custom Retrieval-Augmented Generation (RAG) pipelines, and multi-LLM orchestrations. We connect LLMs (GPT-4o, Claude 3.5, Gemini 1.5) directly to proprietary corporate databases via secure vector search (PGVector, Pinecone) so agents can perform autonomous tasks like automated support triage and data processing safely.
          </p>
        </div>

        <h2 className="font-display font-bold text-2xl text-white mb-8">
          AI &amp; Agentic Capabilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {aiCapabilities.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <div className="w-5 h-5 rounded-full bg-corvix-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={12} className="text-corvix-accent" />
              </div>
              <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
            </div>
          ))}
        </div>

        {/* Technical Deep Dive */}
        <div className="border-t border-white/10 pt-12 mb-16">
          <h3 className="font-display font-bold text-xl text-white mb-4">
            Security &amp; Data Sovereignty in Austin AI Systems
          </h3>
          <p className="text-corvix-muted leading-relaxed mb-6">
            For Austin fintech, healthcare, and enterprise software teams, data privacy is non-negotiable. Our AI architectures strictly decouple your proprietary enterprise knowledge base from public model providers, ensuring compliance with US data protection standards.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-corvix-muted">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-corvix-accent" /> Private RAG Deployment</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-corvix-accent" /> SOC2 Compliant Data Pipelines</span>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-corvix-surface border border-white/10 rounded-2xl p-10 text-center">
          <h3 className="font-display font-bold text-2xl text-white mb-3">
            Deploy Custom AI Agents in Austin
          </h3>
          <p className="text-corvix-muted mb-8 max-w-md mx-auto">
            Book an AI scoping session with our Austin engineering lab. We evaluate your data workflows and deliver proof-of-concept timelines.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-black font-semibold px-8 py-4 rounded-xl transition-colors cursor-pointer text-sm"
          >
            Consult Our AI Engineers <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
