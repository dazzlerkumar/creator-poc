import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace creator_stage. */
export namespace creator_stage {

    /** Namespace realtime. */
    namespace realtime {

        /** Namespace v1. */
        namespace v1 {

            /** AudienceIngestRoute enum. */
            enum AudienceIngestRoute {

                /** AUDIENCE_INGEST_ROUTE_UNSPECIFIED value */
                AUDIENCE_INGEST_ROUTE_UNSPECIFIED = 0,

                /** AUDIENCE_INGEST_ROUTE_PEER value */
                AUDIENCE_INGEST_ROUTE_PEER = 1,

                /** AUDIENCE_INGEST_ROUTE_DM value */
                AUDIENCE_INGEST_ROUTE_DM = 2
            }

            /**
             * Properties of an AudienceChatMessage.
             * @deprecated Use creator_stage.realtime.v1.AudienceChatMessage.$Properties instead.
             */
            interface IAudienceChatMessage extends creator_stage.realtime.v1.AudienceChatMessage.$Properties {
            }

            /** Represents an AudienceChatMessage. */
            class AudienceChatMessage {

                /**
                 * Constructs a new AudienceChatMessage.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.AudienceChatMessage.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** AudienceChatMessage id. */
                id: string;

                /** AudienceChatMessage sentAt. */
                sentAt?: (google.protobuf.Timestamp.$Properties|null);

                /** AudienceChatMessage body. */
                body: string;

                /** AudienceChatMessage userId. */
                userId: string;

                /** AudienceChatMessage displayName. */
                displayName: string;

                /** AudienceChatMessage videoBroadcastId. */
                videoBroadcastId: string;

                /** AudienceChatMessage ingestRoute. */
                ingestRoute: creator_stage.realtime.v1.AudienceIngestRoute;

                /**
                 * Creates a new AudienceChatMessage instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AudienceChatMessage instance
                 */
                static create(properties: creator_stage.realtime.v1.AudienceChatMessage.$Shape): creator_stage.realtime.v1.AudienceChatMessage & creator_stage.realtime.v1.AudienceChatMessage.$Shape;
                static create(properties?: creator_stage.realtime.v1.AudienceChatMessage.$Properties): creator_stage.realtime.v1.AudienceChatMessage;

                /**
                 * Encodes the specified AudienceChatMessage message. Does not implicitly {@link creator_stage.realtime.v1.AudienceChatMessage.verify|verify} messages.
                 * @param message AudienceChatMessage message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.AudienceChatMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AudienceChatMessage message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.AudienceChatMessage.verify|verify} messages.
                 * @param message AudienceChatMessage message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.AudienceChatMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AudienceChatMessage message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.AudienceChatMessage & creator_stage.realtime.v1.AudienceChatMessage.$Shape} AudienceChatMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.AudienceChatMessage & creator_stage.realtime.v1.AudienceChatMessage.$Shape;

                /**
                 * Decodes an AudienceChatMessage message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.AudienceChatMessage & creator_stage.realtime.v1.AudienceChatMessage.$Shape} AudienceChatMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.AudienceChatMessage & creator_stage.realtime.v1.AudienceChatMessage.$Shape;

                /**
                 * Verifies an AudienceChatMessage message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AudienceChatMessage message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AudienceChatMessage
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.AudienceChatMessage;

                /**
                 * Creates a plain object from an AudienceChatMessage message. Also converts values to other types if specified.
                 * @param message AudienceChatMessage
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.AudienceChatMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AudienceChatMessage to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for AudienceChatMessage
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace AudienceChatMessage {

                /** Properties of an AudienceChatMessage. */
                interface $Properties {

                    /** AudienceChatMessage id */
                    id?: (string|null);

                    /** AudienceChatMessage sentAt */
                    sentAt?: (google.protobuf.Timestamp.$Properties|null);

                    /** AudienceChatMessage body */
                    body?: (string|null);

                    /** AudienceChatMessage userId */
                    userId?: (string|null);

                    /** AudienceChatMessage displayName */
                    displayName?: (string|null);

                    /** AudienceChatMessage videoBroadcastId */
                    videoBroadcastId?: (string|null);

                    /** AudienceChatMessage ingestRoute */
                    ingestRoute?: (creator_stage.realtime.v1.AudienceIngestRoute|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an AudienceChatMessage. */
                type $Shape = creator_stage.realtime.v1.AudienceChatMessage.$Properties;
            }

            /**
             * Properties of an AudienceQuizResponse.
             * @deprecated Use creator_stage.realtime.v1.AudienceQuizResponse.$Properties instead.
             */
            interface IAudienceQuizResponse extends creator_stage.realtime.v1.AudienceQuizResponse.$Properties {
            }

            /** Represents an AudienceQuizResponse. */
            class AudienceQuizResponse {

                /**
                 * Constructs a new AudienceQuizResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.AudienceQuizResponse.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** AudienceQuizResponse id. */
                id: string;

                /** AudienceQuizResponse sentAt. */
                sentAt?: (google.protobuf.Timestamp.$Properties|null);

                /** AudienceQuizResponse quizId. */
                quizId: string;

                /** AudienceQuizResponse optionId. */
                optionId: string;

                /**
                 * Creates a new AudienceQuizResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AudienceQuizResponse instance
                 */
                static create(properties: creator_stage.realtime.v1.AudienceQuizResponse.$Shape): creator_stage.realtime.v1.AudienceQuizResponse & creator_stage.realtime.v1.AudienceQuizResponse.$Shape;
                static create(properties?: creator_stage.realtime.v1.AudienceQuizResponse.$Properties): creator_stage.realtime.v1.AudienceQuizResponse;

                /**
                 * Encodes the specified AudienceQuizResponse message. Does not implicitly {@link creator_stage.realtime.v1.AudienceQuizResponse.verify|verify} messages.
                 * @param message AudienceQuizResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.AudienceQuizResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AudienceQuizResponse message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.AudienceQuizResponse.verify|verify} messages.
                 * @param message AudienceQuizResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.AudienceQuizResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AudienceQuizResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.AudienceQuizResponse & creator_stage.realtime.v1.AudienceQuizResponse.$Shape} AudienceQuizResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.AudienceQuizResponse & creator_stage.realtime.v1.AudienceQuizResponse.$Shape;

                /**
                 * Decodes an AudienceQuizResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.AudienceQuizResponse & creator_stage.realtime.v1.AudienceQuizResponse.$Shape} AudienceQuizResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.AudienceQuizResponse & creator_stage.realtime.v1.AudienceQuizResponse.$Shape;

                /**
                 * Verifies an AudienceQuizResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AudienceQuizResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AudienceQuizResponse
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.AudienceQuizResponse;

                /**
                 * Creates a plain object from an AudienceQuizResponse message. Also converts values to other types if specified.
                 * @param message AudienceQuizResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.AudienceQuizResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AudienceQuizResponse to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for AudienceQuizResponse
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace AudienceQuizResponse {

                /** Properties of an AudienceQuizResponse. */
                interface $Properties {

                    /** AudienceQuizResponse id */
                    id?: (string|null);

                    /** AudienceQuizResponse sentAt */
                    sentAt?: (google.protobuf.Timestamp.$Properties|null);

                    /** AudienceQuizResponse quizId */
                    quizId?: (string|null);

                    /** AudienceQuizResponse optionId */
                    optionId?: (string|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an AudienceQuizResponse. */
                type $Shape = creator_stage.realtime.v1.AudienceQuizResponse.$Properties;
            }

            /**
             * Properties of an AudienceVideoMetadata.
             * @deprecated Use creator_stage.realtime.v1.AudienceVideoMetadata.$Properties instead.
             */
            interface IAudienceVideoMetadata extends creator_stage.realtime.v1.AudienceVideoMetadata.$Properties {
            }

            /** Represents an AudienceVideoMetadata. */
            class AudienceVideoMetadata {

                /**
                 * Constructs a new AudienceVideoMetadata.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.AudienceVideoMetadata.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** AudienceVideoMetadata id. */
                id: string;

                /** AudienceVideoMetadata sentAt. */
                sentAt?: (google.protobuf.Timestamp.$Properties|null);

                /** AudienceVideoMetadata liveActiveConnections. */
                liveActiveConnections: number;

                /**
                 * Creates a new AudienceVideoMetadata instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AudienceVideoMetadata instance
                 */
                static create(properties: creator_stage.realtime.v1.AudienceVideoMetadata.$Shape): creator_stage.realtime.v1.AudienceVideoMetadata & creator_stage.realtime.v1.AudienceVideoMetadata.$Shape;
                static create(properties?: creator_stage.realtime.v1.AudienceVideoMetadata.$Properties): creator_stage.realtime.v1.AudienceVideoMetadata;

                /**
                 * Encodes the specified AudienceVideoMetadata message. Does not implicitly {@link creator_stage.realtime.v1.AudienceVideoMetadata.verify|verify} messages.
                 * @param message AudienceVideoMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.AudienceVideoMetadata.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AudienceVideoMetadata message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.AudienceVideoMetadata.verify|verify} messages.
                 * @param message AudienceVideoMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.AudienceVideoMetadata.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AudienceVideoMetadata message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.AudienceVideoMetadata & creator_stage.realtime.v1.AudienceVideoMetadata.$Shape} AudienceVideoMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.AudienceVideoMetadata & creator_stage.realtime.v1.AudienceVideoMetadata.$Shape;

                /**
                 * Decodes an AudienceVideoMetadata message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.AudienceVideoMetadata & creator_stage.realtime.v1.AudienceVideoMetadata.$Shape} AudienceVideoMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.AudienceVideoMetadata & creator_stage.realtime.v1.AudienceVideoMetadata.$Shape;

                /**
                 * Verifies an AudienceVideoMetadata message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AudienceVideoMetadata message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AudienceVideoMetadata
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.AudienceVideoMetadata;

                /**
                 * Creates a plain object from an AudienceVideoMetadata message. Also converts values to other types if specified.
                 * @param message AudienceVideoMetadata
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.AudienceVideoMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AudienceVideoMetadata to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for AudienceVideoMetadata
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace AudienceVideoMetadata {

                /** Properties of an AudienceVideoMetadata. */
                interface $Properties {

                    /** AudienceVideoMetadata id */
                    id?: (string|null);

                    /** AudienceVideoMetadata sentAt */
                    sentAt?: (google.protobuf.Timestamp.$Properties|null);

                    /** AudienceVideoMetadata liveActiveConnections */
                    liveActiveConnections?: (number|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an AudienceVideoMetadata. */
                type $Shape = creator_stage.realtime.v1.AudienceVideoMetadata.$Properties;
            }

            /** AudienceMessageType enum. */
            enum AudienceMessageType {

                /** TYPE_AUDIENCE_MESSAGE value */
                TYPE_AUDIENCE_MESSAGE = 0,

                /** TYPE_POLL_RESPONSE value */
                TYPE_POLL_RESPONSE = 1,

                /** TYPE_VIDEO_METADATA value */
                TYPE_VIDEO_METADATA = 2
            }

            /**
             * Properties of an AudienceChatEvent.
             * @deprecated Use creator_stage.realtime.v1.AudienceChatEvent.$Properties instead.
             */
            interface IAudienceChatEvent extends creator_stage.realtime.v1.AudienceChatEvent.$Properties {
            }

            /** Represents an AudienceChatEvent. */
            class AudienceChatEvent {

                /**
                 * Constructs a new AudienceChatEvent.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.AudienceChatEvent.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** AudienceChatEvent role. */
                role: creator_stage.realtime.v1.Role;

                /** AudienceChatEvent type. */
                type: creator_stage.realtime.v1.AudienceMessageType;

                /** AudienceChatEvent chatMessage. */
                chatMessage?: (creator_stage.realtime.v1.AudienceChatMessage.$Properties|null);

                /** AudienceChatEvent quizResponse. */
                quizResponse?: (creator_stage.realtime.v1.AudienceQuizResponse.$Properties|null);

                /** AudienceChatEvent body. */
                body?: ("chatMessage"|"quizResponse");

                /**
                 * Creates a new AudienceChatEvent instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AudienceChatEvent instance
                 */
                static create(properties: creator_stage.realtime.v1.AudienceChatEvent.$Shape): creator_stage.realtime.v1.AudienceChatEvent & creator_stage.realtime.v1.AudienceChatEvent.$Shape;
                static create(properties?: creator_stage.realtime.v1.AudienceChatEvent.$Properties): creator_stage.realtime.v1.AudienceChatEvent;

                /**
                 * Encodes the specified AudienceChatEvent message. Does not implicitly {@link creator_stage.realtime.v1.AudienceChatEvent.verify|verify} messages.
                 * @param message AudienceChatEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.AudienceChatEvent.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AudienceChatEvent message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.AudienceChatEvent.verify|verify} messages.
                 * @param message AudienceChatEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.AudienceChatEvent.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AudienceChatEvent message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.AudienceChatEvent & creator_stage.realtime.v1.AudienceChatEvent.$Shape} AudienceChatEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.AudienceChatEvent & creator_stage.realtime.v1.AudienceChatEvent.$Shape;

                /**
                 * Decodes an AudienceChatEvent message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.AudienceChatEvent & creator_stage.realtime.v1.AudienceChatEvent.$Shape} AudienceChatEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.AudienceChatEvent & creator_stage.realtime.v1.AudienceChatEvent.$Shape;

                /**
                 * Verifies an AudienceChatEvent message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AudienceChatEvent message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AudienceChatEvent
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.AudienceChatEvent;

                /**
                 * Creates a plain object from an AudienceChatEvent message. Also converts values to other types if specified.
                 * @param message AudienceChatEvent
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.AudienceChatEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AudienceChatEvent to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for AudienceChatEvent
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace AudienceChatEvent {

                /** Properties of an AudienceChatEvent. */
                interface $Properties {

                    /** AudienceChatEvent role */
                    role?: (creator_stage.realtime.v1.Role|null);

                    /** AudienceChatEvent type */
                    type?: (creator_stage.realtime.v1.AudienceMessageType|null);

                    /** AudienceChatEvent chatMessage */
                    chatMessage?: (creator_stage.realtime.v1.AudienceChatMessage.$Properties|null);

                    /** AudienceChatEvent quizResponse */
                    quizResponse?: (creator_stage.realtime.v1.AudienceQuizResponse.$Properties|null);

                    /** AudienceChatEvent body */
                    body?: ("chatMessage"|"quizResponse");

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Narrowed shape of an AudienceChatEvent. */
                type $Shape = {
  role?: creator_stage.realtime.v1.Role|null;
  type?: creator_stage.realtime.v1.AudienceMessageType|null;
  chatMessage?: creator_stage.realtime.v1.AudienceChatMessage.$Shape|null;
  quizResponse?: creator_stage.realtime.v1.AudienceQuizResponse.$Shape|null;
  $unknowns?: Uint8Array[];
} & (
  ({ body?: undefined; chatMessage?: null; quizResponse?: null }|{ body?: "chatMessage"; chatMessage: creator_stage.realtime.v1.AudienceChatMessage.$Shape; quizResponse?: null }|{ body?: "quizResponse"; chatMessage?: null; quizResponse: creator_stage.realtime.v1.AudienceQuizResponse.$Shape })
);
            }

            /**
             * Properties of a BatchedChatMessages.
             * @deprecated Use creator_stage.realtime.v1.BatchedChatMessages.$Properties instead.
             */
            interface IBatchedChatMessages extends creator_stage.realtime.v1.BatchedChatMessages.$Properties {
            }

            /** Represents a BatchedChatMessages. */
            class BatchedChatMessages {

                /**
                 * Constructs a new BatchedChatMessages.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.BatchedChatMessages.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** BatchedChatMessages liveActiveConnections. */
                liveActiveConnections: number;

                /** BatchedChatMessages messages. */
                messages: creator_stage.realtime.v1.AudienceChatMessage.$Properties[];

                /**
                 * Creates a new BatchedChatMessages instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BatchedChatMessages instance
                 */
                static create(properties: creator_stage.realtime.v1.BatchedChatMessages.$Shape): creator_stage.realtime.v1.BatchedChatMessages & creator_stage.realtime.v1.BatchedChatMessages.$Shape;
                static create(properties?: creator_stage.realtime.v1.BatchedChatMessages.$Properties): creator_stage.realtime.v1.BatchedChatMessages;

                /**
                 * Encodes the specified BatchedChatMessages message. Does not implicitly {@link creator_stage.realtime.v1.BatchedChatMessages.verify|verify} messages.
                 * @param message BatchedChatMessages message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.BatchedChatMessages.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BatchedChatMessages message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.BatchedChatMessages.verify|verify} messages.
                 * @param message BatchedChatMessages message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.BatchedChatMessages.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BatchedChatMessages message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.BatchedChatMessages & creator_stage.realtime.v1.BatchedChatMessages.$Shape} BatchedChatMessages
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.BatchedChatMessages & creator_stage.realtime.v1.BatchedChatMessages.$Shape;

                /**
                 * Decodes a BatchedChatMessages message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.BatchedChatMessages & creator_stage.realtime.v1.BatchedChatMessages.$Shape} BatchedChatMessages
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.BatchedChatMessages & creator_stage.realtime.v1.BatchedChatMessages.$Shape;

                /**
                 * Verifies a BatchedChatMessages message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BatchedChatMessages message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BatchedChatMessages
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.BatchedChatMessages;

                /**
                 * Creates a plain object from a BatchedChatMessages message. Also converts values to other types if specified.
                 * @param message BatchedChatMessages
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.BatchedChatMessages, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BatchedChatMessages to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for BatchedChatMessages
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace BatchedChatMessages {

                /** Properties of a BatchedChatMessages. */
                interface $Properties {

                    /** BatchedChatMessages liveActiveConnections */
                    liveActiveConnections?: (number|null);

                    /** BatchedChatMessages messages */
                    messages?: (creator_stage.realtime.v1.AudienceChatMessage.$Properties[]|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a BatchedChatMessages. */
                type $Shape = creator_stage.realtime.v1.BatchedChatMessages.$Properties;
            }

            /**
             * Properties of an AudienceConnectData.
             * @deprecated Use creator_stage.realtime.v1.AudienceConnectData.$Properties instead.
             */
            interface IAudienceConnectData extends creator_stage.realtime.v1.AudienceConnectData.$Properties {
            }

            /** Represents an AudienceConnectData. */
            class AudienceConnectData {

                /**
                 * Constructs a new AudienceConnectData.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.AudienceConnectData.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** AudienceConnectData videoBroadcastId. */
                videoBroadcastId: string;

                /** AudienceConnectData userId. */
                userId: string;

                /** AudienceConnectData displayName. */
                displayName: string;

                /**
                 * Creates a new AudienceConnectData instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AudienceConnectData instance
                 */
                static create(properties: creator_stage.realtime.v1.AudienceConnectData.$Shape): creator_stage.realtime.v1.AudienceConnectData & creator_stage.realtime.v1.AudienceConnectData.$Shape;
                static create(properties?: creator_stage.realtime.v1.AudienceConnectData.$Properties): creator_stage.realtime.v1.AudienceConnectData;

                /**
                 * Encodes the specified AudienceConnectData message. Does not implicitly {@link creator_stage.realtime.v1.AudienceConnectData.verify|verify} messages.
                 * @param message AudienceConnectData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.AudienceConnectData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AudienceConnectData message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.AudienceConnectData.verify|verify} messages.
                 * @param message AudienceConnectData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.AudienceConnectData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AudienceConnectData message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.AudienceConnectData & creator_stage.realtime.v1.AudienceConnectData.$Shape} AudienceConnectData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.AudienceConnectData & creator_stage.realtime.v1.AudienceConnectData.$Shape;

                /**
                 * Decodes an AudienceConnectData message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.AudienceConnectData & creator_stage.realtime.v1.AudienceConnectData.$Shape} AudienceConnectData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.AudienceConnectData & creator_stage.realtime.v1.AudienceConnectData.$Shape;

                /**
                 * Verifies an AudienceConnectData message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AudienceConnectData message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AudienceConnectData
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.AudienceConnectData;

                /**
                 * Creates a plain object from an AudienceConnectData message. Also converts values to other types if specified.
                 * @param message AudienceConnectData
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.AudienceConnectData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AudienceConnectData to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for AudienceConnectData
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace AudienceConnectData {

                /** Properties of an AudienceConnectData. */
                interface $Properties {

                    /** AudienceConnectData videoBroadcastId */
                    videoBroadcastId?: (string|null);

                    /** AudienceConnectData userId */
                    userId?: (string|null);

                    /** AudienceConnectData displayName */
                    displayName?: (string|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an AudienceConnectData. */
                type $Shape = creator_stage.realtime.v1.AudienceConnectData.$Properties;
            }

            /** Role enum. */
            enum Role {

                /** ROLE_UNSPECIFIED value */
                ROLE_UNSPECIFIED = 0,

                /** ROLE_CREATOR value */
                ROLE_CREATOR = 1,

                /** ROLE_TEAM value */
                ROLE_TEAM = 2,

                /** ROLE_AUDIENCE value */
                ROLE_AUDIENCE = 3
            }

            /** Type enum. */
            enum Type {

                /** TYPE_CREATOR_MESSAGE value */
                TYPE_CREATOR_MESSAGE = 0,

                /** TYPE_PIN value */
                TYPE_PIN = 1,

                /** TYPE_UNPIN value */
                TYPE_UNPIN = 2,

                /** TYPE_CTA_PUSH value */
                TYPE_CTA_PUSH = 3,

                /** TYPE_CTA_DISMISS value */
                TYPE_CTA_DISMISS = 4,

                /** TYPE_QUIZ_START value */
                TYPE_QUIZ_START = 5,

                /** TYPE_QUIZ_END value */
                TYPE_QUIZ_END = 6
            }

            /**
             * Properties of a CreatorChatMessage.
             * @deprecated Use creator_stage.realtime.v1.CreatorChatMessage.$Properties instead.
             */
            interface ICreatorChatMessage extends creator_stage.realtime.v1.CreatorChatMessage.$Properties {
            }

            /** Represents a CreatorChatMessage. */
            class CreatorChatMessage {

                /**
                 * Constructs a new CreatorChatMessage.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.CreatorChatMessage.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** CreatorChatMessage id. */
                id: string;

                /** CreatorChatMessage message. */
                message: string;

                /** CreatorChatMessage audienceMessageId. */
                audienceMessageId?: (string|null);

                /**
                 * Creates a new CreatorChatMessage instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CreatorChatMessage instance
                 */
                static create(properties: creator_stage.realtime.v1.CreatorChatMessage.$Shape): creator_stage.realtime.v1.CreatorChatMessage & creator_stage.realtime.v1.CreatorChatMessage.$Shape;
                static create(properties?: creator_stage.realtime.v1.CreatorChatMessage.$Properties): creator_stage.realtime.v1.CreatorChatMessage;

                /**
                 * Encodes the specified CreatorChatMessage message. Does not implicitly {@link creator_stage.realtime.v1.CreatorChatMessage.verify|verify} messages.
                 * @param message CreatorChatMessage message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.CreatorChatMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CreatorChatMessage message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.CreatorChatMessage.verify|verify} messages.
                 * @param message CreatorChatMessage message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.CreatorChatMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CreatorChatMessage message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.CreatorChatMessage & creator_stage.realtime.v1.CreatorChatMessage.$Shape} CreatorChatMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.CreatorChatMessage & creator_stage.realtime.v1.CreatorChatMessage.$Shape;

                /**
                 * Decodes a CreatorChatMessage message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.CreatorChatMessage & creator_stage.realtime.v1.CreatorChatMessage.$Shape} CreatorChatMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.CreatorChatMessage & creator_stage.realtime.v1.CreatorChatMessage.$Shape;

                /**
                 * Verifies a CreatorChatMessage message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CreatorChatMessage message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CreatorChatMessage
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.CreatorChatMessage;

                /**
                 * Creates a plain object from a CreatorChatMessage message. Also converts values to other types if specified.
                 * @param message CreatorChatMessage
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.CreatorChatMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CreatorChatMessage to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for CreatorChatMessage
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace CreatorChatMessage {

                /** Properties of a CreatorChatMessage. */
                interface $Properties {

                    /** CreatorChatMessage id */
                    id?: (string|null);

                    /** CreatorChatMessage message */
                    message?: (string|null);

                    /** CreatorChatMessage audienceMessageId */
                    audienceMessageId?: (string|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a CreatorChatMessage. */
                type $Shape = creator_stage.realtime.v1.CreatorChatMessage.$Properties;
            }

            /**
             * Properties of a Pin.
             * @deprecated Use creator_stage.realtime.v1.Pin.$Properties instead.
             */
            interface IPin extends creator_stage.realtime.v1.Pin.$Properties {
            }

            /** Represents a Pin. */
            class Pin {

                /**
                 * Constructs a new Pin.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.Pin.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** Pin id. */
                id: string;

                /** Pin message. */
                message: string;

                /**
                 * Creates a new Pin instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Pin instance
                 */
                static create(properties: creator_stage.realtime.v1.Pin.$Shape): creator_stage.realtime.v1.Pin & creator_stage.realtime.v1.Pin.$Shape;
                static create(properties?: creator_stage.realtime.v1.Pin.$Properties): creator_stage.realtime.v1.Pin;

                /**
                 * Encodes the specified Pin message. Does not implicitly {@link creator_stage.realtime.v1.Pin.verify|verify} messages.
                 * @param message Pin message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.Pin.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Pin message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.Pin.verify|verify} messages.
                 * @param message Pin message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.Pin.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Pin message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.Pin & creator_stage.realtime.v1.Pin.$Shape} Pin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.Pin & creator_stage.realtime.v1.Pin.$Shape;

                /**
                 * Decodes a Pin message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.Pin & creator_stage.realtime.v1.Pin.$Shape} Pin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.Pin & creator_stage.realtime.v1.Pin.$Shape;

                /**
                 * Verifies a Pin message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Pin message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Pin
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.Pin;

                /**
                 * Creates a plain object from a Pin message. Also converts values to other types if specified.
                 * @param message Pin
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.Pin, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Pin to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for Pin
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace Pin {

                /** Properties of a Pin. */
                interface $Properties {

                    /** Pin id */
                    id?: (string|null);

                    /** Pin message */
                    message?: (string|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a Pin. */
                type $Shape = creator_stage.realtime.v1.Pin.$Properties;
            }

            /**
             * Properties of an Unpin.
             * @deprecated Use creator_stage.realtime.v1.Unpin.$Properties instead.
             */
            interface IUnpin extends creator_stage.realtime.v1.Unpin.$Properties {
            }

            /** Represents an Unpin. */
            class Unpin {

                /**
                 * Constructs a new Unpin.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.Unpin.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** Unpin messageId. */
                messageId: string;

                /**
                 * Creates a new Unpin instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Unpin instance
                 */
                static create(properties: creator_stage.realtime.v1.Unpin.$Shape): creator_stage.realtime.v1.Unpin & creator_stage.realtime.v1.Unpin.$Shape;
                static create(properties?: creator_stage.realtime.v1.Unpin.$Properties): creator_stage.realtime.v1.Unpin;

                /**
                 * Encodes the specified Unpin message. Does not implicitly {@link creator_stage.realtime.v1.Unpin.verify|verify} messages.
                 * @param message Unpin message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.Unpin.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Unpin message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.Unpin.verify|verify} messages.
                 * @param message Unpin message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.Unpin.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Unpin message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.Unpin & creator_stage.realtime.v1.Unpin.$Shape} Unpin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.Unpin & creator_stage.realtime.v1.Unpin.$Shape;

                /**
                 * Decodes an Unpin message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.Unpin & creator_stage.realtime.v1.Unpin.$Shape} Unpin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.Unpin & creator_stage.realtime.v1.Unpin.$Shape;

                /**
                 * Verifies an Unpin message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Unpin message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Unpin
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.Unpin;

                /**
                 * Creates a plain object from an Unpin message. Also converts values to other types if specified.
                 * @param message Unpin
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.Unpin, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Unpin to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for Unpin
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace Unpin {

                /** Properties of an Unpin. */
                interface $Properties {

                    /** Unpin messageId */
                    messageId?: (string|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an Unpin. */
                type $Shape = creator_stage.realtime.v1.Unpin.$Properties;
            }

            /** CtaType enum. */
            enum CtaType {

                /** TYPE_PAYMENT value */
                TYPE_PAYMENT = 0
            }

            /**
             * Properties of a CTAPush.
             * @deprecated Use creator_stage.realtime.v1.CTAPush.$Properties instead.
             */
            interface ICTAPush extends creator_stage.realtime.v1.CTAPush.$Properties {
            }

            /** Represents a CTAPush. */
            class CTAPush {

                /**
                 * Constructs a new CTAPush.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.CTAPush.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** CTAPush id. */
                id: string;

                /** CTAPush label. */
                label: string;

                /** CTAPush url. */
                url: string;

                /** CTAPush type. */
                type: creator_stage.realtime.v1.CtaType;

                /**
                 * Creates a new CTAPush instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CTAPush instance
                 */
                static create(properties: creator_stage.realtime.v1.CTAPush.$Shape): creator_stage.realtime.v1.CTAPush & creator_stage.realtime.v1.CTAPush.$Shape;
                static create(properties?: creator_stage.realtime.v1.CTAPush.$Properties): creator_stage.realtime.v1.CTAPush;

                /**
                 * Encodes the specified CTAPush message. Does not implicitly {@link creator_stage.realtime.v1.CTAPush.verify|verify} messages.
                 * @param message CTAPush message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.CTAPush.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CTAPush message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.CTAPush.verify|verify} messages.
                 * @param message CTAPush message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.CTAPush.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CTAPush message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.CTAPush & creator_stage.realtime.v1.CTAPush.$Shape} CTAPush
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.CTAPush & creator_stage.realtime.v1.CTAPush.$Shape;

                /**
                 * Decodes a CTAPush message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.CTAPush & creator_stage.realtime.v1.CTAPush.$Shape} CTAPush
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.CTAPush & creator_stage.realtime.v1.CTAPush.$Shape;

                /**
                 * Verifies a CTAPush message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CTAPush message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CTAPush
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.CTAPush;

                /**
                 * Creates a plain object from a CTAPush message. Also converts values to other types if specified.
                 * @param message CTAPush
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.CTAPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CTAPush to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for CTAPush
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace CTAPush {

                /** Properties of a CTAPush. */
                interface $Properties {

                    /** CTAPush id */
                    id?: (string|null);

                    /** CTAPush label */
                    label?: (string|null);

                    /** CTAPush url */
                    url?: (string|null);

                    /** CTAPush type */
                    type?: (creator_stage.realtime.v1.CtaType|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a CTAPush. */
                type $Shape = creator_stage.realtime.v1.CTAPush.$Properties;
            }

            /**
             * Properties of a CTADismiss.
             * @deprecated Use creator_stage.realtime.v1.CTADismiss.$Properties instead.
             */
            interface ICTADismiss extends creator_stage.realtime.v1.CTADismiss.$Properties {
            }

            /** Represents a CTADismiss. */
            class CTADismiss {

                /**
                 * Constructs a new CTADismiss.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.CTADismiss.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** CTADismiss messageId. */
                messageId: string;

                /**
                 * Creates a new CTADismiss instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CTADismiss instance
                 */
                static create(properties: creator_stage.realtime.v1.CTADismiss.$Shape): creator_stage.realtime.v1.CTADismiss & creator_stage.realtime.v1.CTADismiss.$Shape;
                static create(properties?: creator_stage.realtime.v1.CTADismiss.$Properties): creator_stage.realtime.v1.CTADismiss;

                /**
                 * Encodes the specified CTADismiss message. Does not implicitly {@link creator_stage.realtime.v1.CTADismiss.verify|verify} messages.
                 * @param message CTADismiss message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.CTADismiss.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CTADismiss message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.CTADismiss.verify|verify} messages.
                 * @param message CTADismiss message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.CTADismiss.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CTADismiss message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.CTADismiss & creator_stage.realtime.v1.CTADismiss.$Shape} CTADismiss
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.CTADismiss & creator_stage.realtime.v1.CTADismiss.$Shape;

                /**
                 * Decodes a CTADismiss message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.CTADismiss & creator_stage.realtime.v1.CTADismiss.$Shape} CTADismiss
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.CTADismiss & creator_stage.realtime.v1.CTADismiss.$Shape;

                /**
                 * Verifies a CTADismiss message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CTADismiss message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CTADismiss
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.CTADismiss;

                /**
                 * Creates a plain object from a CTADismiss message. Also converts values to other types if specified.
                 * @param message CTADismiss
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.CTADismiss, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CTADismiss to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for CTADismiss
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace CTADismiss {

                /** Properties of a CTADismiss. */
                interface $Properties {

                    /** CTADismiss messageId */
                    messageId?: (string|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a CTADismiss. */
                type $Shape = creator_stage.realtime.v1.CTADismiss.$Properties;
            }

            /**
             * Properties of a QuizOption.
             * @deprecated Use creator_stage.realtime.v1.QuizOption.$Properties instead.
             */
            interface IQuizOption extends creator_stage.realtime.v1.QuizOption.$Properties {
            }

            /** Represents a QuizOption. */
            class QuizOption {

                /**
                 * Constructs a new QuizOption.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.QuizOption.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** QuizOption id. */
                id: string;

                /** QuizOption label. */
                label: string;

                /**
                 * Creates a new QuizOption instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns QuizOption instance
                 */
                static create(properties: creator_stage.realtime.v1.QuizOption.$Shape): creator_stage.realtime.v1.QuizOption & creator_stage.realtime.v1.QuizOption.$Shape;
                static create(properties?: creator_stage.realtime.v1.QuizOption.$Properties): creator_stage.realtime.v1.QuizOption;

                /**
                 * Encodes the specified QuizOption message. Does not implicitly {@link creator_stage.realtime.v1.QuizOption.verify|verify} messages.
                 * @param message QuizOption message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.QuizOption.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified QuizOption message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.QuizOption.verify|verify} messages.
                 * @param message QuizOption message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.QuizOption.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a QuizOption message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.QuizOption & creator_stage.realtime.v1.QuizOption.$Shape} QuizOption
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.QuizOption & creator_stage.realtime.v1.QuizOption.$Shape;

                /**
                 * Decodes a QuizOption message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.QuizOption & creator_stage.realtime.v1.QuizOption.$Shape} QuizOption
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.QuizOption & creator_stage.realtime.v1.QuizOption.$Shape;

                /**
                 * Verifies a QuizOption message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a QuizOption message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns QuizOption
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.QuizOption;

                /**
                 * Creates a plain object from a QuizOption message. Also converts values to other types if specified.
                 * @param message QuizOption
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.QuizOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this QuizOption to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for QuizOption
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace QuizOption {

                /** Properties of a QuizOption. */
                interface $Properties {

                    /** QuizOption id */
                    id?: (string|null);

                    /** QuizOption label */
                    label?: (string|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a QuizOption. */
                type $Shape = creator_stage.realtime.v1.QuizOption.$Properties;
            }

            /**
             * Properties of a Quiz.
             * @deprecated Use creator_stage.realtime.v1.Quiz.$Properties instead.
             */
            interface IQuiz extends creator_stage.realtime.v1.Quiz.$Properties {
            }

            /** Represents a Quiz. */
            class Quiz {

                /**
                 * Constructs a new Quiz.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.Quiz.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** Quiz id. */
                id: string;

                /** Quiz quizId. */
                quizId: string;

                /** Quiz videoBroadcastId. */
                videoBroadcastId: string;

                /** Quiz question. */
                question: string;

                /** Quiz options. */
                options: creator_stage.realtime.v1.QuizOption.$Properties[];

                /** Quiz durationSecs. */
                durationSecs: number;

                /**
                 * Creates a new Quiz instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Quiz instance
                 */
                static create(properties: creator_stage.realtime.v1.Quiz.$Shape): creator_stage.realtime.v1.Quiz & creator_stage.realtime.v1.Quiz.$Shape;
                static create(properties?: creator_stage.realtime.v1.Quiz.$Properties): creator_stage.realtime.v1.Quiz;

                /**
                 * Encodes the specified Quiz message. Does not implicitly {@link creator_stage.realtime.v1.Quiz.verify|verify} messages.
                 * @param message Quiz message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.Quiz.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Quiz message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.Quiz.verify|verify} messages.
                 * @param message Quiz message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.Quiz.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Quiz message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.Quiz & creator_stage.realtime.v1.Quiz.$Shape} Quiz
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.Quiz & creator_stage.realtime.v1.Quiz.$Shape;

                /**
                 * Decodes a Quiz message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.Quiz & creator_stage.realtime.v1.Quiz.$Shape} Quiz
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.Quiz & creator_stage.realtime.v1.Quiz.$Shape;

                /**
                 * Verifies a Quiz message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Quiz message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Quiz
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.Quiz;

                /**
                 * Creates a plain object from a Quiz message. Also converts values to other types if specified.
                 * @param message Quiz
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.Quiz, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Quiz to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for Quiz
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace Quiz {

                /** Properties of a Quiz. */
                interface $Properties {

                    /** Quiz id */
                    id?: (string|null);

                    /** Quiz quizId */
                    quizId?: (string|null);

                    /** Quiz videoBroadcastId */
                    videoBroadcastId?: (string|null);

                    /** Quiz question */
                    question?: (string|null);

                    /** Quiz options */
                    options?: (creator_stage.realtime.v1.QuizOption.$Properties[]|null);

                    /** Quiz durationSecs */
                    durationSecs?: (number|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a Quiz. */
                type $Shape = creator_stage.realtime.v1.Quiz.$Properties;
            }

            /**
             * Properties of a QuizOptionCount.
             * @deprecated Use creator_stage.realtime.v1.QuizOptionCount.$Properties instead.
             */
            interface IQuizOptionCount extends creator_stage.realtime.v1.QuizOptionCount.$Properties {
            }

            /** Represents a QuizOptionCount. */
            class QuizOptionCount {

                /**
                 * Constructs a new QuizOptionCount.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.QuizOptionCount.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** QuizOptionCount optionId. */
                optionId: string;

                /** QuizOptionCount count. */
                count: number;

                /**
                 * Creates a new QuizOptionCount instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns QuizOptionCount instance
                 */
                static create(properties: creator_stage.realtime.v1.QuizOptionCount.$Shape): creator_stage.realtime.v1.QuizOptionCount & creator_stage.realtime.v1.QuizOptionCount.$Shape;
                static create(properties?: creator_stage.realtime.v1.QuizOptionCount.$Properties): creator_stage.realtime.v1.QuizOptionCount;

                /**
                 * Encodes the specified QuizOptionCount message. Does not implicitly {@link creator_stage.realtime.v1.QuizOptionCount.verify|verify} messages.
                 * @param message QuizOptionCount message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.QuizOptionCount.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified QuizOptionCount message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.QuizOptionCount.verify|verify} messages.
                 * @param message QuizOptionCount message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.QuizOptionCount.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a QuizOptionCount message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.QuizOptionCount & creator_stage.realtime.v1.QuizOptionCount.$Shape} QuizOptionCount
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.QuizOptionCount & creator_stage.realtime.v1.QuizOptionCount.$Shape;

                /**
                 * Decodes a QuizOptionCount message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.QuizOptionCount & creator_stage.realtime.v1.QuizOptionCount.$Shape} QuizOptionCount
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.QuizOptionCount & creator_stage.realtime.v1.QuizOptionCount.$Shape;

                /**
                 * Verifies a QuizOptionCount message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a QuizOptionCount message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns QuizOptionCount
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.QuizOptionCount;

                /**
                 * Creates a plain object from a QuizOptionCount message. Also converts values to other types if specified.
                 * @param message QuizOptionCount
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.QuizOptionCount, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this QuizOptionCount to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for QuizOptionCount
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace QuizOptionCount {

                /** Properties of a QuizOptionCount. */
                interface $Properties {

                    /** QuizOptionCount optionId */
                    optionId?: (string|null);

                    /** QuizOptionCount count */
                    count?: (number|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a QuizOptionCount. */
                type $Shape = creator_stage.realtime.v1.QuizOptionCount.$Properties;
            }

            /**
             * Properties of a QuizResults.
             * @deprecated Use creator_stage.realtime.v1.QuizResults.$Properties instead.
             */
            interface IQuizResults extends creator_stage.realtime.v1.QuizResults.$Properties {
            }

            /** Represents a QuizResults. */
            class QuizResults {

                /**
                 * Constructs a new QuizResults.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.QuizResults.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** QuizResults id. */
                id: string;

                /** QuizResults quizId. */
                quizId: string;

                /** QuizResults counts. */
                counts: creator_stage.realtime.v1.QuizOptionCount.$Properties[];

                /**
                 * Creates a new QuizResults instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns QuizResults instance
                 */
                static create(properties: creator_stage.realtime.v1.QuizResults.$Shape): creator_stage.realtime.v1.QuizResults & creator_stage.realtime.v1.QuizResults.$Shape;
                static create(properties?: creator_stage.realtime.v1.QuizResults.$Properties): creator_stage.realtime.v1.QuizResults;

                /**
                 * Encodes the specified QuizResults message. Does not implicitly {@link creator_stage.realtime.v1.QuizResults.verify|verify} messages.
                 * @param message QuizResults message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.QuizResults.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified QuizResults message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.QuizResults.verify|verify} messages.
                 * @param message QuizResults message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.QuizResults.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a QuizResults message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.QuizResults & creator_stage.realtime.v1.QuizResults.$Shape} QuizResults
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.QuizResults & creator_stage.realtime.v1.QuizResults.$Shape;

                /**
                 * Decodes a QuizResults message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.QuizResults & creator_stage.realtime.v1.QuizResults.$Shape} QuizResults
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.QuizResults & creator_stage.realtime.v1.QuizResults.$Shape;

                /**
                 * Verifies a QuizResults message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a QuizResults message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns QuizResults
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.QuizResults;

                /**
                 * Creates a plain object from a QuizResults message. Also converts values to other types if specified.
                 * @param message QuizResults
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.QuizResults, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this QuizResults to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for QuizResults
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace QuizResults {

                /** Properties of a QuizResults. */
                interface $Properties {

                    /** QuizResults id */
                    id?: (string|null);

                    /** QuizResults quizId */
                    quizId?: (string|null);

                    /** QuizResults counts */
                    counts?: (creator_stage.realtime.v1.QuizOptionCount.$Properties[]|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a QuizResults. */
                type $Shape = creator_stage.realtime.v1.QuizResults.$Properties;
            }

            /**
             * Properties of a CreatorChatEvent.
             * @deprecated Use creator_stage.realtime.v1.CreatorChatEvent.$Properties instead.
             */
            interface ICreatorChatEvent extends creator_stage.realtime.v1.CreatorChatEvent.$Properties {
            }

            /** Represents a CreatorChatEvent. */
            class CreatorChatEvent {

                /**
                 * Constructs a new CreatorChatEvent.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.CreatorChatEvent.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** CreatorChatEvent role. */
                role: creator_stage.realtime.v1.Role;

                /** CreatorChatEvent type. */
                type: creator_stage.realtime.v1.Type;

                /** CreatorChatEvent sentAt. */
                sentAt?: (google.protobuf.Timestamp.$Properties|null);

                /** CreatorChatEvent targetUserId. */
                targetUserId: string;

                /** CreatorChatEvent videoBroadcastId. */
                videoBroadcastId: string;

                /** CreatorChatEvent creatorChatMessage. */
                creatorChatMessage?: (creator_stage.realtime.v1.CreatorChatMessage.$Properties|null);

                /** CreatorChatEvent pin. */
                pin?: (creator_stage.realtime.v1.Pin.$Properties|null);

                /** CreatorChatEvent unpin. */
                unpin?: (creator_stage.realtime.v1.Unpin.$Properties|null);

                /** CreatorChatEvent ctaPush. */
                ctaPush?: (creator_stage.realtime.v1.CTAPush.$Properties|null);

                /** CreatorChatEvent ctaDismiss. */
                ctaDismiss?: (creator_stage.realtime.v1.CTADismiss.$Properties|null);

                /** CreatorChatEvent quizStart. */
                quizStart?: (creator_stage.realtime.v1.Quiz.$Properties|null);

                /** CreatorChatEvent quizEnd. */
                quizEnd?: (creator_stage.realtime.v1.QuizResults.$Properties|null);

                /** CreatorChatEvent body. */
                body?: ("creatorChatMessage"|"pin"|"unpin"|"ctaPush"|"ctaDismiss"|"quizStart"|"quizEnd");

                /**
                 * Creates a new CreatorChatEvent instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CreatorChatEvent instance
                 */
                static create(properties: creator_stage.realtime.v1.CreatorChatEvent.$Shape): creator_stage.realtime.v1.CreatorChatEvent & creator_stage.realtime.v1.CreatorChatEvent.$Shape;
                static create(properties?: creator_stage.realtime.v1.CreatorChatEvent.$Properties): creator_stage.realtime.v1.CreatorChatEvent;

                /**
                 * Encodes the specified CreatorChatEvent message. Does not implicitly {@link creator_stage.realtime.v1.CreatorChatEvent.verify|verify} messages.
                 * @param message CreatorChatEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.CreatorChatEvent.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CreatorChatEvent message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.CreatorChatEvent.verify|verify} messages.
                 * @param message CreatorChatEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.CreatorChatEvent.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CreatorChatEvent message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.CreatorChatEvent & creator_stage.realtime.v1.CreatorChatEvent.$Shape} CreatorChatEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.CreatorChatEvent & creator_stage.realtime.v1.CreatorChatEvent.$Shape;

                /**
                 * Decodes a CreatorChatEvent message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.CreatorChatEvent & creator_stage.realtime.v1.CreatorChatEvent.$Shape} CreatorChatEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.CreatorChatEvent & creator_stage.realtime.v1.CreatorChatEvent.$Shape;

                /**
                 * Verifies a CreatorChatEvent message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CreatorChatEvent message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CreatorChatEvent
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.CreatorChatEvent;

                /**
                 * Creates a plain object from a CreatorChatEvent message. Also converts values to other types if specified.
                 * @param message CreatorChatEvent
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.CreatorChatEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CreatorChatEvent to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for CreatorChatEvent
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace CreatorChatEvent {

                /** Properties of a CreatorChatEvent. */
                interface $Properties {

                    /** CreatorChatEvent role */
                    role?: (creator_stage.realtime.v1.Role|null);

                    /** CreatorChatEvent type */
                    type?: (creator_stage.realtime.v1.Type|null);

                    /** CreatorChatEvent sentAt */
                    sentAt?: (google.protobuf.Timestamp.$Properties|null);

                    /** CreatorChatEvent targetUserId */
                    targetUserId?: (string|null);

                    /** CreatorChatEvent videoBroadcastId */
                    videoBroadcastId?: (string|null);

                    /** CreatorChatEvent creatorChatMessage */
                    creatorChatMessage?: (creator_stage.realtime.v1.CreatorChatMessage.$Properties|null);

                    /** CreatorChatEvent pin */
                    pin?: (creator_stage.realtime.v1.Pin.$Properties|null);

                    /** CreatorChatEvent unpin */
                    unpin?: (creator_stage.realtime.v1.Unpin.$Properties|null);

                    /** CreatorChatEvent ctaPush */
                    ctaPush?: (creator_stage.realtime.v1.CTAPush.$Properties|null);

                    /** CreatorChatEvent ctaDismiss */
                    ctaDismiss?: (creator_stage.realtime.v1.CTADismiss.$Properties|null);

                    /** CreatorChatEvent quizStart */
                    quizStart?: (creator_stage.realtime.v1.Quiz.$Properties|null);

                    /** CreatorChatEvent quizEnd */
                    quizEnd?: (creator_stage.realtime.v1.QuizResults.$Properties|null);

                    /** CreatorChatEvent body */
                    body?: ("creatorChatMessage"|"pin"|"unpin"|"ctaPush"|"ctaDismiss"|"quizStart"|"quizEnd");

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Narrowed shape of a CreatorChatEvent. */
                type $Shape = {
  role?: creator_stage.realtime.v1.Role|null;
  type?: creator_stage.realtime.v1.Type|null;
  sentAt?: google.protobuf.Timestamp.$Shape|null;
  targetUserId?: string|null;
  videoBroadcastId?: string|null;
  creatorChatMessage?: creator_stage.realtime.v1.CreatorChatMessage.$Shape|null;
  pin?: creator_stage.realtime.v1.Pin.$Shape|null;
  unpin?: creator_stage.realtime.v1.Unpin.$Shape|null;
  ctaPush?: creator_stage.realtime.v1.CTAPush.$Shape|null;
  ctaDismiss?: creator_stage.realtime.v1.CTADismiss.$Shape|null;
  quizStart?: creator_stage.realtime.v1.Quiz.$Shape|null;
  quizEnd?: creator_stage.realtime.v1.QuizResults.$Shape|null;
  $unknowns?: Uint8Array[];
} & (
  ({ body?: undefined; creatorChatMessage?: null; pin?: null; unpin?: null; ctaPush?: null; ctaDismiss?: null; quizStart?: null; quizEnd?: null }|{ body?: "creatorChatMessage"; creatorChatMessage: creator_stage.realtime.v1.CreatorChatMessage.$Shape; pin?: null; unpin?: null; ctaPush?: null; ctaDismiss?: null; quizStart?: null; quizEnd?: null }|{ body?: "pin"; creatorChatMessage?: null; pin: creator_stage.realtime.v1.Pin.$Shape; unpin?: null; ctaPush?: null; ctaDismiss?: null; quizStart?: null; quizEnd?: null }|{ body?: "unpin"; creatorChatMessage?: null; pin?: null; unpin: creator_stage.realtime.v1.Unpin.$Shape; ctaPush?: null; ctaDismiss?: null; quizStart?: null; quizEnd?: null }|{ body?: "ctaPush"; creatorChatMessage?: null; pin?: null; unpin?: null; ctaPush: creator_stage.realtime.v1.CTAPush.$Shape; ctaDismiss?: null; quizStart?: null; quizEnd?: null }|{ body?: "ctaDismiss"; creatorChatMessage?: null; pin?: null; unpin?: null; ctaPush?: null; ctaDismiss: creator_stage.realtime.v1.CTADismiss.$Shape; quizStart?: null; quizEnd?: null }|{ body?: "quizStart"; creatorChatMessage?: null; pin?: null; unpin?: null; ctaPush?: null; ctaDismiss?: null; quizStart: creator_stage.realtime.v1.Quiz.$Shape; quizEnd?: null }|{ body?: "quizEnd"; creatorChatMessage?: null; pin?: null; unpin?: null; ctaPush?: null; ctaDismiss?: null; quizStart?: null; quizEnd: creator_stage.realtime.v1.QuizResults.$Shape })
);
            }
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /**
         * Properties of a Timestamp.
         * @deprecated Use google.protobuf.Timestamp.$Properties instead.
         */
        interface ITimestamp extends google.protobuf.Timestamp.$Properties {
        }

        /** Represents a Timestamp. */
        class Timestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.Timestamp.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** Timestamp seconds. */
            seconds: (number|Long);

            /** Timestamp nanos. */
            nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            static create(properties: google.protobuf.Timestamp.$Shape): google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape;
            static create(properties?: google.protobuf.Timestamp.$Properties): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: google.protobuf.Timestamp.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: google.protobuf.Timestamp.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for Timestamp
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Timestamp {

            /** Properties of a Timestamp. */
            interface $Properties {

                /** Timestamp seconds */
                seconds?: (number|Long|null);

                /** Timestamp nanos */
                nanos?: (number|null);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Timestamp. */
            type $Shape = google.protobuf.Timestamp.$Properties;
        }
    }
}
