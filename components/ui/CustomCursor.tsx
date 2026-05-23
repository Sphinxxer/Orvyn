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
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
          >
            <path
              d="M20.5056 10.7754C21.1225 10.5355 21.431 10.4155 21.5176 10.2459C21.5926 10.099 21.5903 9.92446 21.5115 9.77954C21.4205 9.61226 21.109 9.50044 20.486 9.2768L4.59629 3.5728C4.0866 3.38983 3.83175 3.29835 3.66514 3.35605C3.52029 3.40621 3.40645 3.52004 3.35629 3.6649C3.29859 3.8315 3.39008 4.08635 3.57304 4.59605L9.277 20.4858C9.50064 21.1088 9.61246 21.4203 9.77973 21.5113C9.92465 21.5901 10.0991 21.5924 10.2461 21.5174C10.4157 21.4308 10.5356 21.1223 10.7756 20.5054L13.3724 13.8278C13.4194 13.707 13.4429 13.6466 13.4792 13.5957C13.5114 13.5506 13.5508 13.5112 13.5959 13.479C13.6468 13.4427 13.7072 13.4192 13.828 13.3722L20.5056 10.7754Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
