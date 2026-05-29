import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PaymentFailCard } from "../payment-fail-card";

describe("PaymentFailCard", () => {
  it("renders the failure message and button correctly", () => {
    const mockCtaFunction = vi.fn();
    render(<PaymentFailCard ctaFunction={mockCtaFunction} />);

    // Check title and description
    expect(screen.getByText("Payment Failed")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Something went wrong with your transaction. Please check your payment details and try again."
      )
    ).toBeInTheDocument();

    // Check button
    expect(screen.getByRole("button", { name: /Retry Payment/i })).toBeInTheDocument();
  });

  it("calls ctaFunction when Retry Payment button is clicked", () => {
    const mockCtaFunction = vi.fn();
    render(<PaymentFailCard ctaFunction={mockCtaFunction} />);

    const retryButton = screen.getByRole("button", { name: /Retry Payment/i });
    fireEvent.click(retryButton);

    expect(mockCtaFunction).toHaveBeenCalledTimes(1);
  });
});
