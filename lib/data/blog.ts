export type Post = {
  slug: string;
  title: string;
  vertical: "build" | "grow";
  date: string;
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "post-one",
    title: "[Article title]",
    vertical: "build",
    date: "[Date]",
    excerpt: "[1-2 sentence excerpt for the listing page]",
    body: [
      "[Paragraph one placeholder.]",
      "[Paragraph two placeholder.]",
      "[Paragraph three placeholder.]",
    ],
  },
  {
    slug: "post-two",
    title: "[Article title]",
    vertical: "grow",
    date: "[Date]",
    excerpt: "[1-2 sentence excerpt for the listing page]",
    body: [
      "[Paragraph one placeholder.]",
      "[Paragraph two placeholder.]",
      "[Paragraph three placeholder.]",
    ],
  },
  {
    slug: "post-three",
    title: "[Article title]",
    vertical: "grow",
    date: "[Date]",
    excerpt: "[1-2 sentence excerpt for the listing page]",
    body: [
      "[Paragraph one placeholder.]",
      "[Paragraph two placeholder.]",
      "[Paragraph three placeholder.]",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
