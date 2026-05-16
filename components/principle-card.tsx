type PrincipleCardProps = {
  title: string;
  description: string;
};

export function PrincipleCard({ title, description }: PrincipleCardProps) {
  return (
    <article className="rounded-[1.75rem] bg-coal/65 p-6 transition duration-200 hover:-translate-y-0.5 hover:bg-graphite/70 md:p-7">
      <div className="mb-6 h-px w-10 bg-gold" aria-hidden="true" />
      <h3 className="text-xl font-semibold leading-tight text-white">{title}</h3>
      <p className="mt-5 text-base leading-7 text-muted">{description}</p>
    </article>
  );
}
