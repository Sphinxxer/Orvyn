type CaseStudyCardProps = {
  title: string;
  category: string;
  description: string;
  whatThisShows: string;
  focusAreas: string[];
  label: string;
  deckHref?: string;
  deckStatus?: "available" | "coming-soon";
  tags?: string[];
  featured?: boolean;
};

export function CaseStudyCard({
  title,
  category,
  description,
  whatThisShows,
  focusAreas,
  label,
  deckHref,
  deckStatus = "available",
  tags = [],
  featured = false
}: CaseStudyCardProps) {
  const hasDeck = deckStatus === "available" && Boolean(deckHref);

  return (
    <article
      data-cursor="interactive"
      className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-coal/68 transition duration-300 hover:border-gold/35 hover:bg-graphite/70 ${
        featured ? "p-5 sm:p-7 lg:p-8" : "p-4 sm:p-5 lg:p-6"
      }`}
    >
      <div
        className={`grid gap-6 ${
          featured
            ? "lg:grid-cols-[0.48fr_0.52fr] lg:gap-12"
            : "lg:grid-cols-[0.36fr_0.64fr] lg:items-stretch lg:gap-9"
        }`}
      >
        <DeckPreview
          title={title}
          category={category}
          label={label}
          hasDeck={hasDeck}
          featured={featured}
        />

        <div className="flex min-w-0 flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-gold/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">
                {label}
              </span>
              <span className="text-sm font-medium text-muted">{category}</span>
            </div>

            <h2
              className={`mt-6 font-semibold leading-tight text-white transition group-hover:text-gold-soft ${
                featured ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"
              }`}
            >
              {title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{description}</p>

            <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-ink/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                What this shows
              </p>
              <p className="mt-3 text-sm leading-6 text-white/72">{whatThisShows}</p>
            </div>

            {tags.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/65"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
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
          </div>

          {hasDeck ? (
            <a
              href={deckHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} project deck`}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft transition duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              View project deck{" "}
              <span className="transition group-hover:translate-x-1" aria-hidden="true">
                {"\u2192"}
              </span>
            </a>
          ) : (
            <span className="mt-8 inline-flex w-fit items-center rounded-full border border-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              Deck coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function DeckPreview({
  title,
  category,
  label,
  hasDeck,
  featured
}: {
  title: string;
  category: string;
  label: string;
  hasDeck: boolean;
  featured: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.65rem] bg-ink p-5 transition duration-300 group-hover:-translate-y-1 ${
        featured ? "min-h-80 sm:min-h-[27rem]" : "min-h-64"
      }`}
    >
      <div className="absolute inset-x-6 top-6 h-px bg-gold/45" aria-hidden="true" />
      <div className="absolute right-6 top-9 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
        {hasDeck ? "PDF" : "Pending"}
      </div>
      <div
        className="absolute -right-24 bottom-[-6rem] size-72 rounded-full border border-white/10 transition duration-300 group-hover:border-gold/30"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-6 left-5 right-5 h-24 rounded-[1.25rem] border border-white/8 bg-white/[0.025] transition duration-300 group-hover:translate-x-2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 right-10 h-px w-24 bg-gold/45 transition duration-300 group-hover:w-32"
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col justify-between pt-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
            {label}
          </p>
          <p
            className={`mt-4 max-w-72 font-semibold leading-tight text-white ${
              featured ? "text-4xl sm:text-5xl" : "text-3xl"
            }`}
          >
            {title}
          </p>
        </div>
        <p className="max-w-72 text-xs font-semibold uppercase leading-5 tracking-[0.2em] text-muted">
          {category}
        </p>
      </div>
    </div>
  );
}
