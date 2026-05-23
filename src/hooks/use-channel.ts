import { useEffect, useState, useRef } from 'react';
import { centrifugeClient } from '@/lib/centrifuge-client';
import { useRealtimeStore } from '@/stores/realtime-store';
import { PublicationContext, SubscriptionState, Subscription } from 'centrifuge/build/protobuf';
import { ConnectionStatus } from '@/types/realtime';


interface UseChannelOptions {
  onPublication?: (ctx: PublicationContext) => void;
}

export function useChannel(channelName: string | null | undefined, options?: UseChannelOptions) {
  const [subState, setSubState] = useState<SubscriptionState>('unsubscribed' as SubscriptionState);
  const setChannelStatus = useRealtimeStore((state) => state.setChannelStatus);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    let initTimer: NodeJS.Timeout;

    if (!channelName) {
      initTimer = setTimeout(() => setSubscription(null), 0);
      return () => clearTimeout(initTimer);
    }
    
    const client = centrifugeClient.get();
    if (!client) {
      initTimer = setTimeout(() => setSubscription(null), 0);
      return () => clearTimeout(initTimer);
    }

    let sub = client.getSubscription(channelName);
    if (!sub) {
      sub = client.newSubscription(channelName);
    }
    initTimer = setTimeout(() => setSubscription(sub), 0);

    const mapState = (state: string): ConnectionStatus => {
      switch (state) {
        case 'subscribing':
          return ConnectionStatus.CONNECTING;
        case 'subscribed':
          return ConnectionStatus.CONNECTED;
        case 'unsubscribed':
        default:
          return ConnectionStatus.DISCONNECTED;
      }
    };

    const handleState = (ctx: { newState: SubscriptionState, oldState: SubscriptionState }) => {
      setSubState(ctx.newState);
      setChannelStatus(channelName, mapState(ctx.newState));
    };

    const handlePublication = (ctx: PublicationContext) => {
      if (optionsRef.current?.onPublication) {
        optionsRef.current.onPublication(ctx);
      }
    };

    const handleError = (ctx: { error: { code: number, message: string } }) => {
      if (ctx.error.code === 102 || ctx.error.message.includes('permission denied')) {
        setChannelStatus(channelName, ConnectionStatus.DENIED);
      }
    };

    sub.on('state', handleState);
    sub.on('publication', handlePublication);
    sub.on('error', handleError);

    sub.subscribe();

    return () => {
      clearTimeout(initTimer);
      sub.off('state', handleState);
      sub.off('publication', handlePublication);
      sub.off('error', handleError);
      
      sub.unsubscribe();
      client.removeSubscription(sub);
    };
  }, [channelName, setChannelStatus]);

  return { subscription, state: subState };
}
