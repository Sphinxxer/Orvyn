export type ProjectDestination =
  | "pdf"
  | "liveWebsite"
  | "internalCaseStudy"
  | "comingSoon";

export type ServiceWing = "Branding" | "Websites" | "Marketing";

export type PortfolioProject = {
  id: string;
  slug: string;
  client: string;
  category: string;
  description: string;
  services: string[];
  previewImage: string;
  previewAlt: string;
  workCategory?: string;
  workPreviewImage?: string;
  workPreviewAlt?: string;
  workOrder?: number;
  websiteUrl?: string;
  destinationType: ProjectDestination;
  destinationUrl?: string;
  ctaLabel: string;
  ariaLabel: string;
  label: string;
  serviceWing: ServiceWing;
  status: string;
  deckHref?: string;
  deckStatus?: "available" | "coming-soon";
  deckCtaLabel?: string;
  deckAriaLabel?: string;
  featuredOnHome: boolean;
  order: number;
  serviceWings?: ServiceWing[];
  publicationStatus?: "published" | "private";
  storeStatus?: "live" | "prelaunch" | "none";
  projectKind?: "client" | "direction";
  gallery?: Array<{ src: string; alt: string; caption: string }>;
  brief?: string;
  contribution?: string;
  storyTitle?: string;
  designNotes?: Array<{ title: string; copy: string }>;
  previewSummary?: string;
  serviceSummaries?: Partial<Record<ServiceWing, string>>;
};

const existingProjects = ([
  {
    id: "tiny-thagaimai",
    slug: "tiny-thagaimai",
    client: "TinyThagaimai",
    category: "Ecommerce & Social Media",
    description:
      "Shopify ecommerce and social media work for TinyThagaimai, a children's clothing brand.",
    services: ["Shopify Ecommerce", "Social Media"],
    previewImage: "/case-studies/previews/tiny-thagaimai-store.webp",
    previewAlt: "TinyThagaimai Shopify store homepage with children's clothing and collections",
    destinationType: "liveWebsite",
    destinationUrl: "https://thagaimai.com/",
    ctaLabel: "Visit Store",
    ariaLabel: "Visit the TinyThagaimai online store in a new tab",
    label: "Shopify Ecommerce & Social Media",
    serviceWing: "Websites",
    status: "Live online store",
    featuredOnHome: false,
    order: 0
  },
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
    workPreviewImage: "/case-studies/previews/flyir-campaign.webp",
    workPreviewAlt: "FLYIR brand identity application from its brand guidelines",
    destinationType: "pdf",
    destinationUrl: "/case-studies/flyir-brand-identity.pdf",
    ctaLabel: "View Project",
    ariaLabel: "View the FLYIR project",
    label: "Complete Brand Identity",
    serviceWing: "Branding",
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
    workPreviewImage: "/case-studies/previews/iniya-fiber-live.webp",
    destinationType: "liveWebsite",
    destinationUrl: "https://www.iniyafiber.com/",
    ctaLabel: "Visit Website",
    ariaLabel: "Visit the Iniya Fiber website in a new tab",
    label: "Website Design & Development",
    serviceWing: "Websites",
    status: "Live website",
    featuredOnHome: true,
    order: 2
  },
  {
    id: "biomode",
    slug: "biomode",
    client: "BIOMODE",
    category: "Brand Identity",
    description:
      "Shopify ecommerce and a complete brand identity system for a premium children's innerwear company.",
    services: ["Shopify Ecommerce", "Brand Identity", "Brand Guidelines", "Visual Identity System"],
    previewImage: "/case-studies/previews/biomode-main-icon.webp",
    previewAlt: "BIOMODE brand identity preview",
    workCategory: "Ecommerce & Brand Identity",
    workPreviewImage: "/case-studies/previews/biomode-banner.webp",
    workPreviewAlt: "BIOMODE's complete storefront banner with children's innerwear collections",
    workOrder: 0.5,
    websiteUrl: "https://www.biomode.in/",
    destinationType: "pdf",
    destinationUrl: "/case-studies/biomode.pdf",
    ctaLabel: "View Project",
    ariaLabel: "View the BIOMODE project",
    label: "Brand Identity",
    serviceWing: "Branding",
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
    destinationType: "internalCaseStudy",
    destinationUrl: "/case-studies/grandeur-associates",
    ctaLabel: "View Case Study",
    ariaLabel: "View the Grandeur Associates case study",
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
    destinationType: "internalCaseStudy",
    destinationUrl: "/case-studies/tric-academy",
    ctaLabel: "View Case Study",
    ariaLabel: "View the TRIC Academy case study",
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
    destinationType: "internalCaseStudy",
    destinationUrl: "/case-studies/sra-financial-planning",
    ctaLabel: "View Case Study",
    ariaLabel: "View the SRA Financial Planning case study",
    label: "Brand Direction",
    serviceWing: "Branding",
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
    destinationType: "internalCaseStudy",
    destinationUrl: "/case-studies/cameo-garments",
    ctaLabel: "View Case Study",
    ariaLabel: "View the Cameo Garments case study",
    label: "Website Concept",
    serviceWing: "Websites",
    status: "Website concept",
    deckHref: "/case-studies/cameo-garments.pdf",
    deckStatus: "coming-soon",
    featuredOnHome: false,
    order: 7
  }
] satisfies PortfolioProject[]).sort((a, b) => a.order - b.order);

const projectEditorial: Record<string, Partial<PortfolioProject>> = {
  "flyir": {
    serviceWings: ["Branding"], projectKind: "client", storeStatus: "none",
    workOrder: 0,
    previewSummary: "A visual identity and guidelines for an Indian athleisure brand.",
    storyTitle: "An identity built for movement.",
    designNotes: [
      { title: "A recognisable mark", copy: "The identity includes a primary logo, icon, submark and badge, with clear-space and minimum-size rules for consistent use." },
      { title: "Contrast with energy", copy: "Cyan accents sit against graphite black and white. The guidelines carry that palette into apparel, headwear and campaign applications." }
    ],
    brief: "A complete identity for an athleisure brand focused on the Indian market.",
    contribution: "We developed the brand's visual language, identity applications and guidelines, giving FLYIR a consistent system for presenting itself across touchpoints.",
    gallery: [
      { src: "/case-studies/previews/flyir-campaign.webp", alt: "FLYIR identity applied to an athleisure campaign", caption: "Brand identity in application" },
      { src: "/case-studies/previews/flyir-guidelines-full.webp", alt: "Complete FLYIR guidelines showing the logo system, colours, typography and applications", caption: "The complete visual system" }
    ]
  },
  "biomode": {
    serviceWings: ["Branding", "Websites"], projectKind: "client", storeStatus: "live",
    workOrder: 1, status: "Identity delivered · online store live",
    previewSummary: "A complete brand system, carried into an online store.",
    serviceSummaries: { Branding: "A visual identity system and guidelines for a children's innerwear brand.", Websites: "A Shopify store carrying the brand identity into its shopping experience." },
    storyTitle: "Care, carried through the identity.",
    designNotes: [
      { title: "Soft forms, a clear system", copy: "Rounded letterforms and a heart accent express care and approachability. The same elements appear in the primary logo, submark and compact brand icon." },
      { title: "A palette across touchpoints", copy: "Navy anchors the identity, with warm cream and coral as supporting colours. The guidelines show how that language extends to stationery, packaging and tagless labels." }
    ],
    brief: "Brand identity and Shopify ecommerce for a premium children's innerwear company.",
    contribution: "We brought BIOMODE's identity and online store together, developing the visual system, brand guidelines and ecommerce experience as connected parts of the brand.",
    gallery: [
      { src: "/case-studies/previews/biomode-banner.webp", alt: "BIOMODE's complete storefront banner with children's innerwear collections", caption: "The brand imagery used in the Shopify storefront" },
      { src: "/case-studies/previews/biomode-guidelines-clean.webp", alt: "The complete BIOMODE brand guidelines cover", caption: "Brand guidelines — the complete cover" },
      { src: "/case-studies/previews/biomode-main-icon.webp", alt: "BIOMODE's brand symbol", caption: "The identity at its simplest" }
    ]
  },
  "iniya-fiber": {
    previewSummary: "A clearer digital home for an export-focused textile business.",
    serviceWings: ["Websites"], projectKind: "client", storeStatus: "live",
    workOrder: 2, storyTitle: "Making the capabilities clear.",
    designNotes: [{ title: "Products before complexity", copy: "The homepage introduces the fibre and yarn offering, groups product capabilities and keeps the enquiry action visible alongside the business information." }],
    brief: "A modern digital presence for an export-focused textile and spinning business.",
    contribution: "We designed and developed a website that introduces the business, presents its products and makes its capabilities easier to understand.",
    gallery: [{ src: "/case-studies/previews/iniya-fiber-live.webp", alt: "Iniya Fiber's website showing its textile products and capabilities", caption: "A clearer digital home for the business" }]
  },
  "tiny-thagaimai": {
    previewSummary: "An online store and social presence for a children's clothing brand.",
    serviceSummaries: { Websites: "A Shopify store organised around children's clothing and collections.", Marketing: "Social media support alongside the brand's Shopify store. Storefront preview shown." },
    serviceWings: ["Websites", "Marketing"], projectKind: "client", storeStatus: "live",
    workOrder: 3, storyTitle: "A store organised around tiny days.",
    designNotes: [{ title: "A clear way into the collection", copy: "The store introduces the brand's everyday cotton offering and groups shopping paths for babies, toddlers and essentials, supported by the brand's social media presence." }],
    brief: "Shopify ecommerce and social media for a children's clothing brand.",
    contribution: "We worked on TinyThagaimai's Shopify store and social media, connecting its online shopping experience with the way the brand shows up in its content.",
    gallery: [{ src: "/case-studies/previews/tiny-thagaimai-store.webp", alt: "TinyThagaimai children's clothing Shopify store", caption: "The online shopping experience" }]
  }
};

const signalGravity: PortfolioProject = {
  previewSummary: "Identity, ecommerce and social media, built for launch.",
  serviceSummaries: { Branding: "A brand identity carried into the launch-page presentation.", Websites: "An ecommerce experience preparing for launch. Public launch-page preview shown.", Marketing: "Social media as part of the brand launch. Launch-page preview shown." },
  id: "signal-gravity", slug: "signal-gravity", client: "Signal Gravity",
  category: "Brand Identity, Ecommerce & Social Media",
  description: "Brand identity, ecommerce and social media for Signal Gravity. The store is preparing for launch.",
  services: ["Brand Identity", "Ecommerce", "Social Media"],
  previewImage: "/case-studies/previews/signal-gravity-prelaunch.webp",
  previewAlt: "Signal Gravity’s monochrome prelaunch landing page with its launch countdown",
  workPreviewImage: "/case-studies/previews/signal-gravity-prelaunch.webp",
  workPreviewAlt: "Captured preview of Signal Gravity’s prelaunch website and countdown",
  destinationType: "internalCaseStudy",
  destinationUrl: "/case-studies/signal-gravity", ctaLabel: "View Project",
  ariaLabel: "View the Signal Gravity project", label: "Brand Identity, Ecommerce & Social Media",
  serviceWing: "Branding", serviceWings: ["Branding", "Websites", "Marketing"],
  publicationStatus: "published", projectKind: "client", storeStatus: "prelaunch",
  websiteUrl: "https://signalgravity.in/", status: "Prelaunch", featuredOnHome: true, order: 3.5,
  workOrder: 4, storyTitle: "One brand, across three disciplines.",
  brief: "A connected brand identity, ecommerce experience and social media presence for Signal Gravity.",
  contribution: "Orvyn worked across the brand identity, ecommerce and social media. The storefront is in prelaunch, so a public store visit will be available after launch.",
  gallery: [{ src: "/case-studies/previews/signal-gravity-prelaunch.webp", alt: "Signal Gravity’s prelaunch website showing the brand identity and launch countdown", caption: "Prelaunch landing page — the countdown is shown in this captured preview." }]
};

export const portfolioProjects: PortfolioProject[] = [...existingProjects, signalGravity]
  .map((project: PortfolioProject): PortfolioProject => ({
    ...project,
    publicationStatus: project.publicationStatus ?? "published", projectKind: project.projectKind ?? "direction", storeStatus: project.storeStatus ?? "none",
    serviceWings: project.serviceWings ?? [project.serviceWing],
    ...projectEditorial[project.slug],
    ...(project.slug === "signal-gravity" ? signalGravity : {})
  }))
  .sort((a, b) => a.order - b.order);

export const publishedProjects = portfolioProjects.filter((project) => project.publicationStatus === "published");
export const clientProjects = publishedProjects.filter((project) => project.projectKind === "client");
export const directionProjects = publishedProjects.filter((project) => project.projectKind === "direction");

export function getLiveWebsite(project: PortfolioProject) {
  if (project.storeStatus !== "live") return undefined;
  return project.websiteUrl ?? (project.destinationType === "liveWebsite" ? project.destinationUrl : undefined);
}

export const workProjects: PortfolioProject[] = [...portfolioProjects].sort(
  (a: PortfolioProject, b: PortfolioProject) =>
    (a.workOrder ?? a.order) - (b.workOrder ?? b.order)
);

export { getWorkDestination } from "./project-navigation";

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

export const caseStudyDetails: CaseStudyDetail[] = publishedProjects.map((project) => {
  const narrative = caseStudyNarratives[project.slug];

  return {
      ...project,
      title: project.client,
      tags: project.services,
      whatThisShows: narrative?.whatThisShows ?? project.contribution ?? project.description,
      focusAreas: narrative?.focusAreas ?? project.services
    };
});
