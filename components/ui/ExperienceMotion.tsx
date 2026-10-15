"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useWorkHistory } from "./work-history";
export function ExperienceMotion() {
  const pathname = usePathname();
  useWorkHistory(pathname);
  const previousPathname = useRef(pathname);
  useEffect(() => {
    const changedPage = previousPathname.current !== pathname;
    previousPathname.current = pathname;
    if (!changedPage) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const content = document.getElementById("main-content");
    if (reducedMotion.matches || !content || typeof content.animate !== "function") return;

    const entrance = content.animate([{ opacity: 0.35 }, { opacity: 1 }], {
      duration: 240,
      easing: "ease-out"
    });
    const stopForReducedMotion = () => {
      if (reducedMotion.matches) entrance.cancel();
    };
    reducedMotion.addEventListener("change", stopForReducedMotion);
    return () => {
      entrance.cancel();
      reducedMotion.removeEventListener("change", stopForReducedMotion);
    };
  }, [pathname]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.animate([{ opacity: 0.3, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 420, easing: "ease-out" });
        observer.unobserve(element);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}

