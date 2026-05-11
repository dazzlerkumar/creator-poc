# Task: A4 — API Client

## Status
- **Assigned:** AI Assistant
- **Priority:** High
- **Estimate:** 1h
- **Feature:** Phase 2 - Auth & State Infrastructure
- **Status:** In Progress (Spec Update Required)

---

## 📖 Story Statement
As **Deepak (lead dev)**, I want a centralized fetch wrapper that uses `NEXT_PUBLIC_API_URL` so that all outgoing API requests automatically include the base URL, JWT, and handle authentication errors consistently.

---

## 💼 Business Context
The application is a pure SPA with no Next.js server proxy. All API requests must be directed to the absolute backend URL. A centralized client ensures that `NEXT_PUBLIC_API_URL` is prepended and that 401 Unauthorized responses trigger the correct re-authentication or redirect flow.

---

## 🛠 Technical Implementation Plan (TDD Methodology)

### Phase 1: Red (Test First)
- [x] **Unit Test Creation**: Create `src/api/__tests__/client.test.ts`.
- [ ] **Test Update**: Ensure tests verify that the base URL is prepended correctly.
- [x] **Execution**: Run `npm test` and confirm they fail.

### Phase 2: Green (Implementation)
- [x] **Type Definitions**: Define `ApiError` class and `ApiResponse<T>` type in `src/api/types.ts`.
- [x] **Implementation**: Build the fetch wrapper in `src/api/client.ts`.
- [ ] **Base URL**: Update `client.ts` to prepend `process.env.NEXT_PUBLIC_API_URL`.
- [x] **401 Logic**: Implement a simple interceptor or check that triggers `useAuthStore.getState().clearToken()` on 401.

### Phase 3: Refactor & Verify
- [x] **Verification**: Run Vitest and ensure all client tests pass.
- [x] **Mocking**: Configure MSW in `src/test/server.ts` to facilitate API testing for future tasks.

---

## ✅ Acceptance Criteria (AC)
- [x] **AC-001: Header Injection**: Every request made via the client includes `Authorization: Bearer <token>` if a token exists.
- [x] **AC-002: Error Handling**: Non-2xx responses are parsed and thrown as `ApiError` objects containing status and message.
- [x] **AC-003: 401 Interception**: 401 responses are detected and the client reacts by clearing local auth state.

---

## 🧪 QA & Testing Scenarios (Playwright)

### Scenario 1: Unauthorized Access
- **Given** an expired or invalid JWT
- **When** the client makes a request
- **Then** the client should catch the 401 and the app should redirect to login (verified via store state)

---

## 🏁 Definition of Done (DoD)
- [x] API client is fully typed and tested.
- [x] `src/api/client.ts` is the single source of truth for fetch operations.
- [x] No console errors or linting warnings.
