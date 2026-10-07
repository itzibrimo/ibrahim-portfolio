import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="engineering-grid opacity-[0.04]" />
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Number */}
        <p className="text-[0.6rem] font-mono font-medium tracking-[0.22em] uppercase text-muted/35 mb-6">
          404 / Not Found
        </p>

        {/* Large 404 */}
        <div className="mb-8">
          <span
            className="font-display text-[10rem] md:text-[14rem] leading-none font-normal italic text-foreground/5 select-none"
            aria-hidden="true"
          >
            404
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4 -mt-16 md:-mt-20">
          Page not found
        </h1>

        <p className="text-sm text-muted/55 mb-10 max-w-[36ch] mx-auto leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-[0.7rem] font-mono font-medium tracking-[0.18em] uppercase border border-foreground/30 bg-foreground text-background px-6 py-3 hover:bg-transparent hover:text-foreground transition-all duration-300"
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
            <path d="M8 1L1 8M1 8H6M1 8V3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
          </svg>
          Return Home
        </Link>
      </div>
    </div>
  );
}
