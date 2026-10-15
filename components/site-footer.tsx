import { Logo } from "./layout/Logo";
export function SiteFooter({ variant = "full" }: { variant?: "full" | "minimal" }) {
  return <footer className={"site-footer site-footer--" + variant}><div className="container footer-inner"><Logo /><span className="footer-location"><span>Based in India.</span><span>Built for ambitious brands.</span></span><div className="footer-social"><a href="mailto:hello@orvyn.cc" data-analytics-event="email_contact_clicked">hello@orvyn.cc</a><a href="https://www.instagram.com/orvyn.cc/" target="_blank" rel="noopener noreferrer" aria-label="Orvyn on Instagram (opens in a new tab)">Instagram</a><a href="https://www.linkedin.com/company/orvyncc/" target="_blank" rel="noopener noreferrer" aria-label="Orvyn on LinkedIn (opens in a new tab)">LinkedIn</a></div><p>© {new Date().getFullYear()} Orvyn. All rights reserved.</p></div></footer>;
}

