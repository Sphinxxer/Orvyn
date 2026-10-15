"use client";
import { useEffect, useRef } from "react";
const workPath = "/case-studies";
const storageKey = () => "orvyn:work-scroll:" + window.location.pathname + window.location.search;

export function useWorkHistory(pathname: string) {
  const pendingRestore = useRef(false);
  useEffect(() => {
    const save = () => {
      if (window.location.pathname !== workPath || document.body.style.overflow === "hidden") return;
      try { sessionStorage.setItem(storageKey(), String(window.scrollY)); } catch { /* Storage may be unavailable. */ }
    };
    const restore = () => {
      if (window.location.pathname !== workPath || !document.querySelector(".work-gallery")) return;
      let y: string | null = null;
      try { y = sessionStorage.getItem(storageKey()); } catch { return; }
      if (y === null || !Number.isFinite(Number(y))) return;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (window.location.pathname === workPath) window.scrollTo({ top: Number(y), behavior: "instant" });
        pendingRestore.current = false;
      }));
    };
    const back = () => { pendingRestore.current = window.location.pathname === workPath; if (pendingRestore.current) restore(); };
    const show = (event: PageTransitionEvent) => {
      if (event.persisted || (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type === "back_forward") back();
    };
    const scroll = () => { if (!pendingRestore.current) save(); };
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("click", save, true);
    window.addEventListener("pagehide", save);
    window.addEventListener("popstate", back);
    window.addEventListener("pageshow", show);
    return () => {
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("click", save, true);
      window.removeEventListener("pagehide", save);
      window.removeEventListener("popstate", back);
      window.removeEventListener("pageshow", show);
    };
  }, []);
  useEffect(() => {
    if (pathname !== workPath || !pendingRestore.current) return;
    let y: string | null = null;
    try { y = sessionStorage.getItem(storageKey()); } catch { return; }
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => {
      if (y !== null && window.location.pathname === workPath) window.scrollTo({ top: Number(y), behavior: "instant" });
      pendingRestore.current = false;
    }));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
}
