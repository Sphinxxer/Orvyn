import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
  className?: string;
};

export function Logo({ href = "/", className = "" }: LogoProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3.5 ${className}`}
      aria-label="Orvyn home"
    >
      <Image
        src="/orvyn-icon.svg"
        alt="Orvyn logo"
        width={36}
        height={36}
        priority
        className="size-8 shrink-0 transition duration-200 group-hover:opacity-90 sm:size-9"
      />
      <span className="text-base font-semibold uppercase tracking-[0.24em] text-white sm:text-lg">
        ORVYN
      </span>
    </Link>
  );
}
