import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { CTASection } from "@/components/ui/cta-section";
import { team, teamPhoto } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "About",
  description: "Two people, one agency — the story behind 2gether.",
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-site px-6 pt-16 pb-20 sm:px-8 lg:px-10 2xl:px-16 md:pt-24 md:pb-28">
        <h1 className="max-w-[12ch] font-display text-[clamp(2.5rem,11vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
          Two people, one agency
        </h1>
        <p className="mt-10 max-w-[52ch] text-xl leading-relaxed text-muted">
          Developer dan marketer dalam satu tim. Website yang kami bangun sudah
          dipikirkan cara memasarkannya sejak awal.
        </p>
      </section>

      <section className="bg-alt px-6 py-20 sm:px-8 lg:px-10 2xl:px-16 md:py-28">
        <div className="mx-auto grid max-w-inner items-center gap-12 md:grid-cols-2 md:gap-20">
          {teamPhoto ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-line">
              <Image
                src={teamPhoto}
                alt={team.map((member) => member.name).join(" dan ")}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <ImagePlaceholder
              label="[Image — the two of you, candid]"
              className="aspect-[4/3] w-full bg-line"
            />
          )}
          <p className="max-w-[46ch] text-lg leading-relaxed text-muted">
            [Paragraph — how you met/decided to team up, why dev + marketing
            together makes sense, what you believe about how agencies
            should work]
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 pt-24 pb-12 sm:px-8 lg:px-10 2xl:px-16 md:pt-32">
        <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em]">
          Our team
        </h2>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2">
        {team.map((member) => {
          const build = member.vertical === "build";
          return (
            <Link
              key={member.slug}
              href={`/about/${member.slug}`}
              className={`group flex flex-col ${build ? "bg-build text-white" : "bg-grow text-ink"}`}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-alt md:aspect-[4/3]">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                ) : (
                  <ImagePlaceholder label={`[Foto — ${member.name}]`} className="h-full w-full" />
                )}
              </div>
              <div
                className={`flex min-h-[360px] flex-1 flex-col justify-between gap-10 ${
                  build ? "py-6 pr-6 pl-site sm:py-10 sm:pr-10" : "py-6 pl-6 pr-site sm:py-10 sm:pl-10"
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="text-[15px] font-semibold opacity-80">{build ? "Build" : "Grow"}</div>
                  <span aria-hidden="true" className="text-3xl transition-transform duration-300 group-hover:translate-x-2">→</span>
                </div>
                <div>
                  <div className="mb-3 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1] font-semibold tracking-[-0.035em]">
                    {member.name}
                  </div>
                  <div className="mb-5 text-lg font-medium opacity-90">{member.role}</div>
                  <p className="mb-6 max-w-[40ch] text-[15px] leading-relaxed opacity-80">{member.tagline}</p>
                  <ul className="flex flex-wrap gap-2">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <li
                        key={`${skill}-${index}`}
                        className="rounded-full border border-current/30 px-3 py-1 text-[12px] font-semibold"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="mx-auto max-w-site px-6 py-24 sm:px-8 lg:px-10 2xl:px-16 md:py-32">
        <h2 className="mb-12 max-w-[18ch] font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em]">
          What you get with two specialists, one team
        </h2>
        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Direct communication", "No account manager in between — you talk to the people doing the work."],
            ["No handoff friction", "One team sees the whole project, from build to growth."],
            ["Shared accountability", "Nobody points fingers at “the other vendor” — it’s just us."],
          ].map(([t, d]) => (
            <div key={t} className="border-t border-ink py-6">
              <div className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em]">{t}</div>
              <p className="max-w-[34ch] text-[15px] leading-relaxed text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection heading="Want to work with both of us?" />
    </>
  );
}
