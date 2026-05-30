import type { Metadata } from "next";
import { CapabilityIcon } from "@/components/capability-icon";
import { CTASection } from "@/components/cta-section";
import { ProcessStep } from "@/components/process-step";
import { SectionShell } from "@/components/section-shell";
import { createBreadcrumbJsonLd } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesExplorer } from "@/components/services-explorer";
import { SiteFrame } from "@/components/site-frame";
import { serviceDecisionSteps, serviceDetails } from "@/data/home";

export const metadata: Metadata = {
  title: "Services | Orvyn",
  description:
    "Explore Orvyn's four core functions: consulting, design, marketing, and websites \u2014 one system for modern brand growth.",
  alternates: {
    canonical: "/services"
  },
  openGraph: {
    title: "Services | Orvyn",
    description:
      "Explore Orvyn's four core functions: consulting, design, marketing, and websites \u2014 one system for modern brand growth.",
    url: "/services",
    siteName: "Orvyn",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Orvyn services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Orvyn",
    description:
      "Explore Orvyn's four core functions: consulting, design, marketing, and websites \u2014 one system for modern brand growth.",
    images: ["/og-image.png"]
  }
};

const serviceFaqs = [
  {
    question: "Do I need all four functions?",
    answer:
      "Not always. Some brands only need consulting or a website. Others need design and marketing working together. The first step is understanding what is actually holding growth back."
  },
  {
    question: "Which function should my brand start with?",
    answer:
      "Start with the weakest link. If the direction is unclear, start with consulting. If the brand looks inconsistent, start with design. If visibility is the issue, start with marketing. If trust or conversion is weak, start with the website."
  },
  {
    question: "Can Orvyn handle only one part?",
    answer:
      "Yes. Orvyn can work on one focused area or connect multiple functions into one clearer system."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: serviceFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

export default function ServicesPage() {
  return (
    <SiteFrame>
      <JsonLd data={[createBreadcrumbJsonLd("Services", "/services"), faqJsonLd]} />
      <section className="border-b border-white/10 px-5 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pt-44">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-soft sm:text-sm">
              Services / Capabilities
            </p>
            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              Four functions. One system for modern brand growth.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
              Every brand does not need the same fix. Some need sharper
              direction. Some need better design. Some need marketing that
              moves with purpose. Some need a stronger website.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-gold-soft/85 sm:text-lg sm:leading-8">
              Orvyn brings consulting, design, marketing, and websites into one
              clearer system.
            </p>
          </div>

          <div className="rounded-[1.75rem] bg-coal/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
              Capability Index
            </p>
            <ol className="mt-5 space-y-3">
              {serviceDetails.map((service) => (
                <li key={service.title} className="flex items-center gap-4 text-sm">
                  <CapabilityIcon icon={service.icon} className="size-5 shrink-0 text-gold-soft" />
                  <span className="text-muted">{service.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <SectionShell className="pt-0">
        <div className="max-w-4xl border-l border-gold/45 pl-6">
          <p className="max-w-3xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            Not every brand needs more marketing. Some need the right parts
            fixed first.
          </p>
        </div>

        <div className="mt-12">
          <ServicesExplorer />
        </div>
      </SectionShell>

      <SectionShell className="bg-white/[0.012]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Decision Logic
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-[1.04] text-white sm:text-5xl">
              What we fix first depends on what is holding growth back.
            </h2>
            <p className="mt-6 text-base leading-7 text-muted">
              Not every brand needs the same solution. Some need clearer
              positioning. Some need better content. Some need a stronger website.
              Some need ads only after the foundation is ready.
            </p>
          </div>
          <div className="rounded-[2rem] bg-coal/55 px-5 sm:px-7">
            {serviceDecisionSteps.map((step) => (
              <ProcessStep key={step.number} {...step} />
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:gap-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Not sure what your brand needs?
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.04] text-white sm:text-5xl">
              Start with the part that is holding growth back.
            </h2>
          </div>
          <div className="divide-y divide-white/10 rounded-[2rem] bg-coal/55 px-5 sm:px-7">
            {serviceFaqs.map((item) => (
              <article key={item.question} className="py-6">
                <h3 className="text-base font-semibold leading-6 text-white">
                  {item.question}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionShell>

      <CTASection
        title="Not sure what your brand needs first?"
        copy="Tell us what feels unclear. The next move might be strategy, design, a website, marketing, or a mix of all four. Orvyn works with a limited number of new projects each month so every build gets focused direction and execution."
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </SiteFrame>
  );
}

