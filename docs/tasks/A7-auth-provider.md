# Task: A7 — Auth Provider

## Status
- **Assigned:** AI Assistant
- **Priority:** High
- **Estimate:** 2h
- **Feature:** Phase 2 - Auth & State Infrastructure

---

## 📖 Story Statement
As **Deepak (lead dev)**, I want a global Auth Provider so that the application can automatically manage the authentication lifecycle, including token refreshes and protected route access.

## 💼 Business Context
The application needs a way to reactively respond to authentication state changes. The Auth Provider will wrap the application, ensuring that the JWT is valid, scheduling silent refreshes before expiry, and redirecting users when their session is no longer valid.

---

## 🛠 Technical Implementation Plan (TDD Methodology)

### Phase 1: Red (Test First)
- [x] **Component Test Creation**: Create `src/components/providers/__tests__/auth-provider.test.tsx`.
    - Test: Provider initializes by reading from `sessionStorage`.
    - Test: Provider schedules a refresh timer based on token expiry.
    - Test: `useAuth()` hook returns correct state.
- [x] **Execution**: Run `npm test` and confirm they fail.

### Phase 2: Green (Implementation)
- [x] **Component Creation**: Create `src/components/providers/auth-provider.tsx` (`'use client'`).
    - Implementation: Use `useEffect` to check `sessionStorage` on mount.
    - Implementation: Implement silent refresh loop using `setTimeout`.
    - Implementation: Use `next/navigation` `useRouter` for client-side redirects on failure.
- [x] **Hook Export**: Create/Update `src/auth/use-auth.ts` or export from the provider file.

### Phase 3: Refactor & Verify
- [x] **Verification**: Run Vitest and ensure all provider tests pass.
- [x] **Integration**: Wrap the application in `app/providers.tsx` with `AuthProvider`.

---

## ✅ Acceptance Criteria (AC)
- [x] **AC-001: Initialization**: On mount, the provider correctly hydrates auth state from `sessionStorage`.
- [x] **AC-002: Silent Refresh**: Tokens are automatically refreshed before they expire.
- [x] **AC-003: Protected Navigation**: The application redirects to `/login` or `/join` if authentication fails or expires.
- [x] **AC-004: useAuth Hook**: Provides a clean interface for accessing JWT, role, and authentication status.

---

## 🧪 QA & Testing Scenarios (Playwright)

### Scenario 1: Automatic Redirect on Session Expiry
- **Given** an authenticated user with a token expiring in 5 seconds
- **When** the token expires and refresh fails
- **Then** the user should be redirected to the login/join page

---

## 🏁 Definition of Done (DoD)
- [ ] Auth Provider is implemented and integrated into the root provider tree.
- [ ] Silent refresh logic is verified and robust.
- [ ] No console errors or linting warnings.
