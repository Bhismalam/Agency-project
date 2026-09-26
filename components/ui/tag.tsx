import { cn } from "@/lib/cn";

const toneClasses = {
  build: "bg-build text-white",
  grow: "bg-grow text-ink",
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
        "inline-block rounded-full px-3 py-1 text-[12px] font-semibold",
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  );
}
