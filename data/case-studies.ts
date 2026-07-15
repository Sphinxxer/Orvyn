export type PortfolioProject = {
  slug: string;
  client: string;
  category: string;
  filters: Array<"BRANDING" | "WEBSITES" | "MARKETING" | "CONSULTING">;
  description: string;
  services: string[];
  previewImage: string;
  href: string;
  ctaLabel: string;
  kind: "pdf" | "project";
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "biomode",
    client: "BIOMODE",
    category: "Brand Identity",
    filters: ["BRANDING"],
    description:
      "A complete brand identity system designed for a premium children's innerwear company.",
    services: ["Identity", "Guidelines", "Visual System"],
    previewImage: "/case-studies/previews/biomode-brand-guidelines.jpg",
    href: "/case-studies/biomode.pdf",
    ctaLabel: "Open PDF",
    kind: "pdf"
  },
  {
    slug: "grandeur-associates",
    client: "Grandeur Associates",
    category: "Client Direction",
    filters: ["CONSULTING", "MARKETING"],
    description:
      "A content and presentation direction for a premium architecture, construction, and interiors brand.",
    services: ["Content", "Direction", "Portfolio"],
    previewImage: "/case-studies/previews/grandeur-associates.jpg",
    href: "/case-studies/grandeur-associates.pdf",
    ctaLabel: "View Case Study",
    kind: "pdf"
  },
  {
    slug: "tric-academy",
    client: "TRIC Academy",
    category: "Website",
    filters: ["WEBSITES"],
    description:
      "A website direction for a Tirupur-based sports academy built around programs, facilities, trust, and application flow.",
    services: ["Websites", "Structure", "Local Trust"],
    previewImage: "/case-studies/previews/tric-academy.jpg",
    href: "/case-studies/tric-academy",
    ctaLabel: "Visit Website",
    kind: "project"
  },
  {
    slug: "sra-financial-planning",
    client: "SRA Financial Planning",
    category: "Brand Identity",
    filters: ["BRANDING"],
    description:
      "A clean brand identity and digital presentation direction for a financial planning and advisory firm.",
    services: ["Identity", "Trust", "Design System"],
    previewImage: "/case-studies/previews/sra-financial-planning.jpg",
    href: "/case-studies/sra-financial-planning.pdf",
    ctaLabel: "View",
    kind: "pdf"
  },
  {
    slug: "cameo-garments",
    client: "Cameo Garments",
    category: "Website",
    filters: ["WEBSITES"],
    description:
      "A modern website direction for a Tirupur-based export business with an outdated digital presence.",
    services: ["Websites", "Positioning", "Concept"],
    previewImage: "/case-studies/previews/cameo-garments.jpg",
    href: "/case-studies/cameo-garments",
    ctaLabel: "Open Website",
    kind: "project"
  }
];
