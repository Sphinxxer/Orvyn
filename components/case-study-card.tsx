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
    <article className="group rounded-[2rem] bg-coal/72 p-5 transition duration-300 hover:-translate-y-1 hover:bg-graphite/72 sm:p-6 lg:p-7">
      <div className="grid gap-7 lg:grid-cols-[0.4fr_0.6fr] lg:gap-12">
        <div className="relative min-h-72 overflow-hidden rounded-[1.5rem] bg-ink p-5 transition duration-200">
          <div className="absolute inset-x-6 top-6 h-px bg-gold/35" aria-hidden="true" />
          <div className="absolute -right-20 bottom-[-5rem] size-64 rounded-full border border-white/10" aria-hidden="true" />
          <div className="relative flex h-full min-h-60 flex-col justify-between pt-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
                {previewLabel}
              </p>
              <p className="mt-4 max-w-52 text-3xl font-semibold leading-tight text-white">
                {title}
              </p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Project deck
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-flex rounded-full bg-gold/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">
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
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={deckHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View project deck for ${title}`}
            className="mt-8 inline-flex w-fit rounded-full border border-gold/35 bg-gold/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft transition duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-ink focus:outline-none focus:ring-2 focus:ring-gold/70 focus:ring-offset-2 focus:ring-offset-ink"
          >
            View project deck →
          </a>
        </div>
      </div>
    </article>
  );
}
