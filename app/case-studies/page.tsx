import type { Metadata } from "next";
import { WorkGallery } from "@/components/work-gallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbJsonLd } from "@/components/seo/breadcrumbs";
import { SiteFrame } from "@/components/site-frame";
import { workProjects } from "@/data/case-studies";
import { organizationId, siteUrl } from "@/data/schema";
const workTitle = "Selected Work | Orvyn";
const workDescription = "Brand identities, Shopify ecommerce, websites and social media. Explore the work and Orvyn's contribution to each project.";
export const metadata: Metadata = {
  title: workTitle,
  description: workDescription,
  alternates: { canonical: "/case-studies" },
  openGraph: { title: workTitle, description: workDescription, url: "/case-studies", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: workTitle, description: workDescription, images: ["/opengraph-image"] }
};
const portfolioSchema = {
  "@context": "https://schema.org", "@type": "ItemList", name: "Selected work by Orvyn",
  itemListElement: workProjects.filter((project) => project.publicationStatus === "published").map((project, index) => ({
    "@type": "ListItem", position: index + 1,
    item: { "@type": "CreativeWork", name: project.client, description: project.description, url: siteUrl + "/case-studies/" + project.slug, creator: { "@id": organizationId }, about: project.services }
  }))
};
export default function WorkPage() {
  return <SiteFrame><JsonLd data={[createBreadcrumbJsonLd("Work", "/case-studies"), portfolioSchema]} /><section className="page-intro work-intro container"><h1>Selected work.</h1><p>Brand identity, websites and social media. Connected through design.</p></section><section className="work-archive" aria-label="Orvyn portfolio"><WorkGallery projects={workProjects.filter((project) => project.publicationStatus === "published")} /></section></SiteFrame>;
}


