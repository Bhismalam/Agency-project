import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "solid" | "line" | "white";

const variantClasses: Record<Variant, string> = {
  solid: "bg-ink text-white border border-ink hover:bg-slate-800",
  line: "bg-transparent text-ink border border-ink hover:bg-ink hover:text-white",
  white:
    "bg-transparent text-white border border-white/50 hover:border-white",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[3px] px-7 py-3.5 font-sans text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 ease-out cursor-pointer hover:scale-[1.03] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-build";

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
} & (
  | ({ href: string } & Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      "className" | "href"
    >)
  | ({ href?: undefined } & Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "className"
    >)
);

export function Button({
  children,
  variant = "solid",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variantClasses[variant], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
