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
      "Next.js, React, Vue, Laravel, Django",
      "Responsive, mobile-first design",
      "SEO optimized and performance tuned",
      "CMS integrations (Sanity, Contentful, Strapi)",
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
      "React Native and Flutter",
      "iOS and Android",
      "App Store and Play Store submission",
      "Push notifications, offline support, biometrics",
    ],
    iconName: "Smartphone",
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    tagline: "Reliable, scalable infrastructure built to last.",
    description:
      "We architect and deploy cloud infrastructure on AWS, GCP, and Azure. Whether you need a simple hosting setup or a full IaaS environment — we build it right.",
    details: [
      "AWS, GCP, Azure",
      "Docker, Kubernetes, Terraform",
      "CI/CD pipelines",
      "Monitoring, alerting, cost optimization",
    ],
    iconName: "Cloud",
  },
  {
    slug: "ai-integrations",
    title: "AI Agents & Chatbots",
    tagline: "Intelligent automation built into your product.",
    description:
      "We build custom AI agents and chatbot integrations using the latest LLMs. From customer support bots to autonomous agents that run business workflows.",
    details: [
      "Custom GPT and Claude-powered agents",
      "Chatbot integrations (Slack, WhatsApp, web)",
      "RAG pipelines and knowledge bases",
      "Workflow automation with AI",
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
      "LLC formation in any US state",
      "EIN (Employer Identification Number) registration",
      "Bank account resolution letter",
      "Operating agreement and bylaws drafting",
    ],
    iconName: "Building2",
  },
];
