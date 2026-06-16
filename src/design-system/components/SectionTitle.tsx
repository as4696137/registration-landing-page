/**
 * SectionTitle — the big Dela Gothic One display heading with layered hard
 * drop-shadow and black text stroke (e.g. "賽事説明" in InfoA_section).
 *
 * Relies on the `title-shadow-*` and `stroke-black` utilities defined in
 * src/tailwind.css.
 *
 * @example
 * <SectionTitle color="brand">賽事説明</SectionTitle>
 * <SectionTitle as="h3" size="md" color="white">創新三大獎項</SectionTitle>
 */
import React from "react";
import { cn } from "../utils/cn";

export type TitleSize = "sm" | "md" | "lg";
export type TitleColor = "brand" | "white" | "ink";

export interface SectionTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level @default 'h2' */
  as?: "h1" | "h2" | "h3";
  /** Display size @default 'lg' */
  size?: TitleSize;
  /** Fill color (always with black stroke + hard shadow) @default 'brand' */
  color?: TitleColor;
  children: React.ReactNode;
}

const sizes: Record<TitleSize, string> = {
  sm: "text-display-sm title-shadow-sm",
  md: "text-5xl max-[1440px]:text-display-sm title-shadow-md",
  lg: "text-display-lg title-shadow-lg",
};

const colors: Record<TitleColor, string> = {
  brand: "text-brand",
  white: "text-white",
  ink: "text-ink",
};

export const SectionTitle = ({
  as: Tag = "h2",
  size = "lg",
  color = "brand",
  className,
  children,
  ...rest
}: SectionTitleProps) => (
  <Tag
    className={cn(
      "stroke-black font-display leading-[120%]",
      sizes[size],
      colors[color],
      className,
    )}
    {...rest}
  >
    {children}
  </Tag>
);

SectionTitle.displayName = "SectionTitle";

export default SectionTitle;
