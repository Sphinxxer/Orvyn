import Image from "next/image";

type TeamMemberCardProps = {
  name: string;
  title: string;
  role: string;
  description: string;
  imageSrc: string;
  alt: string;
};

export function TeamMemberCard({
  name,
  title,
  role,
  description,
  imageSrc,
  alt
}: TeamMemberCardProps) {
  return (
    <article className="group rounded-2xl border border-white/0 bg-coal/55 p-4 transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:bg-graphite/70 sm:p-5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover opacity-90 transition duration-300 group-hover:scale-[1.01] group-hover:opacity-100"
        />
      </div>

      <div className="pt-7">
        <h3 className="text-2xl font-semibold leading-tight text-white">{name}</h3>
        <p className="mt-2 text-sm font-medium text-muted">{title}</p>
        <p className="mt-5 inline-flex rounded-full bg-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-soft">
          {role}
        </p>
        <p className="mt-6 text-base leading-7 text-muted">{description}</p>
      </div>
    </article>
  );
}
