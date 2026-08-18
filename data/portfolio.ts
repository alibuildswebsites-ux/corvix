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
];
