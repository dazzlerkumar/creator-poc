"use client";

import React, { useEffect, useState } from "react";
import { useRealtimeStore } from "@/stores/realtime-store";
import { ConnectionStatus } from "@/types/realtime";

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const connectionStatus = useRealtimeStore((state) => state.connectionStatus);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerText, setBannerText] = useState(
    "Connection lost. Reconnecting...",
  );

  useEffect(() => {
    let bannerTimer: NodeJS.Timeout;
    if (connectionStatus === ConnectionStatus.DISCONNECTED) {
      bannerTimer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
    } else if (connectionStatus === ConnectionStatus.CONNECTING) {
      bannerTimer = setTimeout(() => {
        setShowBanner(true);
        setBannerText("Connecting...");
      }, 500);
    } else if (connectionStatus === ConnectionStatus.DENIED) {
      bannerTimer = setTimeout(() => {
        setShowBanner(true);
        setBannerText("Connection denied");
      }, 2000);
    } else {
      bannerTimer = setTimeout(() => {
        setShowBanner(false);
      }, 0);
    }
    return () => clearTimeout(bannerTimer);
  }, [connectionStatus]);

  return (
    <>
      {showBanner && (
        <div
          className={`text-destructive-foreground text-center py-2 text-xs font-semibold select-none fixed w-full top-0 z-50 shadow-2xl ${connectionStatus === ConnectionStatus.CONNECTED
            ? "bg-green-500"
            : "bg-destructive"
            }`}
        >
          {bannerText}
        </div>
      )}
      {children}
    </>
  );
}
