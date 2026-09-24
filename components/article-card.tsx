import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import type { Post } from "@/lib/data/blog";

export function ArticleCard({ post }: { post: Post }) {
  const accent = post.vertical === "build" ? "text-build" : "text-grow-ink";
  const label = post.vertical === "build" ? "Build" : "Grow";

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <ImagePlaceholder label="[Article image]" className="mb-3.5 h-[160px] w-full" />
      <div className="mb-1.5 text-[15px] font-semibold">{post.title}</div>
      <p className="mb-2 text-[13px] leading-relaxed text-muted">{post.excerpt}</p>
      <div className="font-mono text-[11px] text-muted">
        {post.date} · <span className={accent}>{label}</span>
      </div>
    </Link>
  );
}
