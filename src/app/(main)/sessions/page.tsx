'use client'

import { useEffect, useRef } from 'react';

/* Full screen with video tag */
export default function FullscreenLandscape() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleOrientation = async () => {
      const isLandscape = window.screen.orientation.type.includes('landscape');

      if (isLandscape) {
        const video = videoRef.current;
        if (!video) return;

        // PATH A: iOS Safari (iPhone)
        // iOS only allows auto-fullscreen on the video element specifically.
        const v = video as any;
        if (v.webkitEnterFullscreen) {
          v.webkitEnterFullscreen();
        }
        // PATH B: Android / Chrome / Desktop
        // Allows the entire document or a specific container to go fullscreen.
        else if (document.documentElement.requestFullscreen) {
          try {
            await document.documentElement.requestFullscreen();
          } catch (err) {
            console.error("Fullscreen blocked. Ensure a user gesture occurred first.");
          }
        }
      }
    };

    // Listen for orientation changes
    window.screen.orientation.addEventListener('change', handleOrientation);

    return () => {
      window.screen.orientation.removeEventListener('change', handleOrientation);
    };
  }, []);

  return (
    <div>
      <h1 className='pt-24 text-center text-lg mb-2'>Using native <code>video</code> html element</h1>
      <video
        ref={videoRef}
        controls
        src="yoga.mp4"
        autoPlay
      />
    </div>

  );
};