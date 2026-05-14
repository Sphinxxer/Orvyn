import Image from "next/image";

type TeamMemberCardProps = {
  name: string;
  role: string;
  description: string;
  imageSrc: string;
  focusAreas: string[];
};

export function TeamMemberCard({
  name,
  role,
  description,
  imageSrc,
  focusAreas
}: TeamMemberCardProps) {
  return (
    <article className="group border border-white/10 bg-coal/35 p-4 transition duration-200 hover:-translate-y-1 hover:border-gold/40 sm:p-5">
      <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-ink">
        <Image
          src={imageSrc}
          alt={`${name} placeholder portrait`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover opacity-80 transition duration-300 group-hover:scale-[1.01] group-hover:opacity-95"
        />
      </div>

      <div className="pt-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
          {role}
        </p>
        <h3 className="mt-4 text-2xl font-semibold text-white">{name}</h3>
        <p className="mt-5 text-base leading-7 text-muted">{description}</p>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
            Focus Areas
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="border border-white/10 bg-white/[0.015] px-3 py-1.5 text-xs font-medium text-muted transition group-hover:border-gold/25 group-hover:text-white"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
