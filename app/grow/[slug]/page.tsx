import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { growServices, getService } from "@/lib/data/services";

export function generateStaticParams() {
  return growServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService("grow", slug);
  if (!service) return {};
  return { title: service.title, description: service.description };
}

export default async function GrowServicePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const service = getService("grow", slug);
  if (!service) notFound();

  return (
    <>
      <div className="mx-auto max-w-site px-6 pt-5 sm:px-8 lg:px-10 2xl:px-16">
        <Link href="/grow" className="font-sans text-[13px] text-muted hover:text-ink">
          ← Back to Grow
        </Link>
      </div>

      <section className="mx-auto max-w-site px-6 py-10 sm:px-8 lg:px-10 2xl:px-16 md:py-14">
        <h1 className="mb-4 max-w-[640px] font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
          {service.title}
        </h1>
        <p className="mb-8 max-w-[52ch] text-xl leading-relaxed text-muted">
          {service.description}
        </p>
        <Button href="/contact" variant="solid">
          Book a Consultation
        </Button>
      </section>

      <section className="bg-alt px-6 py-20 sm:px-8 lg:px-10 2xl:px-16 md:py-24">
        <div className="mx-auto max-w-inner">
          <p className="mb-10 max-w-[60ch] text-xl leading-relaxed text-muted">
            {service.detail}
          </p>
          <ul className="border-t border-ink">
            {service.bullets.map((bullet, i) => (
              <li
                key={bullet}
                className="grid grid-cols-[3rem_1fr] border-b border-line py-5 text-lg leading-relaxed"
              >
                <span className="font-display font-semibold tabular-nums text-grow-ink">0{i + 1}</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        heading={`Need ${service.title.toLowerCase()}? Let's talk about your project.`}
        secondaryLabel="See all Grow services →"
        secondaryHref="/grow"
      />
    </>
  );
}
