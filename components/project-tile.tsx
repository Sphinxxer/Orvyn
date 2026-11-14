import Image from "next/image";
import { WhatsAppLink } from "@/components/whatsapp-link";
import type { PortfolioProject } from "@/data/case-studies";
import { ProjectAction } from "@/components/project-action";
import { ProjectActions } from "@/components/project-action";
import type { SelectedService } from "@/data/service-filter";

export function ProjectTile({ project, compact = false, priority = false, summary = false, service, headingLevel = 3, enquiryPlacement = "work_project" }: { project: PortfolioProject; compact?: boolean; priority?: boolean; summary?: boolean; service?: SelectedService; headingLevel?: 2 | 3; enquiryPlacement?: string }) {
  const servicePreview = service ? project.servicePreviews?.[service] : undefined;
  const src = servicePreview?.src ?? project.workPreviewImage ?? project.previewImage;
  const showStorefront = !!project.storefrontPreview && !servicePreview;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return <article className={"project-tile portfolio-project " + (compact ? "project-tile--compact " : "") + (!src ? "project-tile--text " : "") + (project.slug === "biomode" ? "project-tile--biomode " : "") + (project.storeStatus === "prelaunch" ? "project-tile--prelaunch " : "")}>
    {src ? <ProjectAction project={project} service={service} className={"project-tile__visual" + (showStorefront ? " project-tile__visual--store" : "") + (servicePreview ? " project-tile__visual--identity" : "")}>{showStorefront ? <StorefrontPreview project={project} priority={priority} /> : <Image src={src} alt={servicePreview?.alt ?? project.workPreviewAlt ?? project.previewAlt} fill loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} sizes={compact ? "(max-width: 640px) 140px, 260px" : "(max-width: 700px) calc(100vw - 40px), (max-width: 1360px) 45vw, 610px"} className="project-tile__image" />}</ProjectAction> : null}
    <div className="project-tile__info">
      <div className="portfolio-project__heading"><Heading>{project.client}</Heading>{project.slug === "signal-gravity" && project.storeStatus === "live" ? <span className="status-label">Store live</span> : project.storeStatus === "prelaunch" ? <span className="status-label">Prelaunch</span> : null}</div>
      <p className="project-tile__scope">{project.workCategory ?? project.label}</p>
      {summary ? <p className="project-tile__summary">{(service && project.serviceSummaries?.[service]) || project.previewSummary || project.description}</p> : null}
      {project.storeStatus === "prelaunch" ? <p className="portfolio-project__preview-note">Prelaunch page shown; the store is not yet live.</p> : null}
      <ProjectActions project={project} service={service} />
      {summary ? <WhatsAppLink placement={enquiryPlacement} project={{ id: project.id, client: project.client }} label="Discuss a similar project" className="text-link project-enquiry" /> : null}
    </div>
  </article>;
}


export function StorefrontPreview({ project, priority = false }: { project: PortfolioProject; priority?: boolean }) {
  const preview = project.storefrontPreview;
  const website = project.websiteUrl ?? (project.destinationType === "liveWebsite" ? project.destinationUrl : undefined);
  if (!preview || !website) return null;
  const domain = new URL(website).hostname.replace(/^www\./, "");
  return <span className="store-preview">
    <span className="store-preview__desktop">
      <span className="store-preview__bar">{domain}<span>Shopify store</span></span>
      <Image src={preview.desktop} alt={`${project.client} Shopify store on desktop`} width={1440} height={1000}
        sizes="(max-width: 640px) 80vw, (max-width: 1360px) 40vw, 520px" loading={priority ? "eager" : "lazy"} />
    </span>
    <span className="store-preview__phone">
      <Image src={preview.mobile} alt={`${project.client} Shopify store on mobile`} width={390} height={844}
        sizes="(max-width: 640px) 28vw, 170px" loading={priority ? "eager" : "lazy"} />
    </span>
  </span>;
}
