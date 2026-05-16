import Image from "next/image";
import { ButtonLink } from "./button-link";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden px-5 pb-12 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pb-16 lg:pt-32 xl:pt-36">
      <div className="absolute inset-x-0 top-[4.75rem] -z-10 h-px bg-gold/30 lg:top-20" aria-hidden="true" />
      <Image
        src="/orvyn-icon.svg"
        alt=""
        width={620}
        height={620}
        priority
        className="pointer-events-none absolute right-[-13rem] top-[16%] -z-10 hidden size-[36rem] opacity-[0.045] lg:block xl:right-[-8rem] xl:size-[40rem]"
      />
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl content-center gap-10 lg:min-h-[calc(100vh-8rem)]">
        <div>
          <div className="max-w-6xl">
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft sm:text-sm lg:mb-8">
              Home / Modern Brand Growth Agency
            </p>
            <h1 className="text-balance text-[clamp(2.85rem,10vw,4rem)] font-black leading-[1.08] tracking-[-0.025em] text-white sm:leading-[1.06] lg:text-[clamp(5rem,7.5vw,8.25rem)] lg:leading-[1.03] xl:leading-[1.01]">
              <span className="block">Become</span>
              <span className="block">impossible</span>
              <span className="block">
                to <span className="text-gold-soft">ignore.</span>
              </span>
            </h1>
          </div>

          <div className="mt-8 grid gap-6 border-t border-white/10 pt-6 lg:mt-12 lg:grid-cols-[minmax(0,0.62fr)_minmax(14rem,0.24fr)_auto] lg:items-end lg:gap-10 lg:pt-7">
            <div className="max-w-2xl">
              <p className="text-base leading-7 text-white/76 sm:text-lg sm:leading-8 lg:text-xl">
                Orvyn helps brands sharpen their content, website, and marketing system so they
                look clearer, earn trust faster, and grow with intent.
              </p>
              <p className="mt-5 hidden max-w-lg text-sm leading-6 text-muted lg:block">
                For brands built to grow with clarity, consistency, and intent.
              </p>
            </div>

            <div className="relative order-3 hidden border-l border-gold/40 pl-5 lg:order-none lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-soft">
                Orvyn Belief
              </p>
              <p className="mt-4 max-w-xs text-2xl font-semibold leading-tight text-white">
                Fix first. Then scale.
              </p>
            </div>

            <div className="order-2 flex flex-col justify-end gap-3 sm:flex-row lg:order-none lg:flex-col">
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
