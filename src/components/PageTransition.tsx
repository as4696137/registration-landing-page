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
const HOME_INTRO_HOLD_MS = 1450;

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

const introContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
} as const;

const introPopVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const;

const introSlideLeftVariants = {
  hidden: {
    opacity: 0,
    x: -56,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const;

const introSlideRightVariants = {
  hidden: {
    opacity: 0,
    x: 56,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
    },
  },
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
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden bg-section-blue"
          initial={homeOverlayInitial}
          onAnimationComplete={handleHomeAnimationComplete}
          transition={homeOverlayTransition}
        >
          <div className="grid-bg-black absolute inset-0 opacity-50" />
          <motion.div
            animate={{ rotate: 360 }}
            className="absolute -left-32 -top-36 h-[430px] w-[430px] opacity-35 max-[768px]:h-[260px] max-[768px]:w-[260px]"
            transition={{ duration: 16, ease: "linear", repeat: Infinity }}
          >
            <StarPolygon
              className="h-full w-full"
              fill="#92f590"
              opacity={0.7}
              shadow={false}
              stroke="none"
            />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            className="absolute -bottom-40 -right-28 h-[520px] w-[520px] opacity-30 max-[768px]:h-[300px] max-[768px]:w-[300px]"
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            <StarPolygon
              className="h-full w-full"
              fill="#ffff41"
              opacity={0.8}
              shadow={false}
              stroke="none"
            />
          </motion.div>

          <motion.div
            animate="show"
            className="relative z-10 mx-auto flex min-h-full w-full max-w-[1180px] items-center px-10 py-16 max-[768px]:px-5"
            initial="hidden"
            variants={introContainerVariants}
          >
            <div className="relative grid w-full grid-cols-[1fr_420px] items-center gap-10 max-[1024px]:grid-cols-1 max-[768px]:gap-7">
              <motion.div
                className="relative z-10 flex flex-col items-start"
                variants={introContainerVariants}
              >
                <motion.div
                  className="mb-5 border border-black bg-brand px-5 py-2 text-xl font-bold leading-[160%] text-ink shadow-hard-md max-[768px]:text-base"
                  variants={introSlideLeftVariants}
                >
                  新聞要真，也要迷人
                </motion.div>

                <motion.h1
                  className="title-shadow-lg stroke-black font-display text-[92px] leading-[110%] text-white max-[1024px]:text-[72px] max-[768px]:text-[44px]"
                  variants={introPopVariants}
                >
                  初聲
                  <br />
                  新聞獎
                </motion.h1>

                <motion.div
                  className="mt-8 flex flex-wrap gap-3 max-[768px]:mt-5"
                  variants={introContainerVariants}
                >
                  {["報名系統", "作品交件", "好新聞定義 2.0"].map((label) => (
                    <motion.span
                      className="border border-black bg-white px-4 py-2 text-lg font-bold leading-none text-ink shadow-hard-sm max-[768px]:text-sm"
                      key={label}
                      variants={introPopVariants}
                    >
                      {label}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className="relative z-10 min-h-[360px] max-[1024px]:min-h-[220px] max-[768px]:min-h-[170px]"
                variants={introContainerVariants}
              >
                <motion.div
                  className="absolute right-8 top-0 h-[132px] w-[300px] border border-black bg-brand shadow-hard-md max-[1024px]:right-auto max-[1024px]:left-[32%] max-[768px]:left-[22%] max-[768px]:h-[92px] max-[768px]:w-[210px]"
                  variants={introSlideRightVariants}
                />
                <motion.div
                  className="absolute right-0 top-[92px] h-0 w-0 border-l-[48px] border-t-[44px] border-l-transparent border-t-brand max-[1024px]:right-auto max-[1024px]:left-[58%] max-[768px]:left-[62%] max-[768px]:top-[66px] max-[768px]:border-l-[34px] max-[768px]:border-t-[30px]"
                  variants={introPopVariants}
                />
                <motion.div
                  className="absolute left-2 top-[112px] h-[112px] w-[280px] border border-black bg-[#4af864] shadow-hard-md max-[1024px]:top-[92px] max-[768px]:top-[82px] max-[768px]:h-[78px] max-[768px]:w-[200px]"
                  variants={introSlideLeftVariants}
                />
                <motion.div
                  className="absolute left-[-26px] top-[96px] h-0 w-0 border-r-[40px] border-t-[34px] border-r-[#4af864] border-t-transparent max-[768px]:left-[-12px] max-[768px]:top-[72px] max-[768px]:border-r-[28px] max-[768px]:border-t-[24px]"
                  variants={introPopVariants}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  className="absolute bottom-2 right-28 h-[122px] w-[122px] max-[768px]:bottom-0 max-[768px]:right-16 max-[768px]:h-[78px] max-[768px]:w-[78px]"
                  transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
                  variants={introPopVariants}
                >
                  <StarPolygon className="h-full w-full" shadow={false} />
                </motion.div>
                <motion.div
                  className="absolute bottom-20 right-4 h-8 w-8 rotate-45 border border-black bg-white shadow-hard-sm max-[768px]:bottom-16 max-[768px]:right-1"
                  variants={introPopVariants}
                />
                <motion.div
                  className="absolute bottom-1 left-16 h-5 w-5 rotate-45 border border-black bg-white shadow-hard-sm max-[768px]:left-8"
                  variants={introPopVariants}
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            animate={{ x: ["-16%", "0%"] }}
            className="absolute bottom-0 left-0 z-20 flex w-[140%] border-y border-black bg-black py-3"
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            className="absolute bottom-0 left-0 z-30 flex whitespace-nowrap py-3 text-base font-bold tracking-[0.2rem] text-[#4af864] max-[768px]:text-sm"
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            <span>
              【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】
            </span>
            <span>
              【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】
            </span>
          </motion.div>
        </motion.div>
      )}
    </PageTransitionContext.Provider>
  );
}
