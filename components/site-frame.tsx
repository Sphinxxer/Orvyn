import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { Logo } from "@/components/layout/Logo";


type SiteFrameProps = {
  children: ReactNode;
  footerVariant?: "full" | "minimal";
};


export function SiteFrame({ children, footerVariant = "full" }: SiteFrameProps) {
  return (
    <>
      <SiteHeader />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <main id="main-content">{children}</main>
      <SiteFooter variant={footerVariant} />
    </>
  );
}

export function SiteFooter({ variant = "full" }: { variant?: "full" | "minimal" }) {
  return <footer className={"site-footer site-footer--" + variant}><div className="container footer-inner"><Logo /><span className="footer-location"><span>Based in India.</span><span>Built for ambitious brands.</span></span><div className="footer-social"><a href="mailto:hello@orvyn.cc" data-analytics-event="email_contact_clicked">hello@orvyn.cc</a><a href="https://www.instagram.com/orvyn.cc/" target="_blank" rel="noopener noreferrer" aria-label="Orvyn on Instagram (opens in a new tab)">Instagram</a><a href="https://www.linkedin.com/company/orvyncc/" target="_blank" rel="noopener noreferrer" aria-label="Orvyn on LinkedIn (opens in a new tab)">LinkedIn</a></div><p>© {new Date().getFullYear()} Orvyn. All rights reserved.</p></div></footer>;
}
