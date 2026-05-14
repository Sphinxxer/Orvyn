type PrincipleCardProps = {
  title: string;
  description: string;
};

export function PrincipleCard({ title, description }: PrincipleCardProps) {
  return (
    <article className="border-t border-white/10 py-7 transition duration-200 hover:border-gold/40 md:py-8">
      <div className="mb-6 h-px w-10 bg-gold" aria-hidden="true" />
      <h3 className="text-xl font-semibold leading-tight text-white">{title}</h3>
      <p className="mt-5 text-base leading-7 text-muted">{description}</p>
    </article>
  );
}
