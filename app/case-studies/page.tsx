import type { Metadata } from "next";
import { CaseStudiesArchive } from "@/components/case-studies-archive";
import { SectionShell } from "@/components/section-shell";
import { createBreadcrumbJsonLd } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteFrame } from "@/components/site-frame";
import { portfolioProjects } from "@/data/case-studies";
import { organizationId, siteUrl } from "@/data/schema";

export const metadata: Metadata = {
  title: "Case Studies | Orvyn",
  description:
    "Explore Orvyn's growing archive of brand directions, website builds, digital systems, and project decks shaped with clarity and intent.",
  alternates: {
    canonical: "/case-studies"
  },
  openGraph: {
    title: "Case Studies | Orvyn",
    description:
      "Explore Orvyn's growing archive of brand directions, website builds, digital systems, and project decks shaped with clarity and intent.",
    url: "/case-studies",
    siteName: "Orvyn",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Orvyn case studies"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Orvyn",
    description:
      "Explore Orvyn's growing archive of brand directions, website builds, digital systems, and project decks shaped with clarity and intent.",
    images: ["/og-image.png"]
  }
};

const caseStudiesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Orvyn portfolio and project decks",
  itemListElement: portfolioProjects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.client,
      description: project.description,
      url: project.href.startsWith("http") ? project.href : `${siteUrl}${project.href}`,
      creator: {
        "@id": organizationId
      },
      about: [project.category, ...project.services]
    }
  }))
};

export default function CaseStudiesPage() {
  return (
    <SiteFrame>
      <JsonLd
        data={[createBreadcrumbJsonLd("Case Studies", "/case-studies"), caseStudiesJsonLd]}
      />
      <section className="flex min-h-[58vh] items-end px-5 pb-16 pt-[120px] sm:px-6 lg:min-h-[62vh] lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <p
            className="reveal-up text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft sm:text-sm"
            style={{ animationDelay: "0ms" }}
          >
            Selected Work
          </p>
          <h1
            className="reveal-up mt-6 max-w-5xl text-balance text-4xl font-black leading-[0.98] text-white sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "110ms" }}
          >
            Projects built with clarity and intention.
          </h1>
          <p
            className="reveal-up mt-6 max-w-3xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8"
            style={{ animationDelay: "220ms" }}
          >
            From brand systems and websites to growth strategies and digital direction,
            every project reflects how Orvyn approaches modern brand building.
          </p>
        </div>
      </section>

      <SectionShell className="pt-0">
        <CaseStudiesArchive projects={portfolioProjects} />
      </SectionShell>
    </SiteFrame>
  );
}
