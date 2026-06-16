import { createContext, useContext } from "react";

export type TransitionOrigin = { x: number; y: number; size?: number };

export interface PageTransitionValue {
  navigateWithTransition: (to: string, origin: TransitionOrigin) => void;
}

export const PageTransitionContext =
  createContext<PageTransitionValue | null>(null);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransition 必須在 PageTransitionProvider 內使用",
    );
  }
  return ctx;
}
