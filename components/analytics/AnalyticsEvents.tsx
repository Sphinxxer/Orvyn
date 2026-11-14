"use client";
import { useEffect } from "react";
import { useRef } from "react";


export function AnalyticsEvents() {
  const startedForms = useRef(new WeakSet<HTMLFormElement>());

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const target = event.target.closest<HTMLElement>("[data-analytics-event]");
      const eventName = target?.dataset.analyticsEvent;

      if (eventName) {
        trackClarityEvent(eventName);
        // Clarity events do not accept per-event properties. Keep attribution as
        // separate contextual click events, never as a submitted-lead event.
        if (eventName === "whatsapp_enquiry_clicked" && target) {
          const { analyticsPlacement, analyticsService, analyticsProject } = target.dataset;
          if (analyticsPlacement) trackClarityEvent(`whatsapp_placement_${analyticsPlacement}_clicked`);
          if (analyticsService) trackClarityEvent(`whatsapp_service_${analyticsService}_clicked`);
          if (analyticsProject) trackClarityEvent(`whatsapp_project_${analyticsProject}_clicked`);
        }
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const form = event.target.closest<HTMLFormElement>("form[data-analytics-form='contact']");

      if (form && !startedForms.current.has(form)) {
        startedForms.current.add(form);
        trackClarityEvent("contact_form_started");
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  return null;
}


declare global {
  interface Window {
    clarity?: (command: "event", eventName: string) => void;
  }
}


export function trackClarityEvent(eventName: string) {
  if (typeof window === "undefined" || typeof window.clarity !== "function") {
    return;
  }

  window.clarity("event", eventName);
}
