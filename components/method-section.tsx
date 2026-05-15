import { methodSteps } from "@/data/home";
import { ButtonLink } from "./button-link";
import { SectionShell } from "./section-shell";

export function MethodSection() {
  return (
    <SectionShell className="border-y border-white/10 bg-coal/45">
      <div className="grid gap-10 lg:grid-cols-[0.38fr_1fr] lg:gap-16">
        <div className="border-t border-gold/55 pt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
            The Orvyn Method
          </p>
          <h2 className="mt-5 text-balance text-4xl font-black leading-[1] text-white sm:text-6xl">
            How clarity becomes momentum.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-white/72">
            This is how Orvyn looks at growth: find what is unclear, sharpen what
            matters, build what is needed, then scale what works.
          </p>
          <ButtonLink href="/contact" variant="secondary" className="mt-8">
            Start a Project
          </ButtonLink>
        </div>

        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          {methodSteps.map((step) => (
            <article
              key={step.number}
              className="group bg-ink p-6 transition duration-200 hover:bg-coal sm:p-8"
            >
              <span className="text-5xl font-black leading-none text-gold/55 transition group-hover:text-gold-soft">
                {step.number}
              </span>
              <h3 className="mt-8 text-3xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-5 text-base leading-7 text-muted">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
