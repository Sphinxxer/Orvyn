type TeamMemberCardProps = {
  name: string;
  role: string;
  description: string;
  linkedinHref: string;
};

export function TeamMemberCard({
  name,
  role,
  description,
  linkedinHref
}: TeamMemberCardProps) {
  return (
    <article className="group border-t border-white/10 py-7 transition duration-200 hover:border-gold/45 md:py-8">
      <div className="flex items-center gap-5">
        <div className="grid size-14 shrink-0 place-items-center border border-white/10 text-sm font-semibold text-gold-soft sm:size-16">
          {name.slice(-2)}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
            {role}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">{name}</h3>
        </div>
      </div>
      <p className="mt-4 text-base leading-7 text-muted">{description}</p>
      <a
        href={linkedinHref}
        className="mt-6 inline-flex min-h-10 items-center border-b border-white/20 pb-1 text-sm font-semibold text-muted transition group-hover:border-gold/60 group-hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/70 focus:ring-offset-2 focus:ring-offset-ink"
      >
        LinkedIn
      </a>
    </article>
  );
}
