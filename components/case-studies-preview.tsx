import Link from "next/link";
import { ProjectTile } from "@/components/case-studies-archive";
import { portfolioProjects } from "@/data/case-studies";
import { SectionShell } from "./section-shell";

const homeProjects = portfolioProjects
  .filter((project) => project.featuredOnHome)
  .slice(0, 3);

export function CaseStudiesPreview() {
  return (
    <SectionShell className="bg-coal">
      <div className="grid gap-10 lg:grid-cols-[0.32fr_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-6 h-px w-16 bg-gold/70" data-reveal="rule" aria-hidden="true" />
          <p data-reveal="eyebrow" className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-soft sm:text-sm">
            Built With Clarity
          </p>
          <h2 data-reveal="heading" className="mt-5 max-w-sm text-3xl font-bold leading-[1.04] text-white sm:text-4xl">
            Directions shaped with intent.
          </h2>
          <p className="mt-5 max-w-sm text-base leading-7 text-white/74">
            Selected work across brand identity, websites, and strategic direction.
          </p>
          <Link
            href="/case-studies"
            data-cursor="interactive"
            data-magnetic
            data-portfolio-cursor="true"
            data-analytics-event="view_all_case_studies_clicked"
            className="group mt-8 inline-flex items-center text-sm font-semibold text-gold-soft underline-offset-4 transition duration-300 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            View All Work
            <span
              className="inline-block pl-2 transition duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              {"\u2192"}
            </span>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {homeProjects.map((project, index) => (
            <ProjectTile
              key={project.slug}
              project={project}
              index={index}
              compact
              openInternalInNewTab
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
