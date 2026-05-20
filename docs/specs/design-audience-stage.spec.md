# Audience Stage Component Design Specification

## 1. Purpose & Scope

Define UI layouts, state management, testing workflows for AudienceStage component. Component mounts, initiates video streaming via [youtube-player.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/join/_components/youtube-player.tsx), and manages chat connection state.

## 2. Definitions

- **Active Streaming State**: Screen state where video loads, plays immediately upon mount, showing custom loading indicators and statistics.
- **Glassmorphism**: UI style utilizing backdrop-filter blur, translucent borders to overlay details.
- **Chat Transition State**: Component state where chat sidebar shows loading placeholder (yoga logo, text prompt) for 3 seconds before displaying active chat interface.
- **Immediate Chat Connection**: Proactive mount of chat component container to start network initialization concurrently with video load.

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: Render main video section occupying 35% height on mobile portrait, full width/height on desktop/landscape when chat is visible.
- **REQ-002**: Stream video using [youtube-player.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/join/_components/youtube-player.tsx), initiating autoplay on mount.
- **REQ-003**: Render custom loading overlay inside [youtube-player.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/(main)/join/_components/youtube-player.tsx) containing custom spin indicator, "1.2K Watching Now" text metadata.
- **REQ-004**: Render chat sidebar continuously inside DOM, using `hidden` utility to toggle visibility.
- **REQ-005**: Display chat loader containing yoga logo (`/logo.png`, `64x64`), animation pulse, and description text for 3 seconds before transitioning to active chat.
- **REQ-006**: Support future inline payment overlay toggling in chat sidebar via commented/planned hooks.
- **CON-001**: Render stream content directly on mount without pre-interaction screens.
- **CON-002**: Trigger auto-rotation, orientation listening via custom hooks on mount.

## 4. Interfaces & Data Contracts

Component accepts session ID:

```typescript
interface AudienceStageProps {
  sid: string;
}
```

UI Store layout contract:

```typescript
interface UIStoreState {
  isChatVisible: boolean;
  isChatLoading: boolean;
  setChatLoading: (loading: boolean) => void;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given component mounted, custom video player loads immediately, requests stream without user gesture.
- **AC-002**: Given player not ready, custom loading spinner, "1.2K Watching Now" text overlays appear.
- **AC-003**: Given component mounted, chat sidebar enters loading state for 3 seconds, displaying pulsing logo, specific yoga description.
- **AC-004**: Given 3 seconds elapsed, chat sidebar transitions to render active chat component.
- **AC-005**: Given orientation shifts to landscape, chat sidebar relocates to right.
- **AC-006**: Given mobile portrait, video occupies 35% height, chat occupies 65% remaining height.
- **AC-007**: Given isChatVisible false, chat sidebar container hidden.

## 6. Test Automation Strategy

- **Levels**: Unit, Component, Integration.
- **Tools**: Vitest, React Testing Library.
- **Coverage**: Verify layout responsive transitions, search param parsing, setTimeout state triggers, visibility toggling.

## 7. Rationale & Context

Immediate inline playback optimizes boarding, avoiding user gesture friction. 3-second loader schedules smooth transition for live chat connections. Commented payment structures provide layout compatibility for future transactional modules.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: Centrifugo Chat Service - WebSocket sync for live chat messaging.

### Third-Party Services
- **SVC-001**: YouTube Iframe API - Stream player.

### Infrastructure Dependencies
None.

### Data Dependencies
- **DAT-001**: Session ID (sid) - Parameter for room identifier.
- **DAT-002**: Video ID (v) - URL query parameter or fallback value.

### Technology Platform Dependencies
- **PLT-001**: Next.js 16 / React 19.
- **PLT-002**: Tailwind CSS.

## 9. Code Implementation Reference

```tsx
export function AudienceStage({ sid }: AudienceStageProps) {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('v') || 'F1bQwUOh5Hs';

  useFullscreenLandscape();
  const { isChatVisible, isChatLoading, setChatLoading } = useUIStore();
  const stageRef = useRef<HTMLDivElement>(null);

  const loadChat = setTimeout(() => {
    setChatLoading(false);
    clearTimeout(loadChat);
  }, 3000);

  return (
    <div
      ref={stageRef}
      data-testid="audience-stage"
      className="flex h-screen flex-col bg-zinc-950 text-white overflow-hidden relative fullscreen-page"
    >
      <main className="flex-1 flex flex-col md:flex-row landscape:flex-row min-h-0 overflow-hidden transition-all duration-300">
        <div className={cn(
          "relative flex items-center justify-center bg-zinc-950 transition-all duration-300",
          isChatVisible
            ? "h-[35%] shrink-0 md:h-full md:flex-1 landscape:h-full landscape:flex-1"
            : "h-full flex-1"
        )}>
          <YouTubePlayer videoId={videoId} />
        </div>

        <div className={cn(
          "flex w-full md:w-[20%] landscape:w-[28%] shrink-0 border-l border-white/10 bg-stone-200 backdrop-blur-xl flex-col transition-all duration-300",
          isChatVisible
            ? "h-[65%] md:h-full landscape:h-full"
            : "hidden"
        )}>
          {isChatLoading ? (
            <div className='flex-grow flex flex-col gap-4 items-center justify-center p-gutter'>
              <div className='flex items-center justify-center animate-pulse'>
                <Image src="/logo.png" alt="logo" height={64} width={64} />
              </div>
              <p className="text-gray-800 text-center opacity-70 leading-relaxed">
                Experience the calmness of morning yoga. <br></br> Loading chats
              </p>
            </div>
          ) : (
            <div className='flex flex-col'>
              <LiveChat sid={sid} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
```

## 10. Validation Criteria

- **VAL-001**: Verify page mounts without requiring start buttons.
- **VAL-002**: Confirm `LiveChat` renders after 3-second timeout.
- **VAL-003**: Check layout responsiveness on orientation change.
- **VAL-004**: Verify sidebar hide toggle applies `hidden` class correctly.
