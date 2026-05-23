import { services } from "@/data/home";
import { ButtonLink } from "./button-link";
import { CapabilityIcon } from "./capability-icon";
import { SectionShell } from "./section-shell";

export function ServicesSection() {
  return (
    <SectionShell id="services" className="bg-white/[0.012]">
      <div className="grid gap-12 lg:grid-cols-[0.36fr_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-6 h-px w-16 bg-gold/70" aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
            What Orvyn does
          </p>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.04] text-white sm:text-5xl">
            Consulting. Design. Marketing. Websites.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-white/72">
            Four functions. One system for modern brand growth.
          </p>
          <p className="mt-4 max-w-sm text-base leading-7 text-white/72">
            Brands do not always need more activity. Sometimes they need clearer
            direction, sharper design, a better website, or marketing that finally
            works together.
          </p>
          <ButtonLink href="/services" variant="secondary" className="mt-8">
            Explore Services
          </ButtonLink>
        </div>

        <div className="rounded-[2.25rem] border border-white/10 bg-[#11100d]/70 px-4 py-2 sm:px-6">
          {services.map((service) => (
            <article
              key={service.title}
              data-cursor="interactive"
              className="group grid gap-5 border-b border-white/10 py-6 transition duration-200 last:border-b-0 hover:border-gold/35 sm:py-7 md:grid-cols-[auto_0.42fr_1fr] md:items-center md:gap-7"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-gold/10 text-gold-soft transition duration-200 group-hover:bg-gold group-hover:text-ink">
                <CapabilityIcon icon={service.icon} className="size-5 text-current" />
              </div>
              <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
                {service.title}
              </h3>
              <p className="max-w-xl text-base leading-7 text-muted">
                {service.description}
              </p>
              <p className="text-xs font-semibold uppercase leading-6 tracking-[0.16em] text-gold-soft/80 md:col-start-2 md:col-span-2">
                {service.tags}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
