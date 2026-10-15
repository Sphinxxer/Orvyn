"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ListIcon } from "@phosphor-icons/react/dist/csr/List";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import { Logo } from "./layout/Logo";
const links = [{ href: "/", label: "Home" }, { href: "/case-studies", label: "Work" }, { href: "/contact", label: "Contact" }];
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const mobile = window.matchMedia("(max-width: 640px)");
    let lastY = Math.max(0, window.scrollY);
    let direction = 0;
    let distance = 0;
    let frame = 0;
    let hideOffset = 0;
    const show = () => {
      hideOffset = 0;
      element.dataset.headerHiding = "false";
      element.dataset.headerHidden = "false";
    };
    const update = () => {
      frame = 0;
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const y = Math.min(maxY, Math.max(0, window.scrollY));
      element.dataset.headerScrolled = String(y > 72);
      const delta = y - lastY;
      lastY = y;
      if (!mobile.matches || open || y <= 0) {
        show(); direction = 0; distance = 0; return;
      }
      // Document scroll locking and keyboard focus must not dismiss navigation.
      if (document.body.style.overflow === "hidden" || document.querySelector("dialog[open]")) {
        direction = 0; distance = 0; return;
      }
      if (element.contains(document.activeElement) && document.activeElement?.matches(":focus-visible")) {
        show(); direction = 0; distance = 0; return;
      }
      if (Math.abs(delta) < 1) return;
      const nextDirection = delta > 0 ? 1 : -1;
      if (nextDirection !== direction) { direction = nextDirection; distance = 0; }
      distance += Math.abs(delta);
      if (direction === 1) {
        const height = element.offsetHeight;
        // Depart with the page instead of waiting and then playing a slide-out.
        // After a reveal, a small dead zone absorbs minor downward movements.
        if (y <= height || distance >= 24) {
          hideOffset = y <= height ? y : Math.min(height, hideOffset + delta);
          element.dataset.headerHiding = "true";
          element.style.setProperty("--header-hide-offset", `${-hideOffset}px`);
          element.dataset.headerHidden = String(hideOffset > 0);
        }
      } else if (direction === -1 && (distance >= 12 || y <= 72)) show();
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onViewportChange = () => { show(); direction = 0; distance = 0; lastY = Math.max(0, window.scrollY); update(); };
    show();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    mobile.addEventListener("change", onViewportChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mobile.removeEventListener("change", onViewportChange);
      cancelAnimationFrame(frame);
    };
  }, [pathname, open]);
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (event.key === "Tab" && menu.current) {
        const items = [toggle.current, ...menu.current.querySelectorAll<HTMLAnchorElement>("a")].filter(Boolean) as HTMLElement[];
        const first = items[0]; const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", keyboard);
    const desktop = window.matchMedia("(min-width: 641px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      setOpen(false);
      document.querySelector<HTMLAnchorElement>(".desktop-nav a[aria-current='page']")?.focus();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", keyboard);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  return <header key={pathname} ref={header} className={"site-header " + (pathname === "/" ? "site-header--home" : "")} data-site-header data-menu-open={open} onFocusCapture={() => { if (header.current) header.current.dataset.headerHidden = "false"; }}>
    <div className="container site-header__inner"><Logo />
      <nav className="desktop-nav" aria-label="Primary navigation">{links.map((link) => <Link key={link.href} href={link.href} prefetch={false} className={active(link.href) ? "is-active" : ""} aria-current={active(link.href) ? "page" : undefined}>{link.label}</Link>)}</nav>
      <button ref={toggle} className="mobile-menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <XIcon size={25} weight="light" /> : <ListIcon size={27} weight="light" />}</button>
    </div>
    {open ? <nav ref={menu} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{links.map((link) => <Link key={link.href} href={link.href} prefetch={false} aria-current={active(link.href) ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav> : null}
  </header>;
}

