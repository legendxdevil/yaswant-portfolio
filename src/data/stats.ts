export interface StatItem {
  id: string;
  number: string;
  label: string;
  accentColor: string;
}

export const statsData: StatItem[] = [
  {
    id: "experience",
    number: "5+",
    label: "YEARS IN EMBEDDED",
    accentColor: "border-t-pastel-purple"
  },
  {
    id: "companies",
    number: "5",
    label: "COMPANIES WORKED",
    accentColor: "border-t-pastel-blue"
  },
  {
    id: "certs",
    number: "2",
    label: "CERTIFICATIONS EARNED",
    accentColor: "border-t-pastel-pink"
  },
  {
    id: "degrees",
    number: "2",
    label: "DEGREES HELD",
    accentColor: "border-t-pastel-green"
  },
  {
    id: "domains",
    number: "4",
    label: "DOMAINS & TECH",
    accentColor: "border-t-pastel-teal"
  }
];
