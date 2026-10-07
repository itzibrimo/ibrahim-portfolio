import { config } from "@/data/config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="container py-14 md:py-20">
        {/* Identity row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 md:pb-16 border-b border-border">
          <div className="lg:col-span-6">
            <p className="font-display text-3xl md:text-4xl italic text-foreground leading-tight mb-4">
              Ibrahim Sbouai
            </p>
            <p className="text-sm text-muted max-w-[46ch] leading-relaxed">
              Computer Engineering student — Embedded Systems &amp; IoT.
              Building across software, hardware and communication.
            </p>

            {/* Availability */}
            <p className="mt-5 inline-flex items-center gap-2.5 text-tech-label text-[0.65rem] uppercase text-muted">
              <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
              Open to internships &amp; collaborations
            </p>
          </div>

          {/* Navigate */}
          <nav className="lg:col-span-3" aria-label="Footer navigation">
            <p className="text-tech-label text-[0.6rem] uppercase text-muted mb-4">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {config.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div className="lg:col-span-3">
            <p className="text-tech-label text-[0.6rem] uppercase text-muted mb-4">
              Elsewhere
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${config.email}`}
                  className="text-sm text-muted hover:text-foreground transition-colors duration-200 break-all"
                >
                  {config.email}
                </a>
              </li>
              {config.githubUrl && (
                <li>
                  <a
                    href={config.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                  >
                    GitHub
                  </a>
                </li>
              )}
              {config.linkedinUrl && (
                <li>
                  <a
                    href={config.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              <li>
                <a
                  href={config.cvPath}
                  download="CV_Ibrahim_Sbouai.pdf"
                  className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-tech-label text-[0.6rem] uppercase text-muted">
            © {year} Ibrahim Sbouai — Computer Engineering
          </p>
          <div className="flex gap-4">
            <a href="/privacy" className="text-tech-label text-[0.6rem] uppercase text-muted hover:text-foreground">
              Privacy Policy
            </a>
            <a href="/terms" className="text-tech-label text-[0.6rem] uppercase text-muted hover:text-foreground">
              Terms
            </a>
          </div>
          <p className="hidden sm:block text-tech-label text-[0.6rem] uppercase text-muted">
            {config.location} · Embedded Systems &amp; IoT
          </p>
        </div>
      </div>
    </footer>
  );
}
