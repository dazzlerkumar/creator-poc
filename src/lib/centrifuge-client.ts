import { Centrifuge as CentrifugeProtobuf } from "centrifuge/build/protobuf";
import { Centrifuge as CentrifugeJson } from "centrifuge";
import { Writer } from "protobufjs/minimal";

export const USE_PROTOBUF = true;

type ActiveCentrifuge = typeof USE_PROTOBUF extends true ? CentrifugeProtobuf : CentrifugeJson;

let centrifugeInstance: ActiveCentrifuge | null = null;
let currentOptions: { videoBroadcastId?: string; userId?: string | undefined } =
  {};

export interface CentrifugeAudienceOptions {
  videoBroadcastId: string;
  userId?: string;
  displayName?: string;
}

export const centrifugeClient = {
  get: (): ActiveCentrifuge | null => centrifugeInstance,
  createAudience: (options: CentrifugeAudienceOptions) => {
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
      // Encode AudienceConnectData as protobuf (field 1=video_broadcast_id, 2=user_id, 3=display_name)
      const writer = Writer.create();
      writer.uint32(0x0a).string(options.videoBroadcastId); // field 1, wire type 2
      writer.uint32(0x12).string(options.userId ?? "guest"); // field 2, wire type 2
      writer.uint32(0x1a).string(options.displayName ?? "Guest"); // field 3, wire type 2
      const connectDataBytes = writer.finish();

      const centrifugeOptions = {
        minReconnectDelay: 500,
        maxReconnectDelay: 15000,
        data: connectDataBytes,
      };

      centrifugeInstance = (USE_PROTOBUF
        ? new CentrifugeProtobuf(wsUrl, centrifugeOptions)
        : new CentrifugeJson(wsUrl, centrifugeOptions)) as ActiveCentrifuge;

      currentOptions = {
        videoBroadcastId: options.videoBroadcastId,
        userId: options.userId,
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
