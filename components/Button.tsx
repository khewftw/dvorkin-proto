"use client";

import type { ComponentPropsWithoutRef } from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/cn";

const variants = {
  red: "border border-red bg-red text-white hover:bg-white hover:text-red",
  outline:
    "border border-white bg-transparent text-white hover:bg-white hover:text-ink",
  outlineDark:
    "border border-text bg-transparent text-text hover:bg-text hover:text-paper",
  inverted: "bg-white text-red hover:bg-surface",
  glow:
    "border border-red bg-red text-white hover:bg-red hover:text-white hover:shadow-[0_0_30px_rgba(43,103,243,0.8)]",
  invertedGlow:
    "bg-white text-red shadow-[0_0_22px_rgba(255,255,255,0.4)] hover:bg-white hover:text-red hover:shadow-[0_0_36px_rgba(255,255,255,0.75)]",
} as const;

type Variant = keyof typeof variants;

const sizes = {
  sm: "px-3 py-2.5 text-[14px] sm:px-7 sm:py-3 sm:text-[16px]",
  md: "px-7 py-3.5 text-[20px] sm:px-9 sm:py-4",
  lg: "px-10 py-4 text-[22px] sm:px-12 sm:py-5",
} as const;

type Size = keyof typeof sizes;

const base =
  "inline-flex max-w-full touch-manipulation items-center justify-center rounded-none text-center font-display font-semibold uppercase tracking-[0.06em] transition-[color,background-color,border-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red disabled:cursor-not-allowed";

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
  const reduceMotion = useReducedMotion();
  const { variant = "red", size = "md", className, children, ...rest } = props;
  const classes = cn(base, sizes[size], variants[variant], className);
  const disabled = "disabled" in rest && Boolean(rest.disabled);
  const motionProps =
    reduceMotion || disabled
      ? {}
      : {
          whileHover: { y: -3, scale: 1.015 },
          whileTap: { y: 0, scale: 0.97 },
          transition: { type: "spring" as const, stiffness: 420, damping: 24 },
        };

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest;
    return (
      <motion.a
        href={href}
        className={classes}
        {...motionProps}
        {...(anchorRest as unknown as HTMLMotionProps<"a">)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      {...motionProps}
      {...(rest as unknown as HTMLMotionProps<"button">)}
    >
      {children}
    </motion.button>
  );
}
