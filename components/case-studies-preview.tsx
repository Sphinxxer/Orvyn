import Link from "next/link";
import { caseStudyDetails } from "@/data/home";
import { ButtonLink } from "./button-link";
import { SectionShell } from "./section-shell";

export function CaseStudiesPreview() {
  const [featuredStudy, ...supportingStudies] = caseStudyDetails;
  const previewStudies = supportingStudies.slice(0, 3);

  if (!featuredStudy) {
    return null;
  }

  return (
    <SectionShell className="bg-coal">
      <div className="grid gap-12 lg:grid-cols-[0.36fr_1fr] lg:gap-20">
        <div>
          <div className="mb-6 h-px w-16 bg-gold/70" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-soft sm:text-sm">
            Built With Clarity
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-[1.04] text-white sm:text-5xl">
            Directions shaped with intent.
          </h2>
          <p className="mt-6 text-base leading-7 text-white/75">
            A growing look at brand directions, digital systems, and project work
            shaped to help businesses look clearer, communicate better, and move
            with more intent.
          </p>
          <ButtonLink href="/case-studies" variant="secondary" className="mt-8">
            View Case Studies
          </ButtonLink>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Link
            href={`/case-studies/${featuredStudy.slug}`}
            data-cursor="interactive"
            className="group relative min-h-[29rem] overflow-hidden rounded-[2.25rem] bg-ink p-7 transition duration-300 hover:-translate-y-1 sm:p-8"
            aria-label={`View ${featuredStudy.title} case study`}
          >
            <div className="absolute inset-x-8 top-8 h-px bg-gold/40" aria-hidden="true" />
            <div
              className="absolute -right-28 bottom-[-7rem] size-80 rounded-full border border-white/10 opacity-70 transition duration-300 group-hover:border-gold/25"
              aria-hidden="true"
            />
            <div className="relative flex h-full flex-col justify-between pt-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
                  {featuredStudy.label}
                </p>
                <p className="mt-5 text-sm font-medium text-muted">
                  {featuredStudy.category}
                </p>
              </div>
              <div>
                <h3 className="max-w-xl text-4xl font-semibold leading-[1.02] text-white transition group-hover:text-gold-soft sm:text-6xl">
                  {featuredStudy.title}
                </h3>
                <p className="mt-6 max-w-xl text-base leading-7 text-muted">
                  {featuredStudy.description}
                </p>
                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                  Featured direction
                </p>
              </div>
            </div>
          </Link>

          <div className="grid gap-4">
            {previewStudies.map((study) => (
              <Link
                key={study.title}
                href={`/case-studies/${study.slug}`}
                data-cursor="interactive"
                className="group rounded-[1.75rem] bg-ink/58 px-5 py-5 transition duration-200 hover:-translate-y-0.5 hover:bg-graphite/75 sm:px-6"
                aria-label={`View ${study.title} case study`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                  {study.label}
                </p>
                <h3 className="mt-5 text-2xl font-semibold leading-tight text-white transition group-hover:text-gold-soft">
                  {study.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{study.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
