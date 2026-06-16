import { useNavigate } from 'react-router-dom';

export function useLinkTo(to: string) {
    const router = useNavigate();

    function linkTo(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (to === undefined) return;
        router(to);
    }

    return { linkTo }
}

export function openLinkWithNewTab(href = '') {
    const aDom = document.createElement('a');
    aDom.href = href;
    aDom.target = '_blank';
    aDom.rel = 'noopener noreferer nofollow';
    aDom.click();
}
