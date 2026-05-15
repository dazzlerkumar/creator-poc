'use client';
interface YouTubePlayerProps {
    videoId: string;
}

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

export function YouTubePlayerEmbed({ videoId }: YouTubePlayerProps) {






    return (
        <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&disablekb=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&playsinline=1&fs=0`}
            allow="fullscreen; autoplay"
            allowFullScreen
        >

        </iframe>
    );
}
