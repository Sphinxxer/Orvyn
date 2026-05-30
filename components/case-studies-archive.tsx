import type { CaseStudyDetail } from "@/data/home";
import { CaseStudyCard } from "./case-study-card";

type CaseStudiesArchiveProps = {
  projects: CaseStudyDetail[];
};

export function CaseStudiesArchive({ projects }: CaseStudiesArchiveProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <CaseStudyCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
