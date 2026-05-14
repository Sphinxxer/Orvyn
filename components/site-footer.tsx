import Link from "next/link";
import { navItems } from "@/data/home";
import { ButtonLink } from "./button-link";
import { Logo } from "./layout/Logo";

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "X", href: "#", icon: "x" }
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-coal/50 px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.58fr_0.82fr] lg:gap-16">
          <div className="border-t border-gold/45 pt-6">
            <Logo />
            <p className="mt-7 max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Become impossible to ignore with ORVYN.
            </p>
          </div>

          <FooterLinks title="Quick links" links={navItems} />

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-soft">
              Contact
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              Ready to sharpen how your brand looks, speaks, and grows online?
            </p>
            <ButtonLink href="/contact" className="mt-5 w-full sm:w-auto">
              Start a Project
            </ButtonLink>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="grid size-11 place-items-center border border-white/12 bg-white/[0.02] text-muted transition hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/70 focus:ring-offset-2 focus:ring-offset-ink"
                >
                  <SocialIcon icon={item.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Orvyn. All rights reserved.</p>
          <p className="uppercase tracking-[0.18em] text-gold-soft">ORVYN</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  if (icon === "linkedin") {
    return (
      <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M6.94 8.98H3.71V20h3.23V8.98ZM7.2 5.57c0-1.04-.78-1.83-1.9-1.83-1.11 0-1.91.79-1.91 1.83 0 1.02.78 1.83 1.86 1.83h.02c1.15 0 1.93-.81 1.93-1.83ZM20.61 13.67c0-3.41-1.82-5-4.25-5-1.96 0-2.84 1.08-3.33 1.84V8.98H9.8c.04 1.03 0 11.02 0 11.02h3.23v-6.16c0-.33.02-.66.12-.89.26-.66.85-1.34 1.85-1.34 1.31 0 1.83 1 1.83 2.45V20h3.23l.55-6.33Z" />
      </svg>
    );
  }

  if (icon === "instagram") {
    return (
      <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="7" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M15.2 10.63 22.4 2h-1.7l-6.25 7.49L9.46 2H3.7l7.55 11.33L3.7 22h1.7l6.6-7.61L17.27 22h5.76l-7.83-11.37Zm-2.34 2.7-.77-1.13L6.02 3.33h2.62l4.91 7.19.76 1.13 6.39 9.04h-2.62l-5.22-7.36Z" />
    </svg>
  );
}

function FooterLinks({
  title,
  links
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-soft">
        {title}
      </h2>
      <ul className="mt-4 space-y-3.5">
        {links.map((item) => (
          <li key={`${title}-${item.label}`}>
            <Link
              href={item.href}
              className="text-sm font-medium leading-6 text-muted transition hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
