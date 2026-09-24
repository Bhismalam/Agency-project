export type TeamMember = {
  slug: string;
  name: string;
  vertical: "build" | "grow";
  role: string;
  tagline: string;
  bio: string;
  skills: string[];
  experience: { title: string; context: string; period: string }[];
};

export const team: TeamMember[] = [
  {
    slug: "build-lead",
    name: "[Nama Kamu]",
    vertical: "build",
    role: "Web Developer, UI/UX Designer, SEO",
    tagline: "[1-2 sentence tagline — what makes your approach to building distinct]",
    bio: "[Paragraph — experience, background, what led you to web dev/UI-UX/SEO, philosophy on building products]",
    skills: ["[Skill/tool]", "[Skill/tool]", "[Skill/tool]", "[Skill/tool]", "[Skill/tool]", "[Skill/tool]"],
    experience: [
      { title: "[Role / Project]", context: "[Company or context]", period: "[Year–Year]" },
      { title: "[Role / Project]", context: "[Company or context]", period: "[Year–Year]" },
      { title: "[Certification / Education]", context: "[Institution]", period: "[Year]" },
    ],
  },
  {
    slug: "grow-lead",
    name: "[Nama Pasangan]",
    vertical: "grow",
    role: "Marketing, Social Media Specialist, SEO",
    tagline: "[1-2 sentence tagline — what makes your approach to growth distinct]",
    bio: "[Paragraph — experience, background, what led you to marketing/social/SEO, philosophy on growing brands]",
    skills: ["[Skill/tool]", "[Skill/tool]", "[Skill/tool]", "[Skill/tool]", "[Skill/tool]", "[Skill/tool]"],
    experience: [
      { title: "[Role / Campaign]", context: "[Company or context]", period: "[Year–Year]" },
      { title: "[Role / Campaign]", context: "[Company or context]", period: "[Year–Year]" },
      { title: "[Certification / Education]", context: "[Institution]", period: "[Year]" },
    ],
  },
];

export function getTeamMember(slug: string) {
  return team.find((member) => member.slug === slug);
}
