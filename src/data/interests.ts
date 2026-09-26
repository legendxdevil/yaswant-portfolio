export interface InterestCardData {
  id: string;
  title: string;
  borderColor: 'green' | 'blue' | 'purple' | 'pink' | 'yellow' | 'teal';
  icon: string;
  content: {
    location?: string;
    tag?: string;
    bullets?: string[];
    bookTitle?: string;
    author?: string;
    tagPill?: string;
    drink?: string;
    boostStat?: string;
    intakeLevel?: number; // out of 5
    intakeLabel?: string;
    exploringTags?: string[];
    focusPoints?: { title: string; desc: string }[];
    quote?: string;
    authorOrSource?: string;
  };
}

export const interestsData: InterestCardData[] = [
  {
    id: "location",
    title: "CURRENT LOCATION",
    borderColor: "green",
    icon: "MapPin",
    content: {
      location: "Kansas City, MO, United States",
      tag: "Open to Full-Time Roles & Relocation 🚗",
      bullets: [
        "Senior Software Engineer @ VClean",
        "Authorized to work in US · Available immediately"
      ]
    }
  },
  {
    id: "reading",
    title: "CURRENTLY STUDYING",
    borderColor: "blue",
    icon: "BookOpen",
    content: {
      bookTitle: "Certified Tester AI Testing (ISTQB / ASTQB Syllabus)",
      author: "ISTQB & MathWorks MATLAB Coder Onramp",
      tagPill: "#AITesting #Automotive",
      bullets: [
        "Mastering AI model testing, safety-critical verification & MATLAB Coder firmware generation."
      ]
    }
  },
  {
    id: "fuel",
    title: "FUEL DASHBOARD",
    borderColor: "purple",
    icon: "Zap",
    content: {
      drink: "Espresso & Home Culinary Meals 🍳",
      boostStat: "+85% Embedded Focus",
      intakeLevel: 5,
      intakeLabel: "High Performance Charged",
      bullets: ["Status: Operational & Ready for Complex Systems"]
    }
  },
  {
    id: "exploring",
    title: "EXPLORING",
    borderColor: "pink",
    icon: "Compass",
    content: {
      exploringTags: [
        "🚗 Automotive Embedded",
        "🤖 AI Testing (ISTQB)",
        "📡 Sensor Fusion",
        "📐 MATLAB Coder",
        "⚡ Raw Data QA"
      ]
    }
  },
  {
    id: "focus",
    title: "CURRENT FOCUS",
    borderColor: "yellow",
    icon: "Target",
    content: {
      focusPoints: [
        {
          title: "Embedded × AI Intersection",
          desc: "Processing sensor logs at scale with Python & C++. Certified AI testing practices in safety-critical workflows."
        },
        {
          title: "Hands-On Builder Mindset",
          desc: "Channeling engineering passion into home DIY projects, tech setups, and global road trips."
        }
      ]
    }
  },
  {
    id: "hobbies",
    title: "BEYOND THE CODE",
    borderColor: "teal",
    icon: "Sparkles",
    content: {
      quote: "Passionate global traveler, avid builder, and fitness enthusiast—bringing an adaptable mindset to every engineering challenge.",
      authorOrSource: "— Travel (Delhi, Jaipur, Agra, Rameshwaram, US drives) • Gaming (PUBG Chicken Dinners!) • Home Cooking • Fitness"
    }
  }
];
