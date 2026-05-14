# Task: A8 — Creator Login Page

## Status
- **Assigned:** AI Assistant
- **Priority:** High
- **Estimate:** 2h
- **Feature:** Auth - Creator Authentication

---

## 📖 Story Statement
As a **Creator**, I want a development login page so that I can easily generate identity tokens and log in during development without a production OAuth flow.

## 💼 Business Context
The production environment will use a robust identity provider. However, for rapid development and testing of the Creator Stage, we need a "backdoor" login page that uses a local HMAC key to sign identity tokens. This allows developers to impersonate creators and test the full session lifecycle.

---

## 🛠 Technical Implementation Plan (TDD Methodology)

### Phase 1: Red (Test First)
- [ ] **E2E Test Creation**: Create `tests/e2e/auth/creator-login.spec.ts`.
    - Verify that the login form renders in development mode.
    - Verify that submitting the form calls the login API and redirects to the join page with session/invite params.
    - Verify that the page is not accessible or doesn't show the dev tool in production.
- [ ] **Execution**: Run the tests and confirm they fail.

### Phase 2: Green (Implementation)
- [ ] **Environment Variable**: Ensure `NEXT_PUBLIC_HMAC_KEY` is available in `.env.local`.
- [ ] **HMAC Utility**: Implement a simple HMAC signing utility (using `crypto-js` or Web Crypto API) if not already available.
- [ ] **UI Component**: Build `src/app/auth/login/page.tsx`.
    - Use `'use client'`.
    - Implement a clean, premium form using `react-hook-form` and `zod`.
    - Gate the "Dev Login" functionality with `process.env.NODE_ENV === 'development'`.
- [ ] **Integration**:
    - Call `authApi.login(identityToken)` on form submission.
    - On success, redirect to `/auth/join?session={session_id}&invite={invite_token}` using `next/navigation` `useRouter`.

### Phase 3: Refactor & Verify
- [ ] **Verification**: Run Playwright tests and fix implementation details until all pass.
- [ ] **Polish**: Add loading states to the submit button, error handling with `sonner` toasts, and smooth transitions.

---

## ✅ Acceptance Criteria (AC)
- [ ] **AC-001: Dev Login Form**: Renders an identifier input (email/ID) and a "Login" button.
- [ ] **AC-002: Token Generation**: Correctlly generates an HMAC-signed identity token using the local secret.
- [ ] **AC-003: API Integration**: Successfully calls the `{API_URL}/api/auth/login` endpoint.
- [ ] **AC-004: Success Redirect**: Redirects the user to the join page with the correct query parameters upon successful login.
- [ ] **AC-005: Security Gating**: The development login tool is only active when `NODE_ENV` is `development`.

---

## 🧪 QA & Testing Scenarios (Playwright)

### Scenario 1: Successful Dev Login
- **Given** I am on the `/auth/login` page in development mode
- **When** I enter "creator-1" and click "Login"
- **Then** I should be redirected to `/auth/join` with `session` and `invite` params in the URL

### Scenario 2: Failed Login
- **Given** the backend API is down or returns an error
- **When** I click "Login"
- **Then** I should see an error toast and remain on the login page

---

## 🏁 Definition of Done (DoD)
- [ ] E2E Playwright tests pass for all defined scenarios.
- [ ] Form payload strictly adheres to the API specification.
- [ ] UI is responsive and matches the premium design aesthetic.
- [ ] No console errors or linting warnings.
