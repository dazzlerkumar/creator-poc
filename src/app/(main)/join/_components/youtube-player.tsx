'use client';

import { useEffect, useState, useRef } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { Maximize, Minimize, MessageSquare, Play, Pause, RotateCcw, Volume2, VolumeX, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface YouTubePlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  destroy: () => void;
}

interface YouTubePlayerProps {
  videoId: string;
  className?: string;
  onStateChange?: (state: number) => void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        element: HTMLElement | string,
        options: {
          videoId: string;
          width: string | number;
          height: string | number;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YouTubePlayerInstance }) => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YouTubePlayerInstance;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export function YouTubePlayer({ videoId, className, onStateChange }: YouTubePlayerProps) {
  const playerInstanceRef = useRef<YouTubePlayerInstance | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const { isChatVisible, toggleChat } = useUIStore();

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);
  const touchStartDistRef = useRef(0);
  const touchStartScaleRef = useRef(1);
  const touchStartPosRef = useRef({ x: 0, y: 0 });
  const [error, setError] = useState(false);

  useEffect(() => {
    let internalPlayer: YouTubePlayerInstance | null = null;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      if (playerRef.current && window.YT && window.YT.Player) {
        internalPlayer = new window.YT.Player(playerRef.current, {
          videoId,
          width: '100%',
          height: '100%',
          playerVars: {
            enablejsapi: 1,
            playsinline: 1,
            modestbranding: 1,
            rel: 0,
            controls: 0,
            origin: window.location.origin,
            autoplay: 1,
            mute: 0,
          },
          events: {
            onReady: (event: { target: YouTubePlayerInstance }) => {
              playerInstanceRef.current = event.target;
              event.target.unMute();
              setIsPlayerReady(true);
            },
            onStateChange: (event: { data: number }) => {
              setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
              onStateChange?.(event.data);
            },
            onError: () => {
              setError(true);
            },
          },
        });
      }
    }

    return () => {
      if (internalPlayer?.destroy) {
        internalPlayer.destroy();
      }
      playerInstanceRef.current = null;
      setIsPlayerReady(false);
    };
  }, [videoId, onStateChange]);

  const handlePlayPause = () => {
    const player = playerInstanceRef.current;
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleMuteToggle = () => {
    const player = playerInstanceRef.current;
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement && !(document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement) {
      const el = document.documentElement;
      if (el.requestFullscreen) {
        el.requestFullscreen().catch((err: unknown) => {
          const message = err instanceof Error ? err.message : String(err);
          console.error(`Error attempting to enable fullscreen: ${message}`);
        });
      } else {
        const webkitEl = el as unknown as { webkitRequestFullscreen?: () => void };
        if (webkitEl.webkitRequestFullscreen) {
          webkitEl.webkitRequestFullscreen();
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => { });
      } else {
        const webkitDoc = document as unknown as { webkitExitFullscreen?: () => void };
        if (webkitDoc.webkitExitFullscreen) {
          webkitDoc.webkitExitFullscreen();
        }
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!(document.fullscreenElement || (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement));
    };

    const handleWebKitPresentationModeChange = (event: Event) => {
      const target = event.target as unknown as { webkitPresentationMode?: string };
      if (target?.webkitPresentationMode === 'fullscreen') {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    const playerElement = playerRef.current;
    const webkitElement = playerElement as unknown as {
      addEventListener: (type: string, listener: EventListener) => void;
      removeEventListener: (type: string, listener: EventListener) => void;
      webkitPresentationMode?: string;
    };
    if (playerElement && webkitElement && 'webkitPresentationMode' in playerElement) {
      webkitElement.addEventListener('webkitpresentationmodechanged', handleWebKitPresentationModeChange);
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      if (playerElement && webkitElement && 'webkitPresentationMode' in playerElement) {
        webkitElement.removeEventListener('webkitpresentationmodechanged', handleWebKitPresentationModeChange);
      }
    };
  }, []);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => {
      const next = Math.max(prev - 0.25, 1);
      if (next === 1) {
        setOffset({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleResetZoom = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const nextX = e.clientX - dragStartRef.current.x;
    const nextY = e.clientY - dragStartRef.current.y;
    if (Math.abs(nextX - offset.x) > 3 || Math.abs(nextY - offset.y) > 3) {
      hasMovedRef.current = true;
    }
    setOffset({ x: nextX, y: nextY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleOverlayClick = () => {
    if (hasMovedRef.current) {
      hasMovedRef.current = false;
      return;
    }
    handlePlayPause();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const t = e.touches[0]!;
      touchStartPosRef.current = { x: t.clientX, y: t.clientY };
      hasMovedRef.current = false;
      if (scale > 1) {
        setIsDragging(true);
        dragStartRef.current = {
          x: t.clientX - offset.x,
          y: t.clientY - offset.y,
        };
      }
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const t1 = e.touches[0]!;
      const t2 = e.touches[1]!;
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      touchStartDistRef.current = dist;
      touchStartScaleRef.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      const t = e.touches[0]!;
      const nextX = t.clientX - dragStartRef.current.x;
      const nextY = t.clientY - dragStartRef.current.y;
      
      const dx = t.clientX - touchStartPosRef.current.x;
      const dy = t.clientY - touchStartPosRef.current.y;
      if (Math.hypot(dx, dy) > 5) {
        hasMovedRef.current = true;
      }
      setOffset({ x: nextX, y: nextY });
      
      if (e.cancelable) {
        e.preventDefault();
      }
    } else if (e.touches.length === 2 && touchStartDistRef.current > 0) {
      const t1 = e.touches[0]!;
      const t2 = e.touches[1]!;
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const factor = dist / touchStartDistRef.current;
      const newScale = Math.min(Math.max(touchStartScaleRef.current * factor, 1), 3);
      setScale(newScale);
      if (newScale === 1) {
        setOffset({ x: 0, y: 0 });
      }
      
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchStartDistRef.current = 0;
  };

  const handleTouchStartRef = useRef(handleTouchStart);
  const handleTouchMoveRef = useRef(handleTouchMove);
  const handleTouchEndRef = useRef(handleTouchEnd);

  useEffect(() => {
    handleTouchStartRef.current = handleTouchStart;
    handleTouchMoveRef.current = handleTouchMove;
    handleTouchEndRef.current = handleTouchEnd;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      handleTouchStartRef.current(e as unknown as React.TouchEvent);
    };

    const onTouchMove = (e: TouchEvent) => {
      handleTouchMoveRef.current(e as unknown as React.TouchEvent);
    };

    const onTouchEnd = () => {
      handleTouchEndRef.current();
    };

    container.addEventListener('touchstart', onTouchStart, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid="youtube-player-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={cn(
        "relative w-full bg-black overflow-hidden group shadow-3xl h-full w-full select-none",
        className
      )}
    >
      <div
        data-testid="youtube-video-wrapper"
        style={{
          transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.15s ease-out',
        }}
        className="w-full h-full pointer-events-none"
      >
        <div ref={playerRef} className="w-full h-full pointer-events-none" />
      </div>



      <div
        className={cn(
          "absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 flex flex-col justify-end p-6",
          !isPlaying && "bg-black/20",
          "opacity-0 group-hover:opacity-100 z-10"
        )}
        data-testid="player-controls"
      >
        <button
          onClick={handleOverlayClick}
          className="w-full h-full bg-transparent border-0 cursor-pointer z-0"
          aria-label={isPlaying ? "Pause" : "Play"}
          data-testid="video-click-trigger"
        />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayPause}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 text-white cursor-pointer"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>

            <button
              onClick={handleMuteToggle}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 text-white cursor-pointer"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              data-testid="zoom-out-button"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 text-white cursor-pointer"
              aria-label="Zoom Out"
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={handleResetZoom}
              data-testid="zoom-reset-button"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 text-white px-4 text-sm font-medium flex items-center gap-1.5 cursor-pointer"
              aria-label="Reset Zoom"
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
            <button
              onClick={handleZoomIn}
              data-testid="zoom-in-button"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 text-white cursor-pointer"
              aria-label="Zoom In"
            >
              <ZoomIn size={20} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleChat}
              className={cn(
                "p-3 rounded-full backdrop-blur-md transition-all active:scale-95 text-white flex items-center gap-2 px-4 cursor-pointer",
                isChatVisible ? "bg-yoga-blue/40 border border-yoga-blue/50" : "bg-white/10 hover:bg-white/20"
              )}
              data-testid="chat-toggle-button"
              aria-label="Toggle Chat"
            >
              <MessageSquare size={20} />
              <span className="text-sm font-medium">{isChatVisible ? "Hide Chat" : "Show Chat"}</span>
            </button>

            <button
              onClick={handleFullscreen}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 text-white cursor-pointer"
              data-testid="fullscreen-button"
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
            </button>
          </div>
        </div>
      </div>

      {!isPlayerReady && !error && (
        <div
          data-testid="loading-overlay"
          className="absolute inset-0 flex items-center justify-center bg-zinc-900 animate-pulse z-20"
        >
          <div className="w-12 h-12 border-4 border-yoga-blue/30 border-t-yoga-blue rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div
          data-testid="error-overlay"
          className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-zinc-950 p-6 text-center text-white"
        >
          <span className="text-lg font-semibold mb-4">Video unavailable</span>
          <button
            data-testid="reload-button"
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 text-white border border-white/10 font-medium cursor-pointer"
          >
            Reload Page
          </button>
        </div>
      )}
    </div>
  );
}
