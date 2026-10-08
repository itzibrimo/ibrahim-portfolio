"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CVViewer() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [isLoadingError, setIsLoadingError] = useState(false);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [pdfComponents, setPdfComponents] = useState<{ Document: any; Page: any } | null>(null);
  /* eslint-enable @typescript-eslint/no-explicit-any */
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    import('react-pdf').then((mod) => {
      const { Document, Page, pdfjs } = mod;
      
      // Use locally hosted worker from /pdf/ directory
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf/pdf.worker.min.mjs";
      
      setPdfComponents({ Document, Page });
    });
  }, []);




  useEffect(() => {
    async function fetchCV() {
      try {
        const res = await fetch("/api/cv");
        const json = await res.json();
        if (json.success && json.data) {
          // react-pdf accepts base64 or a URI scheme.
          setPdfData(`data:application/pdf;base64,${json.data}`);
        } else {
          setIsLoadingError(true);
        }
      } catch (err) {
        console.error("Failed to load CV data", err);
        setIsLoadingError(true);
      }
    }
    fetchCV();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // Prevent default context menu to add casual extraction friction
  const preventContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  // Adaptive width calculation for mobile vs desktop logic
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      // If mobile width (< 768), fit to screen minus padding. Else default scale.
      if (width < 768) {
        setScale((width - 32) / 600); // 32px accounts for padding, 600px is typical PDF width
      } else {
        setScale(1.3); // Comfortable readability scale for desktop
      }
    };

    // Delay slightly to let initial layout settle
    const timer = setTimeout(handleResize, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div 
      className="w-full h-full flex flex-col select-none relative"
      onContextMenu={preventContextMenu}
      ref={containerRef}
    >
      {/* Control Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-surface border-b border-border z-10 shrink-0 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="text-tech-label text-[0.65rem] uppercase text-muted hover:text-foreground disabled:opacity-30 transition-colors px-2 py-1"
            disabled={pageNumber <= 1 || !pdfData}
            onClick={() => setPageNumber(p => p - 1)}
            aria-label="Previous Page"
          >
            Prev
          </button>
          
          <span className="text-tech-label text-[0.65rem] text-foreground font-mono tracking-widest min-w-[50px] text-center">
            {pageNumber} <span className="text-muted">/ {numPages || '-'}</span>
          </span>

          <button
            className="text-tech-label text-[0.65rem] uppercase text-muted hover:text-foreground disabled:opacity-30 transition-colors px-2 py-1"
            disabled={numPages === undefined || pageNumber >= numPages || !pdfData}
            onClick={() => setPageNumber(p => p + 1)}
            aria-label="Next Page"
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="text-tech-label text-[1rem] leading-none text-muted hover:text-foreground disabled:opacity-30 transition-colors flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 border border-border bg-background hover:bg-surface"
            onClick={() => setScale(s => Math.max(0.4, s - 0.15))}
            aria-label="Zoom Out"
            disabled={scale <= 0.4 || !pdfData}
          >
            -
          </button>
          <button
            className="text-tech-label text-[1rem] leading-none text-muted hover:text-foreground disabled:opacity-30 transition-colors flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 border border-border bg-background hover:bg-surface"
            onClick={() => setScale(s => Math.min(3.0, s + 0.15))}
            aria-label="Zoom In"
            disabled={scale >= 3.0 || !pdfData}
          >
            +
          </button>
        </div>
      </div>

      {/* Viewer Frame */}
      <div className="flex-1 overflow-auto bg-background/40 flex items-start justify-center p-4 sm:p-8 custom-scrollbar">
        <div 
          className="relative shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-transform origin-top flex flex-col gap-6"
          style={{ transitionDuration: reduced ? '0s' : '0.25s' }}
        >
          {isLoadingError ? (
            <div className="flex items-center justify-center p-12 border border-danger/20 text-danger text-sm bg-danger/5">
              Could not load the document view.
            </div>
          ) : pdfComponents && pdfData ? (
            <pdfComponents.Document
              file={pdfData}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="w-[600px] h-[800px] max-w-full flex items-center justify-center bg-card border border-border">
                  <span className="text-tech-label text-[0.6rem] uppercase text-muted tracking-widest animate-pulse">
                    Loading Document...
                  </span>
                </div>
              }
              error={
                <div className="p-8 border border-danger/30 text-danger text-sm">
                  Failed to parse document.
                </div>
              }
            >
              <pdfComponents.Page
                pageNumber={pageNumber}
                scale={scale}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                loading={
                  <div 
                    className="bg-card border border-border animate-pulse" 
                    style={{ width: `${600 * scale}px`, height: `${800 * scale}px` }} 
                  />
                }
                className="border border-border-strong bg-white overflow-hidden"
              />
            </pdfComponents.Document>
          ) : (
            <div className="w-[600px] h-[800px] max-w-full flex items-center justify-center bg-card border border-border">
              <span className="text-tech-label text-[0.6rem] uppercase text-muted tracking-widest animate-pulse">
                Initializing Secure Viewer...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
