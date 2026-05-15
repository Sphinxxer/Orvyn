import { SectionShell } from "./section-shell";

export function ProblemSection() {
  return (
    <SectionShell className="border-y border-white/10 bg-ink">
      <div className="grid gap-10 lg:grid-cols-[0.34fr_1fr] lg:gap-16">
        <aside className="border-t border-gold/55 pt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
            Belief
          </p>
          <p className="mt-7 max-w-xs text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Fix first. Then scale.
          </p>
        </aside>
        <div className="max-w-4xl">
          <h2 className="text-balance text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            <span className="block">Most brands don&apos;t need more marketing.</span>
            <span className="mt-3 block text-gold-soft">
              They need a clearer reason to be chosen.
            </span>
          </h2>
          <p className="mt-8 max-w-2xl border-t border-white/10 pt-7 text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
            More posts, ads, or redesigns won&apos;t fix a brand that feels
            unclear. Orvyn sharpens the foundation first — so every next move
            works harder.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
