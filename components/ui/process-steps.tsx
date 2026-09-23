type Step = {
  title: string;
  description: string;
};

/**
 * Numbered steps connected by a thin seam-colored line — reads as one flow
 * rather than four disconnected islands. Used by both /build and /grow.
 */
export function ProcessSteps({
  steps,
  tone,
}: {
  steps: Step[];
  tone: "build" | "grow";
}) {
  const ringColor = tone === "build" ? "border-build text-build" : "border-grow text-grow-ink";
  const lineColor = tone === "build" ? "bg-build" : "bg-grow";

  return (
    <div className="relative grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-6">
      <div
        aria-hidden="true"
        className={`absolute top-[17px] left-[17px] right-[17px] hidden h-[2px] sm:block ${lineColor} opacity-30`}
      />
      {steps.map((step, index) => (
        <div key={step.title} className="relative z-10">
          <div
            className={`mb-3.5 flex h-[34px] w-[34px] items-center justify-center rounded-full border-[1.5px] bg-alt font-mono text-[13px] font-medium ${ringColor}`}
          >
            {index + 1}
          </div>
          <div className="mb-1.5 font-sans text-sm font-semibold">
            {step.title}
          </div>
          <div className="text-xs leading-relaxed text-muted">
            {step.description}
          </div>
        </div>
      ))}
    </div>
  );
}
