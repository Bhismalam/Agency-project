import { cn } from "@/lib/cn";

/**
 * The Seam — the site's signature: a thin gradient line running Build → Grow.
 * Context-colored on vertical pages (solid build/grow), gradient elsewhere.
 */
export function Seam({
  tone = "gradient",
  className,
}: {
  tone?: "gradient" | "build" | "grow";
  className?: string;
}) {
  const background =
    tone === "gradient"
      ? "bg-gradient-to-r from-build to-grow"
      : tone === "build"
        ? "bg-build"
        : "bg-grow";

  return (
    <span
      aria-hidden="true"
      className={cn("block h-[3px] rounded-full", background, className)}
    />
  );
}
