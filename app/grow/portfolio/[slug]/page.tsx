import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      <div className="mx-auto max-w-site px-6 pt-5 sm:px-8 lg:px-10 2xl:px-16">
        <Link href="/grow/portfolio" className="font-sans text-[13px] text-muted hover:text-ink">
          ← Back to Grow portfolio
        </Link>
      </div>

      <section className="mx-auto max-w-site px-6 py-10 sm:px-8 lg:px-10 2xl:px-16">
        <h1 className="mb-3 font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
          {project.name}
        </h1>
        <p className="mb-6 max-w-[52ch] text-xl leading-relaxed text-muted">
          {project.summary}
        </p>
        <Tag tone="grow">{project.tag}</Tag>
      </section>

      <div className="mx-auto max-w-site px-6 sm:px-8 lg:px-10 2xl:px-16">
        <ImagePlaceholder label="[Campaign hero image]" className="aspect-[16/9] w-full" />
      </div>

      <section className="mx-auto grid max-w-site grid-cols-1 gap-10 px-6 py-20 sm:px-8 lg:px-10 2xl:px-16 md:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-lg leading-relaxed text-muted">
            {project.description}
          </p>
        </div>
        <div className="border-t border-ink pt-5">
          <p className="text-lg leading-relaxed">{project.result}</p>
        </div>
      </section>

      <CTASection heading="Want a campaign like this for your brand?" />
    </>
  );
}
