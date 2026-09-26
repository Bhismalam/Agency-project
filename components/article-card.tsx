import Link from "next/link";
import type { Post } from "@/lib/data/blog";

export function ArticleCard({ post }: { post: Post }) {
  const accent = post.vertical === "build" ? "text-build" : "text-grow-ink";
  const label = post.vertical === "build" ? "Build" : "Grow";

  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col border-t border-ink pt-5">
      <div className={`mb-6 text-[13px] font-semibold ${accent}`}>
        {label} <span className="font-normal text-muted">· {post.date}</span>
      </div>
      <div className="mb-3 font-display text-2xl leading-tight font-semibold tracking-[-0.02em] transition-colors group-hover:text-build">
        {post.title}
      </div>
      <p className="max-w-[40ch] text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
    </Link>
  );
}
