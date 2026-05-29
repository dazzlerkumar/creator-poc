import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProcessingState } from "../processing-state";

// Optional: Mock next/image if necessary, but usually vitest handles it via setup
// or we can just look for the alt text which next/image renders correctly in JSDOM.

describe("ProcessingState", () => {
  it("renders the processing message correctly", () => {
    render(<ProcessingState />);

    // Check title and description
    expect(screen.getByText("Processing Payment")).toBeInTheDocument();
    expect(
      screen.getByText("Complete the payment in the Razorpay window")
    ).toBeInTheDocument();
  });

  it("renders the logo with correct alt text", () => {
    render(<ProcessingState />);

    const logo = screen.getByAltText("Habuild");
    expect(logo).toBeInTheDocument();
    expect(logo.tagName.toLowerCase()).toBe("img");
  });

  it("renders the loader icon", () => {
    const { container } = render(<ProcessingState />);

    // Loader2 from lucide-react typically renders an SVG
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
