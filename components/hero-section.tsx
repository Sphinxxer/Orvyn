import type { CSSProperties } from "react";
import { ButtonLink } from "./button-link";
import { OrvynHalo } from "./orvyn-halo";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-12 pt-24 sm:min-h-screen sm:px-6 sm:pt-28 lg:px-8 lg:pb-16 lg:pt-24 xl:pt-28">
      <div className="absolute inset-x-0 top-[4.75rem] -z-10 h-px bg-gold/30 lg:top-20" aria-hidden="true" />
      <OrvynHalo className="absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-7xl content-start gap-10 pt-16 sm:min-h-[calc(100vh-7rem)] sm:content-center sm:pt-0 lg:min-h-[calc(100vh-8rem)]">
        <div>
          <div className="max-w-6xl">
            <h1 className="text-balance text-[clamp(2.85rem,10vw,4rem)] font-black leading-[1.08] tracking-[-0.025em] text-white sm:leading-[1.06] lg:text-[clamp(5rem,7.5vw,8.25rem)] lg:leading-[1.03] xl:leading-[1.01]">
              <span className="reveal-mask block"><span data-reveal="heading" style={{ "--reveal-delay": "0ms" } as CSSProperties}>Become</span></span>
              <span className="reveal-mask block"><span data-reveal="heading" style={{ "--reveal-delay": "100ms" } as CSSProperties}>impossible</span></span>
              <span className="reveal-mask -mb-[0.14em] block pb-[0.14em]"><span data-reveal="heading" style={{ "--reveal-delay": "200ms" } as CSSProperties}>
                to <span className="hero-gold-arrival">ignore.</span>
              </span>
              </span>
            </h1>
          </div>

          <div className="mt-8 grid gap-6 border-t border-white/10 pt-6 lg:mt-12 lg:grid-cols-[minmax(0,0.62fr)_minmax(14rem,0.24fr)_auto] lg:items-end lg:gap-10 lg:pt-7">
            <div className="max-w-2xl" data-reveal="body" style={{ "--reveal-delay": "400ms" } as CSSProperties}>
              <p className="text-base leading-7 text-white/76 sm:text-lg sm:leading-8 lg:text-xl">
                We build brands, websites, and marketing systems that work better together.
              </p>
              <p className="mt-5 hidden max-w-lg text-sm leading-6 text-muted lg:block">
                For brands built to grow with clarity, consistency, and intent.
              </p>
            </div>

            <div className="relative order-3 hidden border-l border-gold/40 pl-5 lg:order-none lg:block" data-reveal="body" style={{ "--reveal-delay": "450ms" } as CSSProperties}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-soft">
                Orvyn Belief
              </p>
              <p className="mt-4 max-w-xs text-2xl font-semibold leading-tight text-white">
                Fix first. Then scale.
              </p>
            </div>

            <div className="order-2 flex flex-col justify-end gap-3 sm:flex-row lg:order-none lg:flex-col" data-reveal="body" style={{ "--reveal-delay": "500ms" } as CSSProperties}>
              <ButtonLink href="/contact" className="w-full sm:w-auto">
                Start a Project
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary" className="w-full bg-transparent sm:w-auto">
                Explore Services
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
