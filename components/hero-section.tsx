import Image from "next/image";
import { ButtonLink } from "./button-link";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden px-5 pb-12 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-16 lg:pt-32 xl:pt-36">
      <div className="absolute inset-x-0 top-[4.75rem] -z-10 h-px bg-gold/30 lg:top-20" aria-hidden="true" />
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl content-center gap-10 lg:min-h-[calc(100vh-8rem)]">
        <div>
          <div className="max-w-6xl">
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft sm:text-sm lg:mb-8">
              Home / Modern Brand Growth Agency
            </p>
            <h1 className="text-balance text-[clamp(3.15rem,12.5vw,4.7rem)] font-black leading-[1.1] tracking-[-0.025em] text-white sm:leading-[1.08] lg:text-[clamp(5rem,7.5vw,8.25rem)] lg:leading-[1.03] xl:leading-[1.01]">
              <span className="block">Become</span>
              <span className="block">impossible</span>
              <span className="block">
                to <span className="text-gold-soft">ignore.</span>
              </span>
            </h1>
          </div>

          <div className="mt-10 grid gap-6 border-y border-white/10 py-6 lg:mt-12 lg:grid-cols-[minmax(0,0.58fr)_minmax(17rem,0.28fr)_auto] lg:items-stretch lg:gap-8 lg:py-7">
            <div className="max-w-2xl">
              <p className="text-base leading-7 text-white/76 sm:text-lg sm:leading-8 lg:text-xl">
                Orvyn helps modern brands build sharper content, stronger websites, and growth
                systems that turn attention into trust.
              </p>
              <p className="mt-5 max-w-lg text-sm leading-6 text-muted">
                For brands built to grow with clarity, consistency, and intent.
              </p>
            </div>

            <div className="relative isolate min-h-32 overflow-hidden border border-white/10 bg-coal px-5 py-5 lg:min-h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-soft">
                Orvyn Belief
              </p>
              <p className="mt-5 max-w-xs text-2xl font-semibold leading-tight text-white">
                Fix first. Then scale.
              </p>
              <Image
                src="/orvyn-icon.svg"
                alt=""
                width={260}
                height={260}
                priority
                className="absolute right-[-4rem] top-1/2 -z-10 size-56 -translate-y-1/2 opacity-[0.045]"
              />
            </div>

            <div className="flex flex-col justify-end gap-3 sm:flex-row lg:flex-col">
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
