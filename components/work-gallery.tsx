"use client";
import Link from "next/link";
import { useRef } from "react";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import type { PortfolioProject } from "@/data/case-studies";
import { serviceHref, serviceOptions } from "@/data/service-filter";
import { trackClarityEvent } from "./analytics/track-event";
import { useServiceSelection } from "./ui/use-service-selection";
import { FinalCta } from "./final-cta";
import { ProjectTile } from "./project-tile";
export function WorkGallery({ projects }: { projects: PortfolioProject[] }) {
  const { service, selectService } = useServiceSelection();
  const disclosure = useRef<HTMLDetailsElement>(null);
  const visible = projects.filter((project) => !service || project.serviceWings?.includes(service));
  const clients = visible.filter((project) => project.projectKind === "client");
  const directions = visible.filter((project) => project.projectKind === "direction");
  return <div className="work-gallery">
    <div className="container">
      <div className="work-filters" role="group" aria-label="Filter projects by service">{([undefined, ...serviceOptions] as const).map((item) => <button key={item ?? "all"} type="button" aria-pressed={service === item} onClick={() => {
        selectService(item);
        if (disclosure.current) disclosure.current.open = false;
        trackClarityEvent(`work_filter_${item?.toLowerCase() ?? "all"}`);
      }}>{item ?? "All work"}</button>)}</div>
      <p className="filter-summary" role="status">{clients.length} client {clients.length === 1 ? "project" : "projects"}{service ? ` in ${service.toLowerCase()}` : ""}{directions.length ? <span> · {directions.length} {directions.length === 1 ? "concept" : "concepts"}</span> : null}</p>
      <div className="work-grid" aria-label="Client projects">{clients.map((project, index) => <ProjectTile project={project} key={project.id} priority={index === 0} summary service={service} />)}</div>
    </div>
    <FinalCta service={service} />
    {directions.length ? <div className="container"><details className="concept-disclosure" ref={disclosure} key={service ?? "all"}>
      <summary>Directions &amp; concepts ({directions.length})<CaretDownIcon size={20} aria-hidden="true" /></summary>
      <p>Strategic and visual explorations, presented with their scope and status.</p>
      <ul className="concept-list">{directions.map((project) => <li key={project.id}><div><h2>{project.client}</h2><p>{project.workCategory ?? project.label}</p></div><span className="project-kind-label">Direction &amp; concept</span><Link href={serviceHref(`/case-studies/${project.slug}`, service)} prefetch={false} className="text-link" aria-label={`View the ${project.client} project`}>View project<ArrowRightIcon size={16} aria-hidden="true" /></Link></li>)}</ul>
    </details></div> : null}
  </div>;
}

