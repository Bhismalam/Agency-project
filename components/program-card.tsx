import Link from "next/link";
import type { Program } from "@/lib/data/programs";

export function ProgramCard({ program }: { program: Program }) {
  const open = program.status === "open";

  return (
    <Link
      href={`/program/${program.slug}`}
      className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-line py-6 transition-[padding] duration-300 ease-out hover:pl-4 md:grid-cols-[2fr_1fr_auto] md:items-center md:py-8"
    >
      <span className="font-display text-2xl font-semibold tracking-[-0.025em] md:text-4xl">
        {program.title}
      </span>
      <span
        className={`col-start-2 row-start-1 text-[13px] font-semibold md:col-start-auto md:row-start-auto md:justify-self-start ${
          open ? "text-ink" : "text-muted"
        }`}
      >
        {open ? "Open" : "Closed"}
      </span>
      <span className="col-start-1 text-[15px] text-muted md:col-start-auto">
        {program.duration} · {program.location}
      </span>
      <span
        aria-hidden="true"
        className="hidden text-2xl transition-transform duration-300 group-hover:translate-x-1 md:block"
      >
        →
      </span>
    </Link>
  );
}
