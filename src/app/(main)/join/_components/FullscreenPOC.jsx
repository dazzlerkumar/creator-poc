"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

// ─── Platform Detection ────────────────────────────────────────────────────────
function detectPlatform() {
  if (typeof navigator === "undefined") return {};
  const ua = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const isMobile = isIOS || isAndroid;
  const supportsFullscreenAPI =
    !isIOS &&
    !!(
      document.documentElement.requestFullscreen ||
      document.documentElement.webkitRequestFullscreen
    );
  return { isIOS, isAndroid, isMobile, supportsFullscreenAPI };
}

// ─── Native Fullscreen (Desktop / Android) ───────────────────────────────────
async function enterNativeFullscreen(el) {
  if (el.requestFullscreen) return el.requestFullscreen();
  if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
}
async function exitNativeFullscreen() {
  try {
    if (document.exitFullscreen && document.fullscreenElement)
      return document.exitFullscreen();
    if (document.webkitExitFullscreen && document.webkitFullscreenElement)
      return document.webkitExitFullscreen();
  } catch { }
}
function isNativeFullscreen() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement);
}
async function lockLandscape() {
  try {
    if (screen.orientation?.lock) await screen.orientation.lock("landscape");
  } catch { }
}
async function unlockOrientation() {
  try {
    if (screen.orientation?.unlock) screen.orientation.unlock();
  } catch { }
}

// ─── iOS Video Shell ──────────────────────────────────────────────────────────
// Pre-created on mount so it's warm and ready.
// webkitEnterFullscreen() MUST be called synchronously inside a user gesture
// (onClick) or an orientationchange handler — never from setTimeout/async.
function createIOSVideoShell() {
  const canvas = document.createElement("canvas");
  canvas.width = 2;
  canvas.height = 2;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 2, 2);

  const video = document.createElement("video");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.muted = true;
  video.loop = true;

  // Must stay slightly visible — iOS blocks fullscreen on opacity:0 videos
  Object.assign(video.style, {
    position: "fixed",
    top: "0", left: "0",
    width: "100vw", height: "100vh",
    objectFit: "cover",
    zIndex: "9998",
    opacity: "0.01",
    pointerEvents: "none",
    background: "#000",
  });

  try {
    video.srcObject = canvas.captureStream(1);
  } catch {
    // captureStream unavailable on very old iOS — silent fallback
    video.src = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0";
  }

  document.body.appendChild(video);
  // Start playing immediately so readyState is high by the time user taps
  video.play().catch(() => { });
  return video;
}

// ─── Hook ──────────────────────────────────────────────────────────────────────
function useFullscreenLandscape() {
  const [state, setState] = useState({
    isFullscreen: false,
    platform: null,
    iosPortalReady: false,
    // iOS-specific: is the device currently in landscape?
    isLandscape: false,
    log: [],
  });

  const videoRef = useRef(null);       // hidden iOS video shell (pre-warmed)
  const portalRootRef = useRef(null);  // div portaled above the video
  const containerRef = useRef(null);   // desktop/Android wrapper div

  const addLog = useCallback((msg) => {
    setState((s) => ({
      ...s,
      log: [`[${new Date().toLocaleTimeString()}] ${msg}`, ...s.log.slice(0, 19)],
    }));
  }, []);

  // ── Wire up portal root div (created once) ───────────────────────────────────
  const getPortalRoot = useCallback(() => {
    if (portalRootRef.current) return portalRootRef.current;
    const div = document.createElement("div");
    Object.assign(div.style, {
      position: "fixed", inset: "0",
      zIndex: "9999",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg,#0a0a0a 0%,#111827 100%)",
      color: "#fff", fontFamily: "monospace", overflow: "hidden",
    });
    portalRootRef.current = div;
    return div;
  }, []);

  // ── iOS: enter — MUST be called synchronously from a user gesture ────────────
  // This is why we pre-warm the video on mount. The shell is already playing
  // before the user taps, so webkitEnterFullscreen() runs without any await.
  const enterIOSFullscreen = useCallback(() => {
    const video = videoRef.current;
    if (!video) { addLog("iOS: video shell not ready"); return; }
    if (!video.webkitEnterFullscreen) { addLog("iOS: webkitEnterFullscreen unavailable"); return; }

    const portalRoot = getPortalRoot();

    // Register lifecycle listeners before calling webkitEnterFullscreen
    video.addEventListener("webkitbeginfullscreen", () => {
      addLog("webkitbeginfullscreen ✓ — toolbar fully hidden");
      if (!portalRoot.isConnected) document.body.appendChild(portalRoot);
      setState((s) => ({ ...s, isFullscreen: true, iosPortalReady: true }));
    }, { once: true });

    video.addEventListener("webkitendfullscreen", () => {
      addLog("webkitendfullscreen — restored");
      if (portalRoot.isConnected) document.body.removeChild(portalRoot);
      setState((s) => ({ ...s, isFullscreen: false, iosPortalReady: false }));
    }, { once: true });

    // ↓ Synchronous — called directly inside onClick / orientationchange handler
    video.webkitEnterFullscreen();
    addLog("video.webkitEnterFullscreen() called (sync, user gesture ✓)");
  }, [addLog, getPortalRoot]);

  const exitIOSFullscreen = useCallback(() => {
    try { videoRef.current?.webkitExitFullscreen?.(); } catch { }
  }, []);

  // ── Desktop / Android ────────────────────────────────────────────────────────
  const enterNative = useCallback(async () => {
    addLog("Requesting native fullscreen…");
    try {
      await enterNativeFullscreen(containerRef.current || document.documentElement);
      await lockLandscape();
      setState((s) => ({ ...s, isFullscreen: true }));
      addLog("Native fullscreen + orientation lock ✓");
    } catch (e) { addLog(`Error: ${e.message}`); }
  }, [addLog]);

  const exitNative = useCallback(async () => {
    await exitNativeFullscreen();
    await unlockOrientation();
    setState((s) => ({ ...s, isFullscreen: false }));
    addLog("Exited fullscreen");
  }, [addLog]);

  // ── Unified enter / exit ─────────────────────────────────────────────────────
  // enterFullscreen is called directly from onClick — no await before the
  // iOS branch so the call stack stays synchronous and trusted.
  const enterFullscreen = useCallback(() => {
    const platform = detectPlatform();
    setState((s) => ({ ...s, platform }));
    if (platform.isIOS) {
      enterIOSFullscreen(); // sync
    } else {
      enterNative();        // async is fine for non-iOS
    }
  }, [enterIOSFullscreen, enterNative]);

  const exitFullscreen = useCallback(() => {
    const platform = detectPlatform();
    if (platform.isIOS) exitIOSFullscreen();
    else exitNative();
  }, [exitIOSFullscreen, exitNative]);

  // ── Mount: detect platform + pre-warm iOS video shell ───────────────────────
  useEffect(() => {
    const platform = detectPlatform();
    setState((s) => ({
      ...s,
      platform,
      isLandscape: window.innerWidth > window.innerHeight,
    }));

    if (platform.isIOS) {
      // Pre-warm the shell NOW so it's playing before user taps the button.
      // This is the key: webkitEnterFullscreen needs readyState > 0.
      videoRef.current = createIOSVideoShell();
      addLog("iOS: video shell pre-warmed ✓");
    }

    // Desktop/Android: native fullscreen exit listener (Esc key etc.)
    const onFsChange = () => {
      if (!isNativeFullscreen()) {
        setState((s) => ({ ...s, isFullscreen: false }));
        addLog("Native fullscreen exited externally");
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);

    // Orientation tracking (landscape badge + auto-trigger on rotate)
    let lastLandscape = window.innerWidth > window.innerHeight;
    const onOrientationChange = () => {
      // Small sync delay for dims to settle — but we read dims, not call FS here
      setTimeout(() => {
        const isLandscape = window.innerWidth > window.innerHeight;
        if (isLandscape === lastLandscape) return;
        lastLandscape = isLandscape;
        addLog(`Rotated → ${isLandscape ? "landscape" : "portrait"}`);
        setState((s) => ({ ...s, isLandscape }));
        // NOTE: we intentionally do NOT auto-call enterFullscreen() from here.
        // On iOS the orientationchange + async path is unreliable.
        // Instead we show the button and let the user tap it (gesture trust).
        // On Android/desktop, auto-trigger is safe:
        if (isLandscape && !platform.isIOS) {
          setState((s) => {
            if (!s.isFullscreen) { setTimeout(() => enterNative(), 0); }
            return s;
          });
        }
      }, 200);
    };

    screen.orientation?.addEventListener("change", onOrientationChange);
    window.addEventListener("orientationchange", onOrientationChange);

    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
      screen.orientation?.removeEventListener("change", onOrientationChange);
      window.removeEventListener("orientationchange", onOrientationChange);
      if (isNativeFullscreen()) exitNativeFullscreen();
      unlockOrientation();
      videoRef.current?.remove();
      portalRootRef.current?.remove();
    };
  }, [addLog, enterNative]);

  return {
    ...state,
    containerRef,
    portalRootRef,
    enterFullscreen,
    exitFullscreen,
  };
}

// ─── Page Content ─────────────────────────────────────────────────────────────
function PageContent({ isFullscreen, isLandscape, platform, log, onEnter, onExit }) {
  const isIOS = platform?.isIOS;

  // On iOS, show the tap-to-fullscreen prompt when in landscape but not yet fullscreen
  const showIOSPrompt = isIOS && isLandscape && !isFullscreen;

  return (
    <div style={{
      width: "100%", height: "100%", minHeight: "100dvh",
      background: isFullscreen
        ? "linear-gradient(135deg,#0a0a0a 0%,#111827 50%,#0a0a0a 100%)"
        : "linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
      color: "#fff",
      fontFamily: "'DM Mono','Courier New',monospace",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "1.5rem", boxSizing: "border-box", gap: "1.25rem",
    }}>

      {/* Title */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "clamp(1.3rem,5vw,2.2rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "0.2rem" }}>
          {isFullscreen ? "🎬 Fullscreen Active" : "Fullscreen POC"}
        </div>
        <div style={{ fontSize: "0.7rem", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {platform
            ? isIOS ? "iOS Safari · video shell + portal"
              : platform.isAndroid ? "Android · native fullscreen"
                : "Desktop · native fullscreen"
            : "detecting…"}
        </div>
      </div>

      {/* Badges */}
      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Badge label="Platform" value={platform ? (isIOS ? "iOS" : platform.isAndroid ? "Android" : "Desktop") : "…"} color="#6366f1" />
        <Badge label="Fullscreen" value={isFullscreen ? "ON ✓" : "OFF"} color={isFullscreen ? "#22c55e" : "#64748b"} />
        <Badge label="Orientation" value={isLandscape ? "landscape" : "portrait"} color={isLandscape ? "#f59e0b" : "#64748b"} />
      </div>

      {/* ── iOS landscape prompt — user must tap to enter fullscreen ── */}
      {showIOSPrompt && (
        <div style={{
          background: "rgba(99,102,241,0.15)",
          border: "1px solid rgba(99,102,241,0.5)",
          borderRadius: 12,
          padding: "1rem 1.5rem",
          textAlign: "center",
          maxWidth: 320,
          animation: "pulse 1.5s ease-in-out infinite",
        }}>
          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.65} }`}</style>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>👆</div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>
            Tap to go fullscreen
          </div>
          <div style={{ fontSize: "0.68rem", color: "#94a3b8", lineHeight: 1.5 }}>
            iOS requires a direct tap to grant fullscreen. This button runs{" "}
            <code style={{ color: "#a5b4fc" }}>webkitEnterFullscreen()</code> synchronously
            inside your gesture.
          </div>
          <button
            onClick={onEnter}
            style={{
              ...btnStyle("#6366f1"),
              marginTop: "0.85rem",
              width: "100%",
              fontSize: "1rem",
              padding: "0.85rem",
            }}
          >
            ⛶ Enter Fullscreen
          </button>
        </div>
      )}

      {/* Normal button when not in landscape-prompt state */}
      {!showIOSPrompt && (
        <div>
          {!isFullscreen ? (
            <button onClick={onEnter} style={btnStyle("#6366f1")}>⛶ Enter Fullscreen</button>
          ) : (
            <button onClick={onExit} style={btnStyle("#ef4444")}>✕ Exit Fullscreen</button>
          )}
        </div>
      )}

      {/* Exit button inside fullscreen */}
      {isFullscreen && (
        <button onClick={onExit} style={{ ...btnStyle("#ef4444"), display: isFullscreen ? "block" : "none" }}>
          ✕ Exit Fullscreen
        </button>
      )}

      {/* Hint */}
      <p style={{ fontSize: "0.68rem", color: "#64748b", textAlign: "center", maxWidth: 340, lineHeight: 1.7, margin: 0 }}>
        {isIOS
          ? "iOS: video shell is pre-warmed on mount. Tap the button → onClick calls webkitEnterFullscreen() synchronously → trusted user gesture → toolbar hidden. No setTimeout, no await before the call."
          : "Android/Desktop: rotate to landscape → requestFullscreen() auto-triggers. Or tap the button."}
      </p>

      {/* Log */}
      <div style={{
        width: "100%", maxWidth: 460,
        background: "rgba(0,0,0,0.45)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 8,
        padding: "0.7rem 1rem",
        fontSize: "0.66rem", color: "#94a3b8",
        maxHeight: 140, overflowY: "auto",
      }}>
        <div style={{ color: "#475569", marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.57rem" }}>
          Event log
        </div>
        {log.length === 0
          ? <div style={{ color: "#334155" }}>No events yet</div>
          : log.map((l, i) => (
            <div key={i} style={{ lineHeight: 1.85, borderBottom: "1px solid rgba(255,255,255,0.03)" }}>{l}</div>
          ))}
      </div>

      {/* Callout: why the button matters */}
      <div style={{
        width: "100%", maxWidth: 460,
        background: "rgba(245,158,11,0.08)",
        border: "1px solid rgba(245,158,11,0.25)",
        borderRadius: 8,
        padding: "0.75rem 1rem",
        fontSize: "0.68rem", lineHeight: 1.7, color: "#94a3b8",
      }}>
        <span style={{ color: "#fbbf24", fontWeight: 600 }}>⚠ iOS gesture trust chain</span>
        <br />
        <code style={{ color: "#a5b4fc" }}>webkitEnterFullscreen()</code> must run synchronously inside a
        user-initiated event. Any <code>await</code> or <code>setTimeout</code> before the call breaks the
        trust chain and iOS silently ignores it. The video shell is pre-warmed on mount so the button's{" "}
        <code>onClick</code> can call it with zero async gap.
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function FullscreenPOC() {
  const {
    isFullscreen, isLandscape, platform, iosPortalReady, log,
    containerRef, portalRootRef,
    enterFullscreen, exitFullscreen,
  } = useFullscreenLandscape();

  const content = (
    <PageContent
      isFullscreen={isFullscreen}
      isLandscape={isLandscape}
      platform={platform}
      log={log}
      onEnter={enterFullscreen}
      onExit={exitFullscreen}
    />
  );

  return (
    <div ref={containerRef} style={{ minHeight: "100dvh" }}>
      {/* Desktop / Android: direct render */}
      {(!platform?.isIOS || !iosPortalReady) && content}

      {/* iOS fullscreen: portal into the video fullscreen layer */}
      {platform?.isIOS && iosPortalReady && portalRootRef.current &&
        createPortal(content, portalRootRef.current)}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Badge({ label, value, color }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      background: "rgba(255,255,255,0.05)",
      border: `1px solid ${color}44`,
      borderRadius: 8, padding: "0.45rem 0.85rem", minWidth: 84,
    }}>
      <span style={{ fontSize: "0.56rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#64748b", marginBottom: 2 }}>{label}</span>
      <span style={{ fontSize: "0.78rem", fontWeight: 600, color }}>{value}</span>
    </div>
  );
}

function btnStyle(bg) {
  return {
    background: bg, color: "#fff", border: "none",
    borderRadius: 8, padding: "0.75rem 1.5rem",
    fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
    letterSpacing: "0.02em", boxShadow: `0 4px 20px ${bg}66`,
  };
}