import { CapabilityIcon } from "./capability-icon";

type ServiceDetailCardProps = {
  icon: string;
  title: string;
  positioning: string;
  description: string;
  includes: string[];
  bestFor: string;
  index?: number;
};

export function ServiceDetailCard({
  icon,
  title,
  positioning,
  description,
  includes,
  bestFor,
  index = 0
}: ServiceDetailCardProps) {
  return (
    <article
      className={`rounded-[2rem] px-5 py-8 transition duration-200 hover:-translate-y-0.5 sm:px-7 lg:px-9 lg:py-10 ${
        index % 2 === 0 ? "bg-coal/85" : "bg-white/[0.025]"
      }`}
    >
      <div className="grid gap-8 lg:grid-cols-[0.4fr_1fr] lg:gap-16">
        <div className="max-w-xl">
          <div className="flex size-14 items-center justify-center rounded-full bg-gold/10 text-gold-soft">
            <CapabilityIcon icon={icon} className="size-6" />
          </div>
          <h2 className="mt-7 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="mt-5 text-xl font-semibold leading-7 text-gold-soft">
            {positioning}
          </p>
        </div>

        <div>
          <p className="max-w-2xl text-base leading-7 text-white/74 sm:text-lg sm:leading-8">
            {description}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-[1fr_0.72fr]">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                What it includes
              </h3>
              <ul className="mt-5 grid gap-x-5 gap-y-3 rounded-[1.25rem] bg-ink/55 p-5 sm:grid-cols-2">
                {includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.25rem] bg-ink/55 p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                Best for
              </h3>
              <p className="mt-5 text-sm leading-6 text-muted">{bestFor}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
