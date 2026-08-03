"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navItems } from "@/data/home";
import { ButtonLink } from "../button-link";
import { Logo } from "./Logo";

export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const shouldRestoreFocus = useRef(false);

  const closeMenu = useCallback(() => {
    shouldRestoreFocus.current = true;
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (shouldRestoreFocus.current) {
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        shouldRestoreFocus.current = false;
      }
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = Array.from(
        menuPanelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((element) => !element.hasAttribute("disabled"));

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => {
      menuPanelRef.current?.querySelector<HTMLElement>("button[aria-label='Close menu']")?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  const menuPanel = isOpen
    ? createPortal(
        <div
          ref={menuPanelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[70] overflow-y-auto bg-ink/98 px-5 pb-6 pt-5 shadow-[0_28px_80px_rgba(0,0,0,0.72)] backdrop-blur-xl animate-in fade-in duration-200 supports-[backdrop-filter]:bg-ink/94 sm:px-6"
        >
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(200,169,90,0.12),transparent_28%),radial-gradient(circle_at_78%_72%,rgba(200,169,90,0.09),transparent_26%)]" />
          <div className="mx-auto flex min-h-full max-w-7xl flex-col">
            <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-5">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="group inline-flex size-11 items-center justify-center rounded-full border border-gold/35 bg-gold/5 text-gold-soft transition duration-200 hover:border-gold/60 hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span className="relative block size-4" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 rotate-45 bg-current transition group-hover:scale-110" />
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 -rotate-45 bg-current transition group-hover:scale-110" />
                </span>
              </button>
            </div>

            <nav className="py-6" aria-label="Mobile navigation">
              <div className="border-y border-white/10">
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={closeMenu}
                      className={`group flex min-h-[4.35rem] items-center justify-between gap-5 border-b border-white/10 py-3.5 transition duration-200 last:border-b-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:min-h-[4.75rem] sm:py-4 ${
                        isActive ? "text-gold-soft" : "text-white hover:text-gold-soft"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-4">
                        <span
                          className={`size-2 shrink-0 rounded-full transition ${
                            isActive ? "bg-gold" : "bg-white/18 group-hover:bg-gold/70"
                          }`}
                          aria-hidden="true"
                        />
                        <span className="min-w-0">
                          <span className="block whitespace-nowrap text-[clamp(2rem,10vw,2.65rem)] font-semibold leading-none tracking-[-0.01em] sm:text-5xl">
                            {item.label}
                          </span>
                        </span>
                      </span>
                      <span
                        className={`text-sm transition duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 ${
                          isActive ? "text-gold-soft" : "text-white/24 group-hover:text-gold-soft"
                        }`}
                        aria-hidden="true"
                      >
                        -&gt;
                      </span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="border-t border-white/10 pt-5">
              <ButtonLink href="/contact" className="w-full min-h-13" onClick={closeMenu}>
                Start a Project
              </ButtonLink>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <div className="lg:hidden">
      <button
        type="button"
        ref={menuButtonRef}
        aria-label="Open menu"
        aria-expanded={isOpen}
        onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
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

      {menuPanel}
    </div>
  );
}
