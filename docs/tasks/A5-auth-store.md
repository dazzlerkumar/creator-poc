# Task: A5 — Auth Store

## Status
- **Assigned:** AI Assistant
- **Priority:** High
- **Estimate:** 1h
- **Feature:** Phase 2 - Auth & State Infrastructure

---

## 📖 Story Statement
As **Deepak (lead dev)**, I want a global authentication store so that the application can track the user's role, JWT, and session expiry across all components.

## 💼 Business Context
The application serves different roles (Audience, Creator). A central Zustand store allows us to persist the JWT across page refreshes (via `sessionStorage`) and provides a reactive way to update the UI based on authentication status.

---

## 🛠 Technical Implementation Plan (TDD Methodology)

### Phase 1: Red (Test First)
- [x] **Unit Test Creation**: Create `src/auth/__tests__/auth-store.test.ts`.
    - Test: `setToken` updates `jwt`, `role`, and `expiry`.
    - Test: `clearToken` resets all state to `null`.
    - Test: Store persists/hydrates from `sessionStorage` (if middleware used).
- [x] **Execution**: Run `npm test` and confirm they fail.

### Phase 2: Green (Implementation)
- [x] **Type Definitions**: Define `AuthState` and `AuthActions` in `src/auth/auth-store.ts`.
- [x] **Store Creation**: Implement the Zustand store.
    - Fields: `jwt`, `role`, `expiry`, `refreshTimerHandle`.
    - Actions: `setToken`, `clearToken`, `scheduleRefresh`.
- [x] **Persistence**: (Optional but recommended) Use Zustand `persist` middleware with `createJSONStorage(() => sessionStorage)`.

### Phase 3: Refactor & Verify
- [x] **Verification**: Run Vitest and ensure all store tests pass.
- [x] **Integration**: Export the store for use in the API client and Auth Provider.

---

## ✅ Acceptance Criteria (AC)
- [x] **AC-001: State Integrity**: The store correctly holds and updates `jwt`, `role`, and `expiry`.
- [x] **AC-002: Actions**: `setToken` and `clearToken` work as expected.
- [x] **AC-003: Persistence**: The JWT survives a browser refresh within the same session.

---

## 🧪 QA & Testing Scenarios (Playwright)

### Scenario 1: Login Persistence
- **Given** a user has successfully "logged in" and a token is set in the store
- **When** the page is refreshed
- **Then** the user should remain authenticated (token should be present in store)

---

## 🏁 Definition of Done (DoD)
- [x] Zustand store is implemented and tested.
- [x] `src/auth/auth-store.ts` follows the project's clean code standards.
- [x] No console errors or linting warnings.
