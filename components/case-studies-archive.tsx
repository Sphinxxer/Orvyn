"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { PortfolioProject } from "@/data/case-studies";

const filters = ["ALL", "BRANDING", "WEBSITES", "MARKETING", "CONSULTING"] as const;

type PortfolioFilter = (typeof filters)[number];

type CaseStudiesArchiveProps = {
  projects: PortfolioProject[];
};

export function CaseStudiesArchive({ projects }: CaseStudiesArchiveProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("ALL");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") {
      return projects;
    }

    return projects.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter, projects]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 border-t border-white/10 pt-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-soft">
            Project Gallery
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/62 sm:text-base sm:leading-7">
            Filter the archive by project focus.
          </p>
        </div>

        <div className="flex flex-wrap gap-2" aria-label="Filter case studies">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                data-cursor="interactive"
                data-portfolio-cursor="true"
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                  isActive
                    ? "border-gold bg-gold text-ink"
                    : "border-white/10 text-white/62 hover:border-gold/55 hover:text-gold-soft"
                }`}
                aria-pressed={isActive}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectTile key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

export function ProjectTile({
  project,
  index = 0,
  compact = false
}: {
  project: PortfolioProject;
  index?: number;
  compact?: boolean;
}) {
  const tileHeight = compact ? "h-[430px] sm:h-[480px]" : "h-[430px] sm:h-[480px]";
  const previewHeight = compact ? "h-[64%]" : "h-[70%]";
  const footerHeight = compact ? "h-[36%]" : "h-[30%]";
  const titleClass = compact
    ? "mt-3 line-clamp-2 text-[1.18rem] font-semibold leading-[1.2] text-white sm:text-[1.38rem] sm:leading-[1.16]"
    : "mt-3 line-clamp-2 text-[1.25rem] font-semibold leading-[1.16] text-white sm:text-[1.55rem] sm:leading-[1.12]";

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="interactive"
      data-portfolio-cursor="true"
      aria-label={`${project.ctaLabel} ${project.client} in a new tab`}
      style={{ animationDelay: `${Math.min(index, 6) * 100}ms` }}
      className={`portfolio-tile group flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#090909] opacity-0 transition duration-300 ease-out hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_24px_80px_rgba(200,169,90,0.16)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${tileHeight}`}
    >
      <div className={`relative ${previewHeight} overflow-hidden bg-[#111]`}>
        <Image
          src={project.previewImage}
          alt={getPreviewAlt(project)}
          fill
          loading="lazy"
          sizes={
            compact
              ? "(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 92vw"
              : "(min-width: 1280px) 31vw, (min-width: 768px) 46vw, 92vw"
          }
          className="object-cover brightness-95 transition duration-300 ease-out group-hover:scale-[1.05] group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-black/18 transition duration-300 group-hover:bg-black/8" />
        <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition duration-300 ease-out group-hover:scale-x-100" />
      </div>

      <div className={`flex ${footerHeight} flex-col p-5 sm:p-6`}>
        <p className="text-[11px] font-semibold uppercase leading-none tracking-[0.2em] text-gold-soft sm:text-[12px]">
          {project.category}
        </p>
        <h2 className={titleClass}>{project.client}</h2>
        <span className="mt-auto pt-3 text-sm font-semibold text-white/78 transition duration-300 group-hover:text-gold-soft sm:text-base">
          {project.ctaLabel}
          <span
            className="inline-block pl-1 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            aria-hidden="true"
          >
            {"\u2197"}
          </span>
        </span>
      </div>
    </a>
  );
}

function getPreviewAlt(project: PortfolioProject) {
  if (project.slug === "biomode") {
    return "BIOMODE brand identity preview";
  }

  if (project.slug === "grandeur-associates") {
    return "Grandeur Associates client direction preview";
  }

  if (project.slug === "tric-academy") {
    return "TRIC Academy website preview";
  }

  if (project.slug === "cameo-garments") {
    return "Cameo Garments website preview";
  }

  return "SRA Financial Planning brand identity preview";
}
