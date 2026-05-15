# iOS Safari Fullscreen Research Report

**Project:** Creator Stage Frontend (Live Yoga Streaming)
**Date:** 2026-05-14
**Scope:** Fullscreen workaround implementations and PWA strategy for iOS Safari

---

## Goal

Deliver an immersive, landscape viewing experience for audience members. Ideally, the toolbar should be hidden; however, research and testing confirm that **iOS Safari (iPhone) prevents hiding the browser chrome** while maintaining a custom interactive UI (like chat overlays).

**Target behavior:**
- User enters the stage.
- Layout switches to landscape.
- Video and Chat fill the screen.
- Browser chrome (address bar/toolbar) is minimized or hidden.

**Platform reality:**
| Platform | Fullscreen API | Orientation Lock | Status |
|---|---|---|---|
| Desktop | Supported | N/A | Perfect |
| Android | Supported | Supported | Perfect |
| iOS Safari (iPhone) | **Unsupported** | **Unsupported** | **Persistent UI** |

> [!IMPORTANT]
> iOS Safari does **not** implement the Fullscreen API (`Element.requestFullscreen()`) for arbitrary elements. It only supports `webkitEnterFullscreen()` on `<video>` elements. `screen.orientation.lock()` is also unsupported. Every approach below is a workaround for this gap.

---

## Approach 1: FullscreenPOC -- Video Shell + React Portal

**File:** [FullscreenPOC.jsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/join/_components/FullscreenPOC.jsx)
**Route:** `/join` (currently active on the join page)

### Mechanism

1. **On mount**, creates an invisible `<video>` element (the "video shell") using `canvas.captureStream()` as its source.
2. Video is styled `opacity: 0.01`, `position: fixed`, covering the viewport.
3. **On button tap**, calls `video.webkitEnterFullscreen()` directly.
4. Listens for `webkitbeginfullscreen` event -> appends a portal root `<div>` to `document.body` -> uses `createPortal()` to render the actual app UI.

### iOS Safari Behavior

| Aspect | Result |
|---|---|
| Toolbar hidden | **No** -- Calling `webkitEnterFullscreen` on a video shell does not hide the browser's global toolbar; it only fullscreens the video element itself. |
| Custom UI visible | **Yes** -- Because the video shell is transparent/hidden, we can portal UI over it, but the browser chrome remains visible above/below. |
| Landscape lock | **No** -- User must manually rotate. |
| Verdict | **Failed Goal** -- This is essentially a "Pseudo-FS" with extra complexity. It doesn't achieve chrome-less viewing. |

---

## Approach 2: Pseudo-FS -- CSS Immersive Layout

**File:** [pseudo-fs/page.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/pseudo-fs/page.tsx)
**Route:** `/pseudo-fs`

### Mechanism

1. Listens to `orientationchange` and `resize` events.
2. When landscape detected, toggles to `immersive-wrapper` CSS class.
3. Uses `position: fixed; inset: 0; width: 100vw; height: 100dvh; z-index: 9999`.
4. Applies `window.scrollTo(0, 1)` trick to attempt toolbar minimization.

### iOS Safari Behavior

| Aspect | Result |
|---|---|
| Toolbar hidden | **Partially** -- `scrollTo(0,1)` may minimize toolbar to compact mode, but does NOT fully hide it. |
| Landscape lock | **No** |
| Custom UI visible | **Yes** -- standard DOM, no portal tricks needed |
| `100dvh` accuracy | **Good** -- accounts for dynamic toolbar height. |

---

## Approach 3: Sessions -- Video Element Fullscreen

**File:** [sessions/page.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/sessions/page.tsx)
**Route:** `/sessions`

### Mechanism

1. Renders a standard `<video>` element with native controls.
2. Calls `video.webkitEnterFullscreen()` directly.

> [!NOTE]
> **What about `webkitSetPresentationMode`?**
> This API is the modern successor to `webkitEnterFullscreen`. While it adds support for Picture-in-Picture (PiP), its "fullscreen" mode on iPhone behaves identically: it triggers the modal native player and hides all custom DOM overlays. It does not solve the toolbar-with-UI problem.

### iOS Safari Behavior

| Aspect | Result |
|---|---|
| Toolbar hidden | **Yes** -- native video fullscreen hides all chrome. |
| Custom UI visible | **No** -- **Crucial Limitation:** Custom HTML/React components (Chat, buttons, overlays) are **completely hidden**. The iOS native player takes over the entire screen on a system level, rendering all browser-based UI invisible until the user exits. |
| Content type | Only works with `<video>` src, not YouTube iframe. |

---

## Approach 4: The PWA Method (Add to Home Screen)

This is the only method that achieves **all** goals on iOS: hidden toolbar, custom UI, and (optionally) orientation control.

### Mechanism
1. **App Manifest:** The app must provide a `manifest.json` with `"display": "standalone"`.
2. **Metadata:** Add `<meta name="apple-mobile-web-app-capable" content="yes">` to the HTML head.
3. **User Action:** The user must tap the **Share** icon in Safari -> scroll down -> tap **"Add to Home Screen"**.
4. **Execution:** Once launched from the Home Screen, the app runs in its own window context without Safari's address bar or bottom toolbar.

### iOS Behavior
| Aspect | Result |
|---|---|
| Toolbar hidden | **Yes** -- The browser UI is entirely removed. |
| Custom UI visible | **Yes** -- Standard DOM rendering, no portal/video hacks needed. |
| Landscape lock | **Yes** -- Standalone apps have better support for orientation APIs or CSS rotation. |

### Pros & Cons
- **Pros:** True immersive experience; feels like a native app; no hacks required.
- **Cons:** **Extreme User Friction**. Requires 3-4 manual steps. Most users will not do this for a temporary join link.

---

## Final Verdict & Recommendation

Testing confirms that **no workaround can programmatically hide the Safari toolbar on iPhone** while keeping your custom React UI (Chat, Badges, Controls) visible.

### The "Wall"
- If you use `webkitEnterFullscreen` (Sessions/POC), you hide the toolbar but **lose the UI** (native player takes over).
- If you use `position: fixed` (Pseudo-FS/Hook), you **keep the UI** but the **toolbar stays**.

### Recommended Strategy
1. **Standardize on Pseudo-Fullscreen:** Use the `use-fullscreen` hook (fixed overlay + `100dvh`). It is the most stable way to provide a landscape layout that includes chat.
2. **Optimize for `100dvh`:** Ensure all layouts use `dvh` units so content isn't cut off when the toolbar is present.
3. **PWA Promotion:** If "no toolbar" is a hard requirement, prompt users to **"Add to Home Screen"**. 

---

## Files Reference
| File | Approach | Status |
|---|---|---|
| [FullscreenPOC.jsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/join/_components/FullscreenPOC.jsx) | Video Shell + Portal | **Fails to hide toolbar** |
| [pseudo-fs/page.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/pseudo-fs/page.tsx) | CSS Layout | **Keeps UI, Toolbar remains** |
| [sessions/page.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/sessions/page.tsx) | Native Video | **Hides toolbar, UI vanishes** |
| [use-fullscreen.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/hooks/use-fullscreen.tsx) | Fixed Overlay | **Best compromise (UI stays)** |
