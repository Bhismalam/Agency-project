import Link from "next/link";
import type { Service } from "@/lib/data/services";

export function ServiceCard({ service }: { service: Service }) {
  const hover = service.vertical === "build" ? "hover:bg-build hover:text-white" : "hover:bg-grow hover:text-ink";

  return (
    <Link
      href={`/${service.vertical}/${service.slug}`}
      className={`group flex min-h-[260px] flex-col justify-between border-t border-ink bg-transparent p-6 transition-colors duration-300 ease-out ${hover}`}
    >
      <div>
        <div className="mb-4 font-display text-[26px] leading-tight font-semibold tracking-[-0.02em]">
          {service.title}
        </div>
        <p className="max-w-[34ch] text-[15px] leading-relaxed opacity-75">
          {service.description}
        </p>
      </div>
      <span className="mt-8 text-[15px] font-semibold">
        Learn more <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
