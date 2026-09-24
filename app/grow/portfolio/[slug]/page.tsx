import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Tag } from "@/components/ui/tag";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { CTASection } from "@/components/ui/cta-section";
import { growProjects, getProject } from "@/lib/data/portfolio";

export function generateStaticParams() {
  return growProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject("grow", slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

export default async function GrowProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const project = getProject("grow", slug);
  if (!project) notFound();

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 pt-5 sm:px-10">
        <Link href="/grow/portfolio" className="font-mono text-[13px] text-muted hover:text-ink">
          ← Back to Grow portfolio
        </Link>
      </div>

      <section className="mx-auto max-w-[1440px] px-6 py-10 sm:px-10">
        <Eyebrow className="text-grow-ink">{project.tag}</Eyebrow>
        <h1 className="mb-3 font-display text-3xl font-semibold sm:text-[40px]">
          {project.name}
        </h1>
        <p className="mb-6 max-w-[620px] text-base leading-relaxed text-muted">
          {project.summary}
        </p>
        <Tag tone="grow">{project.tag}</Tag>
      </section>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
        <ImagePlaceholder label="[Campaign hero image]" className="h-[320px] w-full sm:h-[420px]" />
      </div>

      <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 py-14 sm:px-10 md:grid-cols-[2fr_1fr]">
        <div>
          <Eyebrow>The campaign</Eyebrow>
          <p className="text-[15px] leading-relaxed text-[#334155]">
            {project.description}
          </p>
        </div>
        <div className="rounded-md border border-line bg-card p-6">
          <Eyebrow className="mb-2">Result</Eyebrow>
          <p className="text-[15px] leading-relaxed">{project.result}</p>
        </div>
      </section>

      <CTASection heading="Want a campaign like this for your brand?" />
    </>
  );
}
