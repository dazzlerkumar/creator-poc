# Task: A3 — Scaffold Folder Structure

## Status
- **Assigned:** AI Assistant
- **Priority:** Medium
- **Estimate:** 1h
- **Feature:** Phase 1 - Foundation & Project Setup

---

## 📖 Story Statement
As **Deepak (lead dev)**, I want to create the foundational directory structure so that the team has a clear place to put authentication logic, features, and stores.

## 💼 Business Context
A consistent folder structure is critical for maintainability in a multi-role application. Separating `features` from `stores` and `api` logic allows for better code organization and prevents circular dependencies.

---

## 🛠 Technical Implementation Plan (TDD Methodology)

### Phase 1: Red (Test First)
- [ ] **Verification Command**: Run a script to check if the directories exist.
- [ ] **Execution**: Confirm they do not exist yet.

### Phase 2: Green (Implementation)
- [ ] **Src Directories**: Create the following under `src/`:
    - `auth/`, `realtime/`, `api/`, `lib/`, `stores/`, `test/`
    - `features/chat/`, `features/cta/`, `features/analytics/`, `features/sessions/`
- [ ] **App Directories**: Create the following under `app/`:
    - `(public)/login/`, `(public)/join/`, `(public)/ended/`, `(public)/error/`
    - `c/sessions/[sessionId]/`
    - `a/s/[sessionId]/`
- [ ] **Placeholders**: Add empty `index.ts` or `.gitkeep` files to each directory to ensure they are tracked by Git.

### Phase 3: Refactor & Verify
- [ ] **Verification**: Run `ls -R src/` and `ls -R app/` to verify the structure matches the implementation plan.

---

## ✅ Acceptance Criteria (AC)
- [ ] **AC-001: Core Folders**: All folders specified in Task 1.3 of the implementation plan exist.
- [ ] **AC-002: Next.js Routes**: The `app/` directory reflects the planned public, creator, and audience routes.
- [ ] **AC-003: Barrel Files**: Each new directory in `src/` has an `index.ts` file for exports.

---

## 🧪 QA & Testing Scenarios (Playwright)

### Scenario 1: Directory Existence
- **Given** the file system
- **When** checking for the `src/features/chat` directory
- **Then** it should exist and contain an `index.ts` file

---

## 🏁 Definition of Done (DoD)
- [ ] Directory structure matches the `implementation-plan.md` exactly.
- [ ] All directories are tracked by Git.
- [ ] No console errors or Next.js build errors introduced by the new structure.
