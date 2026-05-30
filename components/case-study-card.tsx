import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudyDetail } from "@/data/home";

type CaseStudyCardProps = {
  project: CaseStudyDetail;
};

export function CaseStudyCard({ project }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${project.slug}`}
      data-cursor="interactive"
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-coal/68 transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-graphite/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      aria-label={`View ${project.title} case study`}
    >
      <ProjectPreviewPanel project={project} mode="card" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-gold/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-soft">
            {project.label}
          </span>
          <span className="text-xs font-medium text-muted">{project.category}</span>
        </div>

        <div className="mt-6 flex flex-1 items-end justify-between gap-5">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-white transition group-hover:text-gold-soft">
              {project.title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted">
              {project.description}
            </p>
          </div>

          <span
            className="grid size-12 shrink-0 place-items-center rounded-full border border-white/12 text-gold-soft transition duration-300 group-hover:translate-x-1 group-hover:border-gold group-hover:bg-gold group-hover:text-ink"
            aria-hidden="true"
          >
            {"\u2192"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectPreviewPanel({
  project,
  mode = "wide",
  priority = false
}: {
  project: CaseStudyDetail;
  mode?: "card" | "wide";
  priority?: boolean;
}) {
  const hasPreview = publicAssetExists(project.previewImage);

  return (
    <div
      className={`relative isolate overflow-hidden bg-ink ${
        mode === "card"
          ? "aspect-[1.28/1] rounded-b-[1.5rem]"
          : "min-h-[22rem] rounded-[2rem] sm:min-h-[30rem]"
      }`}
    >
      {hasPreview ? (
        <Image
          src={project.previewImage}
          alt={getPreviewAlt(project)}
          fill
          priority={priority}
          sizes={mode === "card" ? "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" : "100vw"}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <PlaceholderPreview project={project} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/12 to-transparent" />
      <div className="absolute inset-x-6 top-6 h-px bg-gold/45" aria-hidden="true" />
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
            {project.label}
          </p>
          <p className="mt-2 max-w-sm text-sm font-medium leading-5 text-white/70">
            {project.category}
          </p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/38">
          Project
        </p>
      </div>
    </div>
  );
}

export function publicAssetExists(src?: string) {
  if (!src) {
    return false;
  }

  const relativePath = src.replace(/^\/+/, "");
  return existsSync(path.join(process.cwd(), "public", relativePath));
}

export function getPreviewAlt(project: CaseStudyDetail) {
  if (project.slug === "grandeur-associates") {
    return "Grandeur Associates project preview";
  }

  if (project.slug === "tric-academy") {
    return "TRIC Academy website direction project preview";
  }

  if (project.slug === "cameo-garments") {
    return "Cameo Garments website concept project preview";
  }

  return "SRA Financial Planning brand direction project preview";
}

function PlaceholderPreview({ project }: { project: CaseStudyDetail }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_26%_18%,rgba(200,169,90,0.22),transparent_30%),linear-gradient(135deg,#171511,#070707)]">
      <div
        className="absolute -right-16 -top-16 size-56 rounded-full border border-white/10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 left-8 size-72 rounded-full border border-gold/15"
        aria-hidden="true"
      />
      <div className="absolute left-5 top-5 h-px w-28 bg-gold/50" aria-hidden="true" />
      <div className="absolute bottom-20 left-5 right-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-soft">
          Orvyn direction
        </p>
        <p className="mt-4 max-w-md text-3xl font-semibold leading-tight text-white">
          {project.title}
        </p>
      </div>
    </div>
  );
}
