import type { caseStudyDetails } from "@/data/case-studies";
﻿export const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/case-studies" },
  { label: "Contact", href: "/contact" }
];


export const services = [
  {
    title: "Branding",
    description:
      "Find the gap, sharpen the direction, and build a brand people can understand and trust.",
    tags: "Audits · Strategy · Positioning · Brand Identity",
    icon: "brand",
    imageSrc: "/capabilities/branding-editorial.webp",
    imageAlt: "Creative director arranging typography and brand identity materials"
  },
  {
    title: "Websites",
    description:
      "Create a digital home that explains the offer clearly, builds trust, and supports enquiries.",
    tags: "Web Design · Development · Landing Pages · Conversion Flow",
    icon: "website",
    imageSrc: "/capabilities/websites-editorial.webp",
    imageAlt: "Designer developing responsive website layouts in a dark studio"
  },
  {
    title: "Marketing",
    description:
      "Turn attention into visibility, enquiries, leads, and measurable movement.",
    tags: "Social Media · Performance Ads · SEO · Campaigns",
    icon: "performance",
    imageSrc: "/capabilities/marketing-editorial.webp",
    imageAlt: "Campaign director arranging content references and a visual storyboard"
  }
];


export const serviceDetails = [
  {
    title: "Branding",
    icon: "brand",
    positioning: "Find the gap, sharpen the direction, and build trust.",
    description:
      "Before a brand does more content, ads, or redesigns, it needs a clear direction and an identity people can understand. Branding brings diagnosis, positioning, messaging, and visual systems into one stronger foundation.",
    includes: [
      "Brand audits",
      "Digital presence review",
      "Positioning direction",
      "Messaging clarity",
      "Offer clarity",
      "Brand identity direction",
      "Visual systems",
      "Social media creatives",
      "Pitch decks",
      "Campaign design"
    ],
    bestFor:
      "Brands that need clearer positioning, stronger messaging, or a sharper and more consistent visual identity before building more activity.",
    relatedServices:
      "Audits · Strategy · Positioning · Messaging · Brand Identity · Visual Systems"
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
  }
];


export const serviceDecisionSteps = [
  {
    number: "01",
    title: "Find the gap",
    description:
      "The first step is identifying what stops people from understanding, trusting, or taking action."
  },
  {
    number: "02",
    title: "Build the right system",
    description:
      "The right mix of branding, website, and marketing work is shaped around the actual problem."
  },
  {
    number: "03",
    title: "Improve with intent",
    description:
      "What works gets refined, what does not gets fixed, and the system becomes easier to scale."
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
  "Branding",
  "Websites",
  "Marketing",
  "Not sure yet"
];


export const budgetRanges = [
  "Under Rs. 50,000",
  "Rs. 50,000 – Rs. 1,00,000",
  "Rs. 1,00,000 – Rs. 2,50,000",
  "Rs. 2,50,000+",
  "Not sure yet"
];
export const homeTitle = "Orvyn | Branding, Websites & Marketing";


export const homeDescription =
  "Independent studio in India creating brand identities, websites, ecommerce stores and social content. Explore our work and tell us what you’re building.";


export const studioDescription =
  "Orvyn is an independent branding, website design and marketing studio based in Tirupur, Tamil Nadu, India. We create brand identities, websites, ecommerce stores and social content for brands across India.";


export const siteUrl = "https://orvyn.cc";

export const siteName = "Orvyn";

export const organizationId = `${siteUrl}/#organization`;

export const localBusinessId = `${siteUrl}/#localbusiness`;

export const websiteId = `${siteUrl}/#website`;

export const logoUrl = `${siteUrl}/orvyn-search-icon.png`;


// TODO: Add only final official Orvyn profile URLs after they are verified.
export const officialSameAs: string[] = [];


const areaServed = ["India", "Tamil Nadu", "Tirupur"];


const knowsAbout = [
  "Branding",
  "Brand Strategy",
  "Brand Identity",
  "Websites",
  "Marketing",
  "Visual Identity",
  "Visual Systems",
  "Website Design",
  "Website Development",
  "Ecommerce",
  "Shopify Ecommerce",
  "Social Media Content",
  "Content Creation",
  "Campaign Design"
];


export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: siteName,
  alternateName: "Orvyn.cc",
  url: siteUrl,
  logo: logoUrl,
  description: studioDescription,
  email: "hello@orvyn.cc",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Project enquiries",
    email: "hello@orvyn.cc",
    url: `${siteUrl}/contact`,
    areaServed: "India"
  },
  founder: {
    "@type": "Person",
    name: "Bharath Kesav"
  },
  foundingLocation: {
    "@type": "Place",
    name: "Tirupur, Tamil Nadu, India"
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tirupur",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN"
  },
  areaServed,
  knowsAbout,
  sameAs: officialSameAs
};


export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": localBusinessId,
  additionalType: "https://schema.org/ProfessionalService",
  name: siteName,
  url: siteUrl,
  image: logoUrl,
  logo: logoUrl,
  description: studioDescription,
  email: "hello@orvyn.cc",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tirupur",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN"
  },
  areaServed: ["Tirupur", "Tamil Nadu", "India"],
  sameAs: officialSameAs
};


export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: siteName,
  alternateName: "Orvyn.cc",
  url: siteUrl,
  publisher: {
    "@id": organizationId
  },
  description: homeDescription,
  about: { "@id": organizationId },
  inLanguage: "en-IN"
};


export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/#webpage`,
  url: `${siteUrl}/`,
  name: homeTitle,
  description: homeDescription,
  isPartOf: { "@id": websiteId },
  mainEntity: { "@id": organizationId },
  inLanguage: "en-IN"
};


export const globalSchema = [organizationSchema, localBusinessSchema, websiteSchema];


const serviceSchemaItems = [
  {
    name: "Branding",
    description:
      "Find the gap, sharpen the direction, and build a brand people can understand and trust.",
    serviceType: [
      "Brand Strategy",
      "Brand Identity",
      "Visual Systems"
    ]
  },
  {
    name: "Websites",
    description:
      "Create a digital home that explains your offer, builds trust, and makes the next step easy.",
    serviceType: ["Website Design", "Website Development", "Ecommerce", "Shopify Ecommerce"]
  },
  {
    name: "Marketing",
    description:
      "Turn attention into a consistent presence through content, campaigns and considered creative.",
    serviceType: ["Social Media", "Content", "Campaigns"]
  }
];


export function createServicesItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/#services`,
    name: "Orvyn services",
    itemListElement: serviceSchemaItems.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${siteUrl}/#${service.name.toLowerCase()}`,
        name: service.name,
        url: `${siteUrl}/#services`,
        description: service.description,
        provider: {
          "@id": organizationId
        },
        areaServed: "India",
        serviceType: service.serviceType
      }
    }))
  };
}


export function createFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}


export function createBreadcrumbSchema(
  items: Array<{
    name: string;
    path: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`
    }))
  };
}


type CaseStudyProject = (typeof caseStudyDetails)[number];


export function createCreativeWorkSchema(
  project: CaseStudyProject,
  description: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${siteUrl}/case-studies/${project.slug}#creativework`,
    name: project.title,
    description,
    url: `${siteUrl}/case-studies/${project.slug}`,
    creator: {
      "@id": organizationId
    },
    about: [project.category, project.serviceWing, ...(project.tags ?? [])]
  };
}


export function createBreadcrumbJsonLd(name: string, path: string) {
  return createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name, path }
  ]);
}


export function createProjectBreadcrumbJsonLd(name: string, path: string) {
  return createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Work", path: "/case-studies" },
    { name, path }
  ]);
}
