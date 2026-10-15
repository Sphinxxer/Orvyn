import type { Metadata } from "next";
import Image from "next/image";
import { BackToWorkLink } from "@/components/back-to-work-link";
import { notFound } from "next/navigation";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { SiteFrame } from "@/components/site-frame";
import { JsonLd } from "@/components/seo/JsonLd";
import { createProjectBreadcrumbJsonLd } from "@/components/seo/breadcrumbs";
import { FinalCta } from "@/components/final-cta";
import { PdfDeckButton } from "@/components/pdf-deck-button";
import { ProjectTile } from "@/components/project-tile";
import { caseStudyDetails, clientProjects, getLiveWebsite } from "@/data/case-studies";
import { createCreativeWorkSchema } from "@/data/schema";
import { projectImageSizes } from "@/data/project-images";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return caseStudyDetails.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudyDetails.find((item) => item.slug === slug);
  if (!project) return {};
  return { title: project.client + " | Orvyn Work", description: project.description, alternates: { canonical: "/case-studies/" + slug }, openGraph: { title: project.client + " — Orvyn", description: project.description, url: "/case-studies/" + slug, type: "article", images: ["/opengraph-image"] }, twitter: { card: "summary_large_image", title: project.client + " — Orvyn", description: project.description, images: ["/opengraph-image"] } };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = caseStudyDetails.find((item) => item.slug === slug);
  if (!project) notFound();
  const liveUrl = getLiveWebsite(project);
  const gallery = project.gallery ?? (project.previewImage ? [{ src: project.previewImage, alt: project.previewAlt, caption: project.label }] : []);
  const related = clientProjects.filter((item) => item.slug !== slug).slice(0, 2);
  return <SiteFrame><JsonLd data={[createProjectBreadcrumbJsonLd(project.client, "/case-studies/" + slug), createCreativeWorkSchema(project, project.description)]} /><article className="project-page container"><BackToWorkLink /><header className="project-intro"><div><p className="eyebrow">{project.projectKind === "direction" ? "Direction & concept" : "Client project"}</p><h1>{project.client}</h1><p className="project-lead">{project.brief ?? project.description}</p></div><dl className="project-facts"><div><dt>Our contribution</dt><dd>{project.services.join(" / ")}</dd></div><div><dt>Status</dt><dd>{project.storeStatus === "prelaunch" ? "Prelaunch · store launching soon" : project.status}</dd></div></dl></header>
    <section className="project-story" aria-label="Project overview"><h2>{project.storyTitle ?? "The direction"}</h2><div><p>{project.contribution ?? project.whatThisShows}</p><div className="project-actions">{liveUrl ? <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="button button--primary" data-analytics-event={project.id + "_website_visited"}>{project.slug === "iniya-fiber" ? "Visit website" : "Visit store"}<ArrowUpRightIcon size={17} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a> : null}{project.deckStatus === "available" && project.deckHref ? <PdfDeckButton href={project.deckHref} name={project.client} preview={project.previewImage} /> : null}</div></div></section>
    {project.designNotes?.length ? <section className="project-decisions" aria-label="Design details">{project.designNotes.map((note) => <div key={note.title}><h3>{note.title}</h3><p>{note.copy}</p></div>)}</section> : null}
    {project.storeStatus === "prelaunch" ? <aside className="prelaunch-note"><span className="status-label">Prelaunch</span><p>The store is preparing for launch. Orvyn’s work covers brand identity, ecommerce and social media. The public storefront link will be available after launch.</p></aside> : null}
    <div className={"project-gallery" + (gallery.length > 2 ? " project-gallery--paired" : "")}>{gallery.map((item, index) => <figure key={item.src}><Image src={item.src} alt={item.alt} {...(projectImageSizes[item.src] ?? { width: 1440, height: 960 })} sizes={gallery.length > 2 && index > 0 ? "(max-width: 640px) calc(100vw - 40px), (max-width: 1360px) 45vw, 620px" : "(max-width: 1360px) calc(100vw - 48px), 1248px"} className="project-gallery__image" loading={index === 0 ? "eager" : "lazy"} /><figcaption>{item.caption}</figcaption></figure>)}</div>
    <section className="project-deliverables"><h2>{project.projectKind === "direction" ? "Focus areas" : "What we worked on"}</h2><ul>{project.focusAreas.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <section className="related-work" aria-labelledby="related-title"><div className="section-heading"><h2 id="related-title">More from the studio</h2><span className="heading-rule" /></div><div className="featured-grid">{related.map((item) => <ProjectTile project={item} key={item.id} />)}</div></section></article><FinalCta /></SiteFrame>;
}


