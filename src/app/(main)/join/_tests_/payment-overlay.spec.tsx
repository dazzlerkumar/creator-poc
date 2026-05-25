import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PaymentOverlay } from "../_components/payment-overlay";
import { PaymentStatus } from "@/types/payment";

const mockReset = vi.fn();
const mockClosePayment = vi.fn();
const mockOpenPayment = vi.fn();
const mockInitiatePayment = vi.fn();

const mockStoreState = {
  status: "idle",
  paymentId: null as string | null,
  errorMessage: null as string | null,
  closePayment: mockClosePayment,
  reset: mockReset,
};

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

describe("PaymentOverlay", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    mockStoreState.status = PaymentStatus.IDLE;
    mockStoreState.paymentId = null;
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
    expect(mockInitiatePayment).toHaveBeenCalledWith({
      amount: 49900,
      currency: "INR",
      productName: "Habuild Live Session",
      description: "Premium Live Yoga Session Access",
    });
  });

  it("renders processing state", () => {
    mockStoreState.status = PaymentStatus.PROCESSING;
    render(<PaymentOverlay />);

    expect(screen.getByText("Processing Payment")).toBeInTheDocument();
    expect(screen.getByText("Complete the payment in the Razorpay window")).toBeInTheDocument();
  });

  it("renders success state and sets auto-close timer", () => {
    mockStoreState.status = PaymentStatus.SUCCESS;
    mockStoreState.paymentId = "pay_XYZ123";
    render(<PaymentOverlay />);

    expect(screen.getByText("Subscription Active")).toBeInTheDocument();
    expect(screen.getByText("Welcome to the community! Your daily wellness journey begins now.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view benefits/i })).toBeInTheDocument();

    expect(mockClosePayment).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(mockClosePayment).toHaveBeenCalledTimes(1);
  });

  it("opens benefits link on success card button click", () => {
    const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    mockStoreState.status = PaymentStatus.SUCCESS;
    render(<PaymentOverlay />);

    const viewBenefitsButton = screen.getByRole("button", { name: /view benefits/i });
    fireEvent.click(viewBenefitsButton);

    expect(windowOpenSpy).toHaveBeenCalledWith("https://habuild.com", "_blank", "noopener noreferrer");
    windowOpenSpy.mockRestore();
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
