# Task: A2 — TypeScript Strict Mode

## Status
- **Assigned:** AI Assistant
- **Priority:** Medium
- **Estimate:** 0.5h
- **Feature:** Phase 1 - Foundation & Project Setup

---

## 📖 Story Statement
As **Deepak (lead dev)**, I want to enable advanced TypeScript strict checks so that we catch potential "undefined" errors from array indexing and prevent ambiguous optional property types.

## 💼 Business Context
Next.js defaults are strict, but enabling `noUncheckedIndexedAccess` ensures that accessing an array element `arr[0]` is typed as `T | undefined`, forcing developers to handle empty cases. `exactOptionalPropertyTypes` prevents setting an optional property to `undefined` if it's meant to be missing, ensuring cleaner data structures.

---

## 🛠 Technical Implementation Plan (TDD Methodology)

### Phase 1: Red (Test First)
- [x] **Type Check Script**: Create a file `src/test/strict-check.ts` that contains code that *should* fail under strict mode (e.g., accessing an index and using it without a check).
- [x] **Execution**: Run `tsc --noEmit` and confirm it passes (incorrectly) before the changes.

### Phase 2: Green (Implementation)
- [x] **TSConfig Update**: Modify `tsconfig.json`:
    - Set `"noUncheckedIndexedAccess": true`
    - Set `"exactOptionalPropertyTypes": true`
- [x] **Verify Strict**: Confirm `"strict": true` is still present.

### Phase 3: Refactor & Verify
- [x] **Verification**: Run `tsc --noEmit` again and confirm the `src/test/strict-check.ts` now produces errors.
- [x] **Cleanup**: Delete `src/test/strict-check.ts`.

---

## ✅ Acceptance Criteria (AC)
- [x] **AC-001: Strict Indexing**: `noUncheckedIndexedAccess` is enabled in `tsconfig.json`.
- [x] **AC-002: Exact Optionals**: `exactOptionalPropertyTypes` is enabled in `tsconfig.json`.
- [x] **AC-003: Type Safety**: The project passes `tsc --noEmit` (after cleanup/fixes if any existing code breaks).

---

## 🧪 QA & Testing Scenarios (Playwright)

### Scenario 1: Compiler Validation
- **Given** a modified `tsconfig.json`
- **When** running `npm run build` or `tsc --noEmit`
- **Then** the compiler should enforce the new strict rules

---

## 🏁 Definition of Done (DoD)
- [x] `tsconfig.json` contains the new strict flags.
- [x] No existing boilerplate code is broken by these changes.
- [x] No linting warnings introduced.
