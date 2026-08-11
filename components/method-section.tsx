import type { CSSProperties } from "react";
import { methodSteps } from "@/data/home";
import { SectionShell } from "./section-shell";

export function MethodSection() {
  return (
    <SectionShell className="bg-coal/45 py-14 sm:py-16 lg:py-20">
      <div className="grid gap-9 lg:grid-cols-[0.34fr_1fr] lg:gap-14">
        <div>
          <p data-reveal="eyebrow" className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
            Method
          </p>
          <h2 data-reveal="heading" className="mt-4 text-balance text-3xl font-bold leading-[1.04] text-white sm:text-5xl">
            The Orvyn Method
          </h2>
          <p className="mt-5 text-xl font-semibold leading-tight text-white">
            How clarity becomes momentum.
          </p>
          <p className="mt-4 max-w-md text-base leading-7 text-white/72">
            Find what is unclear. Sharpen what matters. Build what is needed.
            Scale what works.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {methodSteps.map((step, index) => (
            <article
              key={step.number}
              data-reveal="card"
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              className="rounded-[1.5rem] bg-ink/66 p-5 transition duration-200 hover:-translate-y-0.5 hover:bg-graphite/70 sm:p-6"
            >
              <span className="text-sm font-semibold text-gold-soft">
                {step.number}
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
