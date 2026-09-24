export type Project = {
  slug: string;
  name: string;
  vertical: "build" | "grow";
  tag: string;
  summary: string;
  description: string;
  result: string;
};

export const buildProjects: Project[] = [
  {
    slug: "project-one",
    name: "[Project name]",
    vertical: "build",
    tag: "Web / UI-UX",
    summary: "[1-line summary of the build]",
    description:
      "[Paragraph — the brief, what was built, and the technical approach]",
    result: "[Outcome — e.g. load time, conversion lift, launch timeline]",
  },
  {
    slug: "project-two",
    name: "[Project name]",
    vertical: "build",
    tag: "Web / UI-UX",
    summary: "[1-line summary of the build]",
    description:
      "[Paragraph — the brief, what was built, and the technical approach]",
    result: "[Outcome — e.g. load time, conversion lift, launch timeline]",
  },
  {
    slug: "project-three",
    name: "[Project name]",
    vertical: "build",
    tag: "SEO",
    summary: "[1-line summary of the build]",
    description:
      "[Paragraph — the brief, what was built, and the technical approach]",
    result: "[Outcome — e.g. organic traffic growth, ranking improvement]",
  },
];

export const growProjects: Project[] = [
  {
    slug: "campaign-one",
    name: "[Campaign name]",
    vertical: "grow",
    tag: "Marketing",
    summary: "[1-line summary of the campaign]",
    description:
      "[Paragraph — the brief, the strategy, and the channels used]",
    result: "[Outcome — e.g. reach, leads generated, ROAS]",
  },
  {
    slug: "campaign-two",
    name: "[Campaign name]",
    vertical: "grow",
    tag: "Social Media",
    summary: "[1-line summary of the campaign]",
    description:
      "[Paragraph — the brief, the strategy, and the channels used]",
    result: "[Outcome — e.g. follower growth, engagement rate]",
  },
  {
    slug: "campaign-three",
    name: "[Campaign name]",
    vertical: "grow",
    tag: "SEO",
    summary: "[1-line summary of the campaign]",
    description:
      "[Paragraph — the brief, the strategy, and the channels used]",
    result: "[Outcome — e.g. organic traffic growth, ranking improvement]",
  },
];

export function getProject(vertical: "build" | "grow", slug: string) {
  const source = vertical === "build" ? buildProjects : growProjects;
  return source.find((project) => project.slug === slug);
}
