import { useRef, useEffect } from 'react';

/**
 * 可以讓導航列滑動時自動隱藏的 hook
 *
 * @param {Object} props
 * @param {number} props.navHeight 導航列的高度
 * @param {number} props.transitionDuration 過度動畫的時間（秒）
 * @param {Function} props.onScrollDownCallback 當使用者向下滑時，會呼叫的 callback
 *
 * @example
 * const { headerDomRef } = useHeaderScrollHandler({});
 *
 */
export function useHeaderScrollHandler(
    { navHeight, transitionDuration, onScrollDownCallback }:
    { navHeight: number; transitionDuration: number; onScrollDownCallback: () => void; }
    = {
        navHeight: 120,
        transitionDuration: 0.3,
        onScrollDownCallback: () => {}
    }
) {
    const headerDomRef = useRef<HTMLElement>(null);

    const prevScrollY = useRef(0);
    const navbarTop = useRef(0);
    const resetTimerRef = useRef<number>();

    useEffect(() => {
        function doScrollEffect(delta: number) {
            if (delta < 0) navbarTop.current = 0;
            if (delta > 0) onScrollDownCallback?.();
            headerDomRef.current?.style.setProperty('transition-duration', (delta < 0) ? `${transitionDuration}s`: '0.1s');
            headerDomRef.current?.style.setProperty('transform', `translateY(${navbarTop.current}px)`);

            prevScrollY.current = window.scrollY;
        }

        function handleWindowScroll() {
            if (!headerDomRef.current) return;

            clearTimeout(resetTimerRef.current);
            resetTimerRef.current = setTimeout(() => {
                doScrollEffect(-1)
            }, 2000);

            if (window.scrollY < 0) return;

            const scrollY = Math.max(window.scrollY, 0);
            const delta = scrollY - prevScrollY.current;
            navbarTop.current = navbarTop.current - delta;
            navbarTop.current = Math.max(navbarTop.current, -navHeight);

            doScrollEffect(delta);
        }

        window.addEventListener('scroll', handleWindowScroll);
        return () => window.removeEventListener('scroll', handleWindowScroll);
    }, [navHeight, onScrollDownCallback, transitionDuration])

    return { headerDomRef };
}
