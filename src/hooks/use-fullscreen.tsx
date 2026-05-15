import { useEffect, useRef } from 'react';

function isIOS(): boolean {
    if (typeof navigator === 'undefined') return false;
    return (
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
}

function isAndroid(): boolean {
    if (typeof navigator === 'undefined') return false;
    return /Android/.test(navigator.userAgent);
}

export function useFullscreenLandscape() {
    const overlayRef = useRef<HTMLDivElement | null>(null);

    // --- iOS: inject a fixed fullscreen overlay to simulate fullscreen ---
    function enableIOSFullscreen() {
        if (overlayRef.current) return;

        const div = document.createElement('div');
        div.id = '__fs-overlay__';
        div.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100dvh;
      z-index: 9999;
      background: black;
      overflow: hidden;
    `;
        document.body.appendChild(div);
        overlayRef.current = div;

        // Move page content into the overlay
        const children = Array.from(document.body.children).filter(
            (el) => el.id !== '__fs-overlay__'
        );
        children.forEach((child) => div.appendChild(child));
    }

    function disableIOSFullscreen() {
        const overlay = overlayRef.current;
        if (!overlay) return;

        // Move content back
        const children = Array.from(overlay.children);
        children.forEach((child) => document.body.appendChild(child));
        overlay.remove();
        overlayRef.current = null;
    }

    // --- Standard fullscreen + orientation lock (Android/Desktop) ---
    async function enterFullscreen() {
        const el = document.documentElement;
        if (el.requestFullscreen) {
            await el.requestFullscreen();
        } else if ((el as any).webkitRequestFullscreen) {
            // Safari desktop fallback
            await (el as any).webkitRequestFullscreen();
        }
    }

    async function lockLandscape() {
        try {
            // Modern API
            if (screen.orientation && (screen.orientation as any).lock) {
                await (screen.orientation as any).lock('landscape');
            }
        } catch {
            // Not supported or not allowed — silently ignore
        }
    }

    async function handleOrientationChange() {
        const isLandscape =
            window.screen.orientation?.type?.startsWith('landscape') ||
            Math.abs(window.orientation as number) === 90;

        if (isLandscape) {
            if (isIOS()) {
                enableIOSFullscreen();
            } else {
                try {
                    await enterFullscreen();
                    await lockLandscape();
                } catch {
                    // User denied or browser blocked
                }
            }
        } else {
            if (isIOS()) {
                disableIOSFullscreen();
            }
            // For Android/desktop you can optionally exit fullscreen on portrait
            // document.exitFullscreen?.();
        }
    }

    useEffect(() => {
        const init = async () => {
            if (isIOS()) {
                // On iOS, check if already landscape on mount
                const isLandscape = Math.abs(window.orientation as number) === 90;
                if (isLandscape) enableIOSFullscreen();
            } else {
                // Desktop / Android: enter fullscreen immediately on route mount
                try {
                    await enterFullscreen();
                    await lockLandscape();
                } catch {
                    // Needs user gesture — handled via button instead
                }
            }
        };

        init();

        // Listen for orientation changes (the xhamster trick)
        window.addEventListener('orientationchange', handleOrientationChange);
        screen.orientation?.addEventListener('change', handleOrientationChange);

        return () => {
            // Cleanup on route leave
            window.removeEventListener('orientationchange', handleOrientationChange);
            screen.orientation?.removeEventListener('change', handleOrientationChange);

            if (isIOS()) {
                disableIOSFullscreen();
            } else {
                document.exitFullscreen?.().catch(() => { });
                try {
                    (screen.orientation as any)?.unlock?.();
                } catch { }
            }
        };
    }, []);
    return { enterFullscreen, lockLandscape };
}