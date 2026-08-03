"use client";

import { useEffect, useRef } from "react";
import { trackClarityEvent } from "./track-event";

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
