"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject
} from "react";
import type {
  PDFDocumentProxy,
  PDFPageProxy,
  RenderTask
} from "pdfjs-dist/legacy/build/pdf.mjs";

type ProjectPdfViewerProps = {
  pdfUrl: string;
  projectName: string;
  previewImage: string;
};

type PdfJsModule = typeof import("pdfjs-dist/legacy/build/pdf.mjs");

let pdfJsPromise: Promise<PdfJsModule> | null = null;
const documentPromises = new Map<string, Promise<PDFDocumentProxy>>();
const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.25;

function clampZoom(value: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

function loadPdfJs() {
  if (!pdfJsPromise) {
    pdfJsPromise = import("pdfjs-dist/legacy/build/pdf.mjs").then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();
      return pdfjs;
    });
  }

  return pdfJsPromise;
}

function loadPdfDocument(pdfUrl: string) {
  const cachedDocument = documentPromises.get(pdfUrl);
  if (cachedDocument) {
    return cachedDocument;
  }

  const documentPromise = loadPdfJs()
    .then((pdfjs) => pdfjs.getDocument({ url: pdfUrl }).promise)
    .catch((error) => {
      documentPromises.delete(pdfUrl);
      throw error;
    });

  documentPromises.set(pdfUrl, documentPromise);
  return documentPromise;
}

export function preloadProjectPdfViewer(pdfUrl: string) {
  void loadPdfDocument(pdfUrl).catch(() => undefined);
}

export function ProjectPdfViewer({
  pdfUrl,
  projectName,
  previewImage
}: ProjectPdfViewerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchStartRef = useRef<{ distance: number; zoom: number } | null>(null);
  const pendingZoomRef = useRef(1);
  const [zoom, setZoom] = useState(1);
  const [documentProxy, setDocumentProxy] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void loadPdfDocument(pdfUrl)
      .then((loadedDocument) => {
        if (!cancelled) {
          setDocumentProxy(loadedDocument);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  if (error) {
    return (
      <div className="grid min-h-[52dvh] place-items-center px-6 text-center sm:min-h-[64dvh]">
        <p className="max-w-sm text-sm leading-6 text-white/70">
          The deck preview could not load. Close the viewer and try again.
        </p>
      </div>
    );
  }

  const pageCount = documentProxy?.numPages ?? 0;

  const updateZoom = (nextZoom: number) => {
    const normalizedZoom = clampZoom(nextZoom);
    pendingZoomRef.current = normalizedZoom;
    setZoom(normalizedZoom);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch") {
      return;
    }

    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointersRef.current.size === 2) {
      const [first, second] = Array.from(pointersRef.current.values());
      pinchStartRef.current = {
        distance: Math.hypot(second.x - first.x, second.y - first.y),
        zoom
      };
      pendingZoomRef.current = zoom;
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(event.pointerId)) {
      return;
    }

    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointersRef.current.size !== 2 || !pinchStartRef.current || !contentRef.current) {
      return;
    }

    event.preventDefault();
    const [first, second] = Array.from(pointersRef.current.values());
    const distance = Math.hypot(second.x - first.x, second.y - first.y);
    const nextZoom = clampZoom(
      pinchStartRef.current.zoom * (distance / pinchStartRef.current.distance)
    );
    pendingZoomRef.current = nextZoom;
    contentRef.current.style.transform = `scale(${nextZoom / pinchStartRef.current.zoom})`;
  };

  const finishPointerGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId);

    if (pinchStartRef.current && pointersRef.current.size < 2) {
      const committedZoom = pendingZoomRef.current;
      pinchStartRef.current = null;
      setZoom(committedZoom);
      window.requestAnimationFrame(() => {
        if (contentRef.current) {
          contentRef.current.style.transform = "";
        }
      });
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#111]" data-cursor="interactive">
      <div className="flex min-h-11 items-center justify-between gap-3 border-b border-white/10 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden sm:inline">
            {documentProxy ? "Scroll to explore" : "Preparing preview"}
          </span>
          <span aria-live="polite">
            {pageCount ? `${pageCount} ${pageCount === 1 ? "page" : "pages"}` : "Loading"}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1" aria-label="Project deck zoom controls">
          <button
            type="button"
            aria-label="Zoom out"
            disabled={zoom <= MIN_ZOOM}
            onClick={() => updateZoom(zoom - ZOOM_STEP)}
            className="grid size-8 place-items-center rounded-full border border-white/12 text-base text-white/72 transition hover:border-gold/50 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 disabled:opacity-30"
          >
            <span aria-hidden="true">−</span>
          </button>
          <button
            type="button"
            aria-label="Reset zoom"
            onClick={() => updateZoom(1)}
            className="min-w-12 rounded-full px-2 py-2 text-[10px] text-white/58 transition hover:text-gold-soft focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            aria-label="Zoom in"
            disabled={zoom >= MAX_ZOOM}
            onClick={() => updateZoom(zoom + ZOOM_STEP)}
            className="grid size-8 place-items-center rounded-full border border-white/12 text-base text-white/72 transition hover:border-gold/50 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 disabled:opacity-30"
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-auto p-3 sm:p-5"
        style={{ touchAction: "pan-x pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerGesture}
        onPointerCancel={finishPointerGesture}
      >
        {documentProxy ? (
          <div
            ref={contentRef}
            className="mx-auto flex origin-top flex-col gap-4 sm:gap-6"
            style={{ width: `${zoom * 100}%`, maxWidth: `${64 * zoom}rem` }}
          >
            {Array.from({ length: pageCount }, (_, index) => (
              <PdfPage
                key={index + 1}
                documentProxy={documentProxy}
                pageNumber={index + 1}
                pageCount={pageCount}
                projectName={projectName}
                previewImage={index === 0 ? previewImage : undefined}
                scrollRef={scrollRef}
              />
            ))}
          </div>
        ) : (
          <div className="relative grid min-h-[52dvh] overflow-hidden sm:min-h-[64dvh]">
            <Image
              src={previewImage}
              alt=""
              fill
              sizes="(min-width: 768px) 70vw, 100vw"
              className="object-cover opacity-35 blur-[2px]"
            />
            <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
            <div className="relative z-10 flex items-center justify-center gap-3 text-sm text-white/72">
              <span className="size-2 animate-pulse rounded-full bg-gold motion-reduce:animate-none" aria-hidden="true" />
              Preparing project pages...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type PdfPageProps = {
  documentProxy: PDFDocumentProxy;
  pageNumber: number;
  pageCount: number;
  projectName: string;
  previewImage?: string;
  scrollRef: RefObject<HTMLDivElement | null>;
};

function PdfPage({
  documentProxy,
  pageNumber,
  pageCount,
  projectName,
  previewImage,
  scrollRef
}: PdfPageProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(pageNumber === 1);
  const [renderWidth, setRenderWidth] = useState(0);
  const [pageRatio, setPageRatio] = useState(16 / 9);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const updateWidth = () => setRenderWidth(Math.floor(wrapper.clientWidth));
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(wrapper);
    updateWidth();

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || isNearViewport) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      {
        root: scrollRef.current,
        rootMargin: "600px 0px"
      }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [isNearViewport, scrollRef]);

  useEffect(() => {
    if (!isNearViewport || !renderWidth || !canvasRef.current) {
      return;
    }

    let page: PDFPageProxy | null = null;
    let renderTask: RenderTask | null = null;
    let cancelled = false;

    void (async () => {
      try {
        page = await documentProxy.getPage(pageNumber);
        if (cancelled || !canvasRef.current) {
          return;
        }

        const baseViewport = page.getViewport({ scale: 1 });
        setPageRatio(baseViewport.width / baseViewport.height);

        const scale = renderWidth / baseViewport.width;
        const viewport = page.getViewport({ scale });
        const outputScale = Math.min(window.devicePixelRatio || 1, 1.5);
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d", { alpha: false });

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
        if (!cancelled) {
          setIsRendered(true);
        }
      } catch (renderError) {
        if (
          !cancelled &&
          !(renderError instanceof Error && renderError.name === "RenderingCancelledException")
        ) {
          setIsRendered(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      renderTask?.cancel();
      page?.cleanup();
    };
  }, [documentProxy, isNearViewport, pageNumber, renderWidth]);

  return (
    <section
      ref={wrapperRef}
      aria-label={`${projectName} project deck, page ${pageNumber} of ${pageCount}`}
      className="relative w-full overflow-hidden bg-[#171717] shadow-[0_18px_52px_rgba(0,0,0,0.3)]"
      style={{ aspectRatio: pageRatio }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`${projectName} project deck, page ${pageNumber} of ${pageCount}`}
        className={`block h-auto w-full bg-white transition-opacity duration-300 ${
          isRendered ? "opacity-100" : "opacity-0"
        }`}
      />
      {!isRendered ? (
        <div className="absolute inset-0 grid place-items-center bg-[#171717]">
          {previewImage ? (
            <Image
              src={previewImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-28 blur-[1px]"
            />
          ) : null}
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
            Page {pageNumber}
          </span>
        </div>
      ) : null}
    </section>
  );
}
