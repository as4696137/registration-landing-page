import type { MouseEvent } from "react";

export function shareToFB(url = window.location.href, content = '') {
    if (typeof url !== 'string') url = window.location.href;
    const link = 'https://www.facebook.com/share.php?u=' + encodeURIComponent(url) + (content ? `&quote=${encodeURIComponent(content)}` : '');
    window.open(link);
    return false;
}

export function shareToLine(url = window.location.href, content = '') {
    if (typeof url !== 'string') url = window.location.href;
    const link = `http://line.naver.jp/R/msg/text/?${content ? (encodeURIComponent(content) + '%0D%0A%0D%0A') : ''}${encodeURIComponent(url)}`;
    // let link = 'https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(url) + (content ? `&text=${encodeURIComponent(content)}` : '');
    window.open(link);
    return false;
}

export function shareToTwitter(url = window.location.href, content = '') {
    if (typeof url !== 'string') url = window.location.href;
    const link = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(url) + (content ? `&text=${encodeURIComponent(content)}` : '');
    window.open(link);
    return false;
}

export function shareToLinkedIn(url: string | MouseEvent, content = '') {
    if (typeof url !== 'string') url = window.location.href;
    const link = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url) + (content ? `&text=${encodeURIComponent(content)}` : '');
    window.open(link);
    return false;
}

export function shareToWeibo(url = window.location.href) {
    if (typeof url !== 'string') url = window.location.href;
    const link = `http://service.weibo.com/share/share.php?url=${url}`;
    window.open(link);
    return false;
}

export function copyLink(url = window.location.href, onComplete?: () => void) {
    if (typeof url !== 'string') url = window.location.href;
    copyToClipboard(url);
    onComplete?.();
    if (!onComplete) {
        alert('連結已複製')
    }
}

function copyToClipboard(text: string) {
    const temp = document.createElement('input');
    document.querySelector('body')?.append(temp);
    temp.value = text;
    temp.select();
    document.execCommand('copy');
    temp.remove();
}
