'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFullscreenLandscape } from '@/hooks/use-fullscreen';
import { TriggeredDialog } from '@/components/triggered-dialog';

const YouTubePlayer = dynamic(
  () => import('./YouTubePlayer').then((mod) => mod.YouTubePlayer),
  { ssr: false }
);

interface AudienceStageProps {
  sid: string;
}

export function AudienceStage({ sid }: AudienceStageProps) {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('v') || 'F1bQwUOh5Hs';

  // Hook handles: orientation change listener + iOS overlay + cleanup on unmount.
  // enterFullscreen / lockLandscape are called on button click (user gesture required).
  const { enterFullscreen, lockLandscape } = useFullscreenLandscape();
  const stageRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [showTriggeredDialog, setShowTriggeredDialog] = useState(false);

  useEffect(() => {
    if (hasEntered) {
      const timer = setTimeout(() => {
        setShowTriggeredDialog(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasEntered]);

  const handleEnterStage = async () => {
    try {
      await enterFullscreen();
      await lockLandscape();
    } catch (err) {
      console.warn('[AudienceStage] Fullscreen/orientation lock failed:', err);
    } finally {
      setHasEntered(true);
    }
  };
  console.log("video id", videoId)
  return (
    <div
      ref={stageRef}
      data-testid="audience-stage"
      className="flex min-h-screen flex-col bg-zinc-950 text-white overflow-hidden relative fullscreen-page"
    >
      {/* Entry Overlay (User Gesture Provider) */}
      {!hasEntered && (
        <div className="absolute inset-0 z-50 h-screen w-screen flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-xl transition-all duration-500">
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-700 flex flex-col items-center justify-center">

            <button
              onClick={handleEnterStage}
              className="w-40 aspect-square rounded-full bg-linear-to-br from-[var(--yoga-blue)] to-[var(--yoga-green)] flex items-center justify-center text-white shadow-yoga hover:scale-110 active:scale-95 transition-all duration-300 group "
              aria-label="Enter Live Session"
            >
              <Play size={40} fill="currentColor" className="ml-2" />
            </button>


            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">Ready to join?</h1>
              <p className="text-zinc-400 text-sm">Tap to enter the live session in fullscreen</p>
            </div>
          </div>
        </div>
      )}

      {/* Experiment: Mocked API Triggered Overlay */}
      <TriggeredDialog
        isOpen={showTriggeredDialog}
        onClose={() => setShowTriggeredDialog(false)}
      />

      {/* Main Stage Content */}
      <main className={cn(
        "flex-1 flex flex-col md:flex-row h-full overflow-hidden transition-opacity duration-1000",
        !hasEntered ? "opacity-0" : "opacity-100"
      )}>
        {/* Video Region */}
        <div className="flex-1 relative flex items-center justify-center bg-black">
          <YouTubePlayer
            videoId={videoId}
            className="w-[70%]"
          />
        </div>

        {/* Chat Drawer Placeholder - To be implemented in Task 4.5/4.9 */}
        <div className="hidden md:flex w-[30%] border-l border-white/10 bg-zinc-900/50 backdrop-blur-xl flex-col">
          <div className="p-4 border-b border-white/10">
            <h2 className="font-semibold">Live Chat</h2>
          </div>
          <div className="flex-1 flex items-center justify-center text-zinc-500 italic">
            Chat list placeholder...
          </div>
        </div>
      </main>

      {/* Mobile Chat Toggle / Status Bar */}
      <div className={cn(
        "md:hidden p-4 border-t border-white/10 bg-zinc-900 flex items-center justify-between transition-opacity duration-1000",
        !hasEntered ? "opacity-0" : "opacity-100"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-red-500">Live</span>
        </div>
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
          Session: {sid}
        </div>
      </div>
    </div>
  );
}