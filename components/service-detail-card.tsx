type ServiceDetailCardProps = {
  index: number;
  title: string;
  positioning: string;
  description: string;
  includes: string[];
  bestFor: string;
};

export function ServiceDetailCard({
  index,
  title,
  positioning,
  description,
  includes,
  bestFor
}: ServiceDetailCardProps) {
  return (
    <article className="border-t border-white/10 py-9 transition duration-200 first:border-t-0 hover:border-gold/45 lg:py-11">
      <div className="grid gap-7 lg:grid-cols-[0.16fr_0.42fr_1fr] lg:gap-10">
        <span className="text-4xl font-black leading-none text-gold/65 sm:text-5xl lg:text-6xl">
          {String(index).padStart(2, "0")}
        </span>

        <div>
          <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-xl font-semibold leading-7 text-gold-soft">
            {positioning}
          </p>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted">
            {description}
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-[1fr_0.78fr]">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
              What it includes
            </h3>
            <ul className="mt-5 grid gap-x-5 gap-y-3 sm:grid-cols-2">
              {includes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                  <span className="mt-2 size-1 shrink-0 bg-gold" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/10 pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
              Best for
            </h3>
            <p className="mt-5 text-sm leading-6 text-muted">
              {bestFor}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
