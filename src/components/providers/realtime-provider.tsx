'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useRealtimeStore } from '@/stores/realtime-store';
import { centrifugeClient } from '@/lib/centrifuge-client';
import { ConnectionStatus } from '@/types/realtime';

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const jwt = useAuthStore((state) => state.jwt);
  const { setConnectionStatus, reset } = useRealtimeStore();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!jwt) {
      centrifugeClient.destroy();
      reset();
      return;
    }

    const client = centrifugeClient.create(jwt);

    client.on('connecting', () => setConnectionStatus(ConnectionStatus.CONNECTING));
    client.on('connected', () => {
      setConnectionStatus(ConnectionStatus.CONNECTED);
      setShowBanner(false);
    });
    client.on('disconnected', () => {
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    });

    client.connect();

    let bannerTimer: NodeJS.Timeout;
    const handleStateChange = () => {
      if (client.state === 'disconnected') {
        bannerTimer = setTimeout(() => {
          if (client.state === 'disconnected') setShowBanner(true);
        }, 2000);
      } else {
        clearTimeout(bannerTimer);
        setShowBanner(false);
      }
    };

    client.on('state', handleStateChange);

    return () => {
      clearTimeout(bannerTimer);
      centrifugeClient.destroy();
      reset();
    };
  }, [jwt, setConnectionStatus, reset]);

  return (
    <>
      {showBanner && (
        <div className="bg-destructive text-destructive-foreground text-center py-2 text-xs font-semibold select-none">
          Connection lost. Reconnecting...
        </div>
      )}
      {children}
    </>
  );
}
