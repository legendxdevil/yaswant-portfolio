export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  tags: string[];
  borderColor: 'green' | 'blue' | 'purple' | 'pink' | 'yellow' | 'teal' | 'orange';
}

export const blogPostsData: BlogPost[] = [
  {
    id: "embedded-ai-testing-istqb",
    title: "The Intersection of Embedded Systems and Certified AI Testing",
    date: "FEB 10, 2026",
    readTime: "6 MIN READ",
    category: "AUTOMOTIVE / AI TESTING",
    excerpt: "Applying ISTQB / ASTQB AI Testing standards to safety-critical automotive firmware and sensor log verification pipelines.",
    tags: ["C++", "Python", "AI Testing", "ISTQB", "Automotive"],
    borderColor: "teal",
    content: [
      "As automotive architectures evolve toward autonomous driving and advanced driver-assistance systems (ADAS), safety-critical embedded software requires unprecedented test rigor.",
      "Traditional deterministic unit tests struggle when validating non-deterministic AI models and complex sensor fusion outputs.",
      "By combining ASTQB/ISTQB Certified AI Testing methodologies with automated Python/C++ log parsing, engineers can measure non-functional model behaviors, dataset drift, and edge-case corruption before deploying code to ECUs.",
      "Key takeaways include establishing zero-byte-loss raw data QA checkpoints and building repeatable simulation layers using MATLAB Coder."
    ]
  },
  {
    id: "sensor-log-parsing-at-scale",
    title: "High-Throughput Sensor Log Parsing with C++ and Python",
    date: "JAN 18, 2026",
    readTime: "5 MIN READ",
    category: "EMBEDDED SOFTWARE",
    excerpt: "Engineering zero-loss data validation scripts to parse raw CAN, LiDAR, and camera sensor logs across embedded system boundaries.",
    tags: ["C++", "Python", "Sensor Logs", "Raw Data QA", "Firmware"],
    borderColor: "purple",
    content: [
      "In automotive firmware engineering, sensor data integrity is non-negotiable—where every single byte matters.",
      "Parsing multi-gigabyte raw binary sensor logs in real time requires tight memory management in C++ combined with Python's expressive data validation tools.",
      "We detail binary stream buffer management, bit-field extraction, and automated anomaly flagging algorithms used in production automotive pipelines.",
      "Maintaining high raw data QA standards ensures downstream perception models receive clean, uncorrupted input."
    ]
  },
  {
    id: "mechanical-to-embedded-transition",
    title: "Bridging Mechanical Engineering & Automotive Embedded Software",
    date: "NOV 05, 2025",
    readTime: "7 MIN READ",
    category: "CAREER & ENGINEERING",
    excerpt: "How a foundational Mechanical Engineering degree paired with MS Industrial Technology empowered a career in automotive embedded software.",
    tags: ["Career", "MATLAB Coder", "Industrial Tech", "Automotive"],
    borderColor: "blue",
    content: [
      "Understanding physical dynamics—kinematics, thermal loads, and mechanical stress—gives embedded software engineers a massive advantage when writing firmware for physical actuators and vehicle ECUs.",
      "Tools like MATLAB Coder bridge mathematical physical models with auto-generated C/C++ source code.",
      "Continuous hands-on tinkering, graduate studies in Industrial Technology at UCM, and 5+ years of software industry experience demonstrate the power of interdisciplinary engineering."
    ]
  },
  {
    id: "life-travel-adaptability",
    title: "Global Travel, Fitness & The Adaptable Engineering Mindset",
    date: "SEP 12, 2025",
    readTime: "4 MIN READ",
    category: "LIFESTYLE & PERSPECTIVE",
    excerpt: "Why navigating international terrain, home DIY projects, and personal fitness directly translate to adaptability in high-performance US work cultures.",
    tags: ["Travel", "Adaptability", "DIY", "Work Culture"],
    borderColor: "pink",
    content: [
      "Engineering doesn't stop at 5:00 PM—the problem-solving mindset extends into every facet of life.",
      "Whether road-tripping across US landscapes (from Delhi to Rameshwaram to Kansas City), tackling home DIY setups, or maintaining physical discipline through regular workouts, exploring new environments builds comfort with ambiguity.",
      "Bringing an adaptable, curious mindset to every project creates resilient engineers who thrive under dynamic technical challenges."
    ]
  }
];
