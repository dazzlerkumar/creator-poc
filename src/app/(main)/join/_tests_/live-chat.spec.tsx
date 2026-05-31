import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { LiveChat } from "../_components/live-chat";
import { useLiveChat } from "@/hooks/use-live-chat";
import type { ChatMessage } from "@/types/chat";

vi.mock("@/hooks/use-live-chat", () => ({
  useLiveChat: vi.fn(),
}));

vi.mock("@/components/live-chats/pinned-message", () => ({
  default: ({ pinnedMessage }: { pinnedMessage: ChatMessage }) => (
    <div data-testid="mock-pinned-message">
      <span>{pinnedMessage.authorName}</span>
      <span>{pinnedMessage.messageText}</span>
    </div>
  ),
}));

type UseLiveChatReturn = ReturnType<typeof useLiveChat>;

function mockUseLiveChat(overrides: Partial<UseLiveChatReturn>): void {
  vi.mocked(useLiveChat).mockReturnValue({
    messages: [],
    pinnedMessage: null,
    isLoading: false,
    sendMessage: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  });
}

describe("LiveChat component", () => {
  let mockSendMessage: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSendMessage = vi.fn().mockResolvedValue(undefined);
  });

  it("renders chat list and messages correctly", () => {
    const messages: ChatMessage[] = [
      {
        id: "msg-1",
        authorName: "Alice",
        messageText: "Hello from Alice!",
        timestamp: new Date().toISOString(),
        role: "viewer",
      },
      {
        id: "msg-2",
        authorName: "Bob",
        messageText: "Hello from Bob!",
        timestamp: new Date().toISOString(),
        role: "moderator",
      },
      {
        id: "msg-owner",
        authorName: "OriginalOwnerName",
        messageText: "Hello from the owner!",
        timestamp: new Date().toISOString(),
        role: "owner",
      },
      {
        id: "msg-dm",
        authorName: "Dave",
        messageText: "This is a direct message",
        timestamp: new Date().toISOString(),
        role: "viewer",
        isDm: true,
      },
    ];

    const pinnedMessage: ChatMessage = {
      id: "msg-3",
      authorName: "PinnedSaurabh",
      messageText: "Welcome everyone!",
      timestamp: new Date().toISOString(),
      role: "owner",
      isPinned: true,
    };

    mockUseLiveChat({ messages, pinnedMessage, sendMessage: mockSendMessage });

    render(<LiveChat sid="session-123" />);

    expect(screen.getByTestId("mock-pinned-message")).toBeInTheDocument();
    expect(screen.getByText("Welcome everyone!")).toBeInTheDocument();
    expect(screen.getByText("PinnedSaurabh")).toBeInTheDocument();

    expect(screen.getByText("Hello from Alice!")).toBeInTheDocument();
    expect(screen.getByText("Alice:")).toBeInTheDocument();
    expect(screen.getByText("Hello from Bob!")).toBeInTheDocument();
    expect(screen.getByText("Bob:")).toBeInTheDocument();

    expect(screen.getByText("Hello from the owner!")).toBeInTheDocument();
    expect(screen.queryByText("OriginalOwnerName:")).not.toBeInTheDocument();
    expect(screen.getByText("Saurabh")).toBeInTheDocument();

    expect(screen.getByText("This is a direct message")).toBeInTheDocument();
    expect(screen.getByText("Dave:")).toBeInTheDocument();
    expect(screen.getByText("DM")).toBeInTheDocument();
  });

  it("calls sendMessage callback on composer form submission and clears input", () => {
    mockUseLiveChat({ sendMessage: mockSendMessage });

    render(<LiveChat sid="session-123" />);

    const input = screen.getByPlaceholderText(/Send a message.../i);
    const form = input.closest("form");

    fireEvent.change(input, { target: { value: "Hello world" } });
    expect(input).toHaveValue("Hello world");

    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    expect(mockSendMessage).toHaveBeenCalledWith("Hello world");
    expect(input).toHaveValue("");
  });

  it("toggles the quick emojis panel and appends emojis to the input field", () => {
    mockUseLiveChat({ sendMessage: mockSendMessage });

    render(<LiveChat sid="session-123" />);

    expect(screen.queryByText("👍")).not.toBeInTheDocument();

    const toggleButton = screen.getByRole("button", {
      name: /toggle emoji picker/i,
    });
    fireEvent.click(toggleButton);

    const thumbEmoji = screen.getByText("👍");
    expect(thumbEmoji).toBeInTheDocument();

    fireEvent.click(thumbEmoji);
    const input = screen.getByPlaceholderText(/Send a message.../i);
    expect(input).toHaveValue("👍");

    fireEvent.click(toggleButton);
    expect(screen.queryByText("👍")).not.toBeInTheDocument();
  });

  it("enforces character limit and displays remaining characters when length exceeds 150", () => {
    mockUseLiveChat({ sendMessage: mockSendMessage });

    render(<LiveChat sid="session-123" />);

    const input = screen.getByPlaceholderText(/Send a message.../i);

    expect(screen.queryByText(/200|150|50/)).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "a".repeat(150) } });
    expect(screen.queryByText(/50/)).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "a".repeat(151) } });
    const countSpan = screen.getByText("49");
    expect(countSpan).toBeInTheDocument();
    expect(countSpan.className).toContain("text-muted-foreground/60");
    expect(countSpan.className).not.toContain("text-destructive");

    fireEvent.change(input, { target: { value: "a".repeat(180) } });
    const warningSpan = screen.getByText("20");
    expect(warningSpan).toBeInTheDocument();
    expect(warningSpan.className).toContain("text-destructive");
    expect(warningSpan.className).toContain("font-bold");

    fireEvent.change(input, { target: { value: "a".repeat(200) } });
    const zeroSpan = screen.getByText("0");
    expect(zeroSpan).toBeInTheDocument();
    expect(zeroSpan.className).toContain("text-destructive");

    expect(input).toHaveAttribute("maxLength", "200");
  });
});
