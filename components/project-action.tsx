import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { ArrowsOutSimpleIcon } from "@phosphor-icons/react/dist/ssr/ArrowsOutSimple";
import type { PortfolioProject } from "@/data/case-studies";
import { getWorkDestination } from "@/data/project-navigation";
import { serviceHref, type SelectedService } from "@/data/service-filter";
import { PdfDeckButton } from "./pdf-deck-button";

type ProjectActionProps = {
  project: PortfolioProject;
  className?: string;
  children?: ReactNode;
  service?: SelectedService;
};

export function ProjectAction({ project, className = "project-primary-action", children, service }: ProjectActionProps) {
  const destination = getWorkDestination(project);
  const Icon = destination.type === "pdf" ? ArrowsOutSimpleIcon : destination.type === "liveWebsite" ? ArrowUpRightIcon : ArrowRightIcon;
  const content = children ?? <>{destination.label}<Icon size={16} weight="light" aria-hidden="true" /></>;
  if (destination.type === "pdf") {
    return <PdfDeckButton href={destination.url} name={project.client} preview={project.previewImage} className={className} ariaLabel={destination.ariaLabel} title={project.client + " — Brand identity"} analyticsEvent={destination.analyticsEvent}>{content}</PdfDeckButton>;
  }
  if (destination.type === "liveWebsite") {
    return <a href={destination.url} className={className} aria-label={destination.ariaLabel} data-analytics-event={destination.analyticsEvent}>{content}</a>;
  }
  return <Link href={serviceHref(destination.url, service)} prefetch={false} className={className} aria-label={destination.ariaLabel} data-analytics-event={destination.analyticsEvent}>{content}</Link>;
}

export function ProjectActions({ project, service }: { project: PortfolioProject; service?: SelectedService }) {
  const destination = getWorkDestination(project);
  return (
    <div className="project-action-row">
      <ProjectAction project={project} service={service} />
      {destination.storyUrl ? <Link href={serviceHref(destination.storyUrl, service)} prefetch={false} className="project-story-link" aria-label={"Behind the " + project.client + " project"} data-analytics-event={project.id + "_project_viewed"}>Behind the project<ArrowRightIcon size={15} weight="light" aria-hidden="true" /></Link> : null}
    </div>
  );
}
