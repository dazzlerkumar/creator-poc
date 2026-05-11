# Task: A1 — Install Core Dependencies

## Status
- **Assigned:** AI Assistant
- **Priority:** High
- **Estimate:** 0.5h
- **Feature:** Phase 1 - Foundation & Project Setup

---

## 📖 Story Statement
As **Deepak (lead dev)**, I want to install the core runtime and development dependencies so that the project has all the necessary tools for state management, realtime communication, forms, and testing.

## 💼 Business Context
The Creator Stage project requires a robust stack for high-throughput chat (Centrifuge), complex forms (React Hook Form + Zod), and reliable state management (Zustand + TanStack Query). Installing these early prevents environment drift and unblocks feature development.

---

## 🛠 Technical Implementation Plan (TDD Methodology)

### Phase 1: Red (Test First)
- [x] **Verification Script**: Create a temporary script `scripts/verify-deps.ts` that attempts to import the key libraries.
- [x] **Execution**: Run the script with `tsx` or `node` and confirm it fails because packages are missing.

### Phase 2: Green (Implementation)
- [x] **Runtime Dependencies**: Install core packages:
    - `npm install zustand @tanstack/react-query centrifuge react-hook-form zod @hookform/resolvers react-virtuoso`
- [x] **Dev Dependencies**: Install tooling and testing packages:
    - `npm install -D msw @tanstack/react-query-devtools`
- [x] **Environment Setup**: Create `.env.local` with:
    - `NEXT_PUBLIC_API_URL=http://localhost:8080`
    - `NEXT_PUBLIC_WS_URL=ws://localhost:8000/connection/websocket`
- [x] **Verify Existing**: Ensure `vitest`, `@testing-library/react`, and `@testing-library/jest-dom` are correctly configured in `package.json` (already present but verify versions).

### Phase 3: Refactor & Verify
- [x] **Verification**: Run the `scripts/verify-deps.ts` script again to ensure all imports succeed.
- [x] **Cleanup**: Remove the temporary verification script.
- [x] **Lockfile**: Ensure `package-lock.json` is updated and committed.
- [x] **Env Check**: Verify `process.env.NEXT_PUBLIC_API_URL` is accessible.

---

## ✅ Acceptance Criteria (AC)
- [x] **AC-001: Runtime Packages**: All packages listed in the implementation plan are present in `dependencies`.
- [x] **AC-002: Dev Packages**: All tooling packages are present in `devDependencies`.
- [x] **AC-003: Project Health**: `npm run dev` starts successfully without dependency errors.

---

## 🧪 QA & Testing Scenarios (Playwright)

### Scenario 1: Dependency Check
- **Given** the repository is cloned
- **When** running `npm install`
- **Then** all packages should install without peer dependency conflicts

### Scenario 2: Dev Server Stability
- **Given** all dependencies are installed
- **When** running `npm run dev`
- **Then** the application should boot and be accessible at `localhost:3000`

---

## 🏁 Definition of Done (DoD)
- [x] All requested packages are in `package.json`.
- [x] `package-lock.json` is consistent.
- [x] No console errors related to missing modules when starting the dev server.
- [x] UI is responsive and matches the premium design aesthetic.
- [x] No linting warnings introduced.
