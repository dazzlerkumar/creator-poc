import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace creator_stage. */
export namespace creator_stage {

    /** Namespace realtime. */
    namespace realtime {

        /** Namespace v1. */
        namespace v1 {

            /** Type enum. */
            enum Type {

                /** TYPE_UNSPECIFIED value */
                TYPE_UNSPECIFIED = 0,

                /** TYPE_PIN value */
                TYPE_PIN = 1,

                /** TYPE_UNPIN value */
                TYPE_UNPIN = 2,

                /** TYPE_CTA_PUSH value */
                TYPE_CTA_PUSH = 3,

                /** TYPE_CTA_DISMISS value */
                TYPE_CTA_DISMISS = 4
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

                /** CTAPush label. */
                label: string;

                /** CTAPush url. */
                url: string;

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

                    /** CTAPush label */
                    label?: (string|null);

                    /** CTAPush url */
                    url?: (string|null);

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

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a CTADismiss. */
                type $Shape = creator_stage.realtime.v1.CTADismiss.$Properties;
            }

            /**
             * Properties of an ActivityEvent.
             * @deprecated Use creator_stage.realtime.v1.ActivityEvent.$Properties instead.
             */
            interface IActivityEvent extends creator_stage.realtime.v1.ActivityEvent.$Properties {
            }

            /** Represents an ActivityEvent. */
            class ActivityEvent {

                /**
                 * Constructs a new ActivityEvent.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.ActivityEvent.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** ActivityEvent type. */
                type: creator_stage.realtime.v1.Type;

                /** ActivityEvent at. */
                at?: (google.protobuf.Timestamp.$Properties|null);

                /** ActivityEvent pin. */
                pin?: (creator_stage.realtime.v1.ChatMessage.$Properties|null);

                /** ActivityEvent unpin. */
                unpin?: (creator_stage.realtime.v1.Unpin.$Properties|null);

                /** ActivityEvent ctaPush. */
                ctaPush?: (creator_stage.realtime.v1.CTAPush.$Properties|null);

                /** ActivityEvent ctaDismiss. */
                ctaDismiss?: (creator_stage.realtime.v1.CTADismiss.$Properties|null);

                /** ActivityEvent body. */
                body?: ("pin"|"unpin"|"ctaPush"|"ctaDismiss");

                /**
                 * Creates a new ActivityEvent instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ActivityEvent instance
                 */
                static create(properties: creator_stage.realtime.v1.ActivityEvent.$Shape): creator_stage.realtime.v1.ActivityEvent & creator_stage.realtime.v1.ActivityEvent.$Shape;
                static create(properties?: creator_stage.realtime.v1.ActivityEvent.$Properties): creator_stage.realtime.v1.ActivityEvent;

                /**
                 * Encodes the specified ActivityEvent message. Does not implicitly {@link creator_stage.realtime.v1.ActivityEvent.verify|verify} messages.
                 * @param message ActivityEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.ActivityEvent.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ActivityEvent message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.ActivityEvent.verify|verify} messages.
                 * @param message ActivityEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.ActivityEvent.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ActivityEvent message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.ActivityEvent & creator_stage.realtime.v1.ActivityEvent.$Shape} ActivityEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.ActivityEvent & creator_stage.realtime.v1.ActivityEvent.$Shape;

                /**
                 * Decodes an ActivityEvent message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.ActivityEvent & creator_stage.realtime.v1.ActivityEvent.$Shape} ActivityEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.ActivityEvent & creator_stage.realtime.v1.ActivityEvent.$Shape;

                /**
                 * Verifies an ActivityEvent message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an ActivityEvent message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ActivityEvent
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.ActivityEvent;

                /**
                 * Creates a plain object from an ActivityEvent message. Also converts values to other types if specified.
                 * @param message ActivityEvent
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.ActivityEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ActivityEvent to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for ActivityEvent
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace ActivityEvent {

                /** Properties of an ActivityEvent. */
                interface $Properties {

                    /** ActivityEvent type */
                    type?: (creator_stage.realtime.v1.Type|null);

                    /** ActivityEvent at */
                    at?: (google.protobuf.Timestamp.$Properties|null);

                    /** ActivityEvent pin */
                    pin?: (creator_stage.realtime.v1.ChatMessage.$Properties|null);

                    /** ActivityEvent unpin */
                    unpin?: (creator_stage.realtime.v1.Unpin.$Properties|null);

                    /** ActivityEvent ctaPush */
                    ctaPush?: (creator_stage.realtime.v1.CTAPush.$Properties|null);

                    /** ActivityEvent ctaDismiss */
                    ctaDismiss?: (creator_stage.realtime.v1.CTADismiss.$Properties|null);

                    /** ActivityEvent body */
                    body?: ("pin"|"unpin"|"ctaPush"|"ctaDismiss");

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Narrowed shape of an ActivityEvent. */
                type $Shape = {
  type?: creator_stage.realtime.v1.Type|null;
  at?: google.protobuf.Timestamp.$Shape|null;
  pin?: creator_stage.realtime.v1.ChatMessage.$Shape|null;
  unpin?: creator_stage.realtime.v1.Unpin.$Shape|null;
  ctaPush?: creator_stage.realtime.v1.CTAPush.$Shape|null;
  ctaDismiss?: creator_stage.realtime.v1.CTADismiss.$Shape|null;
  $unknowns?: Uint8Array[];
} & (
  ({ body?: undefined; pin?: null; unpin?: null; ctaPush?: null; ctaDismiss?: null }|{ body?: "pin"; pin: creator_stage.realtime.v1.ChatMessage.$Shape; unpin?: null; ctaPush?: null; ctaDismiss?: null }|{ body?: "unpin"; pin?: null; unpin: creator_stage.realtime.v1.Unpin.$Shape; ctaPush?: null; ctaDismiss?: null }|{ body?: "ctaPush"; pin?: null; unpin?: null; ctaPush: creator_stage.realtime.v1.CTAPush.$Shape; ctaDismiss?: null }|{ body?: "ctaDismiss"; pin?: null; unpin?: null; ctaPush?: null; ctaDismiss: creator_stage.realtime.v1.CTADismiss.$Shape })
);
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

            /**
             * Properties of a ChatMessage.
             * @deprecated Use creator_stage.realtime.v1.ChatMessage.$Properties instead.
             */
            interface IChatMessage extends creator_stage.realtime.v1.ChatMessage.$Properties {
            }

            /** Represents a ChatMessage. */
            class ChatMessage {

                /**
                 * Constructs a new ChatMessage.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.ChatMessage.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** ChatMessage id. */
                id: string;

                /** ChatMessage videoBroadcastId. */
                videoBroadcastId: string;

                /** ChatMessage userId. */
                userId: string;

                /** ChatMessage role. */
                role: creator_stage.realtime.v1.Role;

                /** ChatMessage displayName. */
                displayName: string;

                /** ChatMessage body. */
                body: string;

                /** ChatMessage sentAt. */
                sentAt?: (google.protobuf.Timestamp.$Properties|null);

                /** ChatMessage pinned. */
                pinned: boolean;

                /**
                 * Creates a new ChatMessage instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ChatMessage instance
                 */
                static create(properties: creator_stage.realtime.v1.ChatMessage.$Shape): creator_stage.realtime.v1.ChatMessage & creator_stage.realtime.v1.ChatMessage.$Shape;
                static create(properties?: creator_stage.realtime.v1.ChatMessage.$Properties): creator_stage.realtime.v1.ChatMessage;

                /**
                 * Encodes the specified ChatMessage message. Does not implicitly {@link creator_stage.realtime.v1.ChatMessage.verify|verify} messages.
                 * @param message ChatMessage message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.ChatMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ChatMessage message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.ChatMessage.verify|verify} messages.
                 * @param message ChatMessage message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.ChatMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ChatMessage message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.ChatMessage & creator_stage.realtime.v1.ChatMessage.$Shape} ChatMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.ChatMessage & creator_stage.realtime.v1.ChatMessage.$Shape;

                /**
                 * Decodes a ChatMessage message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.ChatMessage & creator_stage.realtime.v1.ChatMessage.$Shape} ChatMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.ChatMessage & creator_stage.realtime.v1.ChatMessage.$Shape;

                /**
                 * Verifies a ChatMessage message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ChatMessage message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ChatMessage
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.ChatMessage;

                /**
                 * Creates a plain object from a ChatMessage message. Also converts values to other types if specified.
                 * @param message ChatMessage
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.ChatMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ChatMessage to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for ChatMessage
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace ChatMessage {

                /** Properties of a ChatMessage. */
                interface $Properties {

                    /** ChatMessage id */
                    id?: (string|null);

                    /** ChatMessage videoBroadcastId */
                    videoBroadcastId?: (string|null);

                    /** ChatMessage userId */
                    userId?: (string|null);

                    /** ChatMessage role */
                    role?: (creator_stage.realtime.v1.Role|null);

                    /** ChatMessage displayName */
                    displayName?: (string|null);

                    /** ChatMessage body */
                    body?: (string|null);

                    /** ChatMessage sentAt */
                    sentAt?: (google.protobuf.Timestamp.$Properties|null);

                    /** ChatMessage pinned */
                    pinned?: (boolean|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a ChatMessage. */
                type $Shape = creator_stage.realtime.v1.ChatMessage.$Properties;
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

                /** BatchedChatMessages messages. */
                messages: creator_stage.realtime.v1.ChatMessage.$Properties[];

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

                    /** BatchedChatMessages messages */
                    messages?: (creator_stage.realtime.v1.ChatMessage.$Properties[]|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a BatchedChatMessages. */
                type $Shape = creator_stage.realtime.v1.BatchedChatMessages.$Properties;
            }

            /**
             * Properties of a ChatPublishRequest.
             * @deprecated Use creator_stage.realtime.v1.ChatPublishRequest.$Properties instead.
             */
            interface IChatPublishRequest extends creator_stage.realtime.v1.ChatPublishRequest.$Properties {
            }

            /** Represents a ChatPublishRequest. */
            class ChatPublishRequest {

                /**
                 * Constructs a new ChatPublishRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.ChatPublishRequest.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** ChatPublishRequest body. */
                body: string;

                /** ChatPublishRequest targetUserId. */
                targetUserId: string;

                /**
                 * Creates a new ChatPublishRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ChatPublishRequest instance
                 */
                static create(properties: creator_stage.realtime.v1.ChatPublishRequest.$Shape): creator_stage.realtime.v1.ChatPublishRequest & creator_stage.realtime.v1.ChatPublishRequest.$Shape;
                static create(properties?: creator_stage.realtime.v1.ChatPublishRequest.$Properties): creator_stage.realtime.v1.ChatPublishRequest;

                /**
                 * Encodes the specified ChatPublishRequest message. Does not implicitly {@link creator_stage.realtime.v1.ChatPublishRequest.verify|verify} messages.
                 * @param message ChatPublishRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.ChatPublishRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ChatPublishRequest message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.ChatPublishRequest.verify|verify} messages.
                 * @param message ChatPublishRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.ChatPublishRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ChatPublishRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.ChatPublishRequest & creator_stage.realtime.v1.ChatPublishRequest.$Shape} ChatPublishRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.ChatPublishRequest & creator_stage.realtime.v1.ChatPublishRequest.$Shape;

                /**
                 * Decodes a ChatPublishRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.ChatPublishRequest & creator_stage.realtime.v1.ChatPublishRequest.$Shape} ChatPublishRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.ChatPublishRequest & creator_stage.realtime.v1.ChatPublishRequest.$Shape;

                /**
                 * Verifies a ChatPublishRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ChatPublishRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ChatPublishRequest
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.ChatPublishRequest;

                /**
                 * Creates a plain object from a ChatPublishRequest message. Also converts values to other types if specified.
                 * @param message ChatPublishRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.ChatPublishRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ChatPublishRequest to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for ChatPublishRequest
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace ChatPublishRequest {

                /** Properties of a ChatPublishRequest. */
                interface $Properties {

                    /** ChatPublishRequest body */
                    body?: (string|null);

                    /** ChatPublishRequest targetUserId */
                    targetUserId?: (string|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a ChatPublishRequest. */
                type $Shape = creator_stage.realtime.v1.ChatPublishRequest.$Properties;
            }

            /**
             * Properties of an AnalyticsHeartbeat.
             * @deprecated Use creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties instead.
             */
            interface IAnalyticsHeartbeat extends creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties {
            }

            /** Represents an AnalyticsHeartbeat. */
            class AnalyticsHeartbeat {

                /**
                 * Constructs a new AnalyticsHeartbeat.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];

                /** AnalyticsHeartbeat viewerCount. */
                viewerCount: number;

                /** AnalyticsHeartbeat chatVelocity. */
                chatVelocity: number;

                /** AnalyticsHeartbeat engagementRate. */
                engagementRate: number;

                /** AnalyticsHeartbeat at. */
                at?: (google.protobuf.Timestamp.$Properties|null);

                /**
                 * Creates a new AnalyticsHeartbeat instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AnalyticsHeartbeat instance
                 */
                static create(properties: creator_stage.realtime.v1.AnalyticsHeartbeat.$Shape): creator_stage.realtime.v1.AnalyticsHeartbeat & creator_stage.realtime.v1.AnalyticsHeartbeat.$Shape;
                static create(properties?: creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties): creator_stage.realtime.v1.AnalyticsHeartbeat;

                /**
                 * Encodes the specified AnalyticsHeartbeat message. Does not implicitly {@link creator_stage.realtime.v1.AnalyticsHeartbeat.verify|verify} messages.
                 * @param message AnalyticsHeartbeat message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AnalyticsHeartbeat message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.AnalyticsHeartbeat.verify|verify} messages.
                 * @param message AnalyticsHeartbeat message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AnalyticsHeartbeat message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.AnalyticsHeartbeat & creator_stage.realtime.v1.AnalyticsHeartbeat.$Shape} AnalyticsHeartbeat
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): creator_stage.realtime.v1.AnalyticsHeartbeat & creator_stage.realtime.v1.AnalyticsHeartbeat.$Shape;

                /**
                 * Decodes an AnalyticsHeartbeat message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.AnalyticsHeartbeat & creator_stage.realtime.v1.AnalyticsHeartbeat.$Shape} AnalyticsHeartbeat
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): creator_stage.realtime.v1.AnalyticsHeartbeat & creator_stage.realtime.v1.AnalyticsHeartbeat.$Shape;

                /**
                 * Verifies an AnalyticsHeartbeat message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AnalyticsHeartbeat message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AnalyticsHeartbeat
                 */
                static fromObject(object: { [k: string]: any }): creator_stage.realtime.v1.AnalyticsHeartbeat;

                /**
                 * Creates a plain object from an AnalyticsHeartbeat message. Also converts values to other types if specified.
                 * @param message AnalyticsHeartbeat
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: creator_stage.realtime.v1.AnalyticsHeartbeat, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AnalyticsHeartbeat to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for AnalyticsHeartbeat
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace AnalyticsHeartbeat {

                /** Properties of an AnalyticsHeartbeat. */
                interface $Properties {

                    /** AnalyticsHeartbeat viewerCount */
                    viewerCount?: (number|null);

                    /** AnalyticsHeartbeat chatVelocity */
                    chatVelocity?: (number|null);

                    /** AnalyticsHeartbeat engagementRate */
                    engagementRate?: (number|null);

                    /** AnalyticsHeartbeat at */
                    at?: (google.protobuf.Timestamp.$Properties|null);

                    /** Unknown fields preserved while decoding */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an AnalyticsHeartbeat. */
                type $Shape = creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties;
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
