---
title: Homepage Gateway Design Specification
version: 1.0
date_created: 2026-05-27
owner: TechPix Frontend Team
tags: [design, app, frontend, auth]
---

# Introduction

This specification defines the behavior and UI for the application's root homepage (`src/app/page.tsx`). The homepage acts as a gateway to the `join` page, verifying user authentication in the background while displaying a loading state.

## 1. Purpose & Scope

The purpose of this specification is to dictate the flow and user interface of the root landing page. It covers the initial loading state, the background authentication check using `signIdentityToken()`, and the subsequent routing (either to the main join page or an error state). The scope is limited to the client-side behavior of `src/app/page.tsx`.

## 2. Definitions

- **Gateway**: The initial entry point that determines routing based on user state rather than displaying functional content.
- **`signIdentityToken()`**: A utility function (located in `src/lib/hmac.ts`) used to verify user authentication.
- **`routePaths.main.join`**: The routing path for authenticated users to join the stage/audience.

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The homepage must render as a client component (`"use client"`).
- **REQ-002**: On component mount, a loading UI must be displayed immediately.
- **REQ-003**: The loading UI must consist of a centered layout with a bouncing `MessageSquare` icon (with 40% opacity and 1000ms duration) and italicized text stating "we are authenticating your access".
- **REQ-004**: While the loading UI is displayed, the component must asynchronously execute `signIdentityToken()` to check user authentication.
- **REQ-005**: If `signIdentityToken()` resolves successfully (user is authentic), the application must redirect the user to `routePaths.main.join`.
- **REQ-006**: If `signIdentityToken()` fails or rejects (user is not authentic), the application must display an authentication error UI.
- **REQ-007**: The authentication error UI must instruct the user to contact support.
- **CON-001**: The redirect must use `router.replace` to prevent the gateway page from remaining in the browser history.
- **GUD-001**: Handle potential errors gracefully during the authentication check to ensure the user is not left in an infinite loading state.

## 4. Interfaces & Data Contracts

### Loading UI Structure

```tsx
<div className="h-full flex flex-col items-center justify-center text-muted-foreground/40 gap-2">
  <MessageSquare
    size={32}
    className="opacity-40 animate-bounce duration-1000"
  />
  <p className="text-sm italic">
    we are authenticating your access
  </p>
</div>
```

### Authentication Verification

The component interfaces with `signIdentityToken()` from `src/lib/hmac.ts`.

```typescript
// Expected usage signature (async)
try {
  await signIdentityToken();
  // On success: redirect
} catch (error) {
  // On error: set error state
}
```

## 5. Acceptance Criteria

- **AC-001**: Given a user visits the root path `/`, When the page loads, Then the loading UI with the `MessageSquare` icon and "we are authenticating your access" text is displayed.
- **AC-002**: Given the loading UI is active, When `signIdentityToken()` successfully authenticates the user, Then the user is redirected to the join path without keeping the root path in history.
- **AC-003**: Given the loading UI is active, When `signIdentityToken()` fails to authenticate the user, Then the loading UI is replaced with an error message instructing the user to contact support.

## 6. Test Automation Strategy

- **Test Levels**: Component/Unit
- **Frameworks**: Jest/React Testing Library
- **Coverage Requirements**: Ensure test coverage for the authentication check (both success and failure paths).
- **Test Scenarios**:
  1. Verify loading UI is rendered on mount.
  2. Mock `signIdentityToken()` to resolve, verify redirection is triggered.
  3. Mock `signIdentityToken()` to reject, verify error UI is displayed.

## 7. Rationale & Context

The root page serves as an invisible gateway to ensure that unauthenticated users do not access protected routes, and that authenticated users are smoothly transitioned into the application without requiring a manual login click if they possess a valid token. The loading UI provides immediate feedback to prevent perceived unresponsiveness.

## 8. Dependencies & External Integrations

### Application Dependencies
- **DEP-001**: `src/lib/hmac.ts` - Provides the `signIdentityToken()` function.
- **DEP-002**: `src/config/route-paths.config.ts` - Provides routing paths (e.g., `routePaths.main.join`).
- **DEP-003**: `lucide-react` (or similar) - Provides the `MessageSquare` icon.

### External Systems
- None

## 9. Examples & Edge Cases

```tsx
// Example of error UI state
<div className="h-full flex flex-col items-center justify-center text-destructive gap-4 p-4 text-center">
  <AlertCircle size={48} className="text-destructive/80" />
  <h2 className="text-xl font-semibold">Authentication Failed</h2>
  <p className="text-muted-foreground">
    We couldn't verify your access. Please contact support for assistance.
  </p>
</div>
```

**Edge Case**: The authentication check takes an unusually long time (e.g., slow network). The loading UI handles this gracefully by continuing to animate.

## 10. Validation Criteria

- Visual inspection confirms the exact loading UI provided is rendered.
- Verification that the loading UI persists until the token check completes.
- Verification that routing occurs correctly upon successful authentication.

## 11. Related Specifications / Further Reading

- Next.js Client Component Documentation.
