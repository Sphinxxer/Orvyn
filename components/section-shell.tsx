import type { ReactNode } from "react";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
};

export function SectionShell({
  children,
  className = "",
  innerClassName = "",
  id
}: SectionShellProps) {
  return (
    <section id={id} className={`px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28 ${className}`}>
      <div className={`mx-auto w-full max-w-7xl ${innerClassName}`}>{children}</div>
    </section>
  );
}
