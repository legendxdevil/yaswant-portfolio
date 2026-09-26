export interface ProjectItem {
  id: string;
  category: 'work' | 'projects' | 'opensource';
  title: string;
  badge?: string;
  role: string;
  dateRange: string;
  description: string;
  bullets?: string[];
  techStack: string[];
  borderColor: 'green' | 'blue' | 'purple' | 'pink' | 'yellow' | 'teal' | 'orange';
  githubUrl?: string;
  liveUrl?: string;
}

export const projectsData: ProjectItem[] = [
  // WORK EXPERIENCE & PROFESSIONAL JOURNEY
  {
    id: "vclean-sr-dev",
    category: "work",
    title: "VClean — Senior Software Engineer",
    badge: "Current Role",
    role: "Senior Software Development Engineer",
    dateRange: "Feb 2026 — Present",
    description: "Building robust software systems as a senior engineer. Driving technical decisions and contributing to core product development in a fast-paced environment.",
    bullets: [
      "Driving senior-level software architecture decisions and cross-functional core product development.",
      "Optimizing system performance and automated software quality pipelines.",
      "Implementing resilient C++ and Python modules for high-throughput software environments."
    ],
    techStack: ["C++", "Python", "Software Architecture", "System Design"],
    borderColor: "teal",
    githubUrl: "https://www.linkedin.com/in/yaswanthkumar-sirimella/"
  },
  {
    id: "ucm-it-support",
    category: "work",
    title: "University of Central Missouri",
    badge: "Higher Ed IT",
    role: "Student Worker — Facilities & IT Support",
    dateRange: "Feb 2025 — Dec 2025",
    description: "Administered and optimized the university's Web TMA system — a comprehensive work order and asset management platform.",
    bullets: [
      "Managed asset tracking, technical support, and work order workflow optimization.",
      "Ensured high system availability and reliable database data management.",
      "Supported campus IT infrastructure and facilities automation."
    ],
    techStack: ["Web TMA", "IT Support", "Data Management", "Sys. Administration"],
    borderColor: "purple",
    githubUrl: "https://www.linkedin.com/in/yaswanthkumar-sirimella/"
  },
  {
    id: "standalone-it",
    category: "work",
    title: "Standalone IT Solutions",
    badge: "Senior Role",
    role: "Senior Software Engineer",
    dateRange: "Aug 2022 — Nov 2024",
    description: "Led software engineering efforts with a focus on quality and performance. Drove senior-level architectural decisions across teams.",
    bullets: [
      "Collaborated with cross-functional teams to architect reliable, high-performance software solutions.",
      "Engineered automated test suites and validation routines in Python and C++.",
      "Mentored junior developers and established code review best practices."
    ],
    techStack: ["Python", "C++", "Software Engineering", "Technical Leadership"],
    borderColor: "blue",
    githubUrl: "https://www.linkedin.com/in/yaswanthkumar-sirimella/"
  },
  {
    id: "prasquare-tech",
    category: "work",
    title: "Prasquare Technologies LLC",
    badge: "Automotive",
    role: "Software Engineer",
    dateRange: "Apr 2020 — Jun 2022",
    description: "Wrote Python and C++ scripts to parse sensor logs and verify raw data quality in automotive pipelines.",
    bullets: [
      "Ensured raw data integrity across embedded system boundaries where every byte matters.",
      "Built automated sensor log validation scripts for automotive ECU testing.",
      "Developed high-accuracy raw data QA checks for sensor fusion streams."
    ],
    techStack: ["Python", "C++", "Sensor Logs", "Raw Data QA", "Automotive"],
    borderColor: "pink",
    githubUrl: "https://www.linkedin.com/in/yaswanthkumar-sirimella/"
  },
  {
    id: "advithri-tech",
    category: "work",
    title: "Advithri Tech IT Pvt Ltd",
    badge: "Foundational",
    role: "Junior Software Engineer",
    dateRange: "Jun 2019 — Mar 2020",
    description: "Built the foundations in scripting, data handling, and embedded system principles that anchor current engineering work.",
    bullets: [
      "Created Python utility scripts for data processing and team workflow automation.",
      "Participated in embedded systems diagnostic testing and codebase maintenance.",
      "Fostered strong cross-team technical communication."
    ],
    techStack: ["Python", "C++", "Data Handling", "Team Coordination"],
    borderColor: "yellow",
    githubUrl: "https://www.linkedin.com/in/yaswanthkumar-sirimella/"
  },

  // FEATURED BUILDS & CONSULTING PROJECTS
  {
    id: "automotive-validation-framework",
    category: "projects",
    title: "Automotive Embedded SW Validation Framework",
    badge: "Automotive",
    role: "Embedded SW Validation Consultant",
    dateRange: "2018 — 2024",
    description: "High-performance C++ & Python test automation framework for ECU sensor log analysis and raw data QA in automotive pipelines.",
    bullets: [
      "Automates ECU sensor log parsing with zero byte-loss validation.",
      "Incorporated ASTQB/ISTQB AI Testing principles into safety-critical validation routines."
    ],
    techStack: ["C++", "Python", "Sensor Logs", "Automotive", "ISTQB AI Testing"],
    borderColor: "green",
    githubUrl: "https://yaswanthkumaryadav.github.io/My-Portifolio/"
  },
  {
    id: "matlab-sensor-fusion",
    category: "projects",
    title: "MATLAB & Sensor Fusion Simulation Layer",
    badge: "Simulation",
    role: "Lead Developer",
    dateRange: "2023",
    description: "Simulation & data verification layer combining MATLAB Coder and Python scripts for sensor log parsing at scale.",
    bullets: [
      "Integrated MATLAB Coder C/C++ generation with real-time sensor log parsing.",
      "Validated sensor fusion pipelines under multi-vehicle dynamic stress tests."
    ],
    techStack: ["MATLAB Coder", "Python", "C++", "Sensor Fusion", "Data Validation"],
    borderColor: "teal",
    githubUrl: "https://yaswanthkumaryadav.github.io/My-Portifolio/"
  },
  {
    id: "six-sigma-sdlc",
    category: "projects",
    title: "Lean Six Sigma SDLC Quality Pipeline",
    badge: "Quality Engineering",
    role: "Quality & Process Architect",
    dateRange: "2023",
    description: "Process optimization and safety-critical quality assurance pipeline implementing Lean Six Sigma methodologies.",
    bullets: [
      "Applied Lean Six Sigma Green Belt principles to streamline software bug triage.",
      "Reduced build pipeline execution defects by 35% across embedded modules."
    ],
    techStack: ["Lean Six Sigma", "Process QA", "Python", "CI/CD", "System Testing"],
    borderColor: "orange",
    githubUrl: "https://yaswanthkumaryadav.github.io/My-Portifolio/"
  }
];
