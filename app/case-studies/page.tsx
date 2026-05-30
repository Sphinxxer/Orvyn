import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { CaseStudiesArchive } from "@/components/case-studies-archive";
import { CTASection } from "@/components/cta-section";
import { SectionShell } from "@/components/section-shell";
import { createBreadcrumbJsonLd } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteFrame } from "@/components/site-frame";
import { caseStudyDetails } from "@/data/home";
import { createCreativeWorkSchema } from "@/data/schema";

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
  name: "Orvyn case studies and project decks",
  itemListElement: caseStudyDetails.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: createCreativeWorkSchema(project, project.description)
  }))
};

export default function CaseStudiesPage() {
  return (
    <SiteFrame>
      <JsonLd
        data={[createBreadcrumbJsonLd("Case Studies", "/case-studies"), caseStudiesJsonLd]}
      />
      <section className="border-b border-white/10 px-5 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pt-44">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_0.48fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-soft sm:text-sm">
              Case Studies / Project Archive
            </p>
            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              Work built with clarity and intent.
            </h1>
          </div>
          <div className="border-t border-gold pt-6">
            <p className="text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
              A growing archive of brand directions, website builds, digital
              systems, and project work shaped to improve how businesses look,
              communicate, and grow.
            </p>
            <ButtonLink href="/contact" className="mt-7">
              Start a Project
            </ButtonLink>
          </div>
        </div>
      </section>

      <SectionShell className="pt-0">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.38fr_1fr] lg:items-end">
          <div className="border-t border-gold/45 pt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Project library
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.04] text-white sm:text-5xl">
              Strategic directions and project decks.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 lg:justify-self-end">
            Some projects are active client work, while others are concept
            directions or strategic builds. The work stays honest{" \u2014 "}no
            fake numbers, no inflated results.
          </p>
        </div>

        <CaseStudiesArchive projects={caseStudyDetails} />
      </SectionShell>

      <CTASection
        title="Have a brand that needs clearer direction?"
        copy="Tell us what feels unclear. The next move might be consulting, design, marketing, websites, or a mix of all four."
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </SiteFrame>
  );
}
