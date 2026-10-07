"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * PROJECTS — engineering case studies.
 *
 * Every project has a project-specific visual composition (no shared
 * generic gradient) and real links: GitHub source and live demo only
 * where they actually exist. Never invented.
 */

const TECH_LOGOS: Record<string, string> = {
  Flutter: "/assets/technologies/flutter.svg",
  Dart: "/assets/technologies/dart.svg",
  Firebase: "/assets/technologies/firebase.svg",
  "Next.js": "/assets/technologies/nextjs.svg",
  React: "/assets/technologies/react.svg",
  TypeScript: "/assets/technologies/typescript.svg",
  "Tailwind CSS": "/assets/technologies/tailwind.svg",
  Docker: "/assets/technologies/docker.svg",
  GitHub: "/assets/technologies/github.svg",
  Vercel: "/assets/technologies/vercel.svg",
  Python: "/assets/technologies/python.svg",
  "Node.js": "/assets/technologies/nodejs.svg",
  Git: "/assets/technologies/git.svg",
  MongoDB: "/assets/technologies/mongodb.svg",
  PostgreSQL: "/assets/technologies/postgresql.svg",
};

// ---------------------------------------------------------------------------
// External link button — honest labels, safe new-tab navigation
// ---------------------------------------------------------------------------

function ExternalLink({
  href,
  label,
  primary,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 h-10 px-5 text-[0.65rem] font-normal tracking-[0.12em] uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
        primary
          ? "border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground"
          : "border border-border text-muted hover:border-border-strong hover:text-foreground"
      }`}
    >
      {label}
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path
          d="M1.5 8.5L8.5 1.5M8.5 1.5H3M8.5 1.5V7"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Project-specific visual compositions
// ---------------------------------------------------------------------------

/** MaMoyenne — academic data / calculation */
function AcademicVisual() {
  const rows = [
    { subject: "ALGORITHMS", coef: "4", grade: "16.00" },
    { subject: "ARCHITECTURE", coef: "3", grade: "14.50" },
    { subject: "NETWORKS", coef: "3", grade: "15.25" },
    { subject: "EMBEDDED", coef: "4", grade: "15.75" },
  ];
  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="w-full max-w-[300px] font-mono text-[0.55rem] text-muted">
        <div className="flex items-center justify-between border-b border-border pb-1.5 mb-1.5 text-foreground">
          <span>ISIMG — SEMESTER</span>
          <span className="text-muted">COEF</span>
        </div>
        {rows.map((r) => (
          <div key={r.subject} className="flex items-center justify-between py-1 border-b border-border/60">
            <span className="text-muted">{r.subject}</span>
            <span className="flex items-center gap-4">
              <span className="text-muted/80">{r.coef}</span>
              <span className="text-foreground w-10 text-right">{r.grade}</span>
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-2.5 mt-1.5 border-t border-border">
          <span className="text-foreground tracking-[0.14em]">AVERAGE</span>
          <span className="flex items-center gap-2">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <span className="text-accent text-[0.7rem]">15.38</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/** SleepWise — calm sleep-stage timeline */
function SleepVisual() {
  const stages = [
    { h: 22, label: "DEEP", level: 0.9 },
    { h: 24, label: "LIGHT", level: 0.5 },
    { h: 2, label: "REM", level: 0.65 },
    { h: 4, label: "DEEP", level: 0.85 },
    { h: 6, label: "REM", level: 0.6 },
  ];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[300px]">
        {/* Sleep stage band */}
        <div className="flex items-end gap-1 h-24" aria-hidden="true">
          {stages.map((s) => (
            <div key={`${s.h}-${s.label}`} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full border border-border border-t-accent/60 bg-surface"
                style={{ height: `${s.level * 100}%` }}
              />
            </div>
          ))}
        </div>
        {/* Time axis */}
        <div className="flex justify-between mt-2 font-mono text-[0.5rem] text-muted">
          {["23:00", "01:00", "03:00", "05:00", "07:00"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between font-mono text-[0.55rem]">
          <span className="text-muted">STAGES</span>
          <span className="flex gap-3 text-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />REM
            </span>
            <span className="text-muted">DEEP · LIGHT</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/** 9RITFIH — AI pipeline */
function AIDataVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="space-y-1.5 font-mono text-[0.55rem] text-muted leading-relaxed">
        <div className="text-accent"># study pipeline</div>
        <div className="pl-2">
          <span className="text-foreground">materials</span>
          <span className="text-muted/60"> {"->"} </span>
          <span>parse</span>
          <span className="text-muted/60"> {"->"} </span>
          <span>chunk</span>
        </div>
        <div className="pl-2">
          <span className="text-foreground">chunks</span>
          <span className="text-muted/60"> {"->"} </span>
          <span>embed</span>
          <span className="text-muted/60"> {"->"} </span>
          <span>index</span>
        </div>
        <div className="pl-2">
          <span className="text-foreground">query</span>
          <span className="text-muted/60"> {"->"} </span>
          <span>retrieve</span>
          <span className="text-muted/60"> {"->"} </span>
          <span>context</span>
        </div>
        <div className="pl-2">
          <span className="text-foreground">context</span>
          <span className="text-muted/60"> {"->"} </span>
          <span className="text-accent">quizzes · flashcards · plans</span>
        </div>
      </div>
    </div>
  );
}

/** Tunisie Telecom — fibre access network */
function TelecomVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="space-y-2.5 font-mono text-[0.55rem] text-muted">
        <div className="flex items-center gap-2.5">
          <span className="text-foreground">OLT</span>
          <span className="text-muted/50 flex-1 relative">
            <span className="absolute top-1/2 left-0 right-0 h-px bg-current" />
            <span className="absolute top-1/2 -translate-y-1/2 right-0 text-accent">{`|}{|`}</span>
          </span>
          <span className="text-foreground">GPON</span>
        </div>
        <div className="flex items-center gap-2.5 pl-5">
          <span>SPLITTER 1:8</span>
        </div>
        <div className="flex items-center gap-2.5 pl-8">
          <span>DROP</span>
          <span className="text-muted/50">{"->"}</span>
          <span className="text-foreground">ONT</span>
          <span className="text-muted/50">{"->"}</span>
          <span>HOME GW</span>
        </div>
        <div className="pt-1 text-[0.5rem] text-muted tracking-[0.14em]">
          FIBRE ACCESS NETWORK
        </div>
      </div>
    </div>
  );
}

/** Portfolio — interface composition */
function WebVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="w-full max-w-[220px] border border-border bg-card">
        <div className="h-6 border-b border-border flex items-center px-2.5 gap-1.5">
          {[1, 2, 3].map((n) => (
            <div key={n} className="w-1.5 h-1.5 rounded-full bg-border-strong" />
          ))}
          <div className="flex-1 mx-2 h-2 border border-border bg-surface" />
        </div>
        <div className="p-2.5 space-y-1.5">
          <div className="h-5 border border-border bg-surface" />
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-7 border border-border bg-surface" />
            ))}
          </div>
          <div className="h-3.5 w-2/3 border border-border bg-surface" />
        </div>
      </div>
    </div>
  );
}

const VISUALS: Record<string, React.ReactNode> = {
  academic: <AcademicVisual />,
  sleep: <SleepVisual />,
  ai: <AIDataVisual />,
  telecom: <TelecomVisual />,
  web: <WebVisual />,
};

// ---------------------------------------------------------------------------
// Shared pieces
// ---------------------------------------------------------------------------

function TechBadges({ technologies, max }: { technologies: string[]; max?: number }) {
  const shown = max ? technologies.slice(0, max) : technologies;
  const rest = max ? technologies.length - shown.length : 0;

  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((tech) => {
        const logo = TECH_LOGOS[tech];
        return (
          <span
            key={tech}
            className="inline-flex items-center gap-1.5 h-8 px-2.5 text-tech-label text-[0.6rem] uppercase text-muted border border-border"
          >
            {logo && (
              <Image src={logo} alt="" width={12} height={12} className="h-3 w-3 object-contain" />
            )}
            {tech}
          </span>
        );
      })}
      {rest > 0 && (
        <span className="inline-flex items-center h-8 px-2.5 text-tech-label text-[0.6rem] uppercase text-muted border border-border">
          +{rest}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FeaturedProject
// ---------------------------------------------------------------------------

function FeaturedProject({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16 md:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
    >
      {/* Visual — real screenshot when available, diagram otherwise */}
      <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] overflow-hidden border border-border bg-surface">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} — application screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center"
            priority
          />
        ) : (
          VISUALS[project.visual] ?? VISUALS.web
        )}
      </div>

      {/* Content */}
      <div className="lg:col-span-5 flex flex-col justify-center gap-5">
        <div>
          <div className="flex items-baseline gap-2 mb-2.5">
            <span className="text-tech-label text-[0.65rem] uppercase text-muted">
              {project.number}
            </span>
            <span className="text-muted/50">/</span>
            <span className="text-tech-label text-[0.65rem] uppercase text-muted">
              {projects.length.toString().padStart(2, "0")}
            </span>
          </div>
          <p className="text-tech-label text-[0.65rem] uppercase text-accent mb-3">
            {project.category}
          </p>
          <h3 className="text-fluid-subheading font-normal tracking-tight text-foreground">
            {project.title}
          </h3>
        </div>

        <p className="text-[0.9rem] leading-relaxed text-muted">{project.description}</p>

        {/* Scope — what was actually built */}
        {project.scope && project.scope.length > 0 && (
          <ul className="space-y-2">
            {project.scope.map((s) => (
              <li key={s} className="flex items-start gap-3 text-[0.85rem] text-muted">
                <span className="mt-[0.45rem] inline-block h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack */}
        {project.technologies.length > 0 && (
          <div>
            <p className="text-tech-label text-[0.6rem] uppercase text-muted mb-2.5">
              Technical Stack
            </p>
            <TechBadges technologies={project.technologies} />
          </div>
        )}

        {/* Links — only where they really exist */}
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-2.5 h-10 px-5 border border-foreground bg-foreground text-background text-[0.65rem] font-normal tracking-[0.12em] uppercase hover:bg-transparent hover:text-foreground transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            Case Study
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          {project.links.live && (
            <ExternalLink href={project.links.live} label="Live Demo" primary />
          )}
          {project.links.source && (
            <ExternalLink href={project.links.source} label="View on GitHub" />
          )}
          {project.links.sourceMobile && (
            <ExternalLink href={project.links.sourceMobile} label="GitHub — Mobile" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ProjectCard
// ---------------------------------------------------------------------------

function ProjectCard({ project, cardIndex }: { project: Project; cardIndex: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: reduced ? 0 : 0.5,
        delay: reduced ? 0 : (cardIndex % 2) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col bg-background hover:bg-surface/40 transition-colors duration-300 border border-border hover:border-border-strong overflow-hidden"
    >
      {/* Visual */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-surface">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} — application screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          VISUALS[project.visual] ?? VISUALS.web
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 md:p-7 gap-4">
        <div>
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-tech-label text-[0.6rem] uppercase text-muted">
              {project.number}
            </span>
            <span className="text-muted/50 text-[0.6rem]">/</span>
            <span className="text-tech-label text-[0.6rem] uppercase text-muted">
              {projects.length.toString().padStart(2, "0")}
            </span>
          </div>
          <p className="text-tech-label text-[0.6rem] uppercase text-accent mb-2">
            {project.category}
          </p>
          <h3 className="text-xl md:text-2xl font-light tracking-tight text-foreground">
            {project.title}
          </h3>
        </div>

        <p className="text-[0.875rem] leading-relaxed text-muted flex-1">
          {project.summary}
        </p>

        {project.technologies.length > 0 && <TechBadges technologies={project.technologies} max={4} />}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 text-[0.65rem] font-normal tracking-[0.08em] uppercase text-foreground hover:text-accent transition-colors duration-200 focus-visible:outline-none"
          >
            Case Study
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
              <path d="M1 8L8 1M8 1H2.5M8 1V6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.65rem] font-normal tracking-[0.08em] uppercase text-foreground hover:text-accent transition-colors duration-200"
            >
              Live Demo
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3M8.5 1.5V7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
          {project.links.source && (
            <a
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.65rem] font-normal tracking-[0.08em] uppercase text-foreground hover:text-accent transition-colors duration-200"
            >
              View on GitHub
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3M8.5 1.5V7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
          {project.links.sourceMobile && (
            <a
              href={project.links.sourceMobile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.65rem] font-normal tracking-[0.08em] uppercase text-foreground hover:text-accent transition-colors duration-200"
            >
              GitHub — Mobile
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3M8.5 1.5V7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Projects section
// ---------------------------------------------------------------------------

export function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-28 bg-background">
      <div className="relative z-10 container">
        <SectionHeading
          number="06"
          label="Projects"
          title="Selected Projects"
          description="Engineering through practice — systems built end to end, from academic tooling to AI platforms."
        />

        {/* Featured */}
        {projects[0]?.size === "featured" && (
          <FeaturedProject project={projects[0]} />
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-border bg-border gap-px">
          {projects.slice(1).map((project, i) => (
            <ProjectCard key={project.id} project={project} cardIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
