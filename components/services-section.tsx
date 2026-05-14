import { services } from "@/data/home";
import { ButtonLink } from "./button-link";
import { SectionShell } from "./section-shell";

export function ServicesSection() {
  return (
    <SectionShell id="services" className="bg-white/[0.015]">
      <div className="grid gap-10 lg:grid-cols-[0.36fr_1fr] lg:gap-14">
        <div className="border-t border-gold/55 pt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
            Capabilities
          </p>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.02] text-white sm:text-5xl">
            Strategic capabilities for sharper growth.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-white/72">
            Content, websites, brand identity, and marketing should work as one
            system. Orvyn connects them with clarity and intent.
          </p>
          <ButtonLink href="/services" variant="secondary" className="mt-8">
            Explore Capabilities
          </ButtonLink>
        </div>

        <div className="grid border-y border-white/10 md:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group min-h-56 border-t border-white/10 px-0 py-7 first:border-t-0 md:border-l md:px-7 md:[&:nth-child(-n+2)]:border-t-0 md:[&:nth-child(odd)]:border-l-0 lg:min-h-64 lg:py-9"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-10 text-3xl font-semibold leading-tight text-white transition group-hover:text-gold-soft">
                {service.title}
              </h3>
              <p className="mt-5 max-w-sm text-lg leading-7 text-muted">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
