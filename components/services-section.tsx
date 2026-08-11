import type { CSSProperties } from "react";
import Image from "next/image";
import { services } from "@/data/home";
import { ButtonLink } from "./button-link";
import { SectionShell } from "./section-shell";

export function ServicesSection() {
  return (
    <SectionShell id="services" className="bg-white/[0.012]">
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-end lg:gap-20">
        <div>
          <div className="mb-6 h-px w-16 bg-gold/70" data-reveal="rule" aria-hidden="true" />
          <p data-reveal="eyebrow" className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
            What Orvyn does
          </p>
          <h2 data-reveal="heading" className="mt-5 text-balance text-4xl font-bold leading-[1.04] text-white sm:text-5xl lg:text-6xl">
            Branding. Websites. Marketing.
          </h2>
        </div>
        <div data-reveal="body" className="max-w-xl lg:justify-self-end">
          <p className="text-xl font-semibold leading-8 text-white sm:text-2xl">
            Three connected capabilities for modern brand growth.
          </p>
          <p className="mt-4 text-base leading-7 text-white/70">
            Clear positioning, a credible digital home, and marketing with a reason to move.
          </p>
          <ButtonLink href="/services" variant="secondary" className="mt-8">
            Explore Services
          </ButtonLink>
        </div>
      </div>

      <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              data-reveal="card"
              data-spotlight
              data-cursor="interactive"
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              className="capability-panel group relative isolate min-h-[27rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0c0c0c] p-6 transition duration-300 hover:border-gold/30 sm:min-h-[30rem] sm:p-7"
            >
              <div className="capability-panel__spotlight" aria-hidden="true" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="capability-panel__image relative min-h-56 flex-1 overflow-hidden border-b border-white/10 bg-black">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 88vw, 100vw"
                    className="object-cover transition-[transform,filter] duration-300 ease-out group-hover:scale-[1.035]"
                  />
                  <div className="capability-panel__image-overlay absolute inset-0" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-50 bg-gold/70 transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/66">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
      </div>
    </SectionShell>
  );
}
