/**
 * Tag — the fluorescent label block used across the contest sections
 * (e.g. award names in InfoA_section).
 *
 * Pattern: 1px black border, neon fill, bold body text, hard offset shadow.
 *
 * @example
 * <Tag color="teal">最佳新聞受眾洞察獎</Tag>
 */
import React from "react";
import { cn } from "../utils/cn";

export type TagColor = "yellow" | "teal" | "pink";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Fluorescent fill color @default 'yellow' */
  color?: TagColor;
  children: React.ReactNode;
}

const fills: Record<TagColor, string> = {
  yellow: "bg-tag-yellow",
  teal: "bg-tag-teal",
  pink: "bg-tag-pink",
};

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ color = "yellow", className, children, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-block w-fit border border-ink px-4 py-2 text-2xl font-bold leading-[160%] text-ink drop-shadow-hard-md",
        fills[color],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  ),
);

Tag.displayName = "Tag";

export default Tag;
