export type PortfolioItem = {
  id: string;
  title: string;
  client: string;
  description: string;
  tags: string[];
  bgColor: string;
  gradient: string;
  githubUrl: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "raza-portfolio",
    title: "Raza Professional Portfolio",
    client: "Raza Enterprise",
    description:
      "A high-performance professional portfolio powered by Firebase. Features dynamic project showcases, secure authentication, and seamless cloud data sync.",
    tags: ["React", "Firebase", "TypeScript", "Tailwind"],
    bgColor: "from-blue-600/20 via-indigo-600/10 to-transparent",
    gradient: "bg-gradient-to-br from-blue-950 via-slate-900 to-black",
    githubUrl: "https://github.com/alibuildswebsites-ux/Raza---Portfolio---Firebase",
  },
  {
    id: "lofton-platform",
    title: "Lofton Enterprise Platform",
    client: "Lofton Group",
    description:
      "A robust client and partner management platform built with TypeScript. Features real-time state management, secure modular architecture, and sleek dark mode UI.",
    tags: ["TypeScript", "Next.js", "Enterprise", "UI/UX"],
    bgColor: "from-cyan-600/25 via-blue-600/10 to-transparent",
    gradient: "bg-gradient-to-br from-slate-950 via-blue-950 to-black",
    githubUrl: "https://github.com/alibuildswebsites-ux/lofton",
  },
  {
    id: "tabs-manager",
    title: "Tabs Productivity Engine",
    client: "Tabs Workspace",
    description:
      "A lightning-fast tab management and workspace organization tool. Designed to boost developer productivity with keyboard navigation and zero-latency switching.",
    tags: ["TypeScript", "React", "Productivity", "Extension"],
    bgColor: "from-emerald-600/20 via-teal-600/10 to-transparent",
    gradient: "bg-gradient-to-br from-zinc-950 via-emerald-950 to-black",
    githubUrl: "https://github.com/alibuildswebsites-ux/tabs",
  },
  {
    id: "health-predictor",
    title: "Patient Health Risk Predictor",
    client: "MedAnalytics AI",
    description:
      "An advanced clinical machine learning dashboard for predicting patient health risks based on vitals, history, and real-time biomedical telemetry.",
    tags: ["AI / ML", "TypeScript", "Healthcare", "Analytics"],
    bgColor: "from-rose-600/20 via-orange-600/10 to-transparent",
    gradient: "bg-gradient-to-br from-neutral-950 via-rose-950 to-black",
    githubUrl: "https://github.com/alibuildswebsites-ux/patient-health-risk-predictor",
  },
  {
    id: "fintrack-dashboard",
    title: "FinTrack Dashboard",
    client: "FinTrack Inc.",
    description:
      "A real-time financial analytics dashboard for a fintech startup. Built with Next.js, Tailwind, and Supabase. Includes transaction tracking, charts, and CSV export.",
    tags: ["Web Dev", "Next.js", "Supabase"],
    bgColor: "from-blue-600/15 via-sky-600/5 to-transparent",
    gradient: "bg-gradient-to-br from-slate-900 via-blue-950 to-black",
    githubUrl: "https://github.com/alibuildswebsites-ux/corvix",
  },
  {
    id: "shopmate-app",
    title: "ShopMate",
    client: "ShopMate Retail",
    description:
      "Cross-platform e-commerce mobile app for an SMB retailer. Built with React Native, integrated with Stripe payments and real-time inventory sync.",
    tags: ["Mobile", "React Native", "Stripe"],
    bgColor: "from-purple-600/15 via-pink-600/5 to-transparent",
    gradient: "bg-gradient-to-br from-zinc-900 via-purple-950 to-black",
    githubUrl: "https://github.com/alibuildswebsites-ux/corvix",
  },
  {
    id: "supportbot-ai",
    title: "SupportBot AI",
    client: "SupportBot Inc.",
    description:
      "An AI-powered customer support agent for a SaaS company. Built on GPT-4 with a custom knowledge base, integrated into their existing Intercom setup.",
    tags: ["AI Agent", "GPT-4", "Intercom"],
    bgColor: "from-amber-600/15 via-yellow-600/5 to-transparent",
    gradient: "bg-gradient-to-br from-stone-900 via-amber-950 to-black",
    githubUrl: "https://github.com/alibuildswebsites-ux/corvix",
  },
];
