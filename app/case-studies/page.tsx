import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-study-card";
import { CTASection } from "@/components/cta-section";
import { ProcessStep } from "@/components/process-step";
import { SectionShell } from "@/components/section-shell";
import { SiteFrame } from "@/components/site-frame";
import { caseStudyDetails, caseStudyProcessSteps } from "@/data/home";

export const metadata: Metadata = {
  title: "Case Studies | Orvyn",
  description:
    "Explore Orvyn's growing archive of brand directions, digital systems, and project work shaped with clarity and intent.",
  alternates: {
    canonical: "/case-studies"
  },
  openGraph: {
    title: "Case Studies | Orvyn",
    description:
      "Explore Orvyn's growing archive of brand directions, digital systems, and project work shaped with clarity and intent.",
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
      "Explore Orvyn's growing archive of brand directions, digital systems, and project work shaped with clarity and intent.",
    images: ["/og-image.png"]
  }
};

export default function CaseStudiesPage() {
  return (
    <SiteFrame>
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
              A growing archive of brand directions, digital systems, and project
              work shaped to improve how businesses look, communicate, and grow.
            </p>
          </div>
        </div>
      </section>

      <SectionShell className="pt-0">
        <div className="mb-10 max-w-4xl border-l border-gold/45 pl-6">
          <p className="max-w-3xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            Some projects are active client work, while others are concept
            directions or strategic builds. We keep the work honest — no fake
            numbers, no inflated results.
          </p>
        </div>

        <div className="space-y-5">
          {caseStudyDetails.map((study) => (
            <CaseStudyCard key={study.title} {...study} />
          ))}
        </div>
      </SectionShell>

      <SectionShell className="bg-white/[0.012]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Project Method
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-[1.04] text-white sm:text-5xl">
              How we approach every project
            </h2>
          </div>
          <div className="rounded-[2rem] bg-coal/55 px-5 sm:px-7">
            {caseStudyProcessSteps.map((step) => (
              <ProcessStep key={step.number} {...step} />
            ))}
          </div>
        </div>
      </SectionShell>

      <CTASection
        title="Want this kind of clarity for your brand?"
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </SiteFrame>
  );
}
