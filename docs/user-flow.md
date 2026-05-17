# User Flow: WhatsApp to Audience Stage

## Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant WhatsApp
    participant Next.js (JoinRoute)
    participant Backend API
    participant AudienceStage
    participant Device API

    User->>WhatsApp: Click invite link
    WhatsApp->>Next.js (JoinRoute): GET /join?session=[sid]&invite=[token]&v=[vid]
    Next.js (JoinRoute)->>Backend API: GET /api/sessions/[sid]/status
    
    alt Session ended
        Backend API-->>Next.js (JoinRoute): status: 'ended'
        Next.js (JoinRoute)->>User: Redirect /auth/ended
    else Session active
        Backend API-->>Next.js (JoinRoute): status: 'live'
        Next.js (JoinRoute)->>Backend API: POST /api/auth/token
        Backend API-->>Next.js (JoinRoute): Return JWT
        Next.js (JoinRoute)->>Next.js (JoinRoute): Store JWT (Zustand)
        Next.js (JoinRoute)->>AudienceStage: Mount component
    end

    AudienceStage->>User: Display Entry Overlay (Play button)
    User->>AudienceStage: Click Play
    AudienceStage->>Device API: Request Fullscreen & Landscape Lock
    AudienceStage->>User: Render Video, Chat & Payment Overlay
```

## High Level Design (HLD)

Entry point accepts query parameters. [App Router] handles route parsing. [Zustand] manages client state.
API layer communicates with backend. [authApi] manages tokens. [sessionsApi] validates session state.
Presentation layer renders UI. [AudienceStage] handles layout. [YouTubePlayer] manages video streaming.
Device API controls viewing experience. [useFullscreenLandscape] enforces immersive mode.

## Low Level Design (LLD)

### Route Parameters
Extract `session` (string), `invite` (string), `v` (string) via `useSearchParams()`.

### Auth & Session Check
`JoinPageContent` mount triggers API calls.
`sessionsApi.getStatus(session)` checks session status. Returns `{ status: 'live' | 'ended' | 'scheduled' }`.
`authApi.getToken({ sessionId, inviteToken })` exchanges token. Returns `{ jwt, role, expiry }`.
`useAuthStore.setToken()` persists JWT. Updates `isLive` state.

### AudienceStage Lifecycle
Mount sets `hasEntered` false. Renders entry overlay.
User click calls `handleEnterStage()`.
Executes `enterFullscreen()` and `lockLandscape()`. Updates `hasEntered` true.
Main view renders. Container uses `flex-col md:flex-row landscape:flex-row`.
`YouTubePlayer` consumes `v` parameter.
Sidebar renders `LiveChat` or `PaymentOverlay`. `useUIStore.isChatVisible` toggles sidebar. `usePaymentStore.isPaymentOpen` toggles payment UI.

## Tech Stack

- **Framework**: Next.js 16.2.6 (React 19, Turbopack, App Router, TypeScript)
- **State Management**: Zustand 5.0.13
- **Styling**: TailwindCSS 4, Vanilla CSS
- **Data Fetching / Realtime**: TanStack React Query 5, Centrifuge 5 (realtime WebSocket client), Axios
- **Form & Validation**: React Hook Form 7, Zod 4
- **Testing**: Vitest 4, Playwright 1.59, Testing Library

## Build & Deployment Profile

Next.js Turbopack generates optimized production build. 
Pages prerendered as static content. Minimal payload.

### Performance Impact
CPU impact on ECS negligible. Static pages served directly. High concurrency supported. No SSR overhead.

## Architecture Components

### Routes
- `/auth/login`
- `/join`
- `/ended`
- `/error`

### Components
- `AudienceStage`
- `JoinLoading`
- `LiveChat`
- `PaymentOverlay`
- `TriggeredDialog`
- `YouTubePlayer`
- `YoutubeIframeEmbed`
- `AuthProvider`

### Hooks
- `useFullscreenLandscape`
- `useRazorpay`

### Stores (Zustand)
- `auth-store`
- `payment-store`
- `ui-store`

### Lib & Utils
- `api-client` (Axios wrapper)
- `hmac` (Token signing)
- `razorpay` (Payment SDK loader)
- `utils` (Tailwind `cn` merge)

### APIs
- `auth` (Login, Token Exchange)
- `client` (Base configuration)
- `payments` (Order creation, Verification)
- `sessions` (Status check)
