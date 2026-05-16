import { ButtonLink } from "./button-link";
import { SectionShell } from "./section-shell";

type CTASectionProps = {
  title: string;
  copy?: string;
  ctaLabel: string;
  ctaHref: string;
};

export function CTASection({ title, copy, ctaLabel, ctaHref }: CTASectionProps) {
  return (
    <SectionShell className="pt-0">
      <div className="relative overflow-hidden rounded-[2rem] bg-coal p-7 sm:p-10 lg:p-12">
        <div className="gold-rule absolute inset-x-0 top-0 h-px" aria-hidden="true" />
        <h2 className="max-w-3xl text-balance text-3xl font-bold leading-[1.05] text-white sm:text-5xl">
          {title}
        </h2>
        {copy ? <p className="mt-5 max-w-2xl text-base leading-7 text-muted">{copy}</p> : null}
        <ButtonLink href={ctaHref} className="mt-8 w-full sm:w-auto">
          {ctaLabel}
        </ButtonLink>
      </div>
    </SectionShell>
  );
}
