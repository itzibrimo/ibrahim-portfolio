import { Metadata } from "next";
import Link from "next/link";
import CVPageWrapper from "@/components/cv/CVPageWrapper";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description: "Ibrahim Sbouai — Computer Engineering CV",
};

export default function CVPage() {
  return (
    <main className="min-h-screen bg-surface flex flex-col pt-24 pb-12 overflow-hidden">
      <div className="container h-full flex flex-col flex-1 relative z-10">
        {/* Navigation back */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-tech-label text-[0.65rem] uppercase text-muted hover:text-foreground transition-colors duration-200"
            aria-label="Back to Portfolio"
          >
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="rotate-180">
              <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3M8.5 1.5V7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Portfolio
          </Link>
          <p className="text-tech-label text-[0.65rem] uppercase text-muted">
            Curriculum Vitae
          </p>
        </div>

        {/* Viewer Container */}
        <div className="flex-1 w-full bg-background border border-border overflow-hidden relative shadow-2xl rounded-sm">
           <CVPageWrapper />
        </div>
      </div>
    </main>
  );
}
