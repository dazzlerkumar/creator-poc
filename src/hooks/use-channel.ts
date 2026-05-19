import { useEffect, useState, useMemo } from 'react';
import { centrifugeClient } from '@/lib/centrifuge-client';
import { useRealtimeStore } from '@/stores/realtime-store';
import { PublicationContext, SubscriptionState } from 'centrifuge/build/protobuf';
import { ConnectionStatus } from '@/types/realtime';

interface UseChannelOptions {
  onPublication?: (ctx: PublicationContext) => void;
}

export function useChannel(channelName: string | null, options?: UseChannelOptions) {
  const [subState, setSubState] = useState<SubscriptionState>('unsubscribed' as SubscriptionState);
  const setChannelStatus = useRealtimeStore((state) => state.setChannelStatus);

  const subscription = useMemo(() => {
    if (!channelName) return null;
    const client = centrifugeClient.get();
    if (!client) return null;
    return client.newSubscription(channelName);
  }, [channelName]);

  const client = channelName ? centrifugeClient.get() : null;

  useEffect(() => {
    if (!subscription || !channelName || !client) return;

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

    subscription.on('state', (ctx) => {
      setSubState(ctx.newState);
      setChannelStatus(channelName, mapState(ctx.newState));
    });

    if (options?.onPublication) {
      subscription.on('publication', options.onPublication);
    }

    subscription.on('error', (ctx) => {
      if (ctx.error.code === 102 || ctx.error.message.includes('permission denied')) {
        setChannelStatus(channelName, ConnectionStatus.DENIED);
      }
    });

    subscription.subscribe();

    return () => {
      subscription.unsubscribe();
      client.removeSubscription(subscription);
    };
  }, [subscription, channelName, client, options?.onPublication, setChannelStatus]);

  return { subscription, state: subState };
}

