import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyCard, ProjectPreviewPanel } from "@/components/case-study-card";
import { CTASection } from "@/components/cta-section";
import { SectionShell } from "@/components/section-shell";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteFrame } from "@/components/site-frame";
import { caseStudyDetails } from "@/data/home";

const baseUrl = "https://orvyn.cc";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return caseStudyDetails.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  const title = `${project.title} Case Study | Orvyn`;
  const description = getProjectMetaDescription(project.slug);
  const canonical = `/case-studies/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Orvyn",
      type: "article",
      locale: "en_IN",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${project.title} case study by Orvyn`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"]
    }
  };
}

export default async function CaseStudyProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = caseStudyDetails
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);
  const hasDeck = projectHasDeck(project.deckHref);
  const projectUrl = `${baseUrl}/case-studies/${project.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${baseUrl}/`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Case Studies",
          item: `${baseUrl}/case-studies`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title,
          item: projectUrl
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      url: projectUrl,
      description: project.description,
      about: project.category,
      creator: {
        "@type": "Organization",
        name: "Orvyn",
        url: baseUrl
      }
    }
  ];

  return (
    <SiteFrame>
      <JsonLd data={jsonLd} />
      <section className="border-b border-white/10 px-5 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36 lg:px-8 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft transition hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <span aria-hidden="true">{"\u2190"}</span>
            Back to Case Studies
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.78fr_0.42fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-gold/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">
                  {project.label}
                </span>
                <span className="text-sm font-medium text-muted">{project.category}</span>
              </div>
              <h1 className="mt-6 max-w-4xl text-balance text-5xl font-black leading-[0.95] text-white sm:text-7xl lg:text-8xl">
                {project.title}
              </h1>
            </div>
            <p className="border-t border-gold pt-6 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <SectionShell className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:gap-10">
          <ProjectPreviewPanel project={project} priority />

          <aside className="rounded-[2rem] border border-white/10 bg-coal/65 p-5 sm:p-6 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-soft">
              Project meta
            </p>
            <dl className="mt-6 space-y-5">
              <MetaItem label="Client / Project" value={project.title} />
              <MetaItem label="Category" value={project.category} />
              <MetaItem label="Service wing" value={project.serviceWing} />
              <MetaItem label="Status" value={project.status} />
            </dl>
          </aside>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.45fr_0.55fr] lg:gap-12">
          <div className="rounded-[2rem] border border-white/10 bg-coal/55 p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-soft">
              What this shows
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              A direction with a clear role.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">{project.whatThisShows}</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-coal/55 p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-soft">
              Focus areas
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {project.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-2 text-sm leading-5 text-white/72"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-gold/25 bg-[linear-gradient(135deg,rgba(200,169,90,0.11),rgba(255,255,255,0.02))] p-5 sm:p-7 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-soft">
              Project deck
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">
              Review the project direction.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
              The deck opens in a new tab so the case study page stays light and
              mobile-friendly.
            </p>
          </div>

          {hasDeck && project.deckHref ? (
            <a
              href={project.deckHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} project deck`}
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink lg:mt-0"
            >
              Open project deck
            </a>
          ) : (
            <span className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/45 lg:mt-0">
              Deck coming soon
            </span>
          )}
        </div>
      </SectionShell>

      <SectionShell className="bg-white/[0.012]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Related projects
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.04] text-white sm:text-5xl">
              More from the archive.
            </h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {relatedProjects.map((item) => (
            <CaseStudyCard key={item.slug} project={item} />
          ))}
        </div>
      </SectionShell>

      <CTASection
        title="Have a brand that needs clearer direction?"
        copy="Tell us what feels unclear. The next move might be consulting, design, marketing, websites, or a mix of all four."
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </SiteFrame>
  );
}

function getProject(slug: string) {
  return caseStudyDetails.find((project) => project.slug === slug);
}

function getProjectMetaDescription(slug: string) {
  if (slug === "grandeur-associates") {
    return "A content and presentation direction for a premium architecture, construction, and interiors brand by Orvyn.";
  }

  if (slug === "tric-academy") {
    return "A website direction for a Tirupur-based sports academy built around programs, facilities, trust, and application flow.";
  }

  if (slug === "cameo-garments") {
    return "A modern website direction for a Tirupur-based garment exporter with an outdated digital presence.";
  }

  return "A clean brand identity and digital presentation direction for a financial planning and advisory firm.";
}

function projectHasDeck(deckHref?: string) {
  if (!deckHref) {
    return false;
  }

  return existsSync(path.join(process.cwd(), "public", deckHref.replace(/^\/+/, "")));
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-white/38">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium leading-6 text-white/78">{value}</dd>
    </div>
  );
}
