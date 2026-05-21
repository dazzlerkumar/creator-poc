import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AudienceStage } from '../_components/audience-stage';

vi.mock('next/dynamic', () => ({
  default: () => {
    return function MockDynamicYouTubePlayer({ videoId }: { videoId: string }) {
      return <div data-testid="mock-youtube-player">Mock YouTube Player {videoId}</div>;
    };
  },
}));

const mockGetQuery = vi.fn().mockReturnValue('F1bQwUOh5Hs');
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: mockGetQuery,
  }),
}));

vi.mock('@/hooks/use-fullscreen', () => ({
  useFullscreenLandscape: vi.fn(),
}));

vi.mock('@/app/(main)/join/_components/live-chat', () => ({
  LiveChat: ({ sid }: { sid: string }) => <div data-testid="mock-live-chat">Mock Live Chat {sid}</div>,
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

const mockSetChatLoading = vi.fn();
let mockChatVisible = true;
let mockChatLoading = true;

vi.mock('@/stores/ui-store', () => ({
  useUIStore: () => ({
    isChatVisible: mockChatVisible,
    isChatLoading: mockChatLoading,
    setChatLoading: mockSetChatLoading,
  }),
}));

vi.mock('../_components/youtube-player', () => ({
  YouTubePlayer: ({ videoId }: { videoId: string }) => (
    <div data-testid="mock-youtube-player">Mock YouTube Player {videoId}</div>
  ),
}));

describe('AudienceStage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    mockChatVisible = true;
    mockChatLoading = true;
    mockGetQuery.mockReturnValue('F1bQwUOh5Hs');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders correctly and initializes youtube player immediately', () => {
    render(<AudienceStage sid="test-session" />);
    expect(screen.getByTestId('audience-stage')).toBeDefined();
    expect(screen.getByTestId('mock-youtube-player')).toBeDefined();
    expect(screen.getByText('Mock YouTube Player F1bQwUOh5Hs')).toBeDefined();
  });

  it('customizes video stream based on url query param', () => {
    mockGetQuery.mockReturnValue('custom-video-123');
    render(<AudienceStage sid="test-session" />);
    expect(screen.getByText('Mock YouTube Player custom-video-123')).toBeDefined();
  });

  it('displays chat loader initially when isChatLoading is true', () => {
    render(<AudienceStage sid="test-session" />);
    expect(screen.getByAltText('logo')).toBeDefined();
    expect(screen.getByText(/Loading chats/i)).toBeDefined();
    expect(screen.queryByTestId('mock-live-chat')).toBeNull();
  });

  it('transitions from loading state and triggers setTimeout to load chat', () => {
    render(<AudienceStage sid="test-session" />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockSetChatLoading).toHaveBeenCalledWith(false);
  });

  it('renders LiveChat component when chat loading is complete', () => {
    mockChatLoading = false;
    render(<AudienceStage sid="test-session" />);
    expect(screen.getByTestId('mock-live-chat')).toBeDefined();
    expect(screen.getByText('Mock Live Chat test-session')).toBeDefined();
    expect(screen.queryByAltText('logo')).toBeNull();
  });

  it('hides chat sidebar when isChatVisible is false', () => {
    mockChatVisible = false;
    mockChatLoading = false;
    render(<AudienceStage sid="test-session" />);
    const sidebar = screen.getByTestId('mock-live-chat').parentElement?.parentElement;
    expect(sidebar?.className).toContain('hidden');
  });
});
