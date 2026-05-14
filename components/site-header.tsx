import Link from "next/link";
import { DesktopNav } from "./layout/DesktopNav";
import { Logo } from "./layout/Logo";
import { MobileNav } from "./layout/MobileNav";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/95 px-5 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="relative mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-5 lg:h-20">
        <Logo />

        <DesktopNav />

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="group inline-flex min-h-11 items-center gap-3 border border-gold/55 bg-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-soft shadow-[inset_0_0_0_1px_rgba(200,169,90,0.08)] transition duration-200 hover:-translate-y-0.5 hover:bg-gold hover:text-ink focus:outline-none focus:ring-2 focus:ring-gold/70 focus:ring-offset-2 focus:ring-offset-ink active:translate-y-0"
          >
            Start a Project
            <span className="transition group-hover:translate-x-0.5" aria-hidden="true">
              -&gt;
            </span>
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
