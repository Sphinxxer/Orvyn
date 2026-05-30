export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" }
];

export const services = [
  {
    title: "Consulting",
    description:
      "Find what is unclear, what needs fixing, and what direction the brand should take next.",
    tags: "Audits · Strategy · Positioning · Messaging",
    icon: "system"
  },
  {
    title: "Design",
    description:
      "Make the brand look sharper, feel consistent, and communicate with more intent.",
    tags: "Brand Identity · Social Creatives · Visual Systems · Pitch Decks",
    icon: "brand"
  },
  {
    title: "Marketing",
    description:
      "Turn attention into visibility, enquiries, leads, and measurable movement.",
    tags: "Social Media · Performance Ads · SEO · Campaigns",
    icon: "performance"
  },
  {
    title: "Websites",
    description:
      "Build a digital home that explains the offer clearly and turns visitors into enquiries.",
    tags: "Web Design · Development · Landing Pages · Conversion Flow",
    icon: "website"
  }
];

export const serviceDetails = [
  {
    title: "Consulting",
    icon: "system",
    positioning: "Find the gap before building more.",
    description:
      "Before a brand does more content, ads, or redesigns, it needs to know what is actually holding it back. Consulting uncovers what feels unclear, what needs fixing, and what direction makes sense next.",
    includes: [
      "Brand audits",
      "Digital presence review",
      "Positioning direction",
      "Messaging clarity",
      "Offer clarity",
      "Growth planning",
      "Campaign direction",
      "Content and website recommendations"
    ],
    bestFor:
      "Brands that know something is not working but need a clearer diagnosis before investing in more marketing, content, or website work.",
    relatedServices: "Audits · Strategy · Positioning · Messaging · Growth Direction"
  },
  {
    title: "Design",
    icon: "brand",
    positioning: "Make the brand easier to notice, understand, and trust.",
    description:
      "People judge a brand before they fully understand it. Design makes the first impression sharper, the message clearer, and every touchpoint feel more intentional.",
    includes: [
      "Brand identity direction",
      "Visual systems",
      "Social media creatives",
      "Pitch decks",
      "Campaign design",
      "Content design",
      "Brand refresh direction",
      "Creative systems"
    ],
    bestFor:
      "Brands that need a sharper visual presence, stronger consistency, and better creative communication.",
    relatedServices:
      "Brand Identity · Social Creatives · Visual Systems · Pitch Decks · Campaign Design"
  },
  {
    title: "Marketing",
    icon: "performance",
    positioning: "Move attention toward business outcomes.",
    description:
      "Attention only matters when it moves somewhere. Marketing connects content, campaigns, ads, SEO, and visibility to clearer business movement.",
    includes: [
      "Social media management",
      "Performance marketing",
      "Meta ads",
      "Campaign planning",
      "SEO basics",
      "Content planning",
      "Reels and shoot direction",
      "Monthly marketing systems",
      "Creative testing"
    ],
    bestFor:
      "Brands that are ready to get more visible, generate enquiries, improve consistency, or create stronger marketing momentum.",
    relatedServices: "Social Media · Performance Ads · SEO · Campaigns · Content Planning"
  },
  {
    title: "Websites",
    icon: "website",
    positioning: "Turn the website into a clearer reason to trust.",
    description:
      "A website should do more than exist. It should explain the offer, build trust quickly, and make the next step easy for the visitor.",
    includes: [
      "Website strategy",
      "Website design",
      "Website development",
      "Landing pages",
      "Service pages",
      "Portfolio pages",
      "Conversion flow",
      "Copy structure",
      "Mobile-first experience"
    ],
    bestFor:
      "Businesses that need a clearer digital home, stronger trust, and a website that supports enquiries, leads, or sales.",
    relatedServices:
      "Web Design · Development · Landing Pages · Conversion Flow · Portfolio Pages"
  }
];

export const serviceDecisionSteps = [
  {
    number: "01",
    title: "Find the gap",
    description:
      "We look for what is stopping people from understanding, trusting, or taking action."
  },
  {
    number: "02",
    title: "Build the right system",
    description:
      "We choose the services that solve the actual problem, not just the most obvious one."
  },
  {
    number: "03",
    title: "Improve with intent",
    description:
      "We review what works, refine what does not, and scale the parts that start creating momentum."
  }
];

export const methodSteps = [
  {
    number: "01",
    title: "Diagnose",
    description:
      "The first step is finding what feels unclear across the audience, offer, content, website, visuals, and growth gaps."
  },
  {
    number: "02",
    title: "Sharpen",
    description:
      "Next, the parts that shape perception get tightened: messaging, positioning, visual direction, content, and offer clarity."
  },
  {
    number: "03",
    title: "Build",
    description:
      "The right assets and systems are then created to move the brand forward: content, websites, landing pages, campaigns, and brand systems."
  },
  {
    number: "04",
    title: "Scale",
    description:
      "What works gets reviewed, what does not gets fixed, and growth becomes easier to control."
  }
];

export type CaseStudyDetail = {
  slug: string;
  title: string;
  category: string;
  description: string;
  whatThisShows: string;
  focusAreas: string[];
  label: string;
  serviceWing: string;
  status: string;
  previewImage: string;
  deckHref?: string;
  deckStatus?: "available" | "coming-soon";
  tags?: string[];
};

export const caseStudyDetails: CaseStudyDetail[] = [
  {
    slug: "grandeur-associates",
    title: "Grandeur Associates",
    category: "Instagram Portfolio Direction",
    description:
      "A content and presentation direction for a premium architecture, construction, and interiors brand.",
    whatThisShows:
      "How Orvyn structures a premium Instagram portfolio for a high-ticket construction and interiors brand.",
    focusAreas: [
      "Instagram audit",
      "Project showcase structure",
      "Premium visual direction",
      "Content pillar planning",
      "Shoot direction"
    ],
    label: "Client Direction",
    serviceWing: "Marketing",
    status: "Strategic direction",
    previewImage: "/case-studies/previews/grandeur-associates.jpg",
    deckHref: "/case-studies/grandeur-associates.pdf",
    deckStatus: "available",
    tags: ["Strategy", "Content", "Marketing"]
  },
  {
    slug: "tric-academy",
    title: "TRIC Academy",
    category: "Website Direction",
    description:
      "A website direction for a Tirupur-based sports academy built around programs, facilities, trust, and application flow.",
    whatThisShows:
      "How Orvyn structures a service website around programs, facilities, trust, and application flow.",
    focusAreas: [
      "Website structure",
      "Program discovery",
      "Application flow",
      "Facility presentation",
      "Mobile-first user experience",
      "Local trust building"
    ],
    label: "Website Build",
    serviceWing: "Websites",
    status: "Website build",
    previewImage: "/case-studies/previews/tric-academy.jpg",
    deckHref: "/case-studies/tric-academy.pdf",
    deckStatus: "coming-soon",
    tags: ["Websites", "Strategy", "Local trust"]
  },
  {
    slug: "cameo-garments",
    title: "Cameo Garments",
    category: "Website Revamp Concept",
    description:
      "A modern website direction for a Tirupur-based garment exporter with an outdated digital presence.",
    whatThisShows:
      "How Orvyn reframes an old business website into a sharper export-focused digital presence.",
    focusAreas: [
      "Website structure",
      "Export-focused positioning",
      "Homepage layout",
      "Mobile-first improvement",
      "Portfolio-building direction"
    ],
    label: "Website Concept",
    serviceWing: "Websites",
    status: "Website concept",
    previewImage: "/case-studies/previews/cameo-garments.jpg",
    deckHref: "/case-studies/cameo-garments.pdf",
    deckStatus: "available",
    tags: ["Websites", "Strategy", "Export"]
  },
  {
    slug: "sra-financial-planning",
    title: "SRA Financial Planning",
    category: "Brand Identity Direction",
    description:
      "A clean brand identity and digital presentation direction for a financial planning and advisory firm.",
    whatThisShows:
      "How Orvyn approaches trust-led identity for a financial service brand.",
    focusAreas: [
      "Logo direction",
      "Brand system",
      "Poster redesign",
      "Social media identity",
      "Trust-led communication"
    ],
    label: "Brand Direction",
    serviceWing: "Design",
    status: "Brand direction",
    previewImage: "/case-studies/previews/sra-financial-planning.jpg",
    deckHref: "/case-studies/sra-financial-planning.pdf",
    deckStatus: "available",
    tags: ["Brand Direction", "Strategy", "Trust"]
  }
];

export const caseStudyProcessSteps = [
  {
    number: "01",
    title: "Understand the business",
    description: "We first understand the brand, offer, audience, and current gaps."
  },
  {
    number: "02",
    title: "Define the direction",
    description:
      "We decide what needs to change visually, strategically, and structurally."
  },
  {
    number: "03",
    title: "Build the system",
    description:
      "We create the assets, pages, content, or campaigns needed to move the brand forward."
  },
  {
    number: "04",
    title: "Refine the outcome",
    description:
      "We improve the work based on clarity, usability, perception, and performance."
  }
];


export const teamMembers = [
  {
    name: "Bharath Kesav",
    title: "Founder",
    role: "Creative Direction",
    description:
      "Works across brand direction, content structure, and project strategy to keep every Orvyn build clear and intentional.",
    imageSrc: "/team/bharath-kesav.jpg",
    alt: "Bharath Kesav — Founder of Orvyn"
  },
  {
    name: "Bhoopesh",
    title: "Production Director",
    role: "Video Production",
    description:
      "Works across shoot planning, video execution, and production flow to help brands create sharper visual content.",
    imageSrc: "/team/bhoopesh.jpg",
    alt: "Bhoopesh — Production Director at Orvyn"
  },
  {
    name: "Kishore",
    title: "Graphics Lead",
    role: "Visual Design",
    description:
      "Works across social creatives, visual systems, and design execution to keep brand communication clear and consistent.",
    imageSrc: "/team/kishore.jpg",
    alt: "Kishore — Graphics Lead at Orvyn"
  }
];

export const contactNeeds = [
  "Consulting",
  "Design",
  "Marketing",
  "Websites",
  "Not sure yet"
];

export const budgetRanges = [
  "Under Rs. 50,000",
  "Rs. 50,000 – Rs. 1,00,000",
  "Rs. 1,00,000 – Rs. 2,50,000",
  "Rs. 2,50,000+",
  "Not sure yet"
];
