/**
 * 初聲 Contest Design System
 *
 * Atoms extracted from the existing site's neo-brutalist visual language.
 * Import from a single entry point:
 *
 *   import { Button, Card, Tag, Avatar, SectionTitle } from "@/design-system";
 */
export { Button } from "./components/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button";

export { Card } from "./components/Card";
export type { CardProps } from "./components/Card";

export { Tag } from "./components/Tag";
export type { TagProps, TagColor } from "./components/Tag";

export { Avatar } from "./components/Avatar";
export type { AvatarProps, AvatarSize } from "./components/Avatar";

export { SectionTitle } from "./components/SectionTitle";
export type {
  SectionTitleProps,
  TitleSize,
  TitleColor,
} from "./components/SectionTitle";

export { Input, Textarea, Select } from "./components/Input";
export type {
  InputProps,
  TextareaProps,
  SelectProps,
} from "./components/Input";

export { Field } from "./components/Field";
export type { FieldProps } from "./components/Field";

export { cn } from "./utils/cn";
