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
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://health-predictor-two.vercel.app",
    githubUrl: "https://github.com/alibuildswebsites-ux/patient-health-risk-predictor",
  },
];
