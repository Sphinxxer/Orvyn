import { SectionShell } from "./section-shell";

export function ProblemSection() {
  return (
    <SectionShell className="border-y border-white/10 bg-ink">
      <div className="grid gap-10 lg:grid-cols-[0.34fr_1fr] lg:gap-20">
        <aside className="border-t border-gold/55 pt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
            Belief
          </p>
          <p className="mt-8 max-w-xs text-3xl font-semibold leading-tight text-white">
            Fix first. Then scale.
          </p>
        </aside>
        <div>
          <h2 className="max-w-5xl text-balance text-4xl font-black leading-[1] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            Most brands do not need more marketing.
            <span className="mt-3 block text-gold-soft">
              They need to become clearer, sharper, and harder to ignore.
            </span>
          </h2>
          <div className="mt-10 grid gap-7 border-t border-white/10 pt-8 text-base leading-7 text-white/72 sm:text-lg sm:leading-8 lg:mt-12 lg:grid-cols-[0.8fr_1fr]">
            <p>
              Posting more, running ads, or redesigning everything will not fix a
              brand that lacks clarity.
            </p>
            <p className="text-white">
              Orvyn helps fix the foundation first, so every next move works harder.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
