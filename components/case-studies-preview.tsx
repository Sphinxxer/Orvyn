import { caseStudyDetails } from "@/data/home";
import { ButtonLink } from "./button-link";
import { SectionShell } from "./section-shell";

export function CaseStudiesPreview() {
  const [featuredStudy, ...supportingStudies] = caseStudyDetails;

  if (!featuredStudy) {
    return null;
  }

  return (
    <SectionShell className="border-y border-white/10 bg-coal">
      <div className="grid gap-10 lg:grid-cols-[0.36fr_1fr] lg:gap-14">
        <div className="border-t border-gold/55 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-soft sm:text-sm">
            Selected Work
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-[1.02] text-white sm:text-5xl">
            Work built with clarity and intent.
          </h2>
          <p className="mt-6 text-base leading-7 text-white/75">
            Selected client work, directions, and strategic builds created with a
            clear point of view.
          </p>
          <ButtonLink href="/case-studies" variant="secondary" className="mt-8">
            View Case Studies
          </ButtonLink>
        </div>

        <div>
          <article className="group border-y border-white/10 py-8 transition duration-200 hover:border-gold/45 sm:py-10">
            <div className="grid gap-6 lg:grid-cols-[0.22fr_1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-soft">
                  01 / {featuredStudy.label}
                </p>
                <p className="mt-4 text-sm font-medium text-muted">{featuredStudy.category}</p>
              </div>
              <div>
                <h3 className="max-w-xl text-4xl font-semibold leading-[1.02] text-white transition group-hover:text-gold-soft sm:text-5xl">
                  {featuredStudy.title}
                </h3>
                <p className="mt-6 max-w-xl text-base leading-7 text-muted">
                  {featuredStudy.description}
                </p>
              </div>
            </div>
          </article>
          {supportingStudies.map((study, index) => (
            <article
              key={study.title}
              className="grid gap-4 border-b border-white/10 py-6 sm:grid-cols-[0.28fr_1fr]"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-soft">
                {String(index + 2).padStart(2, "0")} / {study.label}
              </span>
              <div>
                <h3 className="text-2xl font-semibold text-white">{study.title}</h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">
                  {study.category}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">{study.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
