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

export function YouTubePlayerEmbed({ videoId, className, onStateChange }: YouTubePlayerProps) {






    return (
        <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/mn1PGW8NBC8?autoplay=1&controls=0&disablekb=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&playsinline=1"
            allow="fullscreen; autoplay"
            allowFullScreen
        >

        </iframe>
    );
}
