import { ButtonLink } from "./button-link";
import { SectionShell } from "./section-shell";

export function AboutPreview() {
  return (
    <SectionShell className="border-y border-white/10 bg-coal/50">
      <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:items-end lg:gap-16">
        <div className="border-t border-gold/55 pt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
            Orvyn Philosophy
          </p>
          <h2 className="mt-5 text-balance text-4xl font-black leading-[1] text-white sm:text-6xl">
            Fix first.{" "}
            <span className="block text-gold-soft">Then scale.</span>
          </h2>
        </div>

        <div className="max-w-3xl">
          <p className="text-2xl font-semibold leading-snug text-white sm:text-3xl">
            Growth gets easier when the brand is clear.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
            Growth gets easier when the brand is clear. Orvyn starts by finding
            what needs to be fixed before scaling what works.
          </p>
          <ButtonLink href="/about" variant="secondary" className="mt-8">
            About Orvyn
          </ButtonLink>
        </div>
      </div>
    </SectionShell>
  );
}
