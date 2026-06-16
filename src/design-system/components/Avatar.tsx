/**
 * Avatar — the circular bordered image/icon frame used for jury portraits
 * and round badges (e.g. About / InfoB sections).
 *
 * Pattern: rounded-full, 1px black border, white (or accent) fill, hard shadow.
 *
 * @example
 * <Avatar size="lg"><img src={portrait} alt="評審" /></Avatar>
 */
import React from "react";
import { cn } from "../utils/cn";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Diameter preset @default 'md' */
  size?: AvatarSize;
  /** Fill behind transparent images @default 'white' */
  fill?: "white" | "brand";
  children: React.ReactNode;
}

const sizes: Record<AvatarSize, string> = {
  sm: "h-[100px] w-[100px] p-2.5",
  md: "h-[140px] w-[140px] p-2.5",
  lg: "h-[180px] w-[180px] p-2.5",
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = "md", fill = "white", className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-ink drop-shadow-hard-md [&_img]:w-full",
        fill === "brand" ? "bg-brand" : "bg-surface",
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  ),
);

Avatar.displayName = "Avatar";

export default Avatar;
