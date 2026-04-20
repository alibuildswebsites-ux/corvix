# Design: Corvix SEO Audit & Overhaul

**Status:** Draft
**Date:** 2026-04-20
**Author:** Antigravity (OpenCode Agent)

## 1. Overview
Corvix is a Next.js-based digital agency website targeting US and international clients. This design outlines a comprehensive SEO and AI Search (GEO/AEO) optimization strategy to improve visibility, crawlability, and citation rates by AI agents.

## 2. Goals
- **Search Visibility:** Improve rankings for US-specific and international "US Business Setup" and "AI Development" keywords.
- **AI Citation:** Optimize for discovery and extraction by LLMs (ChatGPT, Perplexity, Claude).
- **Technical Excellence:** Maintain a purely technical and professional tone while ensuring high performance and semantic compliance.
- **Minimalist UX:** Keep the UI/Navbar clean as per current design.

## 3. Architecture & Components

### 3.1 Metadata & Social (Next.js)
- **Global:** Enhance `app/layout.tsx` with Open Graph, Twitter Cards, and base Robots metadata.
- **Dynamic:** Update `app/services/[slug]/page.tsx` to generate service-specific meta tags and canonical URLs.

### 3.2 Structured Data (Schema.org)
- **Organization:** Global JSON-LD for agency identity (Name, URL, Logo, SameAs).
- **Service:** Page-specific JSON-LD for each professional offering.

### 3.3 Discovery Files
- **robots.txt:** Standard crawler instructions.
- **sitemap.xml:** Automated list of all static and dynamic routes.
- **llms.txt / llms-full.txt:** Detailed AI discovery guides summarizing the tech stack, services, and portfolio for AI agents.

### 3.4 Content Expansion
- **Service Data:** Expand `data/services.ts` to include:
    - **Technical Stack:** Frameworks and languages.
    - **Engineering Process:** Workflow stages.
    - **AEO Keywords:** Latent Semantic Indexing (LSI) terms for better AI extraction.

## 4. Implementation Strategy
1.  **Scaffold:** Create robots, sitemap, and LLM files in `public/`.
2.  **Core Update:** Implement global metadata and schema in `layout.tsx`.
3.  **Data Expansion:** Enrich the `services` data object.
4.  **Dynamic Update:** Refactor service page metadata and rendering.
5.  **Verification:** Build the project and check for compile errors.

## 5. Security & Privacy
- No API keys or internal secrets will be exposed in any discovery files.
- Metadata will strictly focus on public-facing agency information.

## 6. Success Criteria
- [ ] Valid `robots.txt` and `sitemap.xml` accessible at root.
- [ ] Comprehensive `llms.txt` recognized by AI crawlers.
- [ ] Correct Open Graph and JSON-LD appearing on all pages.
- [ ] Project builds successfully without SEO-related errors.
