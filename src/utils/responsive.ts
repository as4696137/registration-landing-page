import { useEffect, useState } from "react";

const breakpoints = {
    xs: 360,
    sm: 576,
    md: 768,
    lg: 1024,
    xl: 1440
}

function mediaQueryTo(breakpoint: number) {
    return `@media screen and (max-width: ${breakpoint}px)`;
}

function mediaQueryFrom(breakpoint: number) {
    return `@media screen and (min-width: ${breakpoint + 1}px)`;
}

const respondTo = {
    xs: mediaQueryTo(breakpoints.xs),
    sm: mediaQueryTo(breakpoints.sm),
    md: mediaQueryTo(breakpoints.md),
    lg: mediaQueryTo(breakpoints.lg),
    xl: mediaQueryTo(breakpoints.xl),
}

const respondFrom = {
    xs: mediaQueryFrom(breakpoints.xs),
    sm: mediaQueryFrom(breakpoints.sm),
    md: mediaQueryFrom(breakpoints.md),
    lg: mediaQueryFrom(breakpoints.lg),
    xl: mediaQueryFrom(breakpoints.xl),
}

function isMobile() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIPadOS = navigator?.maxTouchPoints > 2 && /Intel Mac/.test(navigator.userAgent);
    return isMobile || isIPadOS;
}

const useMediaSelectTo = (breakpoint: number) => {
    const [ matched, setMatched ] = useState(false);

    useEffect(() => {
        function handler(x: MediaQueryList | MediaQueryListEvent) {
            setMatched(x.matches);
        }
        const x = window.matchMedia(`(max-width: ${breakpoint}px)`)
        handler(x);
        x.addEventListener('change', handler);

        return () => {
            x.removeEventListener('change', handler);
        }
    }, [breakpoint])

    return matched;
}

export { respondTo, respondFrom, breakpoints, isMobile, useMediaSelectTo };
