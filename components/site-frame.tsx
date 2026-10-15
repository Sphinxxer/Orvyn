import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

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
