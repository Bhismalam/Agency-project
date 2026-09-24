import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { buildServices, getService } from "@/lib/data/services";

export function generateStaticParams() {
  return buildServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService("build", slug);
  if (!service) return {};
  return { title: service.title, description: service.description };
}

export default async function BuildServicePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const service = getService("build", slug);
  if (!service) notFound();

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 pt-5 sm:px-10">
        <Link href="/build" className="font-mono text-[13px] text-muted hover:text-ink">
          ← Back to Build
        </Link>
      </div>

      <section className="mx-auto max-w-[1440px] px-6 py-10 sm:px-10 md:py-14">
        <Eyebrow className="text-build">Build</Eyebrow>
        <h1 className="mb-4 max-w-[640px] font-display text-3xl font-semibold sm:text-[42px]">
          {service.title}
        </h1>
        <p className="mb-7 max-w-[560px] text-base leading-relaxed text-muted">
          {service.description}
        </p>
        <Button href="/contact" variant="solid">
          Book a Consultation
        </Button>
      </section>

      <section className="bg-alt px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Eyebrow>Overview</Eyebrow>
          <p className="mb-8 max-w-[720px] text-[15px] leading-relaxed text-[#334155]">
            {service.detail}
          </p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {service.bullets.map((bullet) => (
              <li
                key={bullet}
                className="rounded-md border border-line border-t-[3px] border-t-build bg-card p-5 text-[13px] leading-relaxed text-muted"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        heading={`Need ${service.title.toLowerCase()}? Let's talk about your project.`}
        secondaryLabel="See all Build services →"
        secondaryHref="/build"
      />
    </>
  );
}
