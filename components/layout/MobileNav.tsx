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
        className={`group inline-flex size-11 items-center justify-center border transition duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
          isOpen
            ? "border-gold/55 bg-gold/10 text-gold-soft"
            : "border-white/14 bg-white/[0.025] text-white hover:border-gold/50 hover:text-gold-soft"
        }`}
      >
        <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
          <span
            className={`h-px bg-current transition duration-200 ${
              isOpen ? "translate-y-2 rotate-45" : "group-hover:w-4"
            }`}
          />
          <span className={`h-px bg-current transition duration-200 ${isOpen ? "opacity-0" : ""}`} />
          <span
            className={`h-px bg-current transition duration-200 ${
              isOpen ? "-translate-y-2 -rotate-45" : "group-hover:w-4"
            }`}
          />
        </span>
      </button>

      {isOpen ? (
        <div className="fixed inset-x-0 top-[4.75rem] z-50 border-y border-white/10 bg-ink px-5 py-5 shadow-[0_28px_80px_rgba(0,0,0,0.72)] sm:px-6 lg:top-20">
          <div className="mx-auto max-w-7xl">
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
                    className={`flex min-h-14 items-center justify-between border px-4 py-3.5 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                      isActive
                        ? "border-gold/55 bg-gold/10 text-gold-soft"
                        : "border-white/10 bg-coal text-white/78 hover:border-gold/40 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`h-px w-7 transition ${
                        isActive ? "bg-gold" : "bg-white/20"
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </nav>
            <ButtonLink href="/contact" className="mt-5 w-full" onClick={() => setIsOpen(false)}>
              Start a Project
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </div>
  );
}
