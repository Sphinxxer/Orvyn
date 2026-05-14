import { ButtonLink } from "./button-link";
import { SectionShell } from "./section-shell";

export function FinalCta() {
  return (
    <SectionShell className="pb-20 pt-8 lg:pb-32 lg:pt-16">
      <div className="border-y border-gold/35 py-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.34fr] lg:items-end">
          <div className="max-w-5xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.26em] text-gold-soft sm:text-sm">
              Next Step
            </p>
            <h2 className="max-w-5xl text-balance text-4xl font-black leading-[0.96] text-white sm:text-6xl lg:text-8xl lg:leading-[0.92]">
              Ready to become impossible to ignore?
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
              Let&apos;s build a sharper digital presence for your brand - one that
              looks better, communicates clearer, and grows with intent.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
            <ButtonLink href="/contact" className="w-full sm:w-auto">
              Start a Project
            </ButtonLink>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
