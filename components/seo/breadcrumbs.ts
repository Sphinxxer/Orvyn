import { createBreadcrumbSchema } from "@/data/schema";

export function createBreadcrumbJsonLd(name: string, path: string) {
  return createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name, path }
  ]);
}

export function createProjectBreadcrumbJsonLd(name: string, path: string) {
  return createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Case Studies", path: "/case-studies" },
    { name, path }
  ]);
}
