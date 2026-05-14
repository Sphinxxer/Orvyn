import type { Metadata } from "next";
import { CTASection } from "@/components/cta-section";
import { ProcessStep } from "@/components/process-step";
import { SectionShell } from "@/components/section-shell";
import { ServiceDetailCard } from "@/components/service-detail-card";
import { SiteFrame } from "@/components/site-frame";
import { serviceDecisionSteps, serviceDetails } from "@/data/home";

export const metadata: Metadata = {
  title: "Services | Orvyn",
  description:
    "Explore Orvyn's services across performance marketing, content creation, brand development, websites, social media, and end-to-end growth systems."
};

export default function ServicesPage() {
  return (
    <SiteFrame>
      <section className="border-b border-white/10 px-5 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pt-44">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-soft sm:text-sm">
              Services / Capabilities
            </p>
            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              Services built to sharpen your brand system.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
              From performance and content to websites and brand direction, Orvyn
              helps the parts of growth work together with clarity and intent.
            </p>
          </div>

          <div className="border-y border-white/10 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
              Capability Index
            </p>
            <ol className="mt-5 space-y-3">
              {serviceDetails.map((service, index) => (
                <li key={service.title} className="flex items-center gap-4 text-sm">
                  <span className="w-8 text-gold-soft">
                    {String(index + 1).padStart(2, "0")}
                  </span>
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
            Each capability is chosen for a reason. We do not start with more
            activity. We start by finding what needs to be fixed, sharpened, and
            built properly.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.28fr_1fr] lg:gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-28 border-t border-gold pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
                Capability System
              </p>
              <p className="mt-4 text-sm leading-6 text-muted">
                Structured modules chosen by what the brand needs to fix, sharpen,
                and scale.
              </p>
            </div>
          </aside>
          <div className="border-y border-white/10">
            {serviceDetails.map((service, index) => (
              <ServiceDetailCard
                key={service.title}
                index={index + 1}
                title={service.title}
                positioning={service.positioning}
                description={service.description}
                includes={service.includes}
                bestFor={service.bestFor}
              />
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell className="border-y border-white/10 bg-white/[0.015]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Decision Logic
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-[1.04] text-white sm:text-5xl">
              How we decide what your brand needs
            </h2>
            <p className="mt-6 text-base leading-7 text-muted">
              Not every brand needs the same solution. Some need clearer
              positioning. Some need better content. Some need a stronger website.
              Some need performance marketing only after the foundation is ready.
            </p>
          </div>
          <div className="border-y border-white/10">
            {serviceDecisionSteps.map((step) => (
              <ProcessStep key={step.number} {...step} />
            ))}
          </div>
        </div>
      </SectionShell>

      <CTASection
        title="Not sure what your brand needs yet?"
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </SiteFrame>
  );
}
