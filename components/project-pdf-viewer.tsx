"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist/legacy/build/pdf.mjs";

type ProjectPdfViewerProps = {
  pdfUrl: string;
  projectName: string;
};

export function ProjectPdfViewer({ pdfUrl, projectName }: ProjectPdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [documentProxy, setDocumentProxy] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [renderWidth, setRenderWidth] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadedDocument: PDFDocumentProxy | null = null;

    void (async () => {
      try {
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();

        const loadingTask = pdfjs.getDocument({ url: pdfUrl });
        loadedDocument = await loadingTask.promise;

        if (cancelled) {
          return;
        }

        setDocumentProxy(loadedDocument);
        setPageCount(loadedDocument.numPages);
      } catch {
        if (!cancelled) {
          setError(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const updateRenderWidth = () => setRenderWidth(Math.floor(viewport.clientWidth));
    const observer = new ResizeObserver(updateRenderWidth);
    observer.observe(viewport);
    updateRenderWidth();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!documentProxy || !canvasRef.current || !renderWidth) {
      return;
    }

    let renderTask: RenderTask | null = null;
    let cancelled = false;

    void (async () => {
      try {
        const page = await documentProxy.getPage(pageNumber);
        if (cancelled || !canvasRef.current) {
          return;
        }

        const baseViewport = page.getViewport({ scale: 1 });
        const scale = renderWidth / baseViewport.width;
        const viewport = page.getViewport({ scale });
        const outputScale = Math.min(window.devicePixelRatio || 1, 2);
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Canvas context unavailable");
        }

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        renderTask = page.render({
          canvas,
          canvasContext: context,
          transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0],
          viewport
        });

        await renderTask.promise;
      } catch (renderError) {
        if (!cancelled && !(renderError instanceof Error && renderError.name === "RenderingCancelledException")) {
          setError(true);
        }
      }
    })();

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [documentProxy, pageNumber, renderWidth]);

  const changePage = (nextPage: number) => {
    setPageNumber(nextPage);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  if (error) {
    return (
      <div className="grid min-h-[52dvh] place-items-center px-6 text-center sm:min-h-[64dvh]">
        <p className="max-w-sm text-sm leading-6 text-white/70">
          The deck preview could not load. Close the viewer and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#111]" data-cursor="interactive">
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-auto p-3 sm:p-5">
        <div ref={viewportRef} className="mx-auto grid min-h-[48dvh] max-w-5xl place-items-center sm:min-h-[58dvh]">
          {documentProxy ? (
            <canvas
              ref={canvasRef}
              role="img"
              aria-label={`${projectName} project deck, page ${pageNumber} of ${pageCount}`}
              className="max-w-full bg-white shadow-[0_18px_52px_rgba(0,0,0,0.32)]"
            />
          ) : (
            <p className="text-sm text-white/60">Loading project deck...</p>
          )}
        </div>
      </div>

      {pageCount > 1 ? (
        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
          <button
            type="button"
            data-cursor="interactive"
            className="min-h-10 px-2 text-sm font-semibold text-white/70 transition hover:text-gold-soft disabled:cursor-not-allowed disabled:text-white/25"
            onClick={() => changePage(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
            Previous
          </button>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55" aria-live="polite">
            Page {pageNumber} of {pageCount}
          </p>
          <button
            type="button"
            data-cursor="interactive"
            className="min-h-10 px-2 text-sm font-semibold text-white/70 transition hover:text-gold-soft disabled:cursor-not-allowed disabled:text-white/25"
            onClick={() => changePage(pageNumber + 1)}
            disabled={pageNumber === pageCount}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
