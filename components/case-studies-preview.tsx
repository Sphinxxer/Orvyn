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
      <div className="grid gap-10 lg:grid-cols-[0.38fr_1fr] lg:gap-16">
        <div className="border-t border-gold/55 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-soft sm:text-sm">
            Built With Clarity
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-[1.02] text-white sm:text-5xl">
            Directions shaped with intent.
          </h2>
          <p className="mt-6 text-base leading-7 text-white/75">
            A look at the brands, directions, and digital systems shaped to improve
            how businesses look, communicate, and grow.
          </p>
          <ButtonLink href="/case-studies" variant="secondary" className="mt-8">
            View Case Studies
          </ButtonLink>
        </div>

        <div>
          <article className="group grid gap-7 border border-white/10 bg-ink p-5 transition duration-200 hover:-translate-y-1 hover:border-gold/45 sm:p-7 lg:grid-cols-[0.42fr_1fr]">
            <div className="relative min-h-64 overflow-hidden border border-white/10 bg-coal p-5">
              <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
                <div className="absolute -right-20 top-8 size-56 rounded-full border border-white" />
                <div className="absolute right-8 top-28 h-px w-72 rotate-[-38deg] bg-white" />
              </div>
              <div className="relative flex h-full min-h-52 flex-col justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-soft">
                  {featuredStudy.label}
                </p>
                <p className="max-w-56 text-3xl font-semibold leading-tight text-white">
                  {featuredStudy.title}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-sm font-medium text-gold-soft">{featuredStudy.category}</p>
                <h3 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.02] text-white transition group-hover:text-gold-soft sm:text-5xl">
                  {featuredStudy.title}
                </h3>
                <p className="mt-6 max-w-xl text-base leading-7 text-muted">
                  {featuredStudy.description}
                </p>
              </div>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                Featured direction
              </p>
            </div>
          </article>

          <div className="mt-5 grid gap-px bg-white/10 sm:grid-cols-3">
            {supportingStudies.map((study) => (
              <article
                key={study.title}
                className="group bg-coal px-5 py-6 transition duration-200 hover:bg-ink"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                  {study.label}
                </p>
                <h3 className="mt-8 text-2xl font-semibold leading-tight text-white transition group-hover:text-gold-soft">
                  {study.title}
                </h3>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {study.category}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
