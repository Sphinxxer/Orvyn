import Image from "next/image";
import type { CSSProperties } from "react";
import type { PortfolioProject } from "@/data/case-studies";
import { ProjectDeckDialog } from "@/components/project-deck-dialog";

type CaseStudiesArchiveProps = {
  projects: PortfolioProject[];
};

export function CaseStudiesArchive({ projects }: CaseStudiesArchiveProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectTile key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}

export function ProjectTile({
  project,
  index = 0,
  compact = false,
  openInternalInNewTab = false
}: {
  project: PortfolioProject;
  index?: number;
  compact?: boolean;
  openInternalInNewTab?: boolean;
}) {
  const hasDestination =
    project.destinationType !== "comingSoon" && Boolean(project.destinationUrl);
  const opensInNewTab =
    project.destinationType === "liveWebsite" ||
    (project.destinationType === "internalCaseStudy" && openInternalInNewTab);
  const opensProjectViewer = project.destinationType === "pdf";
  const tileHeight = "h-[500px]";
  const previewHeight = compact ? "h-[62%]" : "h-[64%]";
  const footerHeight = compact ? "h-[38%]" : "h-[36%]";
  const titleClass = compact
    ? "mt-2 text-[1.15rem] font-semibold leading-[1.18] text-white sm:text-[1.3rem]"
    : "mt-2 text-[1.22rem] font-semibold leading-[1.18] text-white sm:text-[1.5rem]";
  const content = (
    <>
      <div className={`relative ${previewHeight} overflow-hidden bg-[#111]`}>
        <Image
          src={project.previewImage}
          alt={project.previewAlt}
          fill
          loading={!compact && index === 0 ? "eager" : "lazy"}
          sizes={
            compact
              ? "(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 92vw"
              : "(min-width: 1280px) 31vw, (min-width: 768px) 46vw, 92vw"
          }
          className="z-0 object-cover brightness-[0.88] transition duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-100"
        />
        <div className="absolute inset-0 z-10 bg-black/[0.14] transition duration-300 group-hover:bg-black/[0.05]" />
        <div className="project-image-mask absolute inset-0 z-20 bg-ink" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 z-30 h-px origin-left scale-x-0 bg-gold transition duration-300 ease-out group-hover:scale-x-100" />
      </div>

      <div className={`flex ${footerHeight} min-h-0 flex-col p-5 sm:p-6`}>
        <p className="text-[11px] font-semibold uppercase leading-none tracking-[0.2em] text-gold-soft sm:text-[12px]">
          {project.category}
        </p>
        <h2 className={titleClass}>{project.client}</h2>
        <span className="mt-auto pt-3 text-sm font-semibold text-white/78 transition duration-300 group-hover:text-gold-soft sm:text-base">
          {project.ctaLabel}
          {hasDestination ? (
            <span
              className="inline-block pl-1 transition duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              {opensInNewTab ? "\u2197" : "\u2192"}
            </span>
          ) : null}
        </span>
      </div>
    </>
  );

  const className = `project-tile group flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#090909] transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${tileHeight} ${
    hasDestination
      ? "project-tile--interactive hover:border-gold/45 hover:shadow-[0_16px_42px_rgba(200,169,90,0.09)]"
      : "opacity-75"
  }`;
  const revealStyle = { "--reveal-delay": `${Math.min(index, 6) * 90}ms` } as CSSProperties;

  if (!hasDestination) {
    return (
      <article
        data-reveal="card"
        className={className}
        style={revealStyle}
      >
        {content}
      </article>
    );
  }

  if (opensProjectViewer) {
    return (
      <ProjectDeckDialog
        project={project}
        className={className}
        style={revealStyle}
      >
        {content}
      </ProjectDeckDialog>
    );
  }

  return (
    <a
      href={project.destinationUrl}
      target={opensInNewTab ? "_blank" : undefined}
      rel={opensInNewTab ? "noopener noreferrer" : undefined}
      data-cursor="interactive"
      data-portfolio-cursor="true"
      data-reveal="card"
      data-tilt
      data-analytics-event={project.id === "biomode" ? "biomode_pdf_opened" : "case_study_opened"}
      aria-label={
        opensInNewTab && !project.ariaLabel.includes("new tab")
          ? `${project.ariaLabel} in a new tab`
          : project.ariaLabel
      }
      style={revealStyle}
      className={className}
    >
      {content}
    </a>
  );
}
