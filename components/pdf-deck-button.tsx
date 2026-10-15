"use client";
import dynamic from "next/dynamic";
import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
const PdfViewer = dynamic(() => import("./project-pdf-viewer").then((module) => module.ProjectPdfViewer), { ssr: false, loading: () => <p className="pdf-loading" role="status">Opening the project deck…</p> });
type PdfDeckButtonProps = {
  href: string;
  name: string;
  preview: string;
  children?: ReactNode;
  label?: string;
  className?: string;
  ariaLabel?: string;
  title?: string;
  analyticsEvent?: string;
};

export function PdfDeckButton({
  href, name, preview, children,
  label = "View project deck",
  className = "button button--outline",
  ariaLabel,
  title = `${name} — project deck`,
  analyticsEvent = "project_deck_opened"
}: PdfDeckButtonProps) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const scrollPosition = useRef<{ x: number; y: number; url: string } | null>(null);
  const titleId = useId();
  function openDialog() {
    scrollPosition.current = { x: window.scrollX, y: window.scrollY, url: window.location.href };
    setOpen(true);
  }
  function closeDialog() {
    dialog.current?.close();
    setOpen(false);
  }
  useLayoutEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const triggerElement = trigger.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element?.showModal();
    return () => {
      element?.close();
      document.body.style.overflow = previous;
      const position = scrollPosition.current;
      if (position?.url === window.location.href) {
        window.scrollTo({ left: position.x, top: position.y, behavior: "instant" });
        triggerElement?.focus({ preventScroll: true });
      }
    };
  }, [open]);
  return <><button ref={trigger} className={className} type="button" aria-label={ariaLabel} aria-haspopup="dialog" onClick={openDialog} data-analytics-event={analyticsEvent}>{children ?? <>{label}<ArrowUpRightIcon size={17} aria-hidden="true" /></>}</button><dialog ref={dialog} className="pdf-dialog" aria-labelledby={titleId} onCancel={(event) => { event.preventDefault(); closeDialog(); }} onClick={(event) => { if (event.target === event.currentTarget) closeDialog(); }}><div className="pdf-dialog__bar"><h2 id={titleId}>{title}</h2><a href={href} target="_blank" rel="noopener noreferrer">Open PDF<span className="sr-only"> in a new tab</span></a><button onClick={closeDialog} aria-label="Close project deck" autoFocus><XIcon size={24} /></button></div>{open ? <PdfViewer pdfUrl={href} projectName={name} previewImage={preview} /> : null}</dialog></>;
}

