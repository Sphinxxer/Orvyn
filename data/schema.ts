import type { caseStudyDetails } from "./case-studies";
import { homeDescription, homeTitle, studioDescription } from "./site-metadata";

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
