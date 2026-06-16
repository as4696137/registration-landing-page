/**
 * cn — minimal className combiner.
 *
 * Joins truthy class values with a space. Dependency-free so the design
 * system stays self-contained (no clsx/tailwind-merge needed for this scale).
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
