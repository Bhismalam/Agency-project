import { cn } from "@/lib/cn";

/**
 * Stand-in for real photography/screenshots until content is shot/collected.
 * Styled with an intentional hatch pattern rather than a flat gray box.
 */
export function ImagePlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex items-center justify-center rounded border border-line px-4 text-center font-mono text-[11px] tracking-wide text-muted",
        className,
      )}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, var(--color-alt) 0 2px, var(--color-card) 2px 14px)",
      }}
    >
      {label}
    </div>
  );
}
