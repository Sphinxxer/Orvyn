import Link from "next/link";
import { DesktopNav } from "./layout/DesktopNav";
import { Logo } from "./layout/Logo";
import { MobileNav } from "./layout/MobileNav";

export function SiteHeader() {
  return (
    <header data-site-header className="site-header fixed inset-x-0 top-0 z-50 border-b px-5 sm:px-6 lg:px-8">
      <div className="site-header__inner relative mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-5 lg:h-20">
        <Logo />

        <DesktopNav />

        <div className="hidden md:block">
          <Link
            href="/contact"
            data-magnetic
            data-cursor="interactive"
            className="orvyn-button group inline-flex min-h-11 items-center gap-3 border border-gold/55 bg-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-soft shadow-[inset_0_0_0_1px_rgba(200,169,90,0.08)] transition duration-300 hover:bg-gold hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:translate-y-0"
          >
            Start a Project
            <svg className="orvyn-button__arrow size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
