'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LiveChat } from '@/components/live-chat';
import { useUIStore } from '@/stores/ui-store';
import Image from 'next/image';

const YouTubePlayer = dynamic(
  () => import('./youtube-player').then((mod) => mod.YouTubePlayer),
  { ssr: false }
);

interface AudienceStageProps {
  sid: string;
}

export function AudienceStage({ sid }: AudienceStageProps) {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('v') || 'F1bQwUOh5Hs';

  const { isChatVisible, isChatLoading, setChatLoading } = useUIStore();
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChatLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [setChatLoading]);
  return (
    <div
      ref={stageRef}
      data-testid="audience-stage"
      className="flex h-dvh flex-col bg-zinc-950 text-white overflow-hidden relative fullscreen-page"
    >
      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col md:flex-row landscape:flex-row min-h-0 overflow-hidden transition-all duration-300">
        {/* Video Region */}
        <div className={cn(
          "relative flex items-center justify-center bg-zinc-950 transition-all duration-300",
          isChatVisible
            ? "h-[35%] shrink-0 md:h-full md:flex-1 landscape:h-full landscape:flex-1"
            : "h-full flex-1"
        )}>

          <YouTubePlayer
            videoId={videoId}
          />

        </div>

        {/* Live Chat sidebar and Payment container - rendered always to load connection immediately */}
        <div className={cn(
          "flex w-full md:w-[20%] landscape:w-[28%] shrink-0 border-l border-white/10 bg-stone-200 backdrop-blur-xl flex-col transition-all duration-300",
          isChatVisible
            ? "h-[65%] md:h-full landscape:h-full"
            : "hidden"
        )}>
          {isChatLoading ? <div className='flex-grow flex flex-col gap-4 items-center justify-center p-gutter'>
            <div className='flex items-center justify-center animate-pulse'>

              <Image
                src="/logo.png"
                alt="logo"
                height={64}
                width={64}
              />
            </div>
            <p className="text-gray-800 text-center opacity-70 leading-relaxed">
              Experience the calmness of morning yoga. <br></br> Loading chats
            </p></div> : <div className='flex flex-col h-full'> <LiveChat sid={sid} /></div>}
        </div>
      </main>
    </div>
  );
}