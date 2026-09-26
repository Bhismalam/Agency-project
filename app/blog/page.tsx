import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { posts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on web development, UI/UX, and marketing from the 2gether team.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-site px-6 py-16 sm:px-8 lg:px-10 2xl:px-16 md:pt-24 md:pb-28">
      <div className="mb-14 flex flex-col gap-6">
        <h1 className="max-w-[14ch] font-display text-[clamp(2.5rem,11vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
          Latest from the blog
        </h1>
        <p className="max-w-[52ch] text-xl leading-relaxed text-muted">
          Notes on building websites and growing audiences, from both sides
          of the team.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
