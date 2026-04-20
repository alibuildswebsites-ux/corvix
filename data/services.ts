export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  iconName: string; // Lucide icon name — NO emojis
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Fast, scalable websites and web apps.",
    description:
      "We build production-grade websites and web applications using modern frameworks. From marketing sites to complex SaaS dashboards — we ship clean, maintainable code.",
    details: [
      "Next.js 16+, React 19, Vue, Laravel, Django",
      "High-performance, mobile-first responsive architecture",
      "Advanced SEO optimization and Core Web Vitals tuning",
      "Headless CMS integrations (Sanity, Contentful, Strapi)",
      "Custom API development and third-party integrations",
    ],
    iconName: "Globe",
  },
  {
    slug: "mobile-development",
    title: "Mobile App Development",
    tagline: "iOS and Android apps that users actually love.",
    description:
      "We design and build cross-platform mobile applications using React Native and Flutter. Fast to market, native feel, single codebase.",
    details: [
      "Cross-platform optimization with React Native and Flutter",
      "Native-feel iOS and Android application development",
      "Real-time push notification systems and offline support",
      "Biometric authentication and secure data encryption",
      "End-to-end App Store and Play Store lifecycle management",
    ],
    iconName: "Smartphone",
  },
  {
    slug: "ai-integrations",
    title: "AI Agents & Chatbots",
    tagline: "Intelligent automation built into your product.",
    description:
      "We build custom AI agents and chatbot integrations using the latest LLMs. From customer support bots to autonomous agents that run business workflows.",
    details: [
      "Enterprise-grade RAG (Retrieval-Augmented Generation) pipelines",
      "Custom LLM orchestration (GPT-4o, Claude 3.5, Gemini 1.5)",
      "Autonomous agentic workflow automation",
      "Cross-platform chatbot deployment (Slack, WhatsApp, Web)",
      "Vector database integration and knowledge base management",
    ],
    iconName: "Bot",
  },
  {
    slug: "business-setup",
    title: "Business Setup",
    tagline: "Get your US business legally ready, fast.",
    description:
      "We handle the legal and administrative side of launching a US business. LLC formation, EIN registration, bank resolution, operating agreements, and bylaws — done for you.",
    details: [
      "Strategic US LLC formation and legal structuring",
      "EIN (Employer Identification Number) and tax compliance registration",
      "Corporate governance documentation (Operating Agreements, Bylaws)",
      "Banking resolution letters and fintech stack advisory",
      "Ongoing compliance and registered agent support",
    ],
    iconName: "Building2",
  },
];
