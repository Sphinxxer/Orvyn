import Link from "next/link";
import { navItems } from "@/data/home";
import { ButtonLink } from "./button-link";
import { Logo } from "./layout/Logo";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/orvyn.cc/", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/orvyncc/", icon: "linkedin" }
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-coal/60 px-5 py-12 sm:px-6 lg:px-8 lg:py-[72px]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.42fr_0.68fr] lg:items-start lg:gap-14">
          <div className="border-t border-gold/40 pt-6">
            <Logo />
            <p className="mt-7 max-w-[420px] text-balance text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Become impossible to ignore with ORVYN.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              Brand growth agency and modern internet company based in Tirupur,
              India.
            </p>
          </div>

          <FooterLinks title="Explore" links={navItems} />

          <div className="border-t border-white/10 pt-6 lg:border-t-gold/40">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-soft">
              Start a conversation
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              Ready to make your brand clearer, sharper, and harder to ignore?
            </p>
            <ButtonLink href="/contact" className="mt-6 min-h-11 w-full px-5 py-2.5 sm:w-auto">
              Start a Project
            </ButtonLink>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-8 place-items-center border border-white/10 bg-white/[0.01] text-muted transition hover:-translate-y-0.5 hover:border-gold/45 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <SocialIcon icon={item.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:mt-14">
          <p>&copy; {new Date().getFullYear()} Orvyn. All rights reserved.</p>
          <Link
            href="/"
            aria-label="Back to Orvyn home"
            className="text-xs font-semibold uppercase tracking-[0.38em] text-gold-soft/80 transition hover:text-gold-soft focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            ORVYN
          </Link>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  if (icon === "instagram") {
    return (
      <svg className="size-[1.15rem]" viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M6.78 8.95H3.72V20h3.06V8.95ZM7 5.63c0-.98-.73-1.73-1.79-1.73-1.05 0-1.8.75-1.8 1.73 0 .97.73 1.73 1.75 1.73h.02C6.26 7.36 7 6.6 7 5.63ZM20.59 13.67c0-3.4-1.81-4.98-4.23-4.98-1.95 0-2.82 1.07-3.31 1.82V8.95H9.99c.04 1.03 0 11.05 0 11.05h3.06v-6.17c0-.33.02-.66.12-.9.26-.66.85-1.33 1.84-1.33 1.3 0 1.82.99 1.82 2.44V20h3.06l.7-6.33Z" />
      </svg>
    );
  }

  return null;
}

function FooterLinks({
  title,
  links
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <nav className="border-t border-white/10 pt-6 lg:border-t-gold/40" aria-label={title}>
      <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-soft">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {links.map((item) => (
          <li key={`${title}-${item.label}`}>
            <Link
              href={item.href}
              className="text-sm font-medium leading-6 text-muted transition hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
