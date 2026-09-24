import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArticleCard } from "@/components/article-card";
import { posts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on web development, UI/UX, and marketing from the 2gether team.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 md:py-20">
      <div className="mx-auto mb-12 flex max-w-[640px] flex-col items-center gap-4 text-center">
        <Eyebrow>Insights</Eyebrow>
        <h1 className="font-display text-3xl font-semibold sm:text-[40px]">
          Latest from the blog
        </h1>
        <p className="max-w-[480px] text-base leading-relaxed text-muted">
          Notes on building websites and growing audiences, from both sides
          of the team.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
