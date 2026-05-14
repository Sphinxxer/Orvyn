import { methodSteps } from "@/data/home";
import { ButtonLink } from "./button-link";
import { SectionShell } from "./section-shell";

export function MethodSection() {
  return (
    <SectionShell>
      <div className="grid gap-10 lg:grid-cols-[0.36fr_1fr] lg:gap-14">
        <div className="border-t border-gold/55 pt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
            The Orvyn Method
          </p>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.02] text-white sm:text-5xl">
            A clearer way to build brand growth.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-white/72">
            Growth becomes easier when the foundation is clear. Orvyn looks at
            what is blocking trust, attention, and conversion.
          </p>
          <ButtonLink href="/contact" className="mt-8">
            Start a Project
          </ButtonLink>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {methodSteps.map((step) => (
            <article
              key={step.number}
              className="group border border-white/10 bg-coal/45 p-6 transition duration-200 hover:border-gold/45 sm:p-8"
            >
              <span className="text-5xl font-black leading-none text-gold/45 transition group-hover:text-gold/70">
                {step.number}
              </span>
              <h3 className="mt-8 text-3xl font-semibold text-white">{step.title}</h3>
              <p className="mt-5 text-base leading-7 text-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
