/**
 * Button — neo-brutalist action button consistent with the site's borders +
 * hard offset shadows. Presses "down" on active (shadow shrinks, element
 * shifts) for tactile feedback.
 *
 * The existing site uses image-based star buttons for the two primary CTAs;
 * this is the standardized text-button equivalent for the rest of the system.
 *
 * @example
 * <Button variant="primary" size="lg">點我報名</Button>
 * <Button as="a" href="/submit" variant="dark">交件專區</Button>
 */
import React from "react";
import { cn } from "../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "dark";
export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: "button";
  };

type ButtonAsAnchor = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: "a";
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const base =
  "inline-flex items-center justify-center border border-ink font-bold leading-none drop-shadow-hard-md transition-all duration-100 " +
  "hover:-translate-y-0.5 active:translate-y-1 active:drop-shadow-hard-sm " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-ink hover:bg-brand-hover",
  secondary: "bg-surface text-ink hover:bg-section-mint",
  dark: "bg-ink text-white hover:text-brand",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-base",
  md: "px-6 py-3 text-lg",
  lg: "px-8 py-4 text-xl",
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ variant = "primary", size = "md", className, children, ...rest }, ref) => {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.as === "a") {
    const { as: _as, ...anchorProps } = rest;
    void _as;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonProps } = rest;
  void _as;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...buttonProps}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
