export function scrollTo(duration = 1, targetY = 0) {

    const nowPageYOffset = window.pageYOffset;
    const startTimestamp = (new Date()).getTime();

    const handleScrolling = () => {

        const nowTimestamp = (new Date()).getTime();
        const delta = (nowTimestamp - startTimestamp) * 0.001;
        const t = 1 - Math.min(1, delta / duration);
        const d = targetY - nowPageYOffset;

        window.scrollTo?.(0, targetY - easeInOutQuart(t) * d);

        if (delta <= duration) {
            requestAnimationFrame(handleScrolling);
        }

    }

    handleScrolling();

}

export function scrollToTop(duration = 1) {
    scrollTo(duration);
}

// 導覽列高度（桌機 84px / 平板以下 60px），捲動到 section 時需扣除避免標題被遮住
function navHeight() {
    return window.innerWidth <= 1440 ? 60 : 84;
}

/**
 * 捲動到指定 id 的 section，並扣除固定導覽列高度。
 * smooth 為 true 時使用瀏覽器原生平滑捲動；false 時立即定位（用於跨頁導回首頁、避免閃爍）。
 */
export function scrollToSection(id: string, smooth = true) {
    const el = document.getElementById(id);
    if (!el) return;
    const targetY = Math.max(0, window.scrollY + el.getBoundingClientRect().top - navHeight());
    window.scrollTo({ top: targetY, behavior: smooth ? "smooth" : "auto" });
}

/**
 * 跨頁導回首頁後立即定位到 section。
 * 因首頁圖片載入會改變版面高度，單次定位會落點錯誤，故在版面穩定前持續以立即定位校正，
 * 全程使用 instant（非平滑）以避免出現先停在頁首再跳動的閃爍。
 */
export function scrollToSectionWhenReady(id: string, maxWaitMs = 800) {
    const deadline = Date.now() + maxWaitMs;
    let prevTop = -1;
    let stableFrames = 0;

    const step = () => {
        const el = document.getElementById(id);
        if (el) {
            scrollToSection(id, false);
            const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
            if (top === prevTop) stableFrames += 1;
            else { stableFrames = 0; prevTop = top; }
        }
        // 版面連續數幀不再變動即視為穩定，否則持續校正直到逾時
        if (stableFrames < 3 && Date.now() < deadline) {
            requestAnimationFrame(step);
        }
    };

    step();
}

export function getPosition(element?: HTMLElement | null) {
    let xPosition = 0;
    let yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent as HTMLElement | null;
    }

    return { x: xPosition, y: yPosition };
}

function easeInOutQuart(pos: number) {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4);
    return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
}
