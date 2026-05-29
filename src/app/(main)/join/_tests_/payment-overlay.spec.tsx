import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PaymentOverlay } from "../_components/payment-overlay";
import { PaymentStatus } from "@/types/payment";
import type { ApiPlan } from "@/types/payment";

const mockReset = vi.fn();
const mockOpenPayment = vi.fn();
const mockSetSuccess = vi.fn();
const mockInitiatePayment = vi.fn();
const mockSetShowPayment = vi.fn();

const mockStoreState = {
  status: "idle" as string,
  gatewayPaymentId: null as string | null,
  errorMessage: null as string | null,
  reset: mockReset,
  setSuccess: mockSetSuccess,
};

const mockPlans: ApiPlan[] = [
  {
    id: 42,
    name: "Habuild Premium 3 Months",
    description: "3 months premium",
    category: "premium",
    status: "ACTIVE",
    rank: 1,
    base_plan_id: null,
    features: {},
    programs: {},
    metadata: {},
    is_international: false,
    country: "IND",
    regions: {
      IND: { amount: 99900, discounted_amount: 79900, currency: "INR", gateway_id: 1 },
    },
  },
];

vi.mock("@/stores/payment-store", () => {
  const store = vi.fn(() => mockStoreState);
  const storeWithGetState = Object.assign(store, {
    getState: () => ({
      openPayment: mockOpenPayment,
    }),
  });
  return {
    usePaymentStore: storeWithGetState,
  };
});

vi.mock("@/hooks/use-razorpay", () => ({
  useRazorpay: () => ({
    initiatePayment: mockInitiatePayment,
  }),
}));

vi.mock("@/hooks/use-plans", () => ({
  usePlans: () => ({
    plans: mockPlans,
    isLoading: false,
    error: null,
  }),
}));

vi.mock("@/stores/ui-store", () => ({
  useUIStore: () => ({
    setShowPayment: mockSetShowPayment,
  }),
}));

describe("PaymentOverlay", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    mockStoreState.status = PaymentStatus.IDLE;
    mockStoreState.gatewayPaymentId = null;
    mockStoreState.errorMessage = null;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders idle state with pay now button and initiates payment on click", () => {
    mockStoreState.status = PaymentStatus.IDLE;
    render(<PaymentOverlay />);

    expect(screen.getByText("Habuild Yoga Subscription")).toBeInTheDocument();
    expect(
      screen.getByText("Join our global community and transform your life with daily yoga sessions.")
    ).toBeInTheDocument();

    const payButton = screen.getByRole("button", { name: /pay now/i });
    expect(payButton).toBeInTheDocument();

    fireEvent.click(payButton);

    expect(mockInitiatePayment).toHaveBeenCalledTimes(1);
    expect(mockInitiatePayment).toHaveBeenCalledWith(
      expect.objectContaining({
        planId: 42,
        amount: 99900,
        currency: "INR",
        productName: "Habuild Live Session",
        description: "Premium Live Yoga Session Access",
      })
    );
  });

  it("renders processing state", () => {
    mockStoreState.status = PaymentStatus.PROCESSING;
    render(<PaymentOverlay />);

    expect(screen.getByText("Processing Payment")).toBeInTheDocument();
    expect(screen.getByText("Complete the payment in the Razorpay window")).toBeInTheDocument();
  });

  it("renders success state and sets auto-close timer", () => {
    mockStoreState.status = PaymentStatus.SUCCESS;
    mockStoreState.gatewayPaymentId = "pay_XYZ123";
    render(<PaymentOverlay />);

    expect(screen.getByText("Subscription Active")).toBeInTheDocument();
    expect(screen.getByText("Welcome to the community! Your daily wellness journey begins now.")).toBeInTheDocument();
    expect(mockSetShowPayment).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(3 * 60 * 1000);
    });

    expect(mockSetShowPayment).toHaveBeenCalledWith(false);
  });


  it("renders failed state with generic error message and triggers retry on click", () => {
    mockStoreState.status = PaymentStatus.FAILED;
    mockStoreState.errorMessage = null;
    render(<PaymentOverlay />);

    expect(screen.getByText("Payment Failed")).toBeInTheDocument();
    expect(
      screen.getByText("Something went wrong with your transaction. Please check your payment details and try again.")
    ).toBeInTheDocument();

    const retryButton = screen.getByRole("button", { name: /retry payment/i });
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);

    expect(mockReset).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(mockOpenPayment).toHaveBeenCalledTimes(1);
  });

  it("defaults to idle state for unknown status values", () => {
    mockStoreState.status = "UNKNOWN_STATUS" as PaymentStatus;
    render(<PaymentOverlay />);
    expect(screen.getByText("Habuild Yoga Subscription")).toBeInTheDocument();
  });
});
