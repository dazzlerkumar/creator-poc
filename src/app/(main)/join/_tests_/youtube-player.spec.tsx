import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { YouTubePlayer } from '../_components/youtube-player';

vi.mock('next/dynamic', () => ({
  default: (fn: () => unknown) => fn(),
}));

const mockPlayerInstance = {
  playVideo: vi.fn(),
  pauseVideo: vi.fn(),
  mute: vi.fn(),
  unMute: vi.fn(),
  destroy: vi.fn(),
};

let capturedEvents: Record<string, (event?: { target?: unknown; data?: number }) => void> = {};

const MockYTPlayer = vi.fn().mockImplementation(function (
  this: unknown,
  _el: HTMLElement | string,
  config: { events: Record<string, (event?: { target?: unknown; data?: number }) => void> }
) {
  capturedEvents = config.events;
  return mockPlayerInstance;
});

global.window.YT = {
  Player: MockYTPlayer,
  PlayerState: {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,
  },
} as unknown as typeof window.YT;
const TEST_VIDEO_ID = 'xLC-PdO9sfs';

describe('YouTubePlayer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    capturedEvents = {};
    vi.stubGlobal('location', {
      reload: vi.fn(),
    });
  });

  it('renders player container', () => {
    render(<YouTubePlayer videoId={TEST_VIDEO_ID} />);
    expect(screen.getByTestId('youtube-player-container')).toBeDefined();
  });

  it('shows custom controls', () => {
    render(<YouTubePlayer videoId={TEST_VIDEO_ID} />);
    expect(screen.getByTestId('player-controls')).toBeDefined();
    expect(screen.getByTestId('fullscreen-button')).toBeDefined();
    expect(screen.getByTestId('chat-toggle-button')).toBeDefined();
  });

  it('shows loading state initially and hides when ready', () => {
    render(<YouTubePlayer videoId={TEST_VIDEO_ID} />);
    expect(screen.getByTestId('loading-overlay')).toBeDefined();

    act(() => {
      capturedEvents.onReady?.({ target: mockPlayerInstance });
    });
    expect(screen.queryByTestId('loading-overlay')).toBeNull();
  });

  it('mutes video player on load to allow autoplay', () => {
    render(<YouTubePlayer videoId={TEST_VIDEO_ID} />);
    act(() => {
      capturedEvents.onReady?.({ target: mockPlayerInstance });
    });
    expect(mockPlayerInstance.mute).toHaveBeenCalled();
  });

  it('performs zoom actions', () => {
    render(<YouTubePlayer videoId={TEST_VIDEO_ID} />);
    act(() => {
      capturedEvents.onReady?.({ target: mockPlayerInstance });
    });

    const zoomInButton = screen.getByTestId('zoom-in-button');
    const zoomOutButton = screen.getByTestId('zoom-out-button');
    const zoomResetButton = screen.getByTestId('zoom-reset-button');
    const videoWrapper = screen.getByTestId('youtube-video-wrapper');

    expect(videoWrapper.style.transform).toBe('scale(1) translate(0px, 0px)');

    fireEvent.click(zoomInButton);
    expect(videoWrapper.style.transform).toBe('scale(1.25) translate(0px, 0px)');

    fireEvent.click(zoomResetButton);
    expect(videoWrapper.style.transform).toBe('scale(1) translate(0px, 0px)');

    fireEvent.click(zoomOutButton);
    expect(videoWrapper.style.transform).toBe('scale(1) translate(0px, 0px)');
  });

  it('handles drag panning when zoomed', () => {
    render(<YouTubePlayer videoId={TEST_VIDEO_ID} />);
    act(() => {
      capturedEvents.onReady?.({ target: mockPlayerInstance });
    });

    const container = screen.getByTestId('youtube-player-container');
    const videoWrapper = screen.getByTestId('youtube-video-wrapper');
    const zoomInButton = screen.getByTestId('zoom-in-button');

    fireEvent.click(zoomInButton);
    expect(videoWrapper.style.transform).toBe('scale(1.25) translate(0px, 0px)');

    fireEvent.mouseDown(container, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(container, { clientX: 150, clientY: 120 });
    expect(videoWrapper.style.transform).toBe('scale(1.25) translate(50px, 20px)');

    fireEvent.mouseUp(container);
  });

  it('does not pan at normal scale', () => {
    render(<YouTubePlayer videoId={TEST_VIDEO_ID} />);
    act(() => {
      capturedEvents.onReady?.({ target: mockPlayerInstance });
    });

    const container = screen.getByTestId('youtube-player-container');
    const videoWrapper = screen.getByTestId('youtube-video-wrapper');

    fireEvent.mouseDown(container, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(container, { clientX: 150, clientY: 120 });
    expect(videoWrapper.style.transform).toBe('scale(1) translate(0px, 0px)');
  });

  it('handles error state and page reload', () => {
    render(<YouTubePlayer videoId={TEST_VIDEO_ID} />);

    act(() => {
      capturedEvents.onError?.({ data: 101 });
    });

    expect(screen.getByTestId('error-overlay')).toBeDefined();
    expect(screen.getByText('Video unavailable')).toBeDefined();

    const reloadButton = screen.getByTestId('reload-button');
    fireEvent.click(reloadButton);
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('toggles mute/unmute when clicking the transparent video overlay button', () => {
    render(<YouTubePlayer videoId={TEST_VIDEO_ID} />);
    act(() => {
      capturedEvents.onReady?.({ target: mockPlayerInstance });
    });

    // Verify unmute prompt is initially shown in the center because it is muted on first load
    const initialPrompt = screen.getByTestId('unmute-prompt');
    expect(initialPrompt).toBeDefined();
    expect(initialPrompt.className).toContain('top-1/2');

    const overlayButton = screen.getByTestId('video-click-trigger');
    fireEvent.click(overlayButton);
    expect(mockPlayerInstance.unMute).toHaveBeenCalled();
    expect(screen.getByTestId('volume-feedback')).toBeDefined();

    // Verify unmute prompt is hidden after unmuting
    expect(screen.queryByTestId('unmute-prompt')).toBeNull();

    fireEvent.click(overlayButton);
    expect(mockPlayerInstance.mute).toHaveBeenCalledTimes(2); // Setup + toggle

    // Verify unmute prompt is visible again at the bottom after subsequent manual mute
    const subsequentPrompt = screen.getByTestId('unmute-prompt');
    expect(subsequentPrompt).toBeDefined();
    expect(subsequentPrompt.className).toContain('bottom-24');
  });

  it('does not toggle mute/unmute when dragging on the video area', () => {
    render(<YouTubePlayer videoId={TEST_VIDEO_ID} />);
    act(() => {
      capturedEvents.onReady?.({ target: mockPlayerInstance });
    });

    const container = screen.getByTestId('youtube-player-container');
    const overlayButton = screen.getByTestId('video-click-trigger');
    const zoomInButton = screen.getByTestId('zoom-in-button');

    fireEvent.click(zoomInButton);

    fireEvent.mouseDown(container, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(container, { clientX: 150, clientY: 120 });
    fireEvent.mouseUp(container);
    fireEvent.click(overlayButton);

    expect(mockPlayerInstance.unMute).not.toHaveBeenCalled();
    expect(mockPlayerInstance.mute).toHaveBeenCalledTimes(1); // Only setup
  });

  it('handles touchscreen single-finger touch dragging when zoomed', () => {
    render(<YouTubePlayer videoId={TEST_VIDEO_ID} />);
    act(() => {
      capturedEvents.onReady?.({ target: mockPlayerInstance });
    });

    const container = screen.getByTestId('youtube-player-container');
    const videoWrapper = screen.getByTestId('youtube-video-wrapper');
    const zoomInButton = screen.getByTestId('zoom-in-button');

    fireEvent.click(zoomInButton);
    expect(videoWrapper.style.transform).toBe('scale(1.25) translate(0px, 0px)');

    fireEvent.touchStart(container, {
      touches: [{ clientX: 100, clientY: 100 }],
    });
    fireEvent.touchMove(container, {
      touches: [{ clientX: 150, clientY: 120 }],
    });
    expect(videoWrapper.style.transform).toBe('scale(1.25) translate(50px, 20px)');

    fireEvent.touchEnd(container);
  });

  it('handles touchscreen double-finger pinch gestures to zoom', () => {
    render(<YouTubePlayer videoId={TEST_VIDEO_ID} />);
    act(() => {
      capturedEvents.onReady?.({ target: mockPlayerInstance });
    });

    const container = screen.getByTestId('youtube-player-container');
    const videoWrapper = screen.getByTestId('youtube-video-wrapper');

    expect(videoWrapper.style.transform).toBe('scale(1) translate(0px, 0px)');

    fireEvent.touchStart(container, {
      touches: [
        { clientX: 100, clientY: 100 },
        { clientX: 200, clientY: 200 },
      ],
    });

    fireEvent.touchMove(container, {
      touches: [
        { clientX: 50, clientY: 50 },
        { clientX: 250, clientY: 250 },
      ],
    });

    expect(videoWrapper.style.transform).toContain('scale(2)');

    fireEvent.touchEnd(container);
  });
});
