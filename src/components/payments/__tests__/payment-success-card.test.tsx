import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PaymentSuccessCard } from "../payment-success-card";
import { useUIStore } from "@/stores/ui-store";

// Mock the UI store
vi.mock("@/stores/ui-store", () => ({
  useUIStore: vi.fn(),
}));

describe("PaymentSuccessCard", () => {
  const mockSetShowPayment = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    (useUIStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setShowPayment: mockSetShowPayment,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders success content correctly", () => {
    render(<PaymentSuccessCard />);

    expect(screen.getByText("Subscription Active")).toBeInTheDocument();
    expect(
      screen.getByText("Welcome to the community! Your daily wellness journey begins now.")
    ).toBeInTheDocument();
  });

  it("does not show close button initially", () => {
    render(<PaymentSuccessCard />);

    // The close button has a lucide X icon, and there's only one button
    const closeButton = screen.queryByRole("button");
    expect(closeButton).not.toBeInTheDocument();
  });

  it("shows close button after 5 seconds", () => {
    render(<PaymentSuccessCard />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
  });

  it("calls setShowPayment(false) when close button is clicked", () => {
    render(<PaymentSuccessCard />);

    // Fast-forward time to show the button
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(mockSetShowPayment).toHaveBeenCalledTimes(1);
    expect(mockSetShowPayment).toHaveBeenCalledWith(false);
  });
});
