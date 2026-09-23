import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-3.5 font-mono text-[11px] tracking-[0.14em] text-muted uppercase",
        className,
      )}
    >
      {children}
    </div>
  );
}
