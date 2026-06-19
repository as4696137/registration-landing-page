import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  PageTransitionContext,
  type TransitionOrigin,
} from "./PageTransitionContext";
import StarPolygon from "./StarPolygon";

type StarPhase = "idle" | "expand" | "fade";
type HomePhase = "idle" | "intro" | "in" | "out";

type Box = {
  left: number;
  top: number;
  size: number;
};

interface StarOverlayState {
  phase: StarPhase;
  from: Box;
  to: Box;
  href: string;
}

interface HomeOverlayState {
  phase: HomePhase;
  href: string;
  routeState?: unknown;
}

const EXPAND_SECONDS = 0.5;
const FADE_SECONDS = 0.48;
const EXPAND_MS = EXPAND_SECONDS * 1000;
const FADE_MS = FADE_SECONDS * 1000;
const SHADOW_OFFSET = 10;
const HOME_IN_SECONDS = 0.46;
const HOME_OUT_SECONDS = 0.52;
const HOME_IN_MS = HOME_IN_SECONDS * 1000;
const HOME_OUT_MS = HOME_OUT_SECONDS * 1000;
const HOME_INTRO_HOLD_MS = 520;

const STAR_IDLE: StarOverlayState = {
  phase: "idle",
  from: { left: 0, top: 0, size: 100 },
  to: { left: 0, top: 0, size: 100 },
  href: "",
};

const HOME_IDLE: HomeOverlayState = {
  phase: "idle",
  href: "",
};

const HOME_INTRO: HomeOverlayState = {
  phase: "intro",
  href: "",
};

const expandTransition = {
  duration: EXPAND_SECONDS,
  ease: [0.7, 0, 0.86, 0],
} as const;

const fadeTransition = {
  duration: FADE_SECONDS,
  ease: "easeOut",
} as const;

const homeInTransition = {
  duration: HOME_IN_SECONDS,
  ease: [0.83, 0, 0.17, 1],
} as const;

const homeOutTransition = {
  duration: HOME_OUT_SECONDS,
  ease: [0.22, 1, 0.36, 1],
} as const;

const addOffset = (box: Box): Box => ({
  left: box.left + SHADOW_OFFSET,
  top: box.top + SHADOW_OFFSET,
  size: box.size,
});

const boxToMotion = (box: Box, rotate: number) => ({
  left: box.left,
  top: box.top,
  width: box.size,
  height: box.size,
  rotate,
});

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [starState, setStarState] = useState<StarOverlayState>(STAR_IDLE);
  const [homeState, setHomeState] = useState<HomeOverlayState>(HOME_INTRO);
  const transitioningRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const resetTransition = useCallback(() => {
    clearTimers();
    transitioningRef.current = false;
    setStarState(STAR_IDLE);
    setHomeState(HOME_IDLE);
  }, [clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  const finishStarExpand = useCallback(() => {
    setStarState((current) => {
      if (current.phase !== "expand") return current;

      navigate(current.href);
      window.scrollTo(0, 0);
      timersRef.current.push(window.setTimeout(resetTransition, FADE_MS + 120));

      return { ...current, phase: "fade" };
    });
  }, [navigate, resetTransition]);

  const navigateWithTransition = useCallback(
    (href: string, origin: TransitionOrigin) => {
      if (transitioningRef.current) return;
      transitioningRef.current = true;
      clearTimers();

      const size = origin.size ?? 100;
      const maxDistance = Math.hypot(
        Math.max(origin.x, window.innerWidth - origin.x),
        Math.max(origin.y, window.innerHeight - origin.y),
      );
      const expandedSize = Math.max(size, maxDistance * 2.45);
      const from = {
        left: origin.x - size / 2,
        top: origin.y - size / 2,
        size,
      };
      const to = {
        left: origin.x - expandedSize / 2,
        top: origin.y - expandedSize / 2,
        size: expandedSize,
      };

      setStarState({ phase: "expand", from, to, href });
      timersRef.current.push(
        window.setTimeout(finishStarExpand, EXPAND_MS + 120),
      );
    },
    [clearTimers, finishStarExpand],
  );

  const finishHomeIn = useCallback(() => {
    setHomeState((current) => {
      if (current.phase !== "in") return current;

      navigate(current.href, { state: current.routeState });
      window.scrollTo(0, 0);
      timersRef.current.push(
        window.setTimeout(resetTransition, HOME_OUT_MS + 120),
      );

      return { ...current, phase: "out" };
    });
  }, [navigate, resetTransition]);

  const finishHomeIntro = useCallback(() => {
    setHomeState((current) => {
      if (current.phase !== "intro") return current;

      timersRef.current.push(
        window.setTimeout(resetTransition, HOME_OUT_MS + 120),
      );

      return { ...current, phase: "out" };
    });
  }, [resetTransition]);

  useEffect(() => {
    if (homeState.phase !== "intro") return;

    const timer = window.setTimeout(finishHomeIntro, HOME_INTRO_HOLD_MS);

    return () => window.clearTimeout(timer);
  }, [finishHomeIntro, homeState.phase]);

  const navigateHomeWithTransition = useCallback(
    (href: string, options?: { state?: unknown }) => {
      if (transitioningRef.current) return;
      transitioningRef.current = true;
      clearTimers();

      setHomeState({ phase: "in", href, routeState: options?.state });
      timersRef.current.push(window.setTimeout(finishHomeIn, HOME_IN_MS + 120));
    },
    [clearTimers, finishHomeIn],
  );

  const isStarVisible = starState.phase !== "idle";
  const isHomeVisible = homeState.phase !== "idle";
  const isHomeEntering =
    homeState.phase === "intro" || homeState.phase === "in";
  const handleHomeAnimationComplete =
    homeState.phase === "in"
      ? finishHomeIn
      : homeState.phase === "out"
        ? resetTransition
        : undefined;
  const homeOverlayInitial =
    homeState.phase === "intro"
      ? { y: "0%", opacity: 1 }
      : { y: "-100%", opacity: 1 };
  const homeOverlayTransition =
    homeState.phase === "intro"
      ? { duration: 0 }
      : isHomeEntering
        ? homeInTransition
        : homeOutTransition;

  return (
    <PageTransitionContext.Provider
      value={{ navigateHomeWithTransition, navigateWithTransition }}
    >
      {children}
      {isStarVisible && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
        >
          {starState.phase === "expand" && (
            <>
              <motion.div
                animate={boxToMotion(addOffset(starState.to), 180)}
                className="absolute origin-center"
                initial={boxToMotion(addOffset(starState.from), 0)}
                transition={expandTransition}
              >
                <StarPolygon
                  className="h-full w-full"
                  fill="black"
                  opacity={0.25}
                  stroke="none"
                  shadow={false}
                />
              </motion.div>
              <motion.div
                animate={boxToMotion(starState.to, 180)}
                className="absolute origin-center"
                initial={boxToMotion(starState.from, 0)}
                onAnimationComplete={finishStarExpand}
                transition={expandTransition}
              >
                <StarPolygon className="h-full w-full" shadow={false} />
              </motion.div>
            </>
          )}
          {starState.phase === "fade" && (
            <motion.div
              animate={{ opacity: 0 }}
              className="absolute inset-0 bg-brand"
              initial={{ opacity: 1 }}
              onAnimationComplete={resetTransition}
              transition={fadeTransition}
            />
          )}
        </div>
      )}
      {isHomeVisible && (
        <motion.div
          aria-hidden
          animate={isHomeEntering ? { y: "0%" } : { y: "100%", opacity: 0.98 }}
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden bg-[#4af864]"
          initial={homeOverlayInitial}
          onAnimationComplete={handleHomeAnimationComplete}
          transition={homeOverlayTransition}
        >
          <div className="grid-bg-black absolute inset-0 opacity-35" />
          <motion.div
            animate={{ x: ["-25%", "0%"] }}
            className="absolute left-0 top-1/2 h-12 w-[140%] -translate-y-1/2 border-y border-black bg-brand"
            transition={homeInTransition}
          />
          <motion.div
            animate={{ rotate: 360 }}
            className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2"
            transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
          >
            <StarPolygon className="h-full w-full" shadow={false} />
          </motion.div>
        </motion.div>
      )}
    </PageTransitionContext.Provider>
  );
}
