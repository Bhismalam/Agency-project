import Link from "next/link";
import type { Service } from "@/lib/data/services";

export function ServiceCard({ service }: { service: Service }) {
  const accent = service.vertical === "build" ? "border-build" : "border-grow";
  const linkColor = service.vertical === "build" ? "text-build" : "text-grow-ink";

  return (
    <div className={`flex h-[200px] flex-col rounded-md border border-t-[3px] border-line bg-card p-6.5 ${accent}`}>
      <div className="mb-2.5 font-display text-[17px] font-semibold">
        {service.title}
      </div>
      <p className="flex-grow text-[13px] leading-relaxed text-muted">
        {service.description}
      </p>
      <Link
        href={`/${service.vertical}/${service.slug}`}
        className={`font-mono text-xs uppercase tracking-wide ${linkColor} hover:underline`}
      >
        Learn more →
      </Link>
    </div>
  );
}
