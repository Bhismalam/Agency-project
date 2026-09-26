type Step = {
  title: string;
  description: string;
};

/** Four stages read as one continuous rule with numbered stops. Used by /build and /grow. */
export function ProcessSteps({
  steps,
  tone,
}: {
  steps: Step[];
  tone: "build" | "grow";
}) {
  const numberColor = tone === "build" ? "text-build" : "text-grow-ink";

  return (
    <ol className="grid grid-cols-1 border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="border-b border-line py-7 sm:px-6 sm:odd:pl-0 lg:border-b-0 lg:border-r lg:first:pl-0 lg:odd:pl-6 lg:last:border-r-0"
        >
          <div className={`mb-8 font-display text-[15px] font-semibold tabular-nums ${numberColor}`}>
            0{index + 1}
          </div>
          <div className="mb-2 font-display text-xl font-semibold tracking-tight">
            {step.title}
          </div>
          <div className="max-w-[28ch] text-[15px] leading-relaxed text-muted">
            {step.description}
          </div>
        </li>
      ))}
    </ol>
  );
}
