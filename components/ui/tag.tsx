import { cn } from "@/lib/cn";

const toneClasses = {
  build: "bg-build-tint text-build",
  grow: "bg-grow-tint text-grow-ink",
} as const;

export function Tag({
  tone,
  children,
}: {
  tone: keyof typeof toneClasses;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm px-2.5 py-1 font-mono text-[11px] tracking-wide",
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  );
}
