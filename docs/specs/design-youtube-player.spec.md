---
title: Custom YouTube Player Component Design Specification
version: 1.0
date_created: 2026-05-20
tags: [design, component, app]
---

# Introduction

This specification defines requirements for YouTubePlayer component, custom video player built with Next.js, React, and YouTube IFrame Player API. Purpose is providing interactive, accessible video playback without native YouTube controls.

## 1. Purpose & Scope

Define interface, behavior, and testing strategy for YouTubePlayer component. Audience includes frontend developers, QA engineers, design teams. Scope covers zoom capability, error states, page reload action, exclusion of native player controls.

## 2. Definitions

- **YT API**: YouTube IFrame Player API, JavaScript library enabling iframe control.
- **Zoom Factor**: Multiplier determining scale of video display container.
- **Controls Overlay**: Custom UI rendered above iframe containing playback controls.

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: Zoom capability must allow scaling video display.
- **REQ-002**: Zoom controls must support Zoom In, Zoom Out, and Reset Zoom actions.
- **REQ-003**: System must disable all native YouTube player controls.
- **REQ-004**: System must monitor video loading and player state.
- **REQ-005**: System must display descriptive error message if video fails to load, is unavailable, or encounters playback issues.
- **REQ-006**: Error display must present reload button to refresh page.
- **REQ-007**: Panning capability must enable horizontal and vertical scrolling/dragging of zoomed video inside container.
- **REQ-008**: Touchscreen zoom capability must allow scaling via double-finger pinch gestures (pinch out to zoom in, pinch in to zoom out) between 1.0x and 3.0x.
- **REQ-009**: Touchscreen panning capability must support single-finger touch dragging.
- **REQ-010**: Gesture isolation must prevent native browser page scroll and page zoom during active touchscreen gestures using non-passive touch listeners.
- **REQ-011**: System must support direct play/pause toggling via transparent click overlay button.
- **CON-001**: Video must remain contained within designated layout boundaries during zoom actions.
- **CON-002**: Zoom factor limits must span between 1.0x minimum and 3.0x maximum.
- **CON-003**: Video must not pan beyond layout edges.
- **GUD-001**: UI buttons use consistent Lucide icon set.

## 4. Interfaces & Data Contracts

Props interface accepts video ID, optional className, optional state change handler:

```typescript
interface YouTubePlayerProps {
  videoId: string;
  className?: string;
  onStateChange?: (state: number) => void;
}
```

State tracking handles active zoom level, CSS transform coordinates, player status, error states:

```typescript
interface ZoomState {
  scale: number;
  offsetX: number;
  offsetY: number;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given video player rendered, When user clicks zoom-in button, Then scale of video iframe increases by 0.25x until 3.0x limit.
- **AC-002**: Given zoomed video player, When user clicks zoom-out button, Then scale of video iframe decreases by 0.25x until 1.0x limit.
- **AC-003**: Given zoomed video, When user clicks reset button, Then scale returns to 1.0x.
- **AC-004**: Given video playback active, When checking video player frame, Then no default YouTube controls are visible or interactive.
- **AC-005**: Given video fails to load or enters error state (error codes 2, 5, 100, 101, 150), When error occurs, Then error message renders overlaying video area.
- **AC-006**: Given error message displayed, When user clicks reload button, Then active window reloads to retry.
- **AC-007**: Given video scaled above 1.0x, When user drags mouse or slides finger over video area, Then video view offsets follow pointer direction.
- **AC-008**: Given video scaled at 1.0x, When user drags mouse, Then no offset occurs.
- **AC-009**: Given player rendered on touchscreen, When user pinches out with two fingers, Then scale of video iframe increases up to 3.0x limit.
- **AC-010**: Given zoomed video player, When user drags one finger over video area, Then zoomed view translates to follow touch movement without scrolling parent webpage.
- **AC-011**: Given video playback active, When user clicks or taps transparent cover overlay button, Then video pauses or plays.
- **AC-012**: Given zoomed video, When user drags finger to pan, Then touch release does not trigger play/pause state change.

## 6. Test Automation Strategy

- **Test Levels**: Unit testing, Integration testing.
- **Frameworks**: Vitest, React Testing Library.
- **Coverage Requirements**: 100% statement and branch coverage for component and tests.
- **CI/CD Integration**: Automatic execution on commit and pull request.

## 7. Rationale & Context

Custom controls offer seamless brand design alignment. Disabling native YouTube controls avoids unwanted visual elements. Zoom function improves readability of fine details in videos. Panning avoids losing content focus when zoomed. Error handling prevents dead ends during connection failures.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: YouTube Video Platform - Stream delivery service.

### Third-Party Services
- **SVC-001**: YouTube IFrame Player API - Integration scripts for iframe communication.

### Infrastructure Dependencies
None.

### Data Dependencies
- **DAT-001**: YouTube Video ID - Valid 11-character identifier parameter.

### Technology Platform Dependencies
- **PLT-001**: React 19 / Next.js 15 runtime environment.
- **PLT-002**: Browser DOM API supporting CSS transforms, mouse/touch events.

### Compliance Dependencies
None.

## 9. Examples & Edge Cases

```tsx
import React, { useState } from 'react';

// Example React implementation pattern for custom zoom with drag-to-pan functionality
export function YouTubePlayerExample({ videoId }: { videoId: string }) {
  const [zoom, setZoom] = useState({ scale: 1, x: 0, y: 0 });
  const [error, setError] = useState<string | null>(null);

  const handleZoomIn = () => {
    setZoom(prev => ({ ...prev, scale: Math.min(prev.scale + 0.25, 3) }));
  };

  const handleZoomOut = () => {
    setZoom(prev => ({
      ...prev,
      scale: Math.max(prev.scale - 0.25, 1),
      x: prev.scale <= 1.25 ? 0 : prev.x,
      y: prev.scale <= 1.25 ? 0 : prev.y
    }));
  };

  const handleReset = () => {
    setZoom({ scale: 1, x: 0, y: 0 });
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="relative overflow-hidden w-full h-full bg-black">
      {error ? (
        <div className="flex flex-col items-center justify-center h-full text-white">
          <p>{error}</p>
          <button onClick={handleReload}>Reload Page</button>
        </div>
      ) : (
        <div
          style={{
            transform: `scale(${zoom.scale}) translate(${zoom.x}px, ${zoom.y}px)`,
            transition: zoom.scale === 1 ? 'transform 0.3s ease' : 'none'
          }}
          className="w-full h-full"
        >
          {/* iframe placeholder */}
        </div>
      )}
    </div>
  );
}
```

## 10. Validation Criteria

- **VAL-001**: Component must build successfully within Next.js framework.
- **VAL-002**: Automated test suite must verify zoom actions, state boundaries, touchscreen double-finger pinch gestures, and touchscreen single-finger dragging.
- **VAL-003**: Automated test suite must verify error displays and reload actions.
- **VAL-004**: Visual verification must confirm absence of YouTube controls.

## 11. Related Specifications / Further Reading

- [YouTube Player IFrame API Reference](https://developers.google.com/youtube/iframe_api_reference)
- [Vitest Testing Framework](https://vitest.dev/)
