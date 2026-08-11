import Image from "next/image";

export function OrvynHalo({
  className = "",
  variant = "hero"
}: {
  className?: string;
  variant?: "hero" | "cta";
}) {
  return (
    <div
      data-halo
      className={`orvyn-halo orvyn-halo--${variant} pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <span className="orvyn-halo__light" />
      <span className="orvyn-halo__mark">
        <Image src="/orvyn-icon.svg" alt="" fill sizes="(min-width: 1024px) 48vw, 80vw" />
      </span>
    </div>
  );
}
