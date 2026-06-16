/**
 * Field — form field molecule: label + (required mark) + control + error/hint.
 *
 * Wires accessibility together: pass the same `htmlFor`/control `id`, and the
 * error is announced via aria-describedby on the control you render inside.
 *
 * @example
 * <Field label="團隊名稱" htmlFor="team_name" required error={errors.team_name}>
 *   <Input id="team_name" aria-describedby="team_name-error" />
 * </Field>
 */
import React from "react";
import { cn } from "../utils/cn";

export interface FieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const Field = ({
  label,
  htmlFor,
  required,
  hint,
  error,
  className,
  children,
}: FieldProps) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    <label htmlFor={htmlFor} className="text-base font-bold text-ink">
      {label}
      {required && <span className="ml-1 text-danger">*</span>}
    </label>
    {hint && <p className="text-sm leading-normal text-body">{hint}</p>}
    {children}
    {error && (
      <p
        id={htmlFor ? `${htmlFor}-error` : undefined}
        role="alert"
        className="text-sm font-bold text-danger"
      >
        {error}
      </p>
    )}
  </div>
);

Field.displayName = "Field";

export default Field;
