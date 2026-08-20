export type PortfolioItem = {
  id: string;
  title: string;
  client: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl: string;
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
    imageUrl: "/portfolio/raza-portfolio.webp",
    liveUrl: "https://www.alibuildswebsites.me",
    githubUrl: "https://github.com/alibuildswebsites-ux/Raza---Portfolio---Firebase",
  },
  {
    id: "lofton-platform",
    title: "Lofton Enterprise Platform",
    client: "Lofton Group",
    description:
      "A robust client and partner management platform built with TypeScript. Features real-time state management, secure modular architecture, and sleek dark mode UI.",
    tags: ["TypeScript", "Next.js", "Enterprise", "UI/UX"],
    imageUrl: "/portfolio/lofton.webp",
    liveUrl: "https://lofton-psi.vercel.app",
    githubUrl: "https://github.com/alibuildswebsites-ux/lofton",
  },
  {
    id: "tabs-manager",
    title: "Tabs Productivity Engine",
    client: "Tabs Workspace",
    description:
      "A lightning-fast tab management and workspace organization tool. Designed to boost developer productivity with keyboard navigation and zero-latency switching.",
    tags: ["TypeScript", "React", "Productivity", "Extension"],
    imageUrl: "/portfolio/tabs.webp",
    liveUrl: "https://tabs-two-opal.vercel.app",
    githubUrl: "https://github.com/alibuildswebsites-ux/tabs",
  },
  {
    id: "health-predictor",
    title: "Patient Health Risk Predictor",
    client: "MedAnalytics AI",
    description:
      "An advanced clinical machine learning dashboard for predicting patient health risks based on vitals, history, and real-time biomedical telemetry.",
    tags: ["AI / ML", "TypeScript", "Healthcare", "Analytics"],
    imageUrl: "/portfolio/health-predictor.webp",
    liveUrl: "https://health-predictor-two.vercel.app",
    githubUrl: "https://github.com/alibuildswebsites-ux/patient-health-risk-predictor",
  },
];
