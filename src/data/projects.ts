export interface ProjectLinks {
  /** Live deployment URL, when one exists */
  live?: string;
  /** Source repository, when one exists */
  source?: string;
  /** Additional source repository (e.g. the mobile counterpart), when one exists */
  sourceMobile?: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  /** Short, strong one-line positioning statement */
  summary: string;
  description: string;
  /** What was actually built / the engineering role — no invented responsibilities */
  scope?: string[];
  technologies: string[];
  size: "featured" | "large" | "medium" | "small";
  variants?: string[];
  /** Context / where the project comes from (e.g. academic, personal) */
  context?: string;
  /** Visual identity key used by the UI to pick a technical composition */
  visual: "ai" | "mobile" | "web" | "telecom" | "academic" | "sleep";
  /** Optional real screenshot/cover image (public path) — shown instead of the diagram */
  image?: string;
  links: ProjectLinks;
}

export const projects: Project[] = [
  {
    id: "mamoyenne",
    number: "01",
    title: "MaMoyenne ISIMG",
    category: "Web + Mobile Platform",
    summary: "Academic average calculation platform for ISIMG students.",
    description:
      "A student-focused platform for calculating and managing academic averages for ISIMG students — available as a web application and a cross-platform mobile app.",
    scope: [
      "Web application deployed for real student use",
      "Cross-platform mobile app with the same calculation core",
      "Firebase-backed data layer",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Next.js"],
    size: "featured",
    variants: ["Web Platform", "Mobile App"],
    context: "Personal project",
    visual: "academic",
    image: "/assets/projectnames/MaMoyenneISIMG.png",
    links: {
      live: "https://calcmoyisimg.vercel.app/",
      source: "https://github.com/itzibrimo/calcmoyisimg",
      sourceMobile: "https://github.com/itzibrimo/MaMoyenne",
    },
  },
  {
    id: "sleepwise",
    number: "02",
    title: "SleepWise",
    category: "Mobile Application",
    summary: "Sleep tracking and wellness insights.",
    description:
      "A mobile application focused on sleep tracking and wellness insights, helping users understand and improve their sleep habits.",
    scope: [
      "Cross-platform mobile application",
      "Sleep tracking and habit insights",
    ],
    technologies: ["Flutter", "Dart"],
    size: "large",
    context: "Personal project",
    visual: "sleep",
    image: "/assets/projectnames/sleepwise.png",
    links: {
      source: "https://github.com/itzibrimo/SleepWise",
    },
  },
  {
    id: "9ritfih-ai",
    number: "03",
    title: "9RITFIH AI",
    category: "AI / Education",
    summary: "AI-powered study platform for learning and academic organization.",
    description:
      "An AI-powered educational platform designed to help students learn, organize study materials, generate quizzes and flashcards, plan study sessions, and prepare for exams.",
    scope: [
      "Document processing pipeline for study material",
      "AI-generated quizzes, flashcards and study plans",
    ],
    technologies: ["AI APIs", "Web", "PDF Processing"],
    size: "featured",
    context: "Personal project",
    visual: "ai",
    image: "/assets/projectnames/9ritfih.png",
    links: {
      source: "https://github.com/itzibrimo/9RITFIHAI",
    },
  },
  {
    id: "tunisie-telecom-website",
    number: "04",
    title: "Tunisie Telecom Website",
    category: "PFA / Web Platform",
    summary: "End-of-year project (PFA) carried out at Tunisie Telecom.",
    description:
      "Web project completed as my PFA (Projet de Fin d'Année) at Tunisie Telecom, focused on the Tunisie Telecom website.",
    technologies: ["Web"],
    size: "small",
    context: "PFA — Tunisie Telecom",
    visual: "telecom",
    image: "/assets/projectnames/ttweb.png",
    links: {
      source: "https://github.com/itzibrimo/TunisieTelecomWebsite",
    },
  },
  {
    id: "portfolio",
    number: "05",
    title: "Portfolio",
    category: "Web / Interface Engineering",
    summary: "This site — an engineering portfolio built as a product.",
    description:
      "This portfolio demonstrates frontend engineering, interaction design, responsive development, animation, and UI/UX craft.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    size: "small",
    context: "Personal project",
    visual: "web",
    image: "/assets/projectnames/portfoliobrahim.png",
    links: {},
  },
];

export interface ExperienceEntry {
  year: string;
  role: string;
  organization: string;
  /** Short environment descriptor, e.g. "Telecommunications infrastructure" */
  environment: string;
  description: string;
  /** Technical areas of exposure — not claims of mastery */
  areas: string[];
  /** Visual identity key for the timeline composition */
  visual: "telecom" | "industrial" | "it";
  /** Marks the most relevant / current entry — rendered visually dominant */
  primary?: boolean;
  /** Upcoming entry — not completed experience, rendered as planned */
  upcoming?: boolean;
  /** GitHub repository for project work produced during this experience */
  source?: string;
}

export const experience: ExperienceEntry[] = [
  {
    year: "2026",
    role: "Technician Internship + PFA",
    organization: "Tunisie Telecom",
    environment: "Telecommunications infrastructure",
    description:
      "Technician internship in a telecommunications environment, with exposure to network infrastructure, fibre optic systems and technical field operations. Completed my end-of-year project (PFA), focused on the Tunisie Telecom website, during the same period.",
    areas: [
      "Telecommunications Networks",
      "Fibre Optics",
      "Network Infrastructure",
      "PFA — Web Platform",
    ],
    visual: "telecom",
    primary: true,
    source: "https://github.com/itzibrimo/TunisieTelecomWebsite",
  },
  {
    year: "2025",
    role: "Stage Ouvrier",
    organization: "Groupe Chimique Tunisien",
    environment: "Industrial environment",
    description:
      "Worker internship in an industrial environment, with exposure to industrial automation systems, PLC-related work and GRAFCET-based sequential control.",
    areas: ["Industrial Automation", "PLC", "GRAFCET"],
    visual: "industrial",
  },
  {
    year: "2027",
    role: "Computer Engineering / Embedded Systems",
    organization: "Upcoming PFE",
    environment: "Automotive / electrical sector — Ben Arous",
    description:
      "Final-year engineering project (PFE) planned with an automotive/electrical company in Ben Arous. Details to be confirmed.",
    areas: ["Computer Engineering", "Embedded Systems"],
    visual: "it",
    upcoming: true,
  },
];

export const philosophy = [
  {
    number: "01",
    title: "Build with purpose",
    description: "Every line of code should serve a clear intention.",
  },
  {
    number: "02",
    title: "Connect software to the real world",
    description: "Bridging digital systems with physical engineering.",
  },
  {
    number: "03",
    title: "Learn across systems",
    description: "Understanding the full stack from hardware to cloud.",
  },
  {
    number: "04",
    title: "Design for people",
    description: "Technology exists to serve human needs.",
  },
];

export const education = {
  institution:
    "Institut Sup\u00e9rieur d\u2019Informatique et de Multim\u00e9dia de Gab\u00e8s",
  degree: "Licence en Ing\u00e9nierie des Syst\u00e8mes Informatiques",
  track: "Syst\u00e8mes Embarqu\u00e9s & IoT",
};
