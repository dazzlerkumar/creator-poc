# Task: A10 — YouTube Player Component

## Status
- **Assigned:** AI Assistant
- **Priority:** High
- **Estimate:** 4h
- **Feature:** Audience Stage - Video Playback

---

## 📖 Story Statement
As an **Audience Member**, I want a high-quality, reliable video player so that I can watch the live session with minimal friction and premium controls.

## 💼 Business Context
The YouTube player is the central focus of the audience stage. It must be reliable, handle various browser constraints (especially mobile/iOS), and support custom interactions like custom fullscreen modes that include the chat overlay. This provides a "theatrical" experience that traditional YouTube embeds lack.

---

## 🛠 Technical Implementation Plan (TDD Methodology)

### Phase 1: Red (Test First)
- [x] **Unit Tests**: Create unit tests for the `Player` component in `src/app/(main)/join/_tests_/YouTubePlayer.spec.tsx`.        
- [x] **E2E Test Creation**: Create `tests/e2e/components/youtube-player.spec.ts`.
    - [x] Verify player container exists.
    - [x] Verify YouTube IFrame API script is loaded.
    - [x] Verify custom controls (fullscreen, chat toggle) are present.
- [x] **Execution**: Run the tests and confirm they fail.

### Phase 2: Green (Implementation)
- [x] **Component Creation**: Build `src/app/(main)/join/_components/YouTubePlayer.tsx`.
- [x] **Dynamic Loading**: Export a lazily loaded version using `next/dynamic({ ssr: false })`.
- [x] **YouTube IFrame API**:
    - [x] Implement a hook or utility to load the IFrame API script.
    - [x] Initialize `YT.Player` with specified params (`enablejsapi=1`, `playsinline=1`, `modestbranding=1`, `rel=0`, `controls=1`).
- [x] **State Management**:
    - [x] Track player state (playing, paused, buffering).
    - [x] Expose callbacks for state changes.
- [x] **Custom Controls**:
    - [x] Implement a custom UI layer over the iframe (chrome).
    - [x] **Fullscreen**: Call `requestFullscreen()` on the wrapper container to include overlays.
    - [x] **Chat Toggle**: Add a button to toggle chat visibility (interacting with `useUIStore`).
- [x] **Mobile Optimization**:
    - [x] Detect iOS Safari `webkitpresentationmode`.
    - [x] Implement "force landscape fullscreen" intent on mount for mobile devices.

### Phase 3: Refactor & Verify
- [x] **Verification**: Run Playwright tests and fix implementation details until all pass.
- [x] **Polish**: Ensure smooth transitions, premium iconography, and handle "tap to return" affordances for iOS.

---

## ✅ Acceptance Criteria (AC)
- [x] **AC-001: Script Injection**: The YouTube IFrame API script is injected once and correctly handled.
- [x] **AC-002: Player Initialization**: The player initializes with the correct video ID and modest branding.
- [x] **AC-003: State Tracking**: The component accurately reflects the player's play/pause state.
- [x] **AC-004: Custom Fullscreen**: Clicking the fullscreen button expands the entire player+chat container, not just the iframe.
- [x] **AC-005: Chat Toggle**: The chat toggle button correctly triggers the chat visibility state.
- [x] **AC-006: iOS Compatibility**: Handles iOS-specific quirks like `playsinline` and presentation modes.
- [x] **AC-007: Landscape Intent**: Attempts to orient/fullscreen the device in landscape on mobile when entering the stage.

---

## 🧪 QA & Testing Scenarios (Playwright)

### Scenario 1: Initial Load
- **Given** I am on the Audience Stage
- **When** the page loads
- **Then** the YouTube IFrame API should be loaded and the player should be visible

### Scenario 2: Play/Pause Interaction
- **Given** the video is loaded
- **When** I click the custom play/pause button
- **Then** the YouTube player should react accordingly and the UI state should update

### Scenario 3: Fullscreen Container
- **Given** I am in normal view
- **When** I click the custom fullscreen button
- **Then** the entire stage container (including chat overlay) should enter fullscreen mode

---

## 🏁 Definition of Done (DoD)
- [x] E2E Playwright tests pass for all defined scenarios.
- [x] No server-side rendering (SSR) for the player component.
- [x] UI is responsive and matches the premium "yoga" design aesthetic.
- [x] No console errors or linting warnings.
