import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
};

const variants = {
  primary:
    "border-gold bg-gold text-ink shadow-[0_18px_48px_rgba(200,169,90,0.13)] hover:border-gold-soft hover:bg-gold-soft hover:shadow-[0_20px_54px_rgba(200,169,90,0.16)]",
  secondary:
    "border-white/18 bg-white/[0.018] text-white/88 hover:border-gold/65 hover:bg-white/[0.04] hover:text-gold-soft",
  ghost:
    "border-transparent bg-transparent text-muted hover:border-white/14 hover:text-white"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  onClick
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex min-h-12 items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold leading-none tracking-[0.01em] transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:translate-y-0 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
