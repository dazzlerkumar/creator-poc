import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { RepliedMessage } from "../replied-message";
import { ChatMessage } from "@/types/chat";

describe("RepliedMessage", () => {
    const mockMessage: ChatMessage = {
        id: "msg-123",
        authorName: "Saurabh",
        messageText: "Yes, you can pause it from your account settings.",
        timestamp: new Date().toISOString(),
        role: "owner",
        isDm: true,
    };

    test("renders the original message and the reply", () => {
        render(<RepliedMessage message={mockMessage} />);

        // Original message assertions
        expect(screen.getByText("Dev")).toBeInTheDocument();
        expect(screen.getByText("Can I pause my habuild subscription for sometime?")).toBeInTheDocument();
        expect(screen.getByText("1 reply")).toBeInTheDocument();

        // Reply message assertions
        expect(screen.getByText("Saurabh")).toBeInTheDocument();
        expect(screen.getByText("Yes, you can pause it from your account settings.")).toBeInTheDocument();
    });

    test("hides the component when the close button is clicked", () => {
        const { container } = render(<RepliedMessage message={mockMessage} />);
        
        // It should be visible initially
        expect(screen.getByText("Dev")).toBeInTheDocument();
        
        // Find the close button and click it
        const closeButton = screen.getByRole("button");
        fireEvent.click(closeButton);
        
        // After clicking, the component should return null and not render the text
        expect(screen.queryByText("Dev")).not.toBeInTheDocument();
        expect(container.firstChild).toBeNull();
    });
});
