"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/home";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
      {navItems.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`relative pb-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition ${
              isActive ? "text-gold-soft" : "text-muted hover:text-white"
            }`}
          >
            {item.label}
            {isActive ? (
              <span className="absolute inset-x-0 bottom-0 h-px bg-gold" aria-hidden="true" />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
