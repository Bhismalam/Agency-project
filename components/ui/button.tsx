import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "solid" | "line" | "white" | "build" | "grow";

const variantClasses: Record<Variant, string> = {
  solid: "bg-ink text-paper border border-ink hover:bg-build hover:border-build",
  line: "bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper",
  white: "bg-paper text-ink border border-paper hover:bg-grow hover:border-grow",
  build: "bg-paper text-build border border-paper hover:bg-ink hover:text-paper hover:border-ink",
  grow: "bg-ink text-paper border border-ink hover:bg-paper hover:text-ink",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-sans text-[15px] font-semibold transition-[background-color,border-color,color,transform] duration-200 ease-out cursor-pointer hover:scale-[1.02] active:scale-[0.98]";

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
