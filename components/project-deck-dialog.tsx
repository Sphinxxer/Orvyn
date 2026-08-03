"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { PortfolioProject } from "@/data/case-studies";
import { ProjectPdfViewer } from "@/components/project-pdf-viewer";

type ProjectDeckDialogProps = {
  project: PortfolioProject;
  className: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function ProjectDeckDialog({
  project,
  className,
  style,
  children
}: ProjectDeckDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const close = () => {
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      );

      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLButtonElement>("[data-dialog-close]")?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const deckHref = project.deckHref ?? project.destinationUrl;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={project.ariaLabel}
        data-cursor="interactive"
        data-portfolio-cursor="true"
        data-analytics-event={`${project.id}_project_viewer_opened`}
        className={`${className} cursor-none text-left`}
        style={style}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </button>

      {isOpen && deckHref
        ? createPortal(
            <div
              className="project-dialog fixed inset-0 z-[200] grid place-items-center bg-black/78 p-3 backdrop-blur-sm sm:p-6"
              role="presentation"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  close();
                }
              }}
            >
              <div
                ref={dialogRef}
                className="project-dialog__panel relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[24px] border border-white/15 bg-[#090909] shadow-[0_30px_90px_rgba(0,0,0,0.58)] sm:max-h-[calc(100dvh-3rem)]"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
              >
                <div className="flex items-start justify-between gap-5 border-b border-white/10 px-5 py-4 sm:px-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#111]">
                      <Image
                        src={project.previewImage}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-soft sm:text-[11px]">
                        {project.category}
                      </p>
                      <h2 id={titleId} className="mt-1 truncate text-base font-semibold text-white sm:text-lg">
                        {project.client}
                      </h2>
                    </div>
                  </div>
                  <button
                    type="button"
                    data-dialog-close
                    data-cursor="interactive"
                    data-portfolio-cursor="true"
                    aria-label={`Close ${project.client} project viewer`}
                    className="inline-grid size-10 shrink-0 cursor-none place-items-center rounded-full border border-gold/35 bg-gold/5 text-xl leading-none text-gold-soft transition duration-200 hover:border-gold/70 hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                    onClick={close}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <ProjectPdfViewer pdfUrl={deckHref} projectName={project.client} />

              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
