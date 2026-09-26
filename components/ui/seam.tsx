import { cn } from "@/lib/cn";

/**
 * The duo mark — two overlapping discs, Build blue and Grow orange,
 * their overlap darkening where the two disciplines share the work.
 */
export function Seam({
  size = 22,
  className,
}: {
  tone?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size * 1.6}
      height={size}
      viewBox="0 0 32 20"
      className={cn("block", className)}
    >
      <circle cx="10" cy="10" r="10" fill="var(--color-build)" />
      <circle cx="22" cy="10" r="10" fill="var(--color-grow)" style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
}
