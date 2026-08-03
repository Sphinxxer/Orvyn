export type ProjectDestination =
  | "pdf"
  | "liveWebsite"
  | "internalCaseStudy"
  | "comingSoon";

export type PortfolioProject = {
  id: string;
  slug: string;
  client: string;
  category: string;
  description: string;
  services: string[];
  previewImage: string;
  previewAlt: string;
  destinationType: ProjectDestination;
  destinationUrl?: string;
  ctaLabel: string;
  ariaLabel: string;
  label: string;
  serviceWing: string;
  status: string;
  deckHref?: string;
  deckStatus?: "available" | "coming-soon";
  deckCtaLabel?: string;
  deckAriaLabel?: string;
  featuredOnHome: boolean;
  order: number;
};

export const portfolioProjects = ([
  {
    id: "flyir",
    slug: "flyir",
    client: "FLYIR",
    category: "Branding",
    description:
      "A complete brand identity created for an athleisure brand focused on the Indian market.",
    services: ["Brand Identity", "Visual Identity", "Brand Guidelines"],
    previewImage: "/case-studies/previews/flyir-brand-identity-cover.webp",
    previewAlt: "FLYIR athleisure brand identity created by Orvyn",
    destinationType: "pdf",
    destinationUrl: "/case-studies/flyir-brand-identity.pdf",
    ctaLabel: "View Project",
    ariaLabel: "View the FLYIR project",
    label: "Complete Brand Identity",
    serviceWing: "Design",
    status: "Complete brand identity",
    deckHref: "/case-studies/flyir-brand-identity.pdf",
    deckStatus: "available",
    deckCtaLabel: "Open Brand Identity PDF in new tab",
    deckAriaLabel: "Open the FLYIR brand identity PDF in a new tab",
    featuredOnHome: true,
    order: 1
  },
  {
    id: "iniya-fiber",
    slug: "iniya-fiber",
    client: "Iniya Fiber",
    category: "Websites",
    description:
      "A modern website designed and developed to present an export-focused textile and spinning business with clarity.",
    services: ["Website Design", "Website Development", "Digital Presence"],
    previewImage: "/case-studies/previews/iniya-fiber-website.webp",
    previewAlt: "Iniya Fiber website designed and developed by Orvyn",
    destinationType: "liveWebsite",
    // TODO: Replace the preview URL with the approved Iniya Fiber production domain after client approval.
    destinationUrl: "https://iniyafiber.vercel.app/",
    ctaLabel: "View Website Preview",
    ariaLabel: "View the Iniya Fiber website preview in a new tab",
    label: "Website Design & Development",
    serviceWing: "Websites",
    status: "Website preview",
    featuredOnHome: true,
    order: 2
  },
  {
    id: "biomode",
    slug: "biomode",
    client: "BIOMODE",
    category: "Brand Identity",
    description:
      "A complete brand identity system designed for a premium children's innerwear company.",
    services: ["Brand Identity", "Brand Guidelines", "Visual Identity System"],
    previewImage: "/case-studies/previews/biomode-main-icon.jpg",
    previewAlt: "BIOMODE brand identity preview",
    destinationType: "pdf",
    destinationUrl: "/case-studies/biomode.pdf",
    ctaLabel: "View Project",
    ariaLabel: "View the BIOMODE project",
    label: "Brand Identity",
    serviceWing: "Design",
    status: "Brand guidelines PDF",
    deckHref: "/case-studies/biomode.pdf",
    deckStatus: "available",
    deckCtaLabel: "Open Brand Guidelines PDF in new tab",
    deckAriaLabel: "Open the BIOMODE Brand Guidelines PDF in a new tab",
    featuredOnHome: true,
    order: 3
  },
  {
    id: "grandeur-associates",
    slug: "grandeur-associates",
    client: "Grandeur Associates",
    category: "Client Direction",
    description:
      "A content and presentation direction for a premium architecture, construction, and interiors brand.",
    services: ["Strategy", "Content", "Marketing"],
    previewImage: "/case-studies/previews/grandeur-associates.jpg",
    previewAlt: "Grandeur Associates client direction preview",
    destinationType: "comingSoon",
    ctaLabel: "Case study coming soon",
    ariaLabel: "Grandeur Associates case study coming soon",
    label: "Client Direction",
    serviceWing: "Marketing",
    status: "Strategic direction",
    deckHref: "/case-studies/grandeur-associates.pdf",
    deckStatus: "coming-soon",
    featuredOnHome: false,
    order: 4
  },
  {
    id: "tric-academy",
    slug: "tric-academy",
    client: "TRIC Academy",
    category: "Website Build",
    description:
      "A website direction for a Tirupur-based sports academy built around programs, facilities, trust, and application flow.",
    services: ["Websites", "Strategy", "Local Trust"],
    previewImage: "/case-studies/previews/tric-academy.jpg",
    previewAlt: "TRIC Academy website build preview",
    destinationType: "comingSoon",
    ctaLabel: "Case study coming soon",
    ariaLabel: "TRIC Academy case study coming soon",
    label: "Website Build",
    serviceWing: "Websites",
    status: "Website build",
    deckHref: "/case-studies/tric-academy.pdf",
    deckStatus: "coming-soon",
    featuredOnHome: false,
    order: 5
  },
  {
    id: "sra-financial-planning",
    slug: "sra-financial-planning",
    client: "SRA Financial Planning",
    category: "Brand Identity",
    description:
      "A clean brand identity and digital presentation direction for a financial planning and advisory firm.",
    services: ["Brand Direction", "Strategy", "Trust"],
    previewImage: "/case-studies/previews/sra-financial-planning.jpg",
    previewAlt: "SRA Financial Planning brand identity preview",
    destinationType: "comingSoon",
    ctaLabel: "Case study coming soon",
    ariaLabel: "SRA Financial Planning case study coming soon",
    label: "Brand Direction",
    serviceWing: "Design",
    status: "Brand direction",
    deckHref: "/case-studies/sra-financial-planning.pdf",
    deckStatus: "coming-soon",
    featuredOnHome: false,
    order: 6
  },
  {
    id: "cameo-garments",
    slug: "cameo-garments",
    client: "Cameo Garments",
    category: "Website Concept",
    description:
      "A modern website direction for a Tirupur-based export business with an outdated digital presence.",
    services: ["Websites", "Strategy", "Export"],
    previewImage: "/case-studies/previews/cameo-garments.jpg",
    previewAlt: "Cameo Garments website concept preview",
    destinationType: "comingSoon",
    ctaLabel: "Case study coming soon",
    ariaLabel: "Cameo Garments case study coming soon",
    label: "Website Concept",
    serviceWing: "Websites",
    status: "Website concept",
    deckHref: "/case-studies/cameo-garments.pdf",
    deckStatus: "coming-soon",
    featuredOnHome: false,
    order: 7
  }
] satisfies PortfolioProject[]).sort((a, b) => a.order - b.order);

type CaseStudyNarrative = {
  whatThisShows: string;
  focusAreas: string[];
};

const caseStudyNarratives: Record<string, CaseStudyNarrative> = {
  "grandeur-associates": {
    whatThisShows:
      "How Orvyn structures a premium Instagram portfolio for a high-ticket construction and interiors brand.",
    focusAreas: [
      "Instagram audit",
      "Project showcase structure",
      "Premium visual direction",
      "Content pillar planning",
      "Shoot direction"
    ]
  },
  "tric-academy": {
    whatThisShows:
      "How Orvyn structures a service website around programs, facilities, trust, and application flow.",
    focusAreas: [
      "Website structure",
      "Program discovery",
      "Application flow",
      "Facility presentation",
      "Mobile-first user experience",
      "Local trust building"
    ]
  },
  "cameo-garments": {
    whatThisShows:
      "How Orvyn reframes an old business website into a sharper export-focused digital presence.",
    focusAreas: [
      "Website structure",
      "Export-focused positioning",
      "Homepage layout",
      "Mobile-first improvement",
      "Portfolio-building direction"
    ]
  },
  "sra-financial-planning": {
    whatThisShows:
      "How Orvyn approaches trust-led identity for a financial service brand.",
    focusAreas: [
      "Logo direction",
      "Brand system",
      "Poster redesign",
      "Social media identity",
      "Trust-led communication"
    ]
  }
};

export type CaseStudyDetail = PortfolioProject &
  CaseStudyNarrative & {
    title: string;
    tags: string[];
  };

export const caseStudyDetails: CaseStudyDetail[] = portfolioProjects.flatMap((project) => {
  const narrative = caseStudyNarratives[project.slug];

  if (!narrative) {
    return [];
  }

  return [
    {
      ...project,
      title: project.client,
      tags: project.services,
      ...narrative
    }
  ];
});
