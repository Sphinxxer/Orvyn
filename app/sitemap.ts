import type { MetadataRoute } from "next";

const baseUrl = "https://orvyn-trial2.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/about", "/case-studies", "/contact"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
