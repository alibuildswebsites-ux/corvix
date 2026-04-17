export type PortfolioItem = {
  id: string;
  title: string;
  client: string;
  description: string;
  tags: string[];
  bgColor: string; // Tailwind bg class for placeholder when no image
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "fintrack-dashboard",
    title: "FinTrack Dashboard",
    client: "FinTrack Inc.",
    description:
      "A real-time financial analytics dashboard for a fintech startup. Built with Next.js, Tailwind, and Supabase. Includes transaction tracking, charts, and CSV export.",
    tags: ["Web Dev", "Next.js", "Supabase"],
    bgColor: "bg-blue-900/30",
  },
  {
    id: "shopmate-app",
    title: "ShopMate",
    client: "ShopMate Retail",
    description:
      "Cross-platform e-commerce mobile app for an SMB retailer. Built with React Native, integrated with Stripe payments and real-time inventory sync.",
    tags: ["Mobile", "React Native", "Stripe"],
    bgColor: "bg-violet-900/30",
  },
  {
    id: "supportbot-ai",
    title: "SupportBot AI",
    client: "SupportBot Inc.",
    description:
      "An AI-powered customer support agent for a SaaS company. Built on GPT-4 with a custom knowledge base, integrated into their existing Intercom setup.",
    tags: ["AI Agent", "GPT-4", "Intercom"],
    bgColor: "bg-emerald-900/30",
  },
];
