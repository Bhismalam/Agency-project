import type { Metadata } from "next";
import { ProgramCard } from "@/components/program-card";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Program",
  description: "Internships and programs run by the 2gether team.",
};

export default function ProgramPage() {
  return (
    <section className="mx-auto max-w-site px-6 pt-16 pb-24 sm:px-8 lg:px-10 2xl:px-16 md:pt-24 md:pb-32">
      <div className="mb-14 flex flex-col gap-6">
        <h1 className="max-w-[14ch] font-display text-[clamp(2.5rem,11vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
          Program
        </h1>
        <p className="max-w-[52ch] text-xl leading-relaxed text-muted">
          Internships and open programs run alongside client work — a way to
          learn from the team directly.
        </p>
      </div>

      <div className="border-t border-ink">
        {programs.map((program) => (
          <ProgramCard key={program.slug} program={program} />
        ))}
      </div>
    </section>
  );
}
