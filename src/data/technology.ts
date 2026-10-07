// ============================================================
// TECHNOLOGY STACK — organized by engineering domain.
//
// Each item is either a real brand (with an official logo asset)
// or a concept / standard / protocol (rendered as a typographic
// technical mark — never a fake logo).
// ============================================================

export interface StackItem {
  name: string;
  /** Real brand logo (asset under /assets/technologies) */
  logo?: string;
  /** Typographic mark for concepts that have no brand logo (2–4 chars) */
  mark?: string;
  /** Short technical context */
  context: string;
}

export interface StackDomain {
  id: string;
  number: string;
  title: string;
  /** One-line domain description shown inside the card */
  description: string;
  /** Wide cards span both columns on desktop */
  wide?: boolean;
  items: StackItem[];
}

export const stackDomains: StackDomain[] = [
  {
    id: "languages",
    number: "01",
    title: "Programming Languages",
    description:
      "Languages used across software, systems, embedded and application development.",
    wide: true,
    items: [
      { name: "C", logo: "c", context: "Embedded · Low-level" },
      { name: "C++", logo: "cpp", context: "Systems · OOP" },
      { name: "Java", logo: "java", context: "OOP · Applications" },
      { name: "Python", logo: "python", context: "AI · Scripting" },
      { name: "JavaScript", logo: "javascript", context: "Web" },
      { name: "TypeScript", logo: "typescript", context: "Type-safe Web" },
      { name: "Dart", logo: "dart", context: "Mobile" },
      { name: "SQL", mark: "SQL", context: "Queries · Data" },
      { name: "VHDL", mark: "VHDL", context: "Hardware Description" },
    ],
  },
  {
    id: "frontend",
    number: "02",
    title: "Frontend & Web",
    description: "Interfaces and web platforms built with a component mindset.",
    items: [
      { name: "HTML5", logo: "html5", context: "Structure" },
      { name: "CSS3", logo: "css3", context: "Layout · Style" },
      { name: "React", logo: "react", context: "Components" },
      { name: "Next.js", logo: "nextjs", context: "Full-stack Web" },
      { name: "Tailwind CSS", logo: "tailwind", context: "Design System" },
    ],
  },
  {
    id: "backend",
    number: "03",
    title: "Backend & APIs",
    description: "Server-side logic and connected services.",
    items: [
      { name: "Node.js", logo: "nodejs", context: "Runtime" },
      { name: "Express", logo: "express", context: "API Framework" },
      { name: "REST APIs", mark: "API", context: "Architecture · HTTP" },
    ],
  },
  {
    id: "mobile",
    number: "04",
    title: "Mobile Development",
    description: "Cross-platform mobile applications.",
    items: [
      { name: "Flutter", logo: "flutter", context: "Cross-platform" },
      { name: "Android", logo: "android", context: "Platform" },
    ],
  },
  {
    id: "databases",
    number: "05",
    title: "Databases",
    description: "Data modeling, storage and retrieval.",
    items: [
      { name: "MongoDB", logo: "mongodb", context: "Document · NoSQL" },
      { name: "PostgreSQL", logo: "postgresql", context: "Relational · SQL" },
      { name: "Firebase", logo: "firebase", context: "Realtime · Cloud" },
    ],
  },
  {
    id: "embedded-iot",
    number: "06",
    title: "Embedded Systems & IoT",
    description:
      "Where software meets hardware — microcontrollers, firmware and connected devices.",
    wide: true,
    items: [
      { name: "STM32", logo: "stm32", context: "ARM Cortex-M MCUs" },
      { name: "Keil µVision", mark: "KEI", context: "IDE · Debugging" },
      { name: "STM32CubeMX", mark: "CUB", context: "Configuration · Codegen" },
      { name: "Real-Time Systems", mark: "RT", context: "Timing · Scheduling" },
      { name: "Sensors & Actuators", mark: "I/O", context: "Physical I/O" },
      { name: "Wireless IoT", mark: "RF", context: "Wi-Fi · BLE · LoRa" },
    ],
  },
  {
    id: "automation",
    number: "07",
    title: "Industrial Automation",
    description:
      "PLC programming and industrial communication, from Groupe Chimique Tunisien field work.",
    items: [
      { name: "Siemens S7-200", mark: "S7", context: "Programmable Logic" },
      { name: "GRAFCET", mark: "GRF", context: "Sequential Control" },
      { name: "Modbus TCP/IP", mark: "MB", context: "Industrial Protocol" },
      { name: "RS-485", mark: "485", context: "Serial Field Bus" },
      { name: "PROFIBUS", mark: "PB", context: "Fieldbus · Automation" },
    ],
  },
  {
    id: "networks",
    number: "08",
    title: "Systems & Networks",
    description:
      "Network fundamentals and telecom infrastructure, from Tunisie Telecom field exposure.",
    items: [
      { name: "TCP/IP", mark: "TCP", context: "Protocol Stack" },
      { name: "Wireshark", logo: "wireshark", context: "Packet Analysis" },
      { name: "Fibre Optics", mark: "FBR", context: "GPON · Telecom" },
      { name: "Network Infrastructure", mark: "NET", context: "Operations" },
    ],
  },
  {
    id: "ai",
    number: "09",
    title: "AI & Data",
    description: "Applied machine learning and data-driven features.",
    items: [
      { name: "Machine Learning", mark: "ML", context: "Models · Training" },
      { name: "Computer Vision", mark: "CV", context: "Image Processing" },
      { name: "AI APIs", mark: "AI", context: "Integration · LLMs" },
    ],
  },
  {
    id: "cloud",
    number: "10",
    title: "Cloud & Deployment",
    description: "Shipping and running applications.",
    items: [
      { name: "Vercel", logo: "vercel", context: "Web Hosting" },
      { name: "Docker", logo: "docker", context: "Containers" },
    ],
  },
  {
    id: "tools",
    number: "11",
    title: "Tools & Collaboration",
    description: "The daily engineering toolkit.",
    wide: true,
    items: [
      { name: "Git", logo: "git", context: "Version Control" },
      { name: "GitHub", logo: "github", context: "Collaboration" },
      { name: "VS Code", logo: "vscode", context: "Editor" },
      { name: "Figma", logo: "figma", context: "Interface Design" },
    ],
  },
];

// ============================================================
// ENGINEERING LAYERS — how I read and build systems.
// Six layers, from software down to deployment.
// ============================================================

export interface EngineeringLayer {
  number: string;
  title: string;
  description: string;
  /** Short spec list rendered in the layer's technical column */
  spec: string[];
}

export const engineeringLayers: EngineeringLayer[] = [
  {
    number: "01",
    title: "Software",
    description:
      "Applications, APIs, algorithms and services — the layer users and systems interact with.",
    spec: ["Applications", "APIs", "Algorithms"],
  },
  {
    number: "02",
    title: "Systems",
    description:
      "Architecture, operating systems and computation — how code is actually executed.",
    spec: ["Architecture", "Operating Systems", "Computation"],
  },
  {
    number: "03",
    title: "Embedded",
    description:
      "Microcontrollers, firmware and real-time behavior — software bound to hardware.",
    spec: ["Microcontrollers", "Firmware", "Real-Time"],
  },
  {
    number: "04",
    title: "Connectivity",
    description:
      "Networks, protocols and communication — how machines and devices reach each other.",
    spec: ["Networks", "Protocols", "Industrial Buses"],
  },
  {
    number: "05",
    title: "Intelligence",
    description:
      "AI, machine learning and data — systems that interpret information and act on it.",
    spec: ["AI / ML", "Data", "Inference"],
  },
  {
    number: "06",
    title: "Deployment",
    description:
      "Cloud, infrastructure and monitoring — moving engineered systems into real usage.",
    spec: ["Cloud", "Infrastructure", "Monitoring"],
  },
];

// ============================================================
// ENGINEERING FOUNDATIONS — the academic layer beneath the tooling.
// ============================================================

export interface Foundation {
  number: string;
  title: string;
  description: string;
  /** Visual key used by the UI to render a small technical mark */
  mark: "graph" | "cpu" | "layers" | "topology" | "signal" | "distribution" | "curve" | "timing";
}

export const foundations: Foundation[] = [
  {
    number: "01",
    title: "Algorithms",
    description: "Complexity, data structures and structured problem solving.",
    mark: "graph",
  },
  {
    number: "02",
    title: "Computer Architecture",
    description: "How computation actually happens, from instruction to hardware.",
    mark: "cpu",
  },
  {
    number: "03",
    title: "Operating Systems",
    description: "Processes, memory, scheduling and the layers above the metal.",
    mark: "layers",
  },
  {
    number: "04",
    title: "Computer Networks",
    description: "Protocol stacks, addressing and how machines reach each other.",
    mark: "topology",
  },
  {
    number: "05",
    title: "Electronics",
    description: "Signals, circuits and the physical substrate of computing.",
    mark: "signal",
  },
  {
    number: "06",
    title: "Probability & Statistics",
    description: "Reasoning under uncertainty and interpreting real data.",
    mark: "distribution",
  },
  {
    number: "07",
    title: "Optimization",
    description: "Finding good solutions inside real constraints.",
    mark: "curve",
  },
  {
    number: "08",
    title: "Real-Time Systems",
    description: "Determinism, timing guarantees and scheduling under deadlines.",
    mark: "timing",
  },
];

// ============================================================
// ENGINEERING PROCESS — how work moves from problem to system.
// ============================================================

export interface ProcessStage {
  id: string;
  title: string;
  description: string;
  /** Micro-details rendered under the stage */
  detail: string[];
}

export const engineeringProcess: ProcessStage[] = [
  {
    id: "discover",
    title: "Discover",
    description: "Understand the problem, its constraints and the system context.",
    detail: ["Requirements", "Constraints", "Context"],
  },
  {
    id: "model",
    title: "Model",
    description: "Break the system into architecture, components and interfaces.",
    detail: ["Architecture", "Interfaces", "Trade-offs"],
  },
  {
    id: "build",
    title: "Build",
    description: "Implement the software, embedded or connected components.",
    detail: ["Software", "Embedded", "Hardware integration"],
  },
  {
    id: "connect",
    title: "Connect",
    description: "Integrate communication, hardware, services and data.",
    detail: ["Networks", "Protocols", "APIs"],
  },
  {
    id: "validate",
    title: "Validate",
    description: "Test behavior, reliability and edge cases.",
    detail: ["Validation", "Debugging", "Reliability"],
  },
  {
    id: "deploy",
    title: "Deploy",
    description: "Move the system into real usage and keep it running.",
    detail: ["Release", "Monitoring", "Maintenance"],
  },
];
