type CaseStudyCardProps = {
  title: string;
  category: string;
  description: string;
  focusAreas: string[];
  label: string;
  deckHref: string;
  previewLabel: string;
};

export function CaseStudyCard({
  title,
  category,
  description,
  focusAreas,
  label,
  deckHref,
  previewLabel
}: CaseStudyCardProps) {
  return (
    <article className="group border-t border-white/10 py-8 transition duration-200 first:border-t-0 hover:-translate-y-0.5 hover:border-gold/45 lg:py-10">
      <div className="grid gap-7 lg:grid-cols-[0.38fr_0.62fr] lg:gap-12">
        <div className="relative min-h-72 overflow-hidden border border-white/10 bg-coal p-5 transition duration-200 group-hover:border-gold/35">
          <div className="absolute inset-0 opacity-[0.035]" aria-hidden="true">
            <div className="absolute -right-16 top-8 size-56 rounded-full border border-white" />
            <div className="absolute right-10 top-24 h-px w-64 rotate-[-38deg] bg-white" />
          </div>
          <div className="relative flex h-full min-h-60 flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
                {previewLabel}
              </p>
              <p className="mt-4 max-w-52 text-3xl font-semibold leading-tight text-white">
                {title}
              </p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              PDF-ready preview
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-flex border border-gold/35 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
              {label}
            </span>
            <p className="mt-5 text-sm font-medium text-muted">{category}</p>
            <h2 className="mt-7 text-3xl font-semibold leading-tight text-white transition group-hover:text-gold-soft sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{description}</p>

            <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
              Focus areas
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <li key={area} className="flex gap-3 text-sm leading-6 text-muted">
                  <span className="mt-2 size-1.5 shrink-0 bg-gold" aria-hidden="true" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <span
            data-pdf-path={deckHref}
            aria-label={`PDF coming soon for ${title}`}
            aria-disabled="true"
            className="mt-8 inline-flex w-fit cursor-not-allowed select-none border border-white/12 bg-white/[0.015] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted/85"
          >
            PDF coming soon
          </span>
        </div>
      </div>
    </article>
  );
}
