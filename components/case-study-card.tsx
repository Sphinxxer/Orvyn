type CaseStudyCardProps = {
  title: string;
  category: string;
  description: string;
  focusAreas: string[];
  label: string;
};

export function CaseStudyCard({
  title,
  category,
  description,
  focusAreas,
  label
}: CaseStudyCardProps) {
  return (
    <article className="group border-t border-white/10 py-8 transition duration-200 first:border-t-0 hover:border-gold/45 lg:py-10">
      <div className="grid gap-7 lg:grid-cols-[0.28fr_0.72fr] lg:gap-12">
        <div>
          <span className="inline-flex border border-gold/35 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
            {label}
          </span>
          <p className="mt-5 text-sm font-medium text-muted">{category}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold leading-tight text-white transition group-hover:text-gold-soft sm:text-3xl">
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
      </div>
    </article>
  );
}
