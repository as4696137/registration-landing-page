/**
 * Input / Textarea / Select — neo-brutalist form controls.
 *
 * Shared style: white surface, 1px black border, no radius, hard focus shadow.
 * Pass `invalid` to surface a validation error (danger ring + tint).
 *
 * @example
 * <Input id="team" value={v} onChange={…} invalid={!!err} />
 * <Textarea id="summary" rows={5} />
 * <Select id="award"><option value="a">A</option></Select>
 */
import React from "react";
import { cn } from "../utils/cn";

const controlBase =
  "w-full border border-ink bg-surface px-4 py-3 text-base leading-normal text-ink " +
  "placeholder:text-muted transition-shadow " +
  "focus:outline-none focus:ring-2 focus:ring-brand focus:drop-shadow-hard-sm " +
  "disabled:cursor-not-allowed disabled:bg-[#f2f2f2] disabled:text-muted";

const invalidClasses = "bg-[#fff0f5] focus:ring-danger";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ invalid, className, ...rest }, ref) => (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(controlBase, invalid && invalidClasses, className)}
      {...rest}
    />
  ),
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ invalid, className, ...rest }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(controlBase, "resize-y", invalid && invalidClasses, className)}
      {...rest}
    />
  ),
);
Textarea.displayName = "Textarea";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ invalid, className, children, ...rest }, ref) => (
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        controlBase,
        // restore the native arrow that the global reset strips off
        "bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10",
        "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22black%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')]",
        invalid && invalidClasses,
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  ),
);
Select.displayName = "Select";

export default Input;
