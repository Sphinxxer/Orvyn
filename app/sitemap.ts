import type { MetadataRoute } from "next";
import { caseStudyDetails } from "@/data/home";

const baseUrl = "https://orvyn.cc";

const routes = [
  { path: "", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" as const }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const mainRoutes = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  const caseStudyRoutes = caseStudyDetails.map((project) => ({
    url: `${baseUrl}/case-studies/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65
  }));

  return [...mainRoutes, ...caseStudyRoutes];
}
