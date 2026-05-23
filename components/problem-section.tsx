import { SectionShell } from "./section-shell";

export function ProblemSection() {
  return (
    <SectionShell className="bg-ink">
      <div className="grid gap-10 lg:grid-cols-[0.32fr_1fr] lg:gap-20">
        <aside className="max-w-xs">
          <div className="mb-6 h-px w-16 bg-gold/70" aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
            Belief
          </p>
          <p className="mt-7 text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Fix first. Then scale.
          </p>
        </aside>

        <div className="relative max-w-4xl rounded-[2rem] bg-white/[0.025] px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <h2 className="text-balance text-3xl font-semibold leading-[1.12] text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
            <span className="block">Most brands don’t need more marketing.</span>{" "}
            <span className="mt-2 block text-gold-soft">
              They need a clearer reason to be chosen.
            </span>
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
            More posts, ads, or redesigns won’t fix a brand that feels unclear.
            Orvyn sharpens the foundation first — so every next move works harder.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
