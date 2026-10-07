import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/footer/Footer";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";

const BRAND_LOGOS: Record<string, string> = {
  "Flutter":      "/assets/technologies/flutter.svg",
  "Dart":         "/assets/technologies/dart.svg",
  "Firebase":     "/assets/technologies/firebase.svg",
  "Next.js":      "/assets/technologies/nextjs.svg",
  "React":        "/assets/technologies/react.svg",
  "TypeScript":   "/assets/technologies/typescript.svg",
  "Tailwind CSS": "/assets/technologies/tailwind.svg",
  "Docker":       "/assets/technologies/docker.svg",
  "GitHub":       "/assets/technologies/github.svg",
  "Vercel":       "/assets/technologies/vercel.svg",
  "Python":       "/assets/technologies/python.svg",
  "Node.js":      "/assets/technologies/nodejs.svg",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

function ProjectLink({
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
      className={`inline-flex items-center gap-2 h-10 px-5 text-tech-label text-[0.65rem] uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
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

async function ProjectCaseStudy({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      <Navigation />
      <main className="relative min-h-screen bg-background">
        <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-8 lg:px-10 pt-28 md:pt-36 pb-20 md:pb-28">

          {/* Header */}
          <div className="mb-14 md:mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-tech-label text-[0.65rem] uppercase text-muted">
                {project.number}
              </span>
              <span className="h-px w-8 bg-border" aria-hidden="true" />
              <span className="text-tech-label text-[0.65rem] uppercase text-muted">
                Case Study
              </span>
            </div>

            <p className="text-tech-label text-[0.65rem] uppercase text-accent mb-3">
              {project.category}
            </p>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal italic tracking-tight leading-[1.05] text-foreground mb-6">
              {project.title}
            </h1>

            {project.variants && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.variants.map((v) => (
                  <span
                    key={v}
                    className="text-tech-label text-[0.6rem] uppercase text-muted border border-border px-2.5 py-1"
                  >
                    {v}
                  </span>
                ))}
              </div>
            )}

            {project.context && (
              <p className="text-tech-label text-[0.65rem] uppercase text-muted">
                {project.context}
              </p>
            )}
          </div>

          {/* Cover image — real screenshot when available */}
          {project.image && (
            <div className="relative aspect-[16/9] overflow-hidden border border-border bg-surface mb-12">
              <Image
                src={project.image}
                alt={`${project.title} — application screenshot`}
                fill
                sizes="(max-width: 1000px) 100vw, 1000px"
                className="object-cover object-center"
                priority
              />
            </div>
          )}

          {/* Description */}
          <div className="border-t border-border pt-10 mb-12">
            <p className="text-tech-label text-[0.6rem] uppercase text-muted mb-5">
              Overview
            </p>
            <p className="text-base md:text-lg font-light leading-relaxed text-muted max-w-[660px]">
              {project.description}
            </p>
          </div>

          {/* Scope */}
          {project.scope && project.scope.length > 0 && (
            <div className="border-t border-border pt-10 mb-12">
              <p className="text-tech-label text-[0.6rem] uppercase text-muted mb-5">
                What I Built
              </p>
              <ul className="space-y-3">
                {project.scope.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[0.9rem] text-muted">
                    <span className="mt-[0.5rem] inline-block h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology stack */}
          {project.technologies.length > 0 && (
            <div className="border-t border-border pt-10 mb-12">
              <p className="text-tech-label text-[0.6rem] uppercase text-muted mb-5">
                Technical Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => {
                  const logoSrc = BRAND_LOGOS[tech];
                  return (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-2 h-9 px-3 text-tech-label text-[0.6rem] uppercase border border-border text-muted"
                    >
                      {logoSrc && (
                        <Image
                          src={logoSrc}
                          alt=""
                          width={14}
                          height={14}
                          className="h-3.5 w-3.5 object-contain"
                        />
                      )}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Links */}
          {(project.links.live || project.links.source || project.links.sourceMobile) && (
            <div className="border-t border-border pt-10 mb-12">
              <p className="text-tech-label text-[0.6rem] uppercase text-muted mb-5">
                Links
              </p>
              <div className="flex flex-wrap gap-3">
                {project.links.live && (
                  <ProjectLink href={project.links.live} label="Live Demo" primary />
                )}
                {project.links.source && (
                  <ProjectLink href={project.links.source} label="View on GitHub" />
                )}
                {project.links.sourceMobile && (
                  <ProjectLink href={project.links.sourceMobile} label="GitHub — Mobile" />
                )}
              </div>
            </div>
          )}

          {/* Back */}
          <div className="border-t border-border pt-10">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2.5 text-tech-label text-[0.65rem] uppercase text-muted hover:text-foreground transition-colors duration-300"
            >
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                <path d="M8 1L1 8M1 8H6M1 8V3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
              </svg>
              Back to Projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.title} — Ibrahim Sbouai`,
      description: project.description,
      type: "website",
    },
  };
}

export default ProjectCaseStudy;
