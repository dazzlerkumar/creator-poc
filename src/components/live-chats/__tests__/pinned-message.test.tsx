import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PinnedMessageCard from "../pinned-message";
import { ChatMessage } from "@/types/chat";

// Mock OverlayCardWrapper
vi.mock("../../payments/overlay-card-wrapper", () => ({
  OverlayCardWrapper: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-overlay-card" className={className}>
      {children}
    </div>
  ),
}));

describe("PinnedMessageCard", () => {
  it("renders pinned message correctly", () => {
    const mockMessage: ChatMessage = {
      id: "1",
      authorName: "John Doe",
      messageText: "This is a pinned message",
      timestamp: new Date().toISOString(),
      role: "viewer",
    };

    render(<PinnedMessageCard pinnedMessage={mockMessage} />);

    // Author is hardcoded to Saurabh
    expect(screen.getByText("Saurabh")).toBeInTheDocument();
    
    // Message text is rendered
    expect(screen.getByText("This is a pinned message")).toBeInTheDocument();
  });
});
