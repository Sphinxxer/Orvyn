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
    <article className="group border border-white/10 bg-coal/35 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-gold/40 sm:p-5">
      <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-ink">
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
        <p className="mt-5 inline-flex border border-gold/25 bg-gold/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">
          {role}
        </p>
        <p className="mt-6 text-base leading-7 text-muted">{description}</p>
      </div>
    </article>
  );
}
