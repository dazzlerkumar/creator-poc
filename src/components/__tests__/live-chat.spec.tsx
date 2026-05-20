import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import React from 'react';
import { LiveChat } from '../live-chat';
import { useLiveChat } from '@/hooks/use-live-chat';

vi.mock('@/hooks/use-live-chat', () => ({
  useLiveChat: vi.fn(),
}));

describe('LiveChat component', () => {
  let mockSendMessage: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSendMessage = vi.fn().mockResolvedValue(undefined);
  });

  it('renders chat list and messages correctly', () => {
    vi.mocked(useLiveChat).mockReturnValue({
      messages: [
        {
          id: 'msg-1',
          authorName: 'Alice',
          authorAvatarColor: 'from-blue-500 to-indigo-500',
          messageText: 'Hello from Alice!',
          timestamp: new Date().toISOString(),
          role: 'viewer',
        },
        {
          id: 'msg-2',
          authorName: 'Bob',
          authorAvatarColor: 'from-purple-500 to-pink-500',
          messageText: 'Hello from Bob!',
          timestamp: new Date().toISOString(),
          role: 'moderator',
        },
      ],
      pinnedMessage: {
        id: 'msg-3',
        authorName: 'Saurabh',
        authorAvatarColor: 'from-amber-500 to-yellow-500',
        messageText: 'Welcome everyone!',
        timestamp: new Date().toISOString(),
        role: 'owner',
        isPinned: true,
      },
      sendMessage: mockSendMessage,
      isLoading: false,
    });

    render(<LiveChat sid="session-123" />);

    // Verify pinned message is rendered
    expect(screen.getByText('Welcome everyone!')).toBeInTheDocument();
    expect(screen.getByText('Saurabh')).toBeInTheDocument();

    // Verify chat messages are rendered
    expect(screen.getByText('Hello from Alice!')).toBeInTheDocument();
    expect(screen.getByText('Alice:')).toBeInTheDocument();
    expect(screen.getByText('Hello from Bob!')).toBeInTheDocument();
    expect(screen.getByText('Bob:')).toBeInTheDocument();
  });

  it('calls sendMessage callback on composer form submission and clears input', () => {
    vi.mocked(useLiveChat).mockReturnValue({
      messages: [],
      pinnedMessage: null,
      sendMessage: mockSendMessage,
      isLoading: false,
    });

    render(<LiveChat sid="session-123" />);

    const input = screen.getByPlaceholderText(/Send a message.../i);
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: 'Hello world' } });
    expect(input).toHaveValue('Hello world');

    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    expect(mockSendMessage).toHaveBeenCalledWith('Hello world');
    expect(input).toHaveValue('');
  });

  it('toggles the quick emojis panel and appends emojis to the input field', () => {
    vi.mocked(useLiveChat).mockReturnValue({
      messages: [],
      pinnedMessage: null,
      sendMessage: mockSendMessage,
      isLoading: false,
    });

    render(<LiveChat sid="session-123" />);

    // Emojis panel should not be present initially
    expect(screen.queryByText('👍')).not.toBeInTheDocument();

    // Click the toggle button to show emojis
    const toggleButton = screen.getByRole('button', { name: /toggle emoji picker/i });
    fireEvent.click(toggleButton);

    // Now 👍 should be visible
    const thumbEmoji = screen.getByText('👍');
    expect(thumbEmoji).toBeInTheDocument();

    // Click 👍 to append it
    fireEvent.click(thumbEmoji);
    const input = screen.getByPlaceholderText(/Send a message.../i);
    expect(input).toHaveValue('👍');

    // Click toggle button again to hide emojis
    fireEvent.click(toggleButton);
    expect(screen.queryByText('👍')).not.toBeInTheDocument();
  });
});
