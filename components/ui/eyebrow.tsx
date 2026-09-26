import { cn } from "@/lib/cn";

/** Small inline label for data fields (contact details, meta) — not a section kicker. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-2 text-[13px] font-medium text-muted", className)}>
      {children}
    </div>
  );
}
