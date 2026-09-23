export type Project = {
  slug: string;
  name: string;
  vertical: "build" | "grow";
  tag: string;
};

export const buildProjects: Project[] = [
  { slug: "project-one", name: "[Project name]", vertical: "build", tag: "Web / UI-UX" },
  { slug: "project-two", name: "[Project name]", vertical: "build", tag: "Web / UI-UX" },
  { slug: "project-three", name: "[Project name]", vertical: "build", tag: "SEO" },
];

export const growProjects: Project[] = [
  { slug: "campaign-one", name: "[Campaign name]", vertical: "grow", tag: "Marketing" },
  { slug: "campaign-two", name: "[Campaign name]", vertical: "grow", tag: "Social Media" },
  { slug: "campaign-three", name: "[Campaign name]", vertical: "grow", tag: "SEO" },
];
