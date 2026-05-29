import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PaymentIdleCard } from "../payment-idle-card";
import type { ApiPlan } from "@/types/payment";

const mockPlans: ApiPlan[] = [
  {
    id: 101,
    name: "Basic Plan",
    description: "Basic plan",
    category: "BASIC",
    status: "ACTIVE",
    rank: 2,
    base_plan_id: null,
    features: {},
    programs: {},
    metadata: {},
    is_international: false,
    country: "IND",
    regions: {
      IND: {
        amount: 100,
        discounted_amount: null,
        currency: "INR",
        gateway_id: 1,
      },
    },
  },
  {
    id: 102,
    name: "Premium Plan",
    description: "Premium plan",
    category: "PREMIUM",
    status: "ACTIVE",
    rank: 1, // Default because rank is 1
    base_plan_id: null,
    features: {},
    programs: {},
    metadata: {},
    is_international: false,
    country: "IND",
    regions: {
      IND: {
        amount: 500,
        discounted_amount: null,
        currency: "INR",
        gateway_id: 1,
      },
    },
  },
];

describe("PaymentIdleCard", () => {
  it("renders skeletons when isLoading is true", () => {
    const handlePay = vi.fn();
    const { container } = render(
      <PaymentIdleCard plans={mockPlans} isLoading={true} handlePay={handlePay} />
    );

    // Checks if skeleton classes are rendered
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
    
    // Pay Now button should not be present
    expect(screen.queryByRole("button", { name: /Pay Now/i })).not.toBeInTheDocument();
  });

  it("renders the default plan (rank 1) initially", () => {
    const handlePay = vi.fn();
    render(
      <PaymentIdleCard plans={mockPlans} isLoading={false} handlePay={handlePay} />
    );

    // Default plan is Premium Plan due to rank 1
    expect(screen.getByText("Premium Plan")).toBeInTheDocument();
    
    // Other plan should not be visible unless expanded
    expect(screen.queryByText("Basic Plan")).not.toBeInTheDocument();
    
    // "View other plans" button should be visible
    expect(screen.getByText(/View other plans/i)).toBeInTheDocument();
  });

  it("expands to show other plans when 'View other plans' is clicked", () => {
    const handlePay = vi.fn();
    render(
      <PaymentIdleCard plans={mockPlans} isLoading={false} handlePay={handlePay} />
    );

    const expandButton = screen.getByText(/View other plans/i);
    fireEvent.click(expandButton);

    // Now Basic Plan should be visible
    expect(screen.getByText("Basic Plan")).toBeInTheDocument();
    expect(screen.getByText(/Hide other plans/i)).toBeInTheDocument();
  });

  it("selects a different plan when clicked from expanded list", () => {
    const handlePay = vi.fn();
    render(
      <PaymentIdleCard plans={mockPlans} isLoading={false} handlePay={handlePay} />
    );

    // Expand plans
    fireEvent.click(screen.getByText(/View other plans/i));

    // Click on Basic Plan
    const basicPlan = screen.getByText("Basic Plan");
    fireEvent.click(basicPlan);

    // Expanded list collapses, "Basic Plan" is now the selected plan
    expect(screen.queryByText(/Hide other plans/i)).not.toBeInTheDocument();
    expect(screen.getByText(/View other plans/i)).toBeInTheDocument();
    
    // Basic plan is still in document (as the selected plan), but Premium Plan is now hidden
    expect(screen.getByText("Basic Plan")).toBeInTheDocument();
    expect(screen.queryByText("Premium Plan")).not.toBeInTheDocument();
  });

  it("calls handlePay with correct parameters when 'Pay Now' is clicked", () => {
    const handlePay = vi.fn();
    render(
      <PaymentIdleCard plans={mockPlans} isLoading={false} handlePay={handlePay} />
    );

    const payButton = screen.getByRole("button", { name: /Pay Now/i });
    fireEvent.click(payButton);

    // Initially Premium Plan is selected
    expect(handlePay).toHaveBeenCalledTimes(1);
    expect(handlePay).toHaveBeenCalledWith(102, 500, "INR");
  });
});
