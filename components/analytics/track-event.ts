"use client";

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
