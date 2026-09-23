export type Service = {
  slug: string;
  vertical: "build" | "grow";
  title: string;
  description: string;
};

export const buildServices: Service[] = [
  {
    slug: "web-development",
    vertical: "build",
    title: "Web Development",
    description:
      "Custom-built, fast, and easy to maintain — no bloated page builders.",
  },
  {
    slug: "ui-ux-design",
    vertical: "build",
    title: "UI/UX Design",
    description:
      "Interfaces designed around how people actually use them, not just how they look.",
  },
  {
    slug: "seo",
    vertical: "build",
    title: "SEO — Technical",
    description:
      "Site speed, structure, and crawlability — the foundation Grow's content builds on.",
  },
];

export const growServices: Service[] = [
  {
    slug: "marketing",
    vertical: "grow",
    title: "Marketing",
    description: "Campaign strategy and paid/organic mix that earn attention.",
  },
  {
    slug: "social-media",
    vertical: "grow",
    title: "Social Media",
    description: "Content calendars and community management that build an audience.",
  },
  {
    slug: "seo",
    vertical: "grow",
    title: "SEO — Content",
    description:
      "Content strategy and organic growth — built on the technical foundation Build lays down.",
  },
];
