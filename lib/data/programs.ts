export type Program = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: "open" | "closed";
  deadline: string;
  duration: string;
  location: string;
  requirements: string[];
  benefits: string[];
};

export const programs: Program[] = [
  {
    slug: "open-internship",
    title: "Open Internship",
    summary: "Work alongside the team on real client projects, from build to growth.",
    description:
      "[Paragraph — what this internship covers, who it's for, and what a typical week looks like working with the team]",
    status: "open",
    deadline: "Rolling — applications reviewed as they arrive",
    duration: "3 months",
    location: "Remote / Bali",
    requirements: [
      "[Requirement — e.g. currently studying or recently graduated]",
      "[Requirement — e.g. basic familiarity with the relevant tools]",
      "[Requirement — e.g. can commit X hours/week]",
    ],
    benefits: [
      "[Benefit — direct mentorship from the team]",
      "[Benefit — real client work for your portfolio]",
      "[Benefit — certificate / reference on completion]",
    ],
  },
];

export function getProgram(slug: string) {
  return programs.find((program) => program.slug === slug);
}
