/**
 * Card — the white bordered content box used for award descriptions and
 * info panels (e.g. the white blocks in InfoA_section).
 *
 * Pattern: white surface, 1px black border, 160% line-height, hard shadow.
 *
 * @example
 * <Card>
 *   <p className="mb-2 text-xl font-bold">「新聞要對誰說話？」</p>
 *   <p>找出新聞議題背後的受衆…</p>
 * </Card>
 */
import React from "react";
import { cn } from "../utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col border border-ink bg-surface px-5 py-4 leading-[160%] text-ink drop-shadow-hard-md",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  ),
);

Card.displayName = "Card";

export default Card;
