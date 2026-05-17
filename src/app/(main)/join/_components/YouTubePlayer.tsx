'use client';

import { useEffect, useState, useRef } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { Maximize, Minimize, MessageSquare, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface YouTubePlayerProps {
  videoId: string;
  className?: string;
  onStateChange?: (state: number) => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function YouTubePlayer({ videoId, className, onStateChange }: YouTubePlayerProps) {
  const playerInstanceRef = useRef<any>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const { isChatVisible, toggleChat } = useUIStore();

  useEffect(() => {
    let internalPlayer: any = null;

    // Load YouTube API script
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
            autoplay: 1, // Added autoplay to help with live video
            mute: 1,     // Most browsers require mute for autoplay
          },
          events: {
            onReady: (event: any) => {
              playerInstanceRef.current = event.target;
              setIsPlayerReady(true);
            },
            onStateChange: (event: any) => {
              setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
              onStateChange?.(event.data);
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
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    // iOS Safari specific presentation mode handling
    const handleWebKitPresentationModeChange = (event: any) => {
      if (event.target.webkitPresentationMode === 'fullscreen') {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    const playerElement = playerRef.current;
    if (playerElement && 'webkitPresentationMode' in playerElement) {
      playerElement.addEventListener('webkitpresentationmodechanged', handleWebKitPresentationModeChange);
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (playerElement && 'webkitPresentationMode' in playerElement) {
        playerElement.removeEventListener('webkitpresentationmodechanged', handleWebKitPresentationModeChange);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid="youtube-player-container"
      className={cn(
        "relative w-full bg-black overflow-hidden group shadow-3xl h-full w-full",
        isFullscreen && "rounded-none w-screen h-screen max-h-screen",
        className
      )}
    >
      {/* YouTube Iframe Placeholder */}
      <div ref={playerRef} className="w-full h-full pointer-events-none" />

      {/* Overlay / Custom Controls */}
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 flex flex-col justify-end p-6",
          !isPlaying && "bg-black/20",
          "opacity-0 group-hover:opacity-100"
        )}
        data-testid="player-controls"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayPause}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 text-white"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>

            <button
              onClick={handleMuteToggle}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 text-white"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleChat}
              className={cn(
                "p-3 rounded-full backdrop-blur-md transition-all active:scale-95 text-white flex items-center gap-2 px-4",
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
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 text-white"
              data-testid="fullscreen-button"
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Loading State Overlay */}
      {!isPlayerReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 animate-pulse">
          <div className="w-12 h-12 border-4 border-yoga-blue/30 border-t-yoga-blue rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
