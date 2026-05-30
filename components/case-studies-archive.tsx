"use client";

import { useState } from "react";
import type { CaseStudyDetail } from "@/data/home";
import { CaseStudyCard } from "./case-study-card";

const archiveFilters = ["All", "Websites", "Brand Direction", "Content", "Strategy"];

type CaseStudiesArchiveProps = {
  projects: CaseStudyDetail[];
};

export function CaseStudiesArchive({ projects }: CaseStudiesArchiveProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [featuredProject, ...archiveProjects] = projects;

  const filteredProjects =
    activeFilter === "All"
      ? archiveProjects
      : archiveProjects.filter((project) => project.tags?.includes(activeFilter));

  return (
    <div className="space-y-12">
      {featuredProject ? (
        <div>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-t border-gold/45 pt-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
                Featured project
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-[1.04] text-white sm:text-5xl">
                A closer look at project direction.
              </h2>
            </div>
          </div>
          <CaseStudyCard {...featuredProject} featured />
        </div>
      ) : null}

      <div className="grid gap-7 lg:grid-cols-[0.28fr_1fr] lg:gap-12">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] border border-white/10 bg-ink/55 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-soft">
              Project archive
            </p>
            <p className="mt-5 text-sm leading-6 text-white/65">
              Browse a focused selection of website directions, brand systems,
              and strategic builds shaped with clarity.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Filter case studies">
              {archiveFilters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={isActive}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                      isActive
                        ? "border-gold bg-gold text-ink"
                        : "border-white/10 text-white/58 hover:border-gold/45 hover:text-gold-soft"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="space-y-5">
          {filteredProjects.length ? (
            filteredProjects.map((project) => (
              <CaseStudyCard key={project.title} {...project} />
            ))
          ) : (
            <div className="rounded-[2rem] border border-white/10 bg-coal/55 p-6 text-sm leading-6 text-muted">
              No archive projects are tagged under {activeFilter} yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
