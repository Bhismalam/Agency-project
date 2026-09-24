import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { CTASection } from "@/components/ui/cta-section";
import { posts, getPost } from "@/lib/data/blog";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const accent = post.vertical === "build" ? "text-build" : "text-grow-ink";
  const label = post.vertical === "build" ? "Build" : "Grow";

  return (
    <>
      <div className="mx-auto max-w-[720px] px-6 pt-5 sm:px-10">
        <Link href="/blog" className="font-mono text-[13px] text-muted hover:text-ink">
          ← Back to Blog
        </Link>
      </div>

      <article className="mx-auto max-w-[720px] px-6 py-10 sm:px-10">
        <Eyebrow className={accent}>{label}</Eyebrow>
        <h1 className="mb-3 font-display text-3xl font-semibold sm:text-[38px]">
          {post.title}
        </h1>
        <div className="mb-8 font-mono text-[13px] text-muted">{post.date}</div>
        <ImagePlaceholder label="[Article hero image]" className="mb-10 h-[280px] w-full" />
        <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-[#334155]">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <CTASection heading="Have a project in mind?" />
    </>
  );
}
