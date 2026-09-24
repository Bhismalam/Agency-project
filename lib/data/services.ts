export type Service = {
  slug: string;
  vertical: "build" | "grow";
  title: string;
  description: string;
  detail: string;
  bullets: string[];
};

export const buildServices: Service[] = [
  {
    slug: "web-development",
    vertical: "build",
    title: "Web Development",
    description:
      "Custom-built, fast, and easy to maintain — no bloated page builders.",
    detail:
      "[Paragraph — approach to web development: what stack, how projects are scoped, what 'custom-built' means in practice]",
    bullets: [
      "[Bullet — custom builds, no page-builder bloat]",
      "[Bullet — performance/SEO-ready out of the box]",
      "[Bullet — CMS setup and ongoing maintenance]",
    ],
  },
  {
    slug: "ui-ux-design",
    vertical: "build",
    title: "UI/UX Design",
    description:
      "Interfaces designed around how people actually use them, not just how they look.",
    detail:
      "[Paragraph — approach to UI/UX: research, wireframing, how feedback loops work with clients]",
    bullets: [
      "[Bullet — research and wireframing]",
      "[Bullet — visual design system]",
      "[Bullet — usability testing]",
    ],
  },
  {
    slug: "seo",
    vertical: "build",
    title: "SEO — Technical",
    description:
      "Site speed, structure, and crawlability — the foundation Grow's content builds on.",
    detail:
      "[Paragraph — approach to technical SEO: audits, Core Web Vitals, structured data, how it hands off to Grow's content SEO]",
    bullets: [
      "[Bullet — technical audits]",
      "[Bullet — site speed and Core Web Vitals]",
      "[Bullet — structured data and crawlability]",
    ],
  },
];

export const growServices: Service[] = [
  {
    slug: "marketing",
    vertical: "grow",
    title: "Marketing",
    description: "Campaign strategy and paid/organic mix that earn attention.",
    detail:
      "[Paragraph — approach to marketing: how campaigns are scoped, channels used, how success is measured]",
    bullets: [
      "[Bullet — campaign strategy]",
      "[Bullet — paid/organic mix]",
      "[Bullet — reporting and iteration]",
    ],
  },
  {
    slug: "social-media",
    vertical: "grow",
    title: "Social Media",
    description: "Content calendars and community management that build an audience.",
    detail:
      "[Paragraph — approach to social media: platforms covered, content cadence, community management]",
    bullets: [
      "[Bullet — content calendar]",
      "[Bullet — community management]",
      "[Bullet — analytics and growth]",
    ],
  },
  {
    slug: "seo",
    vertical: "grow",
    title: "SEO — Content",
    description:
      "Content strategy and organic growth — built on the technical foundation Build lays down.",
    detail:
      "[Paragraph — approach to content SEO: keyword strategy, content calendar, how it builds on Build's technical work]",
    bullets: [
      "[Bullet — content strategy]",
      "[Bullet — keyword research]",
      "[Bullet — local/organic growth]",
    ],
  },
];

export function getService(vertical: "build" | "grow", slug: string) {
  const source = vertical === "build" ? buildServices : growServices;
  return source.find((service) => service.slug === slug);
}
