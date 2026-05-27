---
title: Quiz Component Design Specification
version: 1.0
date_created: 2026-05-25
last_updated: 2026-05-25
owner: Frontend Team
tags: [design, app, component, websocket]
---

# Introduction

This document specifies the design and implementation of the Quiz Component for the `audience-stage-frontend`. The component will allow audience members to participate in live quizzes triggered by the creator during a broadcast. It utilizes Centrifuge WebSockets for real-time state synchronization and will be conditionally rendered over the live chat, similar to the existing `PaymentOverlay`.

## 1. Purpose & Scope

The purpose of this specification is to outline the architecture, data contracts, and UI behavior of the Quiz Component. This applies specifically to the audience view where they receive quiz data, answer questions, and view results. The scope includes state management, WebSocket integration, and component rendering logic within the `AudienceStage`.

## 2. Definitions

- **Quiz Component**: The UI element displayed to the audience for participating in a quiz.
- **Centrifuge**: The WebSocket engine used for real-time messaging.
- **AudienceStage**: The main layout component (`audience-stage.tsx`) rendering the video player and interactive sidebars.
- **Zustand Store**: The state management solution used for UI state (`useQuizStore`).

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The Quiz Component MUST be conditionally rendered within the `AudienceStage` sidebar, identical in positioning to the `PaymentOverlay`.
- **REQ-002**: The component MUST listen to a dedicated Centrifuge channel (e.g., `video_broadcast:${sid}:quiz`) for real-time quiz events (start, stop, results).
- **REQ-003**: The component MUST use a Zustand store (`useQuizStore`) to manage its local state (visible, current question, selected option, quiz status).
- **REQ-004**: The UI MUST gracefully handle connection delays and show appropriate loading states.
- **REQ-005**: The component MUST match the existing UI/UX design language (using Shadcn/ui and Tailwind CSS).
- **CON-001**: The component relies on the existing `useChannel` hook and `centrifugeClient` for WebSocket connectivity.

## 4. Interfaces & Data Contracts

### Quiz State Store (`useQuizStore`)

```typescript
interface QuizQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  durationSeconds: number;
}

interface QuizState {
  isActive: boolean;
  question: QuizQuestion | null;
  status: 'IDLE' | 'ACTIVE' | 'SUBMITTED' | 'RESULTS';
  selectedOptionId: string | null;
  showQuiz: () => void;
  hideQuiz: () => void;
  setQuestion: (question: QuizQuestion) => void;
  submitAnswer: (optionId: string) => void;
  reset: () => void;
}
```

### WebSocket Payload (Example)

```json
{
  "event": "QUIZ_START",
  "data": {
    "questionId": "q-123",
    "text": "What is the primary benefit of morning yoga?",
    "options": [
      { "id": "opt-1", "text": "Flexibility" },
      { "id": "opt-2", "text": "Strength" }
    ],
    "durationSeconds": 30
  }
}
```

## 5. Acceptance Criteria

- **AC-001**: Given a user is on the `AudienceStage`, When a `QUIZ_START` event is received via Centrifuge, Then the Quiz Component becomes visible.
- **AC-002**: Given the Quiz Component is active, When the user selects an option and submits, Then the state updates to `SUBMITTED` and the selection is sent to the backend.
- **AC-003**: Given the Quiz Component is visible, When a `QUIZ_END` event is received, Then the component displays the results or hides based on the payload configuration.

## 6. Test Automation Strategy

- **Test Levels**: Unit testing for the Zustand store and component rendering. Integration testing for the Centrifuge hook.
- **Frameworks**: Vitest, React Testing Library.
- **Mocking**: Mock the `useChannel` or `centrifugeClient` to simulate incoming WebSocket events.
- **Coverage Requirements**: Minimum 80% coverage for the Zustand store logic and component state transitions.

## 7. Rationale & Context

The decision to render the Quiz Component similarly to the `PaymentOverlay` ensures a consistent user experience where interactive elements overlay the chat without disrupting the main video feed. Using Zustand for state management decouples the WebSocket listening logic from the UI rendering, allowing for easier testing and maintenance. The existing `useChannel` hook provides a standardized way to subscribe to Centrifuge channels.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: Creator Backend - Emits quiz events and processes answers via REST or WS.

### Infrastructure Dependencies
- **INF-001**: Centrifuge Server - Manages real-time WebSocket connections and channel subscriptions.

### Technology Platform Dependencies
- **PLT-001**: React/Next.js - Frontend rendering framework.
- **PLT-002**: Zustand - State management library.

## 9. Examples & Edge Cases

```tsx
// Example rendering in audience-stage.tsx
{showPayment && <PaymentOverlay />}
{isQuizActive && <QuizOverlay />}
<LiveChat sid={sid} />
```

Edge Case:
- If a user joins late (after `QUIZ_START`), the backend MUST send the current active quiz state upon connection or via a REST fallback to ensure the user can participate.

## 10. Validation Criteria

- The Quiz Component renders correctly in both desktop and mobile layouts, matching the container width of the sidebar.
- WebSocket events correctly trigger visibility and state changes.
- Selecting an option updates the UI to reflect the choice without lag.

## 11. Related Specifications / Further Reading

- [Centrifuge Client Implementation](../src/lib/centrifuge-client.ts)
- [Payment Overlay Implementation](../src/app/(main)/join/_components/payment-overlay.tsx)
