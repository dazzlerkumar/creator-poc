---
title: Design Specification for Interactive Payment Component
version: 1.0
date_created: 2026-05-21
owner: Frontend Team
tags: [design, components, payment]
---

# Introduction

Interactive payment component for yoga streaming stage chat sidebar. Replaces basic placeholder styling with premium, modern, responsive multi-state interface.

## 1. Purpose & Scope

Defines requirements, constraints, interfaces, visual styling for multi-state payment widget in streaming interface. Designed for compact sidebar display. Integrated with store state.

## 2. Definitions

- **Idle state**: Base component state showing product details, special offer, pay now call to action.
- **Success state**: Displayed after payment verification, showing active subscription details, community entry message.
- **Failed state**: Displayed upon payment error, showing diagnostic information, retry action.
- **Lucide React**: Vector icon library for React applications.
- **CSS Custom Properties**: Standardized design tokens defined in global style sheet.

## 3. Requirements, Constraints & Guidelines

### Requirements
- **REQ-001**: Support three visual states: Initial (Idle), Paid (Success), Failed.
- **REQ-002**: Initial state must render yoga branding, price summary, call to action.
- **REQ-003**: Paid state must render active confirmation, verified badge, benefit details access.
- **REQ-004**: Failed state must render error details, primary retry action.
- **REQ-005**: Use Lucide React icons instead of Google Material Symbols.
- **REQ-006**: Apply project design tokens (primary, secondary colors, specific font families).

### Constraints
- **CON-001**: Component width must adjust responsively down to 320px sidebar layout.
- **CON-002**: Must use Tailwind v4 styling classes integrated with inline theme variables.
- **CON-003**: No direct standard color overrides; use project HSL design tokens.

### Guidelines
- **GUD-001**: Apply smooth transitions between active state views.
- **GUD-002**: Support active hover, focus, active states for actionable buttons.

## 4. Interfaces & Data Contracts

State mapping from `usePaymentStore` state:

| Store Status | Active View | Main Action |
| --- | --- | --- |
| `idle` | `InitialState` | Triggers `initiatePayment` |
| `success` | `SuccessState` | Opens benefits dashboard / modal |
| `failed` | `FailedState` | Resets status, triggers retry |

### Lucide Icon Mappings

- Brand/Yoga: `Sparkles` or `Activity`
- Success Circle: `CheckCircle2`
- Error Alert: `AlertCircle`
- Retry Loop: `RefreshCw`
- Star Benefit: `Star`
- Arrow Action: `ArrowRight`

## 5. Acceptance Criteria

- **AC-001**: Given component in idle state, When Pay Now clicked, Then initiatePayment handler invoked.
- **AC-002**: Given component in success state, When View Benefits clicked, Then execute benefit modal event handler.
- **AC-003**: Given component in failed state, When Retry Payment clicked, Then reset store state, re-trigger payment window.

## 6. Test Automation Strategy

- **Test Levels**: Unit, Integration.
- **Frameworks**: Vitest, React Testing Library.
- **Coverage Requirements**: 100% state coverage for conditional view rendering.

## 7. Rationale & Context

Maintains brand consistency with existing application fonts, custom gradients. Prevents stylesheet bloat by using Tailwind v4 utility values instead of static custom stylesheets.

## 8. Dependencies & External Integrations

### Third-Party Services
- **SVC-001**: Razorpay payment window script integration via custom SDK handler hook.

### Technology Platform Dependencies
- **PLT-001**: Next.js 16 (React 19) framework standard interfaces.
- **PLT-002**: Zustand state storage provider.

## 9. Examples & Edge Cases

```tsx
// Conditional rendering flow example
export function PaymentOverlay() {
  const { status, paymentId, errorMessage, closePayment, reset } = usePaymentStore();
  const { initiatePayment } = useRazorpay();

  return (
    <div className="shrink-0 z-10 shadow-sm w-full font-sans">
      {status === 'idle' && <InitialState onPay={handlePay} />}
      {status === 'success' && <PaidState paymentId={paymentId} />}
      {status === 'failed' && <FailedState error={errorMessage} onRetry={handleRetry} />}
    </div>
  );
}
```

## 10. Validation Criteria

- Zero TypeScript compilation errors.
- Visual elements match layout definitions.
- Responsive scaling tested down to 300px layout width.

## 11. Related Specifications / Further Reading

- [payment-overlay.tsx](file:///Users/deepak/TechPix/creator-stage-frontend/src/components/payment-overlay.tsx)
- [globals.css](file:///Users/deepak/TechPix/creator-stage-frontend/src/app/globals.css)
