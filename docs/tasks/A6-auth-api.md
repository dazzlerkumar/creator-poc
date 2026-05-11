# Task: A6 — Auth API

## Status
- **Assigned:** AI Assistant
- **Priority:** High
- **Estimate:** 1h
- **Feature:** Phase 2 - Auth & State Infrastructure

---

## 📖 Story Statement
As **Deepak (lead dev)**, I want a dedicated authentication API layer so that the application can perform login and token exchange operations with the backend.

## 💼 Business Context
The application relies on the backend for JWT issuance. We need a typed interface to handle login (for creators) and token exchange (for both audience and creators) to ensure secure access to session-scoped resources.

---

## 🛠 Technical Implementation Plan (TDD Methodology)

### Phase 1: Red (Test First)
- [x] **Integration Test Creation**: Create `src/api/__tests__/auth.test.ts`.
    - Mock `POST /api/auth/login` and verify `login()` returns the expected response.
    - Mock `POST /api/auth/token` and verify `getToken()` handles various parameters (sessionId, inviteToken, identityToken).
- [x] **Execution**: Run `npm test` and confirm they fail.

### Phase 2: Green (Implementation)
- [x] **Type Definitions**: Define Request/Response types in `src/api/types.ts` or `src/api/auth.ts`.
- [x] **API Implementation**: Create `src/api/auth.ts`.
    - Implement `login(identityToken: string)`.
    - Implement `getToken(params: { sessionId: string; inviteToken?: string; identityToken?: string })`.
    - Use the base `apiClient` from `src/api/client.ts`.

### Phase 3: Refactor & Verify
- [x] **Verification**: Run Vitest and ensure all auth API tests pass.
- [x] **Polish**: Ensure proper error mapping and type safety for response payloads.

---

## ✅ Acceptance Criteria (AC)
- [x] **AC-001: Login**: `login()` successfully calls the backend and returns the JWT/Identity payload.
- [x] **AC-002: Token Exchange**: `getToken()` successfully exchanges parameters for a session-scoped JWT.
- [x] **AC-003: Type Safety**: All requests and responses are strictly typed using TypeScript.

---

## 🧪 QA & Testing Scenarios (Playwright)

### Scenario 1: Successful Login
- **Given** a valid identity token
- **When** `login()` is called
- **Then** it should receive a 200 OK with the expected JWT

---

## 🏁 Definition of Done (DoD)
- [ ] Auth API functions are implemented and verified with tests.
- [ ] API calls follow the project's standard fetch pattern.
- [ ] No console errors or linting warnings.
