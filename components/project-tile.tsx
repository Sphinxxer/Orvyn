import Image from "next/image";
import type { PortfolioProject } from "@/data/case-studies";
import { ProjectAction, ProjectActions } from "./project-action";
import type { SelectedService } from "@/data/service-filter";
export function ProjectTile({ project, compact = false, priority = false, summary = false, service }: { project: PortfolioProject; compact?: boolean; priority?: boolean; summary?: boolean; service?: SelectedService }) {
  const src = project.workPreviewImage ?? project.previewImage;
  return <article className={"project-tile " + (compact ? "project-tile--compact " : "") + (!src ? "project-tile--text " : "") + (project.slug === "biomode" ? "project-tile--biomode " : "")}>
    {src ? <ProjectAction project={project} service={service} className="project-tile__visual"><Image src={src} alt={project.workPreviewAlt ?? project.previewAlt} fill loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} sizes={compact ? "(max-width: 640px) 140px, 260px" : "(max-width: 640px) calc(100vw - 40px), (max-width: 1360px) 45vw, 610px"} className="project-tile__image" /></ProjectAction> : null}
    <div className="project-tile__info"><h3>{project.client}</h3><p className="project-tile__scope">{project.workCategory ?? project.label}</p>{summary ? <p className="project-tile__summary">{(service && project.serviceSummaries?.[service]) || project.previewSummary || project.description}</p> : null}{project.storeStatus === "prelaunch" ? <span className="status-label">Prelaunch</span> : project.projectKind === "direction" ? <span className="project-kind-label">Direction & concept</span> : null}<ProjectActions project={project} service={service} /></div>
  </article>;
}

