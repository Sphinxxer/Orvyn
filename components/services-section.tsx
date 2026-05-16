import { services } from "@/data/home";
import { ButtonLink } from "./button-link";
import { CapabilityIcon } from "./capability-icon";
import { SectionShell } from "./section-shell";

export function ServicesSection() {
  return (
    <SectionShell id="services" className="bg-white/[0.012]">
      <div className="grid gap-12 lg:grid-cols-[0.38fr_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-6 h-px w-16 bg-gold/70" aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
            Capabilities
          </p>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.04] text-white sm:text-5xl">
            The growth parts we help sharpen.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-white/72">
            From ads and content to websites and brand systems, Orvyn helps the
            parts of your digital presence work together — not against each other.
          </p>
          <ButtonLink href="/services" variant="secondary" className="mt-8">
            Explore Capabilities
          </ButtonLink>
        </div>

        <div className="space-y-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group grid gap-5 rounded-[1.5rem] bg-coal/70 px-5 py-5 transition duration-200 hover:-translate-y-0.5 hover:bg-graphite/80 sm:px-6 sm:py-6 md:grid-cols-[auto_0.42fr_1fr] md:items-center md:gap-7"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-gold/10 text-gold-soft transition duration-200 group-hover:bg-gold group-hover:text-ink">
                <CapabilityIcon icon={service.icon} className="size-5" />
              </div>
              <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
                {service.title}
              </h3>
              <p className="max-w-xl text-base leading-7 text-muted">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
