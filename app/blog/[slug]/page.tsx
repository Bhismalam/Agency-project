import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      <div className="mx-auto max-w-[720px] px-6 pt-5 sm:px-8 lg:px-10 2xl:px-16">
        <Link href="/blog" className="font-sans text-[13px] text-muted hover:text-ink">
          ← Back to Blog
        </Link>
      </div>

      <article className="mx-auto max-w-[720px] px-6 py-10 sm:px-8 lg:px-10 2xl:px-16">
        <div className={`mb-4 text-[15px] font-semibold ${accent}`}>{label}</div>
        <h1 className="mb-3 font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
          {post.title}
        </h1>
        <div className="mb-8 font-sans text-[13px] text-muted">{post.date}</div>
        <ImagePlaceholder label="[Article hero image]" className="mb-10 aspect-[16/9] w-full" />
        <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <CTASection heading="Have a project in mind?" />
    </>
  );
}
