import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
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
    (useUIStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setShowPayment: mockSetShowPayment,
    });
  });

  it("renders success content correctly", () => {
    render(<PaymentSuccessCard />);

    expect(screen.getByText("Subscription Active")).toBeInTheDocument();
    expect(
      screen.getByText("Welcome to the community! Your daily wellness journey begins now.")
    ).toBeInTheDocument();
  });

  it("calls setShowPayment(false) when Hide button is clicked", () => {
    render(<PaymentSuccessCard />);

    const hideButton = screen.getByRole("button", { name: "Hide" });
    fireEvent.click(hideButton);

    expect(mockSetShowPayment).toHaveBeenCalledTimes(1);
    expect(mockSetShowPayment).toHaveBeenCalledWith(false);
  });
});
