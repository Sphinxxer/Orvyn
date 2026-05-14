"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/data/home";
import { ButtonLink } from "../button-link";

export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex size-11 items-center justify-center border border-white/14 bg-white/[0.025] transition hover:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/70 focus:ring-offset-2 focus:ring-offset-ink"
      >
        <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
          <span
            className={`h-px bg-white transition ${isOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-px bg-white transition ${isOpen ? "opacity-0" : ""}`} />
          <span
            className={`h-px bg-white transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </span>
      </button>

      {isOpen ? (
        <div className="fixed inset-x-0 top-[4.75rem] z-50 border-y border-white/10 bg-ink px-5 py-5 shadow-[0_28px_80px_rgba(0,0,0,0.72)] sm:px-6 lg:top-20">
          <nav className="grid gap-2.5" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`border px-4 py-3.5 text-base font-medium transition ${
                    isActive
                      ? "border-gold/55 bg-gold/10 text-gold-soft"
                      : "border-white/10 bg-coal text-muted hover:border-gold/40 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <ButtonLink href="/contact" className="mt-4 w-full" onClick={() => setIsOpen(false)}>
            Start a Project
          </ButtonLink>
        </div>
      ) : null}
    </div>
  );
}
