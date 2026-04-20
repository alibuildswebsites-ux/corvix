# Corvix SEO Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete SEO and AI Search (GEO/AEO) overhaul for the Corvix agency website.

**Architecture:** Next.js Metadata API, Schema.org JSON-LD, and static discovery files for AI crawlers.

**Tech Stack:** Next.js 16.2.4, TypeScript, Schema.org.

---

### Task 1: Discovery Files (Crawler Instructions)

**Files:**
- Create: `/root/corvix/public/robots.txt`
- Create: `/root/corvix/public/sitemap.xml`

- [ ] **Step 1: Create robots.txt**
```text
User-agent: *
Allow: /

Sitemap: https://corvix.agency/sitemap.xml
```

- [ ] **Step 2: Create sitemap.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://corvix.agency/</loc><priority>1.0</priority></url>
  <url><loc>https://corvix.agency/about</loc><priority>0.8</priority></url>
  <url><loc>https://corvix.agency/services</loc><priority>0.8</priority></url>
  <url><loc>https://corvix.agency/portfolio</loc><priority>0.8</priority></url>
  <url><loc>https://corvix.agency/contact</loc><priority>0.8</priority></url>
  <url><loc>https://corvix.agency/services/web-development</loc><priority>0.7</priority></url>
  <url><loc>https://corvix.agency/services/mobile-development</loc><priority>0.7</priority></url>
  <url><loc>https://corvix.agency/services/ai-integrations</loc><priority>0.7</priority></url>
  <url><loc>https://corvix.agency/services/business-setup</loc><priority>0.7</priority></url>
</urlset>
```

- [ ] **Step 3: Commit**
```bash
git add public/robots.txt public/sitemap.xml
git commit -m "seo: add robots.txt and sitemap.xml"
```

---

### Task 2: AI Search Discovery (llms.txt)

**Files:**
- Create: `/root/corvix/public/llms.txt`
- Create: `/root/corvix/public/llms-full.txt`

- [ ] **Step 1: Create detailed llms.txt**
```markdown
# Corvix

> Full-service digital agency specialized in scalable software, AI agents, and US business setup.

## Core Services
- [Web Development](/services/web-development): Production-grade apps with Next.js, React, and modern stacks.
- [Mobile Development](/services/mobile-development): Cross-platform iOS/Android apps via React Native and Flutter.
- [AI Agents & Chatbots](/services/ai-integrations): Custom LLM integrations, RAG pipelines, and workflow automation.
- [Business Setup](/services/business-setup): US LLC formation, EIN registration, and banking resolution.

## Technical Excellence
Corvix emphasizes performance, engineering discipline, and purely professional delivery.

- [Full Details](/llms-full.txt)
- [Contact](/contact)
```

- [ ] **Step 2: Create comprehensive llms-full.txt**
```markdown
# Corvix — Technical Breakdown

## Engineering Philosophy
Purely professional, technical delivery. We prioritize performance, maintainability, and scalability.

## Tech Stack
- Frontend: Next.js 16+, React 19, Tailwind CSS 4.
- Animation: GSAP, Framer Motion.
- 3D: Three.js / React Three Fiber.
- Backend/Infrastructure: Scalable cloud architectures, RAG pipelines for AI.

## Detailed Service Specs

### Web Development
Production-grade websites and web applications.
- Frameworks: Next.js, React, Vue, Laravel, Django.
- Features: Responsive, mobile-first, SEO optimized, performance tuned.
- CMS: Sanity, Contentful, Strapi.

### AI Agents & Chatbots
Intelligent automation built into products.
- LLMs: Custom GPT, Claude, and open-source models.
- Capabilities: RAG pipelines, autonomous agents, workflow automation.
- Platforms: Slack, WhatsApp, Web integrations.

### Business Setup
Legal and administrative readiness for US ventures.
- LLC Formation: All 50 states.
- Compliance: EIN registration, Operating Agreements, Bylaws.
- Banking: Resolution letters for business accounts.

## Portfolio Highlights
- FinTrack Dashboard: Real-time financial analytics (Next.js, Supabase).
- ShopMate: E-commerce mobile app (React Native, Stripe).
- SupportBot AI: Customer support agent (GPT-4, Custom RAG).
```

- [ ] **Step 3: Commit**
```bash
git add public/llms.txt public/llms-full.txt
git commit -m "seo: add detailed llms.txt and llms-full.txt for AI agents"
```

---

### Task 3: Global Metadata & Schema (layout.tsx)

**Files:**
- Modify: `/root/corvix/app/layout.tsx`

- [ ] **Step 1: Update metadata and add JSON-LD**
```tsx
// Replace existing metadata and add JsonLd script in the body
export const metadata: Metadata = {
  title: {
    default: "Corvix — Build. Deploy. Scale.",
    template: "%s | Corvix",
  },
  description: "Corvix is a full-service digital agency offering web development, mobile apps, AI integrations, and business setup services.",
  keywords: ["Web Development", "AI Integration", "Mobile Apps", "Business Setup", "LLC Formation"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://corvix.agency",
    siteName: "Corvix",
    title: "Corvix — Build. Deploy. Scale.",
    description: "Professional digital engineering for web, mobile, and AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corvix — Build. Deploy. Scale.",
    description: "Professional digital engineering for web, mobile, and AI.",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Corvix",
  "url": "https://corvix.agency",
  "logo": "https://corvix.agency/logo.png",
  "description": "Corvix is a full-service digital agency offering web development, mobile apps, AI integrations, and business setup services.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  }
};

// Insert <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> in the <head> or <body>
```

- [ ] **Step 2: Commit**
```bash
git add app/layout.tsx
git commit -m "seo: upgrade global metadata and add Organization schema"
```

---

### Task 4: Content Expansion (data/services.ts)

**Files:**
- Modify: `/root/corvix/data/services.ts`

- [ ] **Step 1: Enrich service descriptions and details**
```typescript
// Update services array with more technical details
// Example for Web Development:
// details: [
//   "Next.js 16+, React 19, Vue, Laravel, Django",
//   "High-performance, mobile-first responsive architecture",
//   "Advanced SEO optimization and Core Web Vitals tuning",
//   "Headless CMS integrations (Sanity, Contentful, Strapi)",
//   "Custom API development and third-party integrations"
// ]
```

- [ ] **Step 2: Commit**
```bash
git add data/services.ts
git commit -m "seo: expand service data with more technical depth"
```

---

### Task 5: Dynamic Route Optimization (services/[slug]/page.tsx)

**Files:**
- Modify: `/root/corvix/app/services/[slug]/page.tsx`

- [ ] **Step 1: Update generateMetadata and add Service schema**
```tsx
// Add canonical URL and enhanced OG tags to generateMetadata
// Add Service schema JSON-LD to the page component
```

- [ ] **Step 2: Commit**
```bash
git add app/services/[slug]/page.tsx
git commit -m "seo: optimize dynamic metadata and add Service schema"
```

---

### Task 6: Verification & Build

- [ ] **Step 1: Run build to ensure no errors**
Run: `npm run build`
Expected: Successful build.

- [ ] **Step 2: Manual Check**
Verify `http://localhost:3000/robots.txt` and `http://localhost:3000/llms.txt`.
```bash
curl -I http://localhost:3000/robots.txt
```
