# Task: A9 — Audience Join Page

## Status
- **Assigned:** AI Assistant
- **Priority:** High
- **Estimate:** 3h
- **Feature:** Auth - Audience Onboarding

---

## 📖 Story Statement
As an **Audience Member**, I want a seamless join experience so that I can quickly enter the live session and start watching without unnecessary redirects.

## 💼 Business Context
The join page is the entry point for all audience members. It must validate the session status and the invite token. To provide a premium, smooth experience, we avoid redirecting to a separate "stage" route once the session is validated. Instead, we use conditional rendering to load the audience experience directly within the join page, maintaining a single-page feel.

---

## 🛠 Technical Implementation Plan (TDD Methodology)

### Phase 1: Red (Test First)
- [x] **E2E Test Creation**: Create `tests/e2e/auth/audience-join.spec.ts`.
- [x] **Execution**: Run the tests and confirm they fail.

### Phase 2: Green (Implementation)
- [x] **API Methods**: Ensure `sessions.getStatus` and `auth.getToken` are implemented.
- [x] **UI Component**: Build `src/app/auth/join/page.tsx`.
- [x] **Conditional Rendering**:
    - [x] Show `JoinLoading` (Joining...) while processing.
    - [x] Render `AudienceStage` component (stubbed for now) if `isLive` is true.
- [x] **Error Handling**: Use `router.push` for redirects to `ended` or `error` pages.

### Phase 3: Refactor & Verify
- [x] **Verification**: Run Playwright tests and fix implementation details until all pass.
- [x] **Polish**: Ensure smooth transitions between loading and the stage view. Add a nice "Joining..." animation.

---

## ✅ Acceptance Criteria (AC)
- [x] **AC-001: URL Param Parsing**: Correctly reads `session` and `invite` from the query string.
- [x] **AC-002: Status Validation**: Redirects to `/auth/ended` if the session is no longer active.
- [x] **AC-003: Token Exchange**: Successfully exchanges the invite token for a session-scoped JWT.
- [x] **AC-004: JWT Persistence**: Stores the session JWT in `sessionStorage` for persistence within the tab.
- [x] **AC-005: Inline Rendering**: Loads the `AudienceStage` (or a placeholder) without a full page redirect upon successful join.
- [x] **AC-006: Error Redirect**: Redirects to `/auth/error` with the correct reason for invalid invites or API failures.

---

## 🧪 QA & Testing Scenarios (Playwright)

### Scenario 1: Successful Live Session Join
- **Given** a URL with a valid `session` ID and `invite` token for a live session
- **When** I visit the page
- **Then** I should see "Joining...", then the audience stage component

### Scenario 2: Session Ended
- **Given** a URL for a session that has status `ended`
- **When** I visit the page
- **Then** I should be redirected to `/auth/ended`

### Scenario 3: Invalid Invite Token
- **Given** an invalid invite token
- **When** I visit the page
- **Then** I should be redirected to `/auth/error?reason=invalid_invite`

---

## 🏁 Definition of Done (DoD)
- [x] E2E Playwright tests pass for all defined scenarios.
- [x] Form payload strictly adheres to the API specification.
- [x] UI is responsive and matches the premium design aesthetic.
- [x] No console errors or linting warnings.
