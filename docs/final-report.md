# Creator Stage -- Fullscreen POC Final Report

**Project:** Creator Stage Frontend (Live Yoga Streaming)
**Date:** 2026-05-15
**Authors:** Engineering Team
**Scope:** YouTube Live Video + Custom Overlay + Chat Window in Fullscreen -- Cross-Platform Feasibility

---

## Executive Summary

This report documents five distinct approaches explored to achieve an immersive fullscreen experience for live yoga streaming audiences. The core challenge: rendering a **YouTube Live iframe**, a **live chat panel**, and **dynamically triggered overlays** simultaneously in fullscreen -- across iOS Safari, Android Chrome, and desktop browsers.

**Key finding:** No single approach achieves all goals on every platform. iOS Safari fundamentally restricts the Fullscreen API for non-`<video>` elements, creating an irreconcilable gap between "toolbar hidden" and "custom UI visible". Each approach represents a different trade-off along this axis.

### Platform Constraint Matrix

| Capability             | Desktop (Chrome/FF/Safari) | Android (Chrome) | iOS Safari (iPhone) |
|------------------------|:--------------------------:|:-----------------:|:-------------------:|
| `Element.requestFullscreen()` | Yes | Yes | **No** |
| `screen.orientation.lock()` | Yes | Yes | **No** |
| `video.webkitEnterFullscreen()` | N/A | N/A | Yes (video only) |
| `video.webkitSetPresentationMode()` | N/A | N/A | Yes (video only) |
| Custom DOM in native FS | Yes | Yes | **No** |
| `100dvh` support | Yes | Yes | Yes |

---

## Route Index

| # | Approach | Route | Link |
|---|----------|-------|------|
| 1 | AudienceStage (Fullscreen Hook + Fixed Overlay) | `/join` | [/join](/join) |
| 2 | Pseudo-FS (CSS Immersive Layout) | `/pseudo-fs` | [/pseudo-fs](/pseudo-fs) |
| 3 | Sessions (Native `<video>` Fullscreen) | `/sessions` | [/sessions](/sessions) |
| 4 | WebKit FS (Video Shell + React Portal + `webkitSetPresentationMode`) | `/webkit-fs` | [/webkit-fs](/webkit-fs) |
| 5 | PWA (Add to Home Screen) | N/A (manifest-based) | Requires user installation |

---

## Approach 1: AudienceStage -- Fullscreen Hook + Fixed Overlay

**Route:** `/join`
**Source Files:**
- [AudienceStage.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/join/_components/AudienceStage.tsx)
- [YouTubePlayer.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/join/_components/YouTubePlayer.tsx)
- [use-fullscreen.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/hooks/use-fullscreen.tsx)
- [triggered-dialog.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/components/triggered-dialog.tsx)

### Technical Mechanism

1. **Entry gate:** User taps a full-viewport "Enter" button (`handleEnterStage`). This satisfies the user-gesture requirement for `requestFullscreen()` and `orientation.lock()`.
2. **`useFullscreenLandscape` hook:**
   - **Desktop/Android path:** calls `document.documentElement.requestFullscreen()` then `screen.orientation.lock('landscape')`.
   - **iOS path:** injects a `position: fixed; inset: 0; height: 100dvh; z-index: 9999` overlay div (`#__fs-overlay__`), then reparents all `<body>` children into it. This creates a visual pseudo-fullscreen without any native API call.
   - Listens for `orientationchange` and `screen.orientation.change` events to auto-toggle between states.
3. **YouTube IFrame API:** Loaded via `<script>` tag injection. Player created with `playsinline: 1`, `controls: 0`, `autoplay: 1`, `mute: 1`. Custom controls (Play/Pause, Mute, Fullscreen, Chat Toggle) rendered as an overlay with `opacity-0 group-hover:opacity-100` transition.
4. **Triggered Dialog:** Simulates a server-push event (badge/reward/notification). After 5 seconds post-entry, renders a glassmorphic modal via `TriggeredDialog` component with `absolute` positioning and `z-[100]`.
5. **Chat panel:** Desktop -- 30% width sidebar. Mobile -- bottom bar with live indicator.
6. **State management:** `useUIStore` (Zustand) manages chat visibility globally.

### Platform Behavior

| Aspect | iOS Safari | Android Chrome | Desktop |
|--------|:----------:|:--------------:|:-------:|
| Toolbar hidden | **No** -- iOS ignores `requestFullscreen()` on non-video elements. The fixed overlay covers viewport but Safari chrome remains. | **Yes** -- Standard Fullscreen API works. | **Yes** |
| Orientation lock | **No** -- `screen.orientation.lock()` unsupported. User must rotate manually. | **Yes** | N/A |
| YouTube video plays | **Yes** -- `playsinline=1` keeps video inline. | **Yes** | **Yes** |
| Custom controls visible | **Yes** | **Yes** | **Yes** |
| Chat visible | **Yes** (mobile bottom bar only) | **Yes** | **Yes** |
| Triggered overlay | **Yes** -- DOM remains fully interactive. | **Yes** | **Yes** |
| Layout uses `dvh` | **Yes** -- `100dvh` accounts for dynamic toolbar. | **Yes** | **Yes** |

### Benefits

- Full DOM control maintained on all platforms
- YouTube IFrame API integration with custom controls (play, pause, mute, restart, chat toggle, fullscreen)
- `TriggeredDialog` proves server-push overlays work across all platforms
- Zustand-backed state (`isChatVisible`) enables cross-component communication
- Clean entry UX with user-gesture gating
- Automatic orientation detection and layout switching

### Cons

- iOS: browser chrome (address bar + bottom toolbar) remains visible, reducing usable viewport by ~130px
- iOS: no programmatic orientation lock -- relies on device auto-rotate
- Fixed overlay reparenting (`enableIOSFullscreen`) is fragile -- can break React hydration or event bubbling if tree structure is complex
- Chat on mobile is a bottom bar only (no full chat panel in portrait)

---

## Approach 2: Pseudo-FS -- CSS Immersive Layout

**Route:** `/pseudo-fs`
**Source Files:**
- [pseudo-fs/page.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/pseudo-fs/page.tsx)
- CSS classes in [globals.css](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/globals.css) (`.immersive-wrapper`, `.video-section`, `.chat-section`)

### Technical Mechanism

1. **Orientation detection:** Listens for `orientationchange` and `resize` events. Determines landscape via `screen.orientation.type.includes('landscape')` OR `innerWidth > innerHeight` fallback.
2. **CSS toggle:** When landscape detected, applies `.immersive-wrapper`:
   ```css
   .immersive-wrapper {
     position: fixed;
     top: 0; left: 0;
     width: 100vw;
     height: 100dvh;
     display: flex;
     background: #000;
     z-index: 9999;
   }
   ```
3. **Toolbar minimization trick:** Calls `window.scrollTo(0, 64)` after 100ms delay. On iOS Safari, scrolling the page can trigger the browser to collapse the address bar to compact mode. This is unreliable and version-dependent.
4. **Layout:** Flex row with video at `flex: 3` (75% width) and chat at `flex: 1` (25% width). YouTube embedded via raw `<iframe>` with `playsinline=1`.
5. **No JS API calls:** No `requestFullscreen()`, no `webkitEnterFullscreen()`. Purely CSS-driven.

### Platform Behavior

| Aspect | iOS Safari | Android Chrome | Desktop |
|--------|:----------:|:--------------:|:-------:|
| Toolbar hidden | **Partial** -- `scrollTo(0, 64)` may minimize to compact bar. Never fully hidden. Behavior varies across iOS versions. | **No** -- Does not trigger fullscreen. Address bar remains. | **No** -- Window chrome remains. |
| Orientation lock | **No** | **No** | N/A |
| YouTube video plays | **Yes** -- `playsinline=1` on iframe. | **Yes** | **Yes** |
| Custom UI visible | **Yes** -- standard DOM. | **Yes** | **Yes** |
| Chat visible | **Yes** -- side-by-side in landscape. | **Yes** | **Yes** |
| Triggered overlay | Not implemented in this approach. | -- | -- |
| `100dvh` accuracy | **Good** -- accounts for dynamic toolbar on iOS. | **Good** | **Good** |

### Benefits

- Simplest implementation -- no WebKit hacks, no portal tricks, no API calls
- Works identically across all browsers (just varies in how much chrome is shown)
- `100dvh` correctly sizes content around whatever toolbar state exists
- Side-by-side video + chat layout in landscape is clean
- No user-gesture requirements

### Cons

- Never achieves true fullscreen on any platform
- `scrollTo(0, 64)` trick is unreliable, version-specific, and can interfere with user scroll position
- No custom video controls -- relies on YouTube's built-in iframe controls
- No triggered overlay implementation
- Placeholder chat content only (no interactive chat)
- Raw iframe embed means no programmatic control over player state

---

## Approach 3: Sessions -- Native `<video>` Element Fullscreen

**Route:** `/sessions`
**Source Files:**
- [sessions/page.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/sessions/page.tsx)

### Technical Mechanism

1. **Standard `<video>` tag:** Renders `<video ref={videoRef} controls src="yoga.mp4" autoPlay />`.
2. **Orientation listener:** Attaches to `screen.orientation.addEventListener('change', ...)`.
3. **iOS path:** Calls `video.webkitEnterFullscreen()` when landscape detected. This triggers the **native iOS video player** -- a system-level modal that takes over the entire screen.
4. **Android/Desktop path:** Calls `document.documentElement.requestFullscreen()` -- fullscreens the entire page.
5. **No iframe, no YouTube:** Uses a direct video `src` only.

### Platform Behavior

| Aspect | iOS Safari | Android Chrome | Desktop |
|--------|:----------:|:--------------:|:-------:|
| Toolbar hidden | **Yes** -- native video player hides all browser chrome. | **Yes** -- standard Fullscreen API. | **Yes** |
| Custom UI visible | **No** -- the native iOS video player is a system-level overlay. All DOM elements (chat, buttons, overlays) are completely invisible. User sees only the native video controls (play, scrub, AirPlay, PiP, close). | **Yes** -- fullscreen applies to `documentElement`. | **Yes** |
| Chat visible | **No** | Only if rendered in DOM (not implemented). | Only if rendered in DOM (not implemented). |
| YouTube compatible | **No** -- uses `<video src>` not iframe. YouTube Live cannot be played via `<video>` tag directly (requires iframe or HLS). | **No** | **No** |
| Orientation lock | **No** (iOS ignores) | Possible via `screen.orientation.lock()` | N/A |

### Benefits

- Only approach that fully hides iOS Safari toolbar
- Native video player provides familiar iOS playback controls
- Simplest code path -- ~50 lines total

### Cons

- **Fundamentally incompatible with the use case:** Custom UI (chat, overlays, badges) is invisible during native fullscreen
- **Cannot play YouTube Live streams** -- `<video src>` does not support YouTube URLs. Would require an HLS/DASH manifest URL from YouTube, which is not publicly available for live streams
- No chat, no overlay, no custom controls -- defeats the purpose of the POC
- User must manually exit native fullscreen to see any web content

---

## Approach 4: WebKit FS -- Video Shell + React Portal + `webkitSetPresentationMode`

**Route:** `/webkit-fs`
**Source Files:**
- [webkit-fs/page.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/webkit-fs/page.tsx)
- [WebkitFSComponent.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/webkit-fs/_components/WebkitFSComponent.tsx)
- [YouTubePlayer.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/join/_components/YouTubePlayer.tsx) (shared)
- [triggered-dialog.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/components/triggered-dialog.tsx) (shared)

### Technical Mechanism

This is the most complex approach, combining multiple workaround techniques:

1. **Platform detection:** `detectPlatform()` checks user agent for iOS/mobile.
2. **iOS Video Shell creation** (`createIOSVideoShell()`):
   - Creates a `<canvas>` element (160x90, black fill) to generate a synthetic video stream via `canvas.captureStream(1)`.
   - Creates a `<video>` element and sets `srcObject` to the canvas stream.
   - Styles the video as `position: fixed; opacity: 0.01; pointer-events: none; z-index: 9998` -- effectively invisible but present in the DOM.
   - Appends to `document.body` and calls `video.play()`.
3. **Fullscreen entry** (`enterFullscreen()`):
   - **iOS path:** On the invisible video shell, calls `video.webkitEnterFullscreen()` or `video.webkitSetPresentationMode('fullscreen')`. Simultaneously calls `setupPortal()` which creates a `position: fixed; z-index: 99999` div and renders all UI content into it via `createPortal()`.
   - **Android/Desktop path:** Standard `document.documentElement.requestFullscreen()` + `screen.orientation.lock('landscape')`.
4. **Portal UI:** When portal is active, the entire `content` JSX tree (header, video player, chat, triggered dialog) is rendered via `createPortal()` into the portal div. On non-iOS or when portal is inactive, content renders normally in the component tree.
5. **Fullscreen exit** (`exitFullscreen()`):
   - iOS: Calls `video.webkitSetPresentationMode('inline')` to close the native player.
   - Cleans up portal div.
   - Unlocks orientation.
6. **Triggered Dialog:** Same `TriggeredDialog` component, fires after 5 seconds on mount.
7. **Chat:** Full interactive chat with message state, input form, send button. Messages stored in component state. Side-by-side layout with video in landscape/fullscreen.
8. **Layout:** Responsive -- `flex-col` in portrait, `flex-row` in landscape/fullscreen. Chat sidebar 72px wide in landscape, 80px on md+ screens.

### Platform Behavior

| Aspect | iOS Safari | Android Chrome | Desktop |
|--------|:----------:|:--------------:|:-------:|
| Toolbar hidden | **No** -- `webkitEnterFullscreen()` on the video shell does enter the native video player, but the portal UI renders *beneath* the native player layer, not on top of it. The native player's own UI obscures the portal. If the user manually dismisses the native player, the portal remains visible but the toolbar returns. | **Yes** | **Yes** |
| Custom UI visible | **Partially** -- Portal content renders in the DOM. On iOS, it is occluded by the native video player overlay. When native player is dismissed, portal UI is visible but in standard browser mode (with toolbar). | **Yes** | **Yes** |
| YouTube video plays | **Yes** -- Uses same `YouTubePlayer` component (IFrame API). | **Yes** | **Yes** |
| Chat interactive | **Yes** -- Full send/receive. Renders in both portal and standard modes. | **Yes** | **Yes** |
| Triggered overlay | **Yes** -- Fires 5s after mount. Works in portal. | **Yes** | **Yes** |
| Orientation lock | **No** (iOS) | **Yes** | N/A |
| `webkitSetPresentationMode` | Available but behaves identically to `webkitEnterFullscreen` on iPhone -- triggers native player. On iPad, behaves differently (true fullscreen with DOM access). | N/A | N/A |

### Benefits

- Most feature-complete implementation: YouTube player, interactive chat, triggered overlays, custom controls, fullscreen toggle
- React Portal architecture cleanly separates normal rendering from fullscreen rendering
- Platform detection enables graceful degradation
- `webkitSetPresentationMode('inline')` provides a clean exit mechanism
- Canvas-stream video shell avoids requiring a real video file
- Responsive layout handles portrait/landscape transitions
- Desktop/Android experience is fully immersive

### Cons

- On iOS: portal renders beneath native video player -- the core technique fails its primary goal
- Video shell adds DOM complexity (invisible elements, canvas stream, extra event listeners)
- `canvas.captureStream()` not supported in all browsers (fallback to base64 MP4 stub)
- Portal reparenting can cause React reconciliation issues
- `webkitSetPresentationMode` on iPhone is functionally identical to `webkitEnterFullscreen` -- no advantage
- Chat sidebar fixed width (72-80px) may be too narrow on small screens

---

## Approach 5: PWA -- Add to Home Screen

**No dedicated route.** Requires manifest configuration and user action.

### Technical Mechanism

1. **Web App Manifest:** Add `manifest.json` with `"display": "standalone"` and `"orientation": "landscape"`.
2. **Apple Meta Tags:** `<meta name="apple-mobile-web-app-capable" content="yes">` + `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`.
3. **User Action:** User must: tap Share icon -> scroll down -> tap "Add to Home Screen" -> confirm name -> tap Add.
4. **Launch:** When opened from Home Screen, Safari opens the app in standalone mode -- no address bar, no bottom toolbar, no tab bar.

### Platform Behavior

| Aspect | iOS Safari (Standalone) | Android Chrome (TWA/Standalone) | Desktop |
|--------|:-----------------------:|:-------------------------------:|:-------:|
| Toolbar hidden | **Yes** -- fully chromeless. | **Yes** | Depends on OS/browser. |
| Custom UI visible | **Yes** -- standard DOM rendering. | **Yes** | **Yes** |
| Orientation lock | **Possible** via manifest `"orientation"` field. | **Yes** | N/A |
| YouTube video plays | **Yes** | **Yes** | **Yes** |
| Chat visible | **Yes** | **Yes** | **Yes** |
| Triggered overlay | **Yes** | **Yes** | **Yes** |

### Benefits

- **Only method that achieves all goals on iOS:** hidden toolbar + custom UI + orientation hint
- Native-app-like experience -- feels premium
- No JavaScript hacks, no video shells, no portals
- Stable across iOS versions (Apple-sanctioned behavior)
- Can leverage service workers for offline support

### Cons

- **Extreme user friction:** Requires 3-4 manual steps that most users will not complete for a one-time session link
- Cannot be triggered programmatically -- no "install" prompt on iOS (unlike Android's `beforeinstallprompt`)
- Separate browsing context -- cookies, localStorage, and session state may not transfer from Safari
- Updates require re-visiting the URL; no auto-update mechanism without service worker
- If the user opens the join link in Safari (not the Home Screen app), they get the regular browser experience

---

## Cross-Approach Comparison Matrix

| Criterion | Approach 1 (Join) | Approach 2 (Pseudo-FS) | Approach 3 (Sessions) | Approach 4 (WebKit FS) | Approach 5 (PWA) |
|-----------|:------------------:|:----------------------:|:---------------------:|:----------------------:|:----------------:|
| **iOS toolbar hidden** | No | Partial | Yes | No | Yes |
| **Custom UI on iOS** | Yes | Yes | No | Partial | Yes |
| **YouTube Live support** | Yes | Yes | No | Yes | Yes |
| **Interactive chat** | Partial (bottom bar) | Static only | None | Full | Depends on impl |
| **Triggered overlays** | Yes | No | No | Yes | Yes |
| **Custom video controls** | Yes | No | Native only | Yes | Depends on impl |
| **Desktop experience** | Excellent | Basic | Minimal | Excellent | Good |
| **Android experience** | Excellent | Basic | Good | Excellent | Excellent |
| **Code complexity** | Medium | Low | Low | High | Low (config only) |
| **User friction** | Low (1 tap) | None | None | Low (1 tap) | **Very High** (4 steps) |

---

## Architecture Overview

```
src/
  app/
    (main)/
      join/                          # Approach 1: AudienceStage
        _components/
          AudienceStage.tsx          # Entry gate + layout + TriggeredDialog
          YouTubePlayer.tsx          # YT IFrame API + custom controls
        page.tsx                     # Route wrapper with Suspense
      pseudo-fs/                     # Approach 2: CSS-only
        page.tsx                     # Orientation listener + immersive CSS
      sessions/                      # Approach 3: Native video
        page.tsx                     # <video> + webkitEnterFullscreen
      webkit-fs/                     # Approach 4: Video Shell + Portal
        _components/
          WebkitFSComponent.tsx      # Full implementation (296 lines)
        page.tsx                     # Server component with metadata
  components/
    triggered-dialog.tsx             # Shared: simulated API-triggered overlay
    youtube-iframe-embed.tsx         # Alternate: raw iframe embed (no API)
  hooks/
    use-fullscreen.tsx               # Shared: iOS overlay + FS API + orientation
  stores/
    ui-store.ts                      # Zustand: chat visibility state
```

### Shared Components

**YouTubePlayer** (`join/_components/YouTubePlayer.tsx`): Used by Approach 1 and 4. Integrates via YouTube IFrame API with full lifecycle management (load script, init player, destroy on unmount). Provides custom overlay controls with hover-reveal pattern. Manages play/pause, mute, restart, chat toggle, and fullscreen states.

**TriggeredDialog** (`components/triggered-dialog.tsx`): Simulates a server-push event (e.g., badge earned, product offer). Renders a glassmorphic modal with backdrop blur. Used by Approach 1 and 4 to prove that dynamically triggered DOM overlays remain interactive during pseudo-fullscreen states.

**useFullscreenLandscape** (`hooks/use-fullscreen.tsx`): Shared hook providing platform-aware fullscreen entry/exit. Handles the iOS overlay injection pattern and standard Fullscreen API + orientation lock for other browsers.

---

## The iOS Fullscreen Paradox

All approaches hit the same fundamental constraint:

```
 iOS Safari enforces a binary choice:

  Option A: Hide toolbar  -->  webkitEnterFullscreen()
            Result: Native video player takes over.
                    All custom DOM (chat, overlays) = INVISIBLE.

  Option B: Keep custom UI  -->  position: fixed + 100dvh
            Result: Full DOM control maintained.
                    Browser chrome (toolbar) = VISIBLE.

  There is no Option C.
```

- `webkitSetPresentationMode('fullscreen')` is functionally identical to `webkitEnterFullscreen()` on iPhone. It does not provide a middle ground.
- React Portals, `z-index` layering, and canvas-stream video shells cannot escape the native video player overlay.
- The only escape hatch is **PWA standalone mode**, which requires user installation.

---

## Recommendation

### Primary Strategy: Approach 1 (AudienceStage) + Approach 4 patterns

Merge the best of both implementations:

1. **Use `useFullscreenLandscape` hook** for cross-platform fullscreen entry.
2. **Adopt WebkitFSComponent's chat implementation** -- full interactive chat with message state and send functionality, replacing AudienceStage's placeholder bottom bar.
3. **Keep `YouTubePlayer` with IFrame API** -- custom controls, `playsinline=1`, autoplay with mute.
4. **Keep `TriggeredDialog`** -- proves server-push overlays work.
5. **Use `100dvh` everywhere** -- accept iOS toolbar presence. Optimize layout to maximize usable space.
6. **Accept the iOS toolbar** -- design around the ~130px of lost vertical space. Use compact controls and minimal chrome in the app UI itself.

### Secondary Strategy: PWA Prompt (for power users)

If toolbar-free viewing is a hard requirement for specific audiences:

1. Add a manifest with `"display": "standalone"`.
2. Show a dismissable banner: "For the best experience, add this to your Home Screen".
3. Detect standalone mode via `window.navigator.standalone` and skip fullscreen hacks when running as PWA.

### What NOT to pursue further

- **Video Shell + Portal (Approach 4 iOS path):** The portal renders beneath the native video layer. Adds significant complexity for no iOS benefit.
- **`scrollTo(0, 64)` trick (Approach 2):** Unreliable, version-dependent, breaks user scroll position.
- **Native `<video>` fullscreen (Approach 3):** Incompatible with YouTube iframes and destroys all custom UI.

---

## Files Reference

| File | Role | Lines | Approach |
|------|------|:-----:|:--------:|
| [AudienceStage.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/join/_components/AudienceStage.tsx) | Main stage layout + entry gate | 120 | 1 |
| [YouTubePlayer.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/join/_components/YouTubePlayer.tsx) | YT IFrame API + custom controls | 241 | 1, 4 |
| [use-fullscreen.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/hooks/use-fullscreen.tsx) | Fullscreen hook (iOS overlay + API) | 136 | 1 |
| [pseudo-fs/page.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/pseudo-fs/page.tsx) | CSS immersive layout | 55 | 2 |
| [sessions/page.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/sessions/page.tsx) | Native video fullscreen | 51 | 3 |
| [WebkitFSComponent.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/webkit-fs/_components/WebkitFSComponent.tsx) | Video Shell + Portal + Chat | 296 | 4 |
| [webkit-fs/page.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/webkit-fs/page.tsx) | Route wrapper with metadata | 11 | 4 |
| [triggered-dialog.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/components/triggered-dialog.tsx) | Simulated API overlay | 49 | 1, 4 |
| [youtube-iframe-embed.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/components/youtube-iframe-embed.tsx) | Raw iframe embed (no API) | 32 | Utility |
| [ui-store.ts](file:///Users/deepak/TechPix/creator-stage-frontend/src/stores/ui-store.ts) | Zustand chat state | 14 | 1 |
| [globals.css](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/globals.css) | Immersive CSS + design tokens | 307 | 2, All |
