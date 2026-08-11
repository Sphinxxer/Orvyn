"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type MotionElement = HTMLElement & { style: CSSStyleDeclaration };

function setVariable(element: MotionElement | null, name: string, value: string) {
  element?.style.setProperty(name, value);
}

export function ExperienceMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const revealElements = Array.from(
      document.querySelectorAll<MotionElement>("[data-reveal]")
    );

    root.classList.add("motion-ready");

    let observer: IntersectionObserver | null = null;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-revealed"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            observer?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8%", threshold: 0.12 }
      );
      revealElements.forEach((element) => observer?.observe(element));
    }

    const header = document.querySelector<MotionElement>("[data-site-header]");
    let isScrolled = window.scrollY > 32;
    header?.toggleAttribute("data-scrolled", isScrolled);
    let scrollFrame = 0;
    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 32;
        if (nextScrolled !== isScrolled) {
          isScrolled = nextScrolled;
          header?.toggleAttribute("data-scrolled", isScrolled);
        }
        scrollFrame = 0;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let activeSpotlight: MotionElement | null = null;
    let activeTilt: MotionElement | null = null;
    let activeMagnetic: MotionElement | null = null;

    const resetInteractiveElement = (element: MotionElement | null) => {
      if (!element) return;
      setVariable(element, "--tilt-x", "0deg");
      setVariable(element, "--tilt-y", "0deg");
      setVariable(element, "--magnetic-x", "0px");
      setVariable(element, "--magnetic-y", "0px");
    };

    const renderPointer = () => {
      document.querySelectorAll<MotionElement>("[data-halo]").forEach((halo) => {
        const rect = halo.getBoundingClientRect();
        const normalizedX = (pointerX - (rect.left + rect.width / 2)) / Math.max(rect.width / 2, 1);
        const normalizedY = (pointerY - (rect.top + rect.height / 2)) / Math.max(rect.height / 2, 1);
        setVariable(halo, "--halo-x", `${Math.max(-18, Math.min(18, normalizedX * 18))}px`);
        setVariable(halo, "--halo-y", `${Math.max(-18, Math.min(18, normalizedY * 18))}px`);
      });

      if (activeSpotlight) {
        const rect = activeSpotlight.getBoundingClientRect();
        setVariable(activeSpotlight, "--pointer-x", `${pointerX - rect.left}px`);
        setVariable(activeSpotlight, "--pointer-y", `${pointerY - rect.top}px`);
      }

      if (activeTilt) {
        const rect = activeTilt.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (pointerX - rect.left) / rect.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (pointerY - rect.top) / rect.height * 2 - 1));
        setVariable(activeTilt, "--tilt-x", `${-y}deg`);
        setVariable(activeTilt, "--tilt-y", `${x * 1.5}deg`);
      }

      if (activeMagnetic) {
        const rect = activeMagnetic.getBoundingClientRect();
        const x = Math.max(-3, Math.min(3, (pointerX - (rect.left + rect.width / 2)) * 0.04));
        const y = Math.max(-3, Math.min(3, (pointerY - (rect.top + rect.height / 2)) * 0.04));
        setVariable(activeMagnetic, "--magnetic-x", `${x}px`);
        setVariable(activeMagnetic, "--magnetic-y", `${y}px`);
      }

      pointerFrame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      const nextSpotlight = target?.closest<MotionElement>("[data-spotlight]") ?? null;
      const nextTilt = target?.closest<MotionElement>("[data-tilt]") ?? null;
      const nextMagnetic = target?.closest<MotionElement>("[data-magnetic]") ?? null;

      if (activeSpotlight !== nextSpotlight) activeSpotlight = nextSpotlight;
      if (activeTilt !== nextTilt) {
        resetInteractiveElement(activeTilt);
        activeTilt = nextTilt;
      }
      if (activeMagnetic !== nextMagnetic) {
        resetInteractiveElement(activeMagnetic);
        activeMagnetic = nextMagnetic;
      }

      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderPointer);
    };

    if (finePointer && !reduceMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      resetInteractiveElement(activeTilt);
      resetInteractiveElement(activeMagnetic);
      root.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
