import { Centrifuge as CentrifugeProtobuf } from "centrifuge/build/protobuf";
import Cookies from "js-cookie";
import { COOKIES_KEYS } from "@/lib/constants";
import { useAuthStore } from "@/stores/auth-store";
import { creator_stage } from "@/lib/proto";

type CentrifugeInstance = CentrifugeProtobuf;

let centrifugeInstance: CentrifugeInstance | null = null;
let currentOptions: { videoBroadcastId?: string; userId?: string } = {};

export interface CentrifugeAudienceOptions {
  videoBroadcastId: string;
  userId?: string;
  displayName?: string;
  token?: string;
}

export const centrifugeClient = {
  get: (): CentrifugeInstance | null => centrifugeInstance,

  createAudience: (options: CentrifugeAudienceOptions): CentrifugeInstance | null => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    if (!wsUrl) {
      console.error("WS_URL not configured");
      return null;
    }

    if (
      centrifugeInstance &&
      (currentOptions.videoBroadcastId !== options.videoBroadcastId ||
        currentOptions.userId !== options.userId)
    ) {
      centrifugeInstance.disconnect();
      centrifugeInstance = null;
    }

    if (!centrifugeInstance) {
      const token =
        options.token ||
        Cookies.get(COOKIES_KEYS.ACCESS_TOKEN) ||
        useAuthStore.getState().jwt;

      const connectData = creator_stage.realtime.v1.AudienceConnectData.encode({
        videoBroadcastId: options.videoBroadcastId,
        userId: options.userId ?? "guest",
        displayName: options.displayName ?? "Guest",
      }).finish();

      centrifugeInstance = new CentrifugeProtobuf(wsUrl, {
        minReconnectDelay: 500,
        maxReconnectDelay: 15000,
        data: connectData,
        ...(token ? { token } : {}),
      });

      currentOptions = {
        videoBroadcastId: options.videoBroadcastId,
        ...(options.userId ? { userId: options.userId } : {}),
      };
    }

    return centrifugeInstance;
  },

  destroy: () => {
    if (centrifugeInstance) {
      centrifugeInstance.disconnect();
      centrifugeInstance = null;
      currentOptions = {};
    }
  },
};
