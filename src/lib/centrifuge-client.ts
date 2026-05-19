import { Centrifuge } from 'centrifuge/build/protobuf';

let centrifugeInstance: Centrifuge | null = null;

export const centrifugeClient = {
  get: () => centrifugeInstance,
  create: (token: string) => {
    if (centrifugeInstance) return centrifugeInstance;
    centrifugeInstance = new Centrifuge(process.env.NEXT_PUBLIC_WS_URL || '', {
      token,
      minReconnectDelay: 500,
      maxReconnectDelay: 15000,
    });
    return centrifugeInstance;
  },
  destroy: () => {
    if (centrifugeInstance) {
      centrifugeInstance.disconnect();
      centrifugeInstance = null;
    }
  },
};
