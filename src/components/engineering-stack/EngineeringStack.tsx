"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ENGINEERING STACK — large engineering module cards, 2-column desktop grid.
 * No decorative diagrams, no artificial node maps, no fake code.
 * Real technology logos where a genuine brand SVG exists.
 */

const BRAND_LOGOS: Record<string, string> = {
  C: "/assets/technologies/c.svg",
  "C++": "/assets/technologies/cpp.svg",
  Java: "/assets/technologies/java.svg",
  Python: "/assets/technologies/python.svg",
  JavaScript: "/assets/technologies/javascript.svg",
  TypeScript: "/assets/technologies/typescript.svg",
  Dart: "/assets/technologies/dart.svg",
  React: "/assets/technologies/react.svg",
  "Next.js": "/assets/technologies/nextjs.svg",
  "Node.js": "/assets/technologies/nodejs.svg",
  Git: "/assets/technologies/git.svg",
  GitHub: "/assets/technologies/github.svg",
  Docker: "/assets/technologies/docker.svg",
  Firebase: "/assets/technologies/firebase.svg",
  STM32: "/assets/technologies/stm32.svg",
  MongoDB: "/assets/technologies/mongodb.svg",
  PostgreSQL: "/assets/technologies/postgresql.svg",
  HTML5: "/assets/technologies/html5.svg",
  CSS3: "/assets/technologies/css3.svg",
  "Tailwind CSS": "/assets/technologies/tailwind.svg",
  "Express.js": "/assets/technologies/express.svg",
  Vercel: "/assets/technologies/vercel.svg",
  "VS Code": "/assets/technologies/vscode.svg",
  Wireshark: "/assets/technologies/wireshark.svg",
  Figma: "/assets/technologies/figma.svg",
  Flutter: "/assets/technologies/flutter.svg",
};

const engineeringCards = [
  {
    id: "programming",
    number: "01",
    title: "Programming + Software",
    category: "COMPUTATION",
    description:
      "Building applications with strong programming foundations and software engineering principles — from algorithms to maintainable architecture.",
    technologies: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript"],
    techContext: ["Algorithms", "Data Structures", "Design Patterns", "Clean Architecture"],
  },
  {
    id: "systems",
    number: "02",
    title: "Systems + Networks",
    category: "INFRASTRUCTURE",
    description:
      "Architecture, operating systems, and network infrastructure fundamentals — understanding how computation moves across layers.",
    technologies: ["Docker", "Git", "GitHub"],
    techContext: ["Computer Architecture", "Operating Systems", "Computer Networks", "Distributed Systems"],
  },
  {
    id: "embedded",
    number: "03",
    title: "Embedded Systems",
    category: "HARDWARE",
    description:
      "Microcontroller development and real-time programming for hardware interaction — where software meets the physical world.",
    technologies: ["STM32", "C++", "C"],
    techContext: ["Microcontrollers", "Real-Time Systems", "Bare-Metal", "Peripherals"],
  },
  {
    id: "iot",
    number: "04",
    title: "IoT + Connected Systems",
    category: "CONNECTIVITY",
    description:
      "Building connected devices with sensors, wireless communication, and security — bridging physical and digital worlds.",
    technologies: [],
    techContext: ["Sensors & Actuators", "Wireless IoT", "IoT Security", "Edge Computing"],
  },
  {
    id: "industrial",
    number: "05",
    title: "Industrial Automation",
    category: "AUTOMATION",
    description:
      "Industrial automation with PLCs, ladder logic, and fieldbus protocols — controlling physical processes reliably.",
    technologies: [],
    techContext: ["GRAFCET", "Ladder Logic", "Modbus TCP/IP", "PROFIBUS", "RS-485"],
  },
  {
    id: "ai",
    number: "06",
    title: "AI + Data",
    category: "INTELLIGENCE",
    description:
      "Machine learning pipelines and data processing systems — from raw data to deployed inference.",
    technologies: ["Python"],
    techContext: ["Machine Learning", "Computer Vision", "Data Pipelines", "AI APIs"],
  },
  {
    id: "cloud",
    number: "07",
    title: "Cloud + Infrastructure",
    category: "DEPLOYMENT",
    description:
      "Deployment pipelines and cloud services — from source to production at scale.",
    technologies: ["Docker", "GitHub", "Vercel", "Firebase"],
    techContext: ["CI/CD", "Containers", "Cloud Computing", "Observability"],
  },
  {
    id: "design",
    number: "08",
    title: "Engineering & Product Design",
    category: "INTERFACE",
    description:
      "System visualization, interface design, prototyping, and design systems — making complex systems understandable.",
    technologies: ["Figma", "VS Code", "Wireshark"],
    techContext: ["UI/UX", "System Visualization", "Prototyping", "Design Systems"],
  },
];

export function EngineeringStack() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="stack"
      className="relative py-20 md:py-28 bg-background overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="engineering-grid opacity-40" />
      </div>

      <div className="container relative z-10" ref={ref}>
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-tech-label text-[0.6875rem] uppercase text-muted/60">03</span>
            <span className="h-px w-8 bg-border" />
            <span className="text-tech-label text-[0.6875rem] uppercase text-muted/60">Stack</span>
          </div>
          <h2 className="text-fluid-heading text-section-heading max-w-[22ch] text-foreground">
            Engineering Stack
          </h2>
          <p className="text-fluid-body mt-4 max-w-[52ch] text-muted">
            Engineering capability organized by domain — each module represents a layer of the system.
          </p>
        </div>

        {/* 2-column grid on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
          {engineeringCards.map((card, i) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduced ? 0 : 0.55,
                delay: reduced ? 0 : 0.05 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative"
            >
              <div className="relative border border-border/40 rounded-xl bg-card/40 overflow-hidden hover:border-border/70 hover:bg-card/60 transition-all duration-300">
                <div className="relative p-7 md:p-9 lg:p-10">
                  {/* Header */}
                  <div className="mb-5 flex items-baseline gap-3">
                    <span className="text-tech-label text-[0.65rem] uppercase text-muted/40">
                      {card.number}
                    </span>
                    <span className="text-muted/25 text-[0.65rem]">/</span>
                    <span className="text-tech-label text-[0.65rem] uppercase text-muted/50">
                      {card.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl lg:text-[1.6rem] font-light text-foreground/95 mb-3 leading-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[0.9rem] text-muted/65 mb-6 leading-relaxed max-w-[56ch]">
                    {card.description}
                  </p>

                  {/* Technical context tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {card.techContext.map((ctx) => (
                      <span
                        key={ctx}
                        className="text-[0.575rem] font-medium tracking-[0.07em] uppercase text-muted/50 border border-border/35 px-2 py-1 rounded-sm"
                      >
                        {ctx}
                      </span>
                    ))}
                  </div>

                  {/* Technology logos */}
                  {card.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/25">
                      {card.technologies.map((tech) => {
                        const logoSrc = BRAND_LOGOS[tech];
                        return (
                          <div
                            key={tech}
                            className="group/badge inline-flex items-center gap-2 h-8 px-2.5 text-[0.575rem] font-medium tracking-[0.06em] uppercase text-muted/55 border border-border/30 hover:border-foreground/25 hover:text-foreground/85 transition-colors duration-200 rounded-sm"
                          >
                            {logoSrc ? (
                              <Image
                                src={logoSrc}
                                alt={tech}
                                width={14}
                                height={14}
                                className="w-3.5 h-3.5 object-contain opacity-60 group-hover/badge:opacity-100 transition-opacity duration-200"
                              />
                            ) : null}
                            <span>{tech}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}