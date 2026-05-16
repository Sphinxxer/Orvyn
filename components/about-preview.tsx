import { ButtonLink } from "./button-link";
import { SectionShell } from "./section-shell";

export function AboutPreview() {
  return (
    <SectionShell className="bg-ink">
      <div className="rounded-[2rem] bg-white/[0.025] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[0.44fr_1fr] lg:items-end lg:gap-16">
          <div>
            <div className="mb-6 h-px w-16 bg-gold/70" aria-hidden="true" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Orvyn Philosophy
            </p>
            <h2 className="mt-5 text-balance text-4xl font-black leading-[1] text-white sm:text-6xl">
              Fix first. <span className="block text-gold-soft">Then scale.</span>
            </h2>
          </div>

          <div className="max-w-3xl">
            <p className="text-2xl font-semibold leading-snug text-white sm:text-3xl">
              Growth gets easier when the brand is clear.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
              Orvyn starts by finding what needs to be fixed before scaling what
              works.
            </p>
            <ButtonLink href="/about" variant="secondary" className="mt-8">
              About Orvyn
            </ButtonLink>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
