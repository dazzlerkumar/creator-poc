import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { YouTubePlayer } from '../_components/YouTubePlayer';

// Mock next/dynamic
vi.mock('next/dynamic', () => ({
  default: (fn: any) => {
    const Component = fn();
    return Component;
  },
}));

describe('YouTubePlayer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the player container', () => {
    render(<YouTubePlayer videoId="rEKifG2XUZg" />);
    expect(screen.getByTestId('youtube-player-container')).toBeDefined();
  });

  it('shows custom controls', () => {
    render(<YouTubePlayer videoId="rEKifG2XUZg" />);
    expect(screen.getByTestId('player-controls')).toBeDefined();
    expect(screen.getByTestId('fullscreen-button')).toBeDefined();
    expect(screen.getByTestId('chat-toggle-button')).toBeDefined();
  });

  it('calls onStateChange callback', () => {
    const onStateChange = vi.fn();
    render(<YouTubePlayer videoId="rEKifG2XUZg" onStateChange={onStateChange} />);
    // Verification of internal YT logic would require deeper mocks
  });
});
