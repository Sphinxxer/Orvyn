import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CaseStudiesArchive } from "@/components/case-studies-archive";
import { SectionShell } from "@/components/section-shell";
import { createBreadcrumbJsonLd } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteFrame } from "@/components/site-frame";
import { portfolioProjects } from "@/data/case-studies";
import { organizationId, siteUrl } from "@/data/schema";

export const metadata: Metadata = {
  title: "Work | Orvyn",
  description:
    "Explore Orvyn's work across brand identity, website builds, strategic direction, and digital systems.",
  alternates: {
    canonical: "/case-studies"
  },
  openGraph: {
    title: "Work | Orvyn",
    description:
      "Explore Orvyn's work across brand identity, website builds, strategic direction, and digital systems.",
    url: "/case-studies",
    siteName: "Orvyn",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Selected work by Orvyn"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Work | Orvyn",
    description:
      "Explore Orvyn's work across brand identity, website builds, strategic direction, and digital systems.",
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
      url: project.destinationUrl
        ? project.destinationUrl.startsWith("http")
          ? project.destinationUrl
          : `${siteUrl}${project.destinationUrl}`
        : `${siteUrl}/case-studies#${project.slug}`,
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
        data={[createBreadcrumbJsonLd("Work", "/case-studies"), caseStudiesJsonLd]}
      />
      <section className="px-5 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pt-40">
        <div className="mx-auto grid w-full max-w-7xl gap-10 border-b border-white/10 pb-12 lg:grid-cols-[0.9fr_0.72fr] lg:items-end lg:gap-20 lg:pb-16">
          <div>
            <h1 data-reveal="heading" className="max-w-3xl text-balance text-4xl font-black leading-[0.98] text-white sm:text-5xl lg:text-6xl">
              Work built with clarity and intent.
            </h1>
          </div>
          <div data-reveal="body" className="lg:justify-self-end" style={{ "--reveal-delay": "90ms" } as CSSProperties}>
            <p className="max-w-xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
              A growing archive of brand identities, website builds, strategic
              directions, and digital systems shaped by Orvyn.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold sm:text-base">
              <p className="text-gold-soft">Branding. Websites. Marketing.</p>
              <span className="hidden h-4 w-px bg-white/15 sm:block" aria-hidden="true" />
              <p className="uppercase tracking-[0.16em] text-white/56">07 Projects</p>
            </div>
          </div>
        </div>
      </section>

      <SectionShell className="pt-0 lg:pt-0">
        <CaseStudiesArchive projects={portfolioProjects} />
      </SectionShell>
    </SiteFrame>
  );
}
