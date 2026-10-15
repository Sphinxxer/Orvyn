import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { publishedProjects } from "@/data/case-studies";
import { ProjectAction, ProjectActions } from "./project-action";

const selectedWork = [
  { slug: "biomode", scope: "Brand identity / Shopify ecommerce", summary: "A complete brand system, carried into an online store." },
  { slug: "signal-gravity", scope: "Brand identity / Ecommerce / Social media", summary: "Identity, ecommerce and social media, built for launch." },
  { slug: "flyir", scope: "Brand identity", summary: "A visual system for an Indian athleisure brand." },
  { slug: "iniya-fiber", scope: "Website design / Development", summary: "A clearer digital home for an export-focused textile business." }
] as const;

const imageSizes = "(max-width: 640px) calc(100vw - 40px), (max-width: 1100px) calc((100vw - 96px) / 2), (max-width: 1216px) calc((100vw - 128px) / 2), 544px";

export function CaseStudiesPreview() {
  return (
    <section className="section selected-work container" aria-labelledby="selected-work-title">
      <div className="selected-work__header">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2 id="selected-work-title">Built with intent.</h2>
          <p className="selected-work__intro">A closer look at the brands, stores and websites we’ve brought together.</p>
        </div>
        <Link href="/case-studies" prefetch={false} className="text-link">
          View all work<ArrowRightIcon size={17} weight="light" aria-hidden="true" />
        </Link>
      </div>
      <div className="selected-work__grid">
        {selectedWork.map((entry) => {
          const project = publishedProjects.find((item) => item.slug === entry.slug);
          if (!project) return null;
          const src = project.workPreviewImage ?? project.previewImage;
          const isPrelaunch = project.storeStatus === "prelaunch";

          return (
            <article className="selected-project" key={project.id}>
              <ProjectAction project={project} className={"selected-project__visual" + (project.slug === "biomode" ? " selected-project__visual--biomode" : project.slug === "flyir" ? " selected-project__visual--flyir" : "") + (isPrelaunch ? " selected-project__visual--prelaunch" : "")}>
                <Image
                  src={src}
                  alt={project.workPreviewAlt ?? project.previewAlt}
                  fill
                  loading="lazy"
                  sizes={imageSizes}
                  className="selected-project__image"
                />
                {isPrelaunch ? <span className="selected-project__preview-label">Prelaunch preview</span> : null}
              </ProjectAction>
              <div className="selected-project__copy">
                <h3>{project.client}</h3>
                <p className="selected-project__scope">{entry.scope}</p>
                <p className="selected-project__summary">{project.previewSummary ?? entry.summary}</p>
                <ProjectActions project={project} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}


