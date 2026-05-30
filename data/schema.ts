import type { caseStudyDetails } from "./home";

export const siteUrl = "https://orvyn.cc";
export const siteName = "Orvyn";
export const organizationId = `${siteUrl}/#organization`;
export const localBusinessId = `${siteUrl}/#localbusiness`;
export const websiteId = `${siteUrl}/#website`;
export const logoUrl = `${siteUrl}/orvyn-search-icon.png`;

// TODO: Add only final official Orvyn profile URLs after they are verified.
export const officialSameAs: string[] = [];

const coreDescription =
  "Orvyn is a brand growth agency and modern internet company based in Tirupur, India, helping brands sharpen their digital presence through consulting, design, marketing, and websites.";

const areaServed = ["India", "Tamil Nadu", "Tirupur"];

const knowsAbout = [
  "Brand Growth",
  "Consulting",
  "Design",
  "Marketing",
  "Websites",
  "Brand Development",
  "Website Development",
  "Social Media Management",
  "Performance Marketing",
  "Content Direction",
  "SEO",
  "Campaigns"
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: siteName,
  alternateName: "Orvyn.cc",
  url: siteUrl,
  logo: logoUrl,
  description: coreDescription,
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
  description:
    "Orvyn is a brand growth agency and modern internet company based in Tirupur, India.",
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
  url: siteUrl,
  publisher: {
    "@id": organizationId
  },
  description:
    "Orvyn is a brand growth agency and modern internet company based in Tirupur, India.",
  inLanguage: "en-IN"
};

export const globalSchema = [organizationSchema, localBusinessSchema, websiteSchema];

const serviceSchemaItems = [
  {
    name: "Consulting",
    description:
      "Consulting helps identify what feels unclear, what needs fixing, and what direction the brand should take next.",
    serviceType: ["Brand Audits", "Strategy", "Positioning", "Messaging"]
  },
  {
    name: "Design",
    description:
      "Design shapes how the brand looks, feels, and communicates across digital touchpoints.",
    serviceType: ["Brand Identity", "Visual Systems", "Social Media Creatives", "Campaign Design"]
  },
  {
    name: "Marketing",
    description:
      "Marketing connects attention, content, campaigns, SEO, and performance systems to clearer business movement.",
    serviceType: ["Social Media Management", "Performance Marketing", "SEO", "Campaigns"]
  },
  {
    name: "Websites",
    description:
      "Websites build digital homes that explain the offer clearly, create trust, and support enquiries or sales.",
    serviceType: ["Website Design", "Website Development", "Landing Pages", "Conversion Flow"]
  }
];

export function createServicesItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/services#services`,
    name: "Orvyn services",
    itemListElement: serviceSchemaItems.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${siteUrl}/services#${service.name.toLowerCase()}`,
        name: service.name,
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
