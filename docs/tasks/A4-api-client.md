# Task: A4 — API Client

## Status
- **Assigned:** AI Assistant
- **Priority:** High
- **Estimate:** 1h
- **Feature:** Phase 2 - Auth & State Infrastructure

---

## 📖 Story Statement
As **Deepak (lead dev)**, I want a centralized fetch wrapper so that all outgoing API requests automatically include the JWT and handle authentication errors consistently.

## 💼 Business Context
The application relies on JWT-based authentication. Instead of manually adding headers to every fetch call, a centralized client simplifies development and ensures that 401 Unauthorized responses trigger the correct re-authentication or redirect flow.

---

## 🛠 Technical Implementation Plan (TDD Methodology)

### Phase 1: Red (Test First)
- [ ] **Unit Test Creation**: Create `src/api/__tests__/client.test.ts`.
    - Test: `client` adds `Authorization` header when JWT is present in `useAuthStore`.
    - Test: `client` throws a custom error on non-2xx responses.
    - Test: `client` handles 401 by calling a logout or refresh callback.
- [ ] **Execution**: Run `npm test` and confirm they fail.

### Phase 2: Green (Implementation)
- [ ] **Type Definitions**: Define `ApiError` class and `ApiResponse<T>` type in `src/api/types.ts`.
- [ ] **Implementation**: Build the fetch wrapper in `src/api/client.ts`.
    - Access `useAuthStore.getState().jwt` for headers.
    - Use `fetch` API with standard error discrimination.
- [ ] **401 Logic**: Implement a simple interceptor or check that triggers `useAuthStore.getState().clearToken()` on 401.

### Phase 3: Refactor & Verify
- [ ] **Verification**: Run Vitest and ensure all client tests pass.
- [ ] **Mocking**: Configure MSW in `src/test/server.ts` to facilitate API testing for future tasks.

---

## ✅ Acceptance Criteria (AC)
- [ ] **AC-001: Header Injection**: Every request made via the client includes `Authorization: Bearer <token>` if a token exists.
- [ ] **AC-002: Error Handling**: Non-2xx responses are parsed and thrown as `ApiError` objects containing status and message.
- [ ] **AC-003: 401 Interception**: 401 responses are detected and the client reacts by clearing local auth state.

---

## 🧪 QA & Testing Scenarios (Playwright)

### Scenario 1: Unauthorized Access
- **Given** an expired or invalid JWT
- **When** the client makes a request
- **Then** the client should catch the 401 and the app should redirect to login (verified via store state)

---

## 🏁 Definition of Done (DoD)
- [ ] API client is fully typed and tested.
- [ ] `src/api/client.ts` is the single source of truth for fetch operations.
- [ ] No console errors or linting warnings.
