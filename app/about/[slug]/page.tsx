import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { CTASection } from "@/components/ui/cta-section";
import { team, getTeamMember } from "@/lib/data/team";

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const member = getTeamMember(slug);
  if (!member) return {};
  return {
    title: member.name,
    description: member.tagline,
  };
}

export default async function ProfilePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  const isBuild = member.vertical === "build";
  const accent = isBuild ? "text-build" : "text-grow-ink";
  const verticalHref = isBuild ? "/build" : "/grow";
  const verticalLabel = isBuild ? "Build" : "Grow";
  const workLabel = isBuild ? "Projects I led" : "Campaigns I led";

  return (
    <>
      <div className="mx-auto max-w-site px-6 pt-5 sm:px-8 lg:px-10 2xl:px-16">
        <Link href="/about" className="font-sans text-[13px] text-muted hover:text-ink">
          ← Back to About
        </Link>
      </div>

      <section className="mx-auto flex max-w-site flex-col items-center gap-10 px-6 py-10 sm:px-8 lg:px-10 2xl:px-16 md:flex-row md:items-center">
        {member.photo ? (
          <div className="relative h-[220px] w-[220px] flex-shrink-0 overflow-hidden rounded-full bg-alt sm:h-[280px] sm:w-[280px]">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              preload
              sizes="280px"
              className="object-cover object-top"
            />
          </div>
        ) : (
          <div
            className="h-[220px] w-[220px] flex-shrink-0 rounded-full sm:h-[280px] sm:w-[280px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, var(--color-alt) 0 2px, var(--color-card) 2px 14px)",
            }}
            aria-hidden="true"
          />
        )}
        <div className="flex-1 text-center md:text-left">
          <h1 className="mb-2 font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
            {member.name}
          </h1>
          <div className="mb-5 text-[17px] text-muted">{member.role}</div>
          <p className="mx-auto mb-6 max-w-[520px] text-[15px] leading-relaxed md:mx-0">
            {member.tagline}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <Button href="/contact" variant="solid">
              Book a Consultation
            </Button>
            <Button href={verticalHref} variant="line">
              See {verticalLabel} Services
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-alt px-6 py-14 sm:px-8 lg:px-10 2xl:px-16">
        <div className="mx-auto max-w-inner">
          <h2 className="mb-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
            Bio
          </h2>
          <p className="max-w-[760px] text-[15px] leading-relaxed text-muted">
            {member.bio}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-14 sm:px-8 lg:px-10 2xl:px-16">
        <h2 className="mb-6 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          What I work with
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {member.skills.map((skill) => (
            <Tag key={skill} tone={member.vertical}>
              {skill}
            </Tag>
          ))}
        </div>
      </section>

      <section className="bg-alt px-6 py-14 sm:px-8 lg:px-10 2xl:px-16">
        <div className="mx-auto max-w-inner">
          <h2 className="mb-7 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
            Credentials &amp; experience
          </h2>
          <div className="flex flex-col gap-5">
            {member.experience.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className={`flex flex-col justify-between gap-1 sm:flex-row sm:items-center ${
                  index < member.experience.length - 1
                    ? "border-b border-line pb-5"
                    : ""
                }`}
              >
                <div>
                  <div className="text-[15px] font-semibold">{item.title}</div>
                  <div className="text-[13px] text-muted">{item.context}</div>
                </div>
                <div className="font-sans text-[13px] text-muted">
                  {item.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-14 sm:px-8 lg:px-10 2xl:px-16">
        <h2 className="mb-7 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          {workLabel}
        </h2>
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <ImagePlaceholder label="[Project image]" className="mb-3.5 aspect-[4/3] w-full" />
            <div className="text-[15px] font-semibold">[Project name]</div>
          </div>
          <div>
            <ImagePlaceholder label="[Project image]" className="mb-3.5 aspect-[4/3] w-full" />
            <div className="text-[15px] font-semibold">[Project name]</div>
          </div>
          <div>
            <ImagePlaceholder label="[Project image]" className="mb-3.5 aspect-[4/3] w-full" />
            <div className="text-[15px] font-semibold">[Project name]</div>
          </div>
        </div>
        <Link href={verticalHref} className={`font-sans text-sm hover:underline ${accent}`}>
          View all {verticalLabel} work →
        </Link>
      </section>

      <CTASection heading="Want to work with me?" />
    </>
  );
}
