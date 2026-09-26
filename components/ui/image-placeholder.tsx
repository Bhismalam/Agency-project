import { cn } from "@/lib/cn";

/** Stand-in for real photography/screenshots until content is shot/collected. */
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
        "flex items-end bg-alt p-4 text-[12px] font-medium text-muted",
        className,
      )}
    >
      {label}
    </div>
  );
}
