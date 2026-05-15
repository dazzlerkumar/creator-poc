"use client";

import { useEffect, useState } from 'react';

export default function ImmersiveLayout() {
    const [isImmersive, setIsImmersive] = useState(false);

    useEffect(() => {
        const handleOrientation = () => {
            // Check if current orientation is landscape
            const isLandscape = window.screen.orientation?.type.includes('landscape')
                || window.innerWidth > window.innerHeight;

            setIsImmersive(isLandscape);

            // The "Trick": Scroll 1px to nudge Safari into minimizing the UI bars
            /* if (isLandscape) { */
            // Scroll to 64px to nudge iOS Safari into hiding the toolbar
            setTimeout(() => window.scrollTo(0, 64), 100);
            /* } */
        };

        window.addEventListener('orientationchange', handleOrientation);
        window.addEventListener('resize', handleOrientation);

        // Initial check
        handleOrientation();

        return () => {
            window.removeEventListener('orientationchange', handleOrientation);
            window.removeEventListener('resize', handleOrientation);
        };
    }, []);

    return (
        <div className={isImmersive ? "immersive-wrapper" : "standard-wrapper"}>
            <div className="video-section">
                {/* playsinline=1 is mandatory to keep our custom UI visible on iOS */}
                <iframe
                    src="https://www.youtube.com/embed/LIVE_VIDEO_ID?autoplay=1&playsinline=1&mute=1"
                    allow="autoplay; encrypted-media; fullscreen"
                    className="full-iframe"
                />
            </div>

            <div className="chat-section">
                <h3>Live Chat</h3>
                <div className="chat-messages">
                    {/* Your chat logic here */}
                    <p>User1: Hello from landscape!</p>
                </div>
            </div>
        </div>
    );
}