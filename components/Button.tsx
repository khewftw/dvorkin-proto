import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const variants = {
  red: "bg-red text-white hover:bg-red-dark",
  outline:
    "border border-white bg-transparent text-white hover:bg-white hover:text-ink",
  outlineDark:
    "border border-text bg-transparent text-text hover:bg-text hover:text-paper",
  inverted: "bg-white text-red hover:bg-surface",
} as const;

type Variant = keyof typeof variants;

const sizes = {
  md: "px-7 py-3.5 text-[16px] sm:px-9 sm:py-4 sm:text-[18px]",
  lg: "px-10 py-4 text-[18px] sm:px-12 sm:py-5 sm:text-[22px]",
} as const;

type Size = keyof typeof sizes;

const base =
  "inline-flex max-w-full items-center justify-center rounded-none text-center font-display font-semibold uppercase tracking-[0.06em] transition-colors duration-200";

type ButtonAsButton = ComponentPropsWithoutRef<"button"> & {
  href?: undefined;
  variant?: Variant;
  size?: Size;
};

type ButtonAsLink = ComponentPropsWithoutRef<"a"> & {
  href: string;
  variant?: Variant;
  size?: Size;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "red", size = "md", className, children, ...rest } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
