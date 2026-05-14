type ProcessStepProps = {
  number: string;
  title: string;
  description: string;
};

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <article className="border-t border-white/10 py-7 first:border-t-0 md:py-8">
      <div className="grid gap-4 md:grid-cols-[0.18fr_0.32fr_1fr] md:gap-8">
        <span className="text-sm font-semibold text-gold-soft">{number}</span>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-base leading-7 text-muted">{description}</p>
      </div>
    </article>
  );
}
