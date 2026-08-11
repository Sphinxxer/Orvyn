import type { Metadata } from "next";
import { CTASection } from "@/components/cta-section";
import { ProcessStep } from "@/components/process-step";
import { SectionShell } from "@/components/section-shell";
import { createBreadcrumbJsonLd } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesExplorer } from "@/components/services-explorer";
import { SiteFrame } from "@/components/site-frame";
import { serviceDecisionSteps } from "@/data/home";
import { createFaqSchema, createServicesItemListSchema } from "@/data/schema";

export const metadata: Metadata = {
  title: "Services | Orvyn",
  description:
    "Explore Orvyn's three connected capabilities: branding, websites, and marketing \u2014 one system for modern brand growth.",
  alternates: {
    canonical: "/services"
  },
  openGraph: {
    title: "Services | Orvyn",
    description:
      "Explore Orvyn's three connected capabilities: branding, websites, and marketing \u2014 one system for modern brand growth.",
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
      "Explore Orvyn's three connected capabilities: branding, websites, and marketing \u2014 one system for modern brand growth.",
    images: ["/og-image.png"]
  }
};

const serviceFaqs = [
  {
    question: "Do I need all three capabilities?",
    answer:
      "Not always. Some brands need a clearer identity. Others need a stronger website or marketing that moves with purpose. The first step is understanding what is actually holding growth back."
  },
  {
    question: "Which capability should my brand start with?",
    answer:
      "Start with the weakest link. If the direction or identity is unclear, start with branding. If trust or conversion is weak, start with the website. If visibility and demand are the issue, start with marketing."
  },
  {
    question: "Can Orvyn handle only one part?",
    answer:
      "Yes. Orvyn can work on one focused area or connect multiple capabilities into one clearer system."
  }
];

export default function ServicesPage() {
  return (
    <SiteFrame>
      <JsonLd
        data={[
          createBreadcrumbJsonLd("Services", "/services"),
          createServicesItemListSchema(),
          createFaqSchema(serviceFaqs)
        ]}
      />
      <section className="border-b border-white/10 px-5 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <h1 data-reveal="heading" className="max-w-4xl text-balance text-4xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
            Three connected capabilities for modern brand growth.
          </h1>
          <p data-reveal="body" className="mt-7 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
            No two brands need exactly the same fix.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
            Some need sharper branding. Some need a stronger website. Others need
            marketing that moves with purpose.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gold-soft/85 sm:text-lg sm:leading-8">
            Orvyn brings branding, websites, and marketing into one clearer system.
          </p>
        </div>
      </section>

      <SectionShell>
        <ServicesExplorer />
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
              Start with the weakest link.
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
        title="Not sure where to start?"
        copy="Tell us what feels unclear. The right next move may be branding, websites, marketing, or a mix of all three."
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </SiteFrame>
  );
}

