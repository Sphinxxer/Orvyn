import { services } from "@/data/home";
import { ButtonLink } from "./button-link";
import { CapabilityIcon } from "./capability-icon";
import { SectionShell } from "./section-shell";

export function ServicesSection() {
  return (
    <SectionShell id="services" className="bg-white/[0.015]">
      <div className="grid gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-16">
        <div className="border-t border-gold/55 pt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
            Capabilities
          </p>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.02] text-white sm:text-5xl">
            The parts of growth that need to work together.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-white/72">
            Short, sharp capability areas. The deeper breakdown lives on the
            Services page.
          </p>
          <ButtonLink href="/services" variant="secondary" className="mt-8">
            Explore Capabilities
          </ButtonLink>
        </div>

        <div className="grid gap-px border-y border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group min-h-56 bg-ink p-6 transition duration-200 hover:bg-coal sm:p-7 lg:min-h-64"
            >
              <CapabilityIcon icon={service.icon} />
              <h3 className="mt-10 text-2xl font-semibold leading-tight text-white transition group-hover:text-gold-soft">
                {service.title}
              </h3>
              <p className="mt-4 max-w-sm text-base leading-7 text-muted">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
