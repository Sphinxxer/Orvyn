"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "active" | "hidden";

const interactiveSelector =
  'a, button, summary, [role="button"], [data-cursor="interactive"]';
const formSelector =
  "input, textarea, select, option, label, [contenteditable='true'], [data-cursor='native']";

export function CustomCursor() {
  const arrowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    const updateEnabled = () => {
      setEnabled(mediaQuery.matches);
    };

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const moveCursor = () => {
      current.current.x += (target.current.x - current.current.x) * 0.34;
      current.current.y += (target.current.y - current.current.y) * 0.34;

      if (arrowRef.current) {
        arrowRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }

      frame.current = window.requestAnimationFrame(moveCursor);
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };

      if (!visible) {
        current.current = target.current;
        setVisible(true);
      }
    };

    const handlePointerOver = (event: PointerEvent) => {
      const element = event.target;

      if (!(element instanceof Element)) {
        return;
      }

      if (element.closest(formSelector)) {
        setMode("hidden");
        return;
      }

      setMode(element.closest(interactiveSelector) ? "active" : "default");
    };

    const handlePointerOut = (event: PointerEvent) => {
      const nextTarget = event.relatedTarget;

      if (!(nextTarget instanceof Element)) {
        setMode("default");
        return;
      }

      if (nextTarget.closest(formSelector)) {
        setMode("hidden");
        return;
      }

      setMode(nextTarget.closest(interactiveSelector) ? "active" : "default");
    };

    const handlePointerLeave = () => {
      setVisible(false);
    };

    const handlePointerEnter = () => {
      setVisible(true);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    document.documentElement.addEventListener("pointerenter", handlePointerEnter);

    frame.current = window.requestAnimationFrame(moveCursor);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.removeEventListener("pointerenter", handlePointerEnter);

      if (frame.current) {
        window.cancelAnimationFrame(frame.current);
      }
    };
  }, [enabled, visible]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      className={`custom-cursor ${visible ? "is-visible" : ""} ${
        mode === "active" ? "is-active" : ""
      } ${mode === "hidden" ? "is-hidden" : ""}`}
      aria-hidden="true"
    >
      <div ref={arrowRef} className="custom-cursor__arrow">
        <span className="custom-cursor__glyph">
          <svg
            width="30"
            height="36"
            viewBox="0 0 30 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
          >
            <path
              d="M3 3L26 19.2L16.3 21.1L21.9 33L16.4 35L10.7 22.9L3.8 29.5L3 3Z"
              fill="currentColor"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.35"
            />
            <path
              d="M8.1 10.9L18.2 18L13.7 18.9L16.2 24.2L14.6 24.8L11.8 18.9L8.6 22L8.1 10.9Z"
              fill="#0B0B0B"
              fillOpacity="0.72"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
