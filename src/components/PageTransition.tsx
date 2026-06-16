import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  PageTransitionContext,
  type TransitionOrigin,
} from "./PageTransitionContext";
import StarPolygon from "./StarPolygon";

type Phase = "idle" | "ready" | "expand" | "covered" | "fade";

interface OverlayState {
  phase: Phase;
  origin: TransitionOrigin;
  size: number;
  scale: number;
}

const EXPAND_MS = 700;
const FADE_MS = 480;

const IDLE: OverlayState = {
  phase: "idle",
  origin: { x: 0, y: 0 },
  size: 100,
  scale: 1,
};

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [state, setState] = useState<OverlayState>(IDLE);
  const timersRef = useRef<number[]>([]);
  const transitioningRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const navigateWithTransition = useCallback(
    (to: string, origin: TransitionOrigin) => {
      if (transitioningRef.current) return;
      transitioningRef.current = true;
      clearTimers();

      const size = origin.size ?? 100;
      const maxDistance = Math.hypot(
        Math.max(origin.x, window.innerWidth - origin.x),
        Math.max(origin.y, window.innerHeight - origin.y),
      );
      const scale = Math.max((maxDistance * 2.45) / size, 1);

      setState({ phase: "ready", origin, size, scale });

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setState((current) =>
            current.phase === "ready" ? { ...current, phase: "expand" } : current,
          );
        });
      });

      timersRef.current.push(
        window.setTimeout(() => {
          navigate(to);
          window.scrollTo(0, 0);
          setState((current) => ({ ...current, phase: "covered" }));

          window.requestAnimationFrame(() => {
            setState((current) => ({ ...current, phase: "fade" }));
          });
        }, EXPAND_MS),
      );

      timersRef.current.push(
        window.setTimeout(() => {
          transitioningRef.current = false;
          setState(IDLE);
        }, EXPAND_MS + FADE_MS),
      );
    },
    [clearTimers, navigate],
  );

  const { phase, origin, size, scale } = state;
  const isVisible = phase !== "idle";
  const isExpanded =
    phase === "expand" || phase === "covered" || phase === "fade";
  const isFading = phase === "fade";
  const showSolidFill = phase === "covered" || phase === "fade";
  const expandedSize = size * scale;
  const currentSize = isExpanded ? expandedSize : size;
  const currentLeft = origin.x - currentSize / 2;
  const currentTop = origin.y - currentSize / 2;

  const wrapperStyle: CSSProperties = {
    opacity: isFading ? 0 : 1,
    transition: isFading ? `opacity ${FADE_MS}ms ease-out` : "none",
  };

  const starStyle: CSSProperties = {
    left: currentLeft,
    top: currentTop,
    width: currentSize,
    height: currentSize,
    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
    transition:
      phase === "ready"
        ? "none"
        : [
            `left ${EXPAND_MS}ms cubic-bezier(0.83, 0, 0.17, 1)`,
            `top ${EXPAND_MS}ms cubic-bezier(0.83, 0, 0.17, 1)`,
            `width ${EXPAND_MS}ms cubic-bezier(0.83, 0, 0.17, 1)`,
            `height ${EXPAND_MS}ms cubic-bezier(0.83, 0, 0.17, 1)`,
            `transform ${EXPAND_MS}ms cubic-bezier(0.83, 0, 0.17, 1)`,
          ].join(", "),
  };

  const shadowStyle: CSSProperties = {
    ...starStyle,
    left: currentLeft + 10,
    top: currentTop + 10,
  };

  return (
    <PageTransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      {isVisible && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
          style={wrapperStyle}
        >
          {!showSolidFill && (
            <StarPolygon
              className="absolute origin-center will-change-[left,top,width,height,transform]"
              fill="black"
              opacity={0.25}
              stroke="none"
              shadow={false}
              style={shadowStyle}
            />
          )}
          <StarPolygon
            className="absolute origin-center will-change-[left,top,width,height,transform]"
            shadow={false}
            style={starStyle}
          />
          {showSolidFill && <div className="absolute inset-0 bg-brand" />}
        </div>
      )}
    </PageTransitionContext.Provider>
  );
}
