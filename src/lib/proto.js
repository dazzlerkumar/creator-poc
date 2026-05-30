/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const creator_stage = $root.creator_stage = (() => {

    /**
     * Namespace creator_stage.
     * @exports creator_stage
     * @namespace
     */
    const creator_stage = {};

    creator_stage.realtime = (function() {

        /**
         * Namespace realtime.
         * @memberof creator_stage
         * @namespace
         */
        const realtime = {};

        realtime.v1 = (function() {

            /**
             * Namespace v1.
             * @memberof creator_stage.realtime
             * @namespace
             */
            const v1 = {};

            /**
             * AudienceIngestRoute enum.
             * @name creator_stage.realtime.v1.AudienceIngestRoute
             * @enum {number}
             * @property {number} AUDIENCE_INGEST_ROUTE_UNSPECIFIED=0 AUDIENCE_INGEST_ROUTE_UNSPECIFIED value
             * @property {number} AUDIENCE_INGEST_ROUTE_PEER=1 AUDIENCE_INGEST_ROUTE_PEER value
             * @property {number} AUDIENCE_INGEST_ROUTE_DM=2 AUDIENCE_INGEST_ROUTE_DM value
             */
            v1.AudienceIngestRoute = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "AUDIENCE_INGEST_ROUTE_UNSPECIFIED"] = 0;
                values[valuesById[1] = "AUDIENCE_INGEST_ROUTE_PEER"] = 1;
                values[valuesById[2] = "AUDIENCE_INGEST_ROUTE_DM"] = 2;
                return values;
            })();

            v1.AudienceChatMessage = (function() {

                /**
                 * Properties of an AudienceChatMessage.
                 * @typedef {Object} creator_stage.realtime.v1.AudienceChatMessage.$Properties
                 * @property {string|null} [id] AudienceChatMessage id
                 * @property {google.protobuf.Timestamp.$Properties|null} [sentAt] AudienceChatMessage sentAt
                 * @property {string|null} [body] AudienceChatMessage body
                 * @property {string|null} [userId] AudienceChatMessage userId
                 * @property {string|null} [displayName] AudienceChatMessage displayName
                 * @property {string|null} [videoBroadcastId] AudienceChatMessage videoBroadcastId
                 * @property {creator_stage.realtime.v1.AudienceIngestRoute|null} [ingestRoute] AudienceChatMessage ingestRoute
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of an AudienceChatMessage.
                 * @memberof creator_stage.realtime.v1
                 * @interface IAudienceChatMessage
                 * @augments creator_stage.realtime.v1.AudienceChatMessage.$Properties
                 * @deprecated Use creator_stage.realtime.v1.AudienceChatMessage.$Properties instead.
                 */

                /**
                 * Shape of an AudienceChatMessage.
                 * @typedef {creator_stage.realtime.v1.AudienceChatMessage.$Properties} creator_stage.realtime.v1.AudienceChatMessage.$Shape
                 */

                /**
                 * Constructs a new AudienceChatMessage.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents an AudienceChatMessage.
                 * @constructor
                 * @param {creator_stage.realtime.v1.AudienceChatMessage.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function AudienceChatMessage(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * AudienceChatMessage id.
                 * @member {string} id
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @instance
                 */
                AudienceChatMessage.prototype.id = "";

                /**
                 * AudienceChatMessage sentAt.
                 * @member {google.protobuf.Timestamp.$Properties|null|undefined} sentAt
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @instance
                 */
                AudienceChatMessage.prototype.sentAt = null;

                /**
                 * AudienceChatMessage body.
                 * @member {string} body
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @instance
                 */
                AudienceChatMessage.prototype.body = "";

                /**
                 * AudienceChatMessage userId.
                 * @member {string} userId
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @instance
                 */
                AudienceChatMessage.prototype.userId = "";

                /**
                 * AudienceChatMessage displayName.
                 * @member {string} displayName
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @instance
                 */
                AudienceChatMessage.prototype.displayName = "";

                /**
                 * AudienceChatMessage videoBroadcastId.
                 * @member {string} videoBroadcastId
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @instance
                 */
                AudienceChatMessage.prototype.videoBroadcastId = "";

                /**
                 * AudienceChatMessage ingestRoute.
                 * @member {creator_stage.realtime.v1.AudienceIngestRoute} ingestRoute
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @instance
                 */
                AudienceChatMessage.prototype.ingestRoute = 0;

                /**
                 * Creates a new AudienceChatMessage instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceChatMessage.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.AudienceChatMessage} AudienceChatMessage instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.AudienceChatMessage.$Shape): creator_stage.realtime.v1.AudienceChatMessage & creator_stage.realtime.v1.AudienceChatMessage.$Shape;
                 *   (properties?: creator_stage.realtime.v1.AudienceChatMessage.$Properties): creator_stage.realtime.v1.AudienceChatMessage;
                 * }}
                 */
                AudienceChatMessage.create = function create(properties) {
                    return new AudienceChatMessage(properties);
                };

                /**
                 * Encodes the specified AudienceChatMessage message. Does not implicitly {@link creator_stage.realtime.v1.AudienceChatMessage.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceChatMessage.$Properties} message AudienceChatMessage message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudienceChatMessage.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.sentAt != null && Object.hasOwnProperty.call(message, "sentAt"))
                        $root.google.protobuf.Timestamp.encode(message.sentAt, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.body);
                    if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.userId);
                    if (message.displayName != null && Object.hasOwnProperty.call(message, "displayName"))
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.displayName);
                    if (message.videoBroadcastId != null && Object.hasOwnProperty.call(message, "videoBroadcastId"))
                        writer.uint32(/* id 6, wireType 2 =*/50).string(message.videoBroadcastId);
                    if (message.ingestRoute != null && Object.hasOwnProperty.call(message, "ingestRoute"))
                        writer.uint32(/* id 7, wireType 0 =*/56).int32(message.ingestRoute);
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified AudienceChatMessage message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.AudienceChatMessage.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceChatMessage.$Properties} message AudienceChatMessage message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudienceChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an AudienceChatMessage message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.AudienceChatMessage & creator_stage.realtime.v1.AudienceChatMessage.$Shape} AudienceChatMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudienceChatMessage.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.AudienceChatMessage(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.id = value;
                                else
                                    delete message.id;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.sentAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32(), undefined, _depth + 1, message.sentAt);
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.body = value;
                                else
                                    delete message.body;
                                continue;
                            }
                        case 4: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.userId = value;
                                else
                                    delete message.userId;
                                continue;
                            }
                        case 5: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.displayName = value;
                                else
                                    delete message.displayName;
                                continue;
                            }
                        case 6: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.videoBroadcastId = value;
                                else
                                    delete message.videoBroadcastId;
                                continue;
                            }
                        case 7: {
                                if (wireType !== 0)
                                    break;
                                if (value = reader.int32())
                                    message.ingestRoute = value;
                                else
                                    delete message.ingestRoute;
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes an AudienceChatMessage message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.AudienceChatMessage & creator_stage.realtime.v1.AudienceChatMessage.$Shape} AudienceChatMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudienceChatMessage.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AudienceChatMessage message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AudienceChatMessage.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.sentAt != null && message.hasOwnProperty("sentAt")) {
                        let error = $root.google.protobuf.Timestamp.verify(message.sentAt, _depth + 1);
                        if (error)
                            return "sentAt." + error;
                    }
                    if (message.body != null && message.hasOwnProperty("body"))
                        if (!$util.isString(message.body))
                            return "body: string expected";
                    if (message.userId != null && message.hasOwnProperty("userId"))
                        if (!$util.isString(message.userId))
                            return "userId: string expected";
                    if (message.displayName != null && message.hasOwnProperty("displayName"))
                        if (!$util.isString(message.displayName))
                            return "displayName: string expected";
                    if (message.videoBroadcastId != null && message.hasOwnProperty("videoBroadcastId"))
                        if (!$util.isString(message.videoBroadcastId))
                            return "videoBroadcastId: string expected";
                    if (message.ingestRoute != null && message.hasOwnProperty("ingestRoute"))
                        switch (message.ingestRoute) {
                        default:
                            return "ingestRoute: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates an AudienceChatMessage message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.AudienceChatMessage} AudienceChatMessage
                 */
                AudienceChatMessage.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.AudienceChatMessage)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.AudienceChatMessage();
                    if (object.id != null)
                        if (typeof object.id !== "string" || object.id.length)
                            message.id = String(object.id);
                    if (object.sentAt != null) {
                        if (typeof object.sentAt !== "object")
                            throw TypeError(".creator_stage.realtime.v1.AudienceChatMessage.sentAt: object expected");
                        message.sentAt = $root.google.protobuf.Timestamp.fromObject(object.sentAt, _depth + 1);
                    }
                    if (object.body != null)
                        if (typeof object.body !== "string" || object.body.length)
                            message.body = String(object.body);
                    if (object.userId != null)
                        if (typeof object.userId !== "string" || object.userId.length)
                            message.userId = String(object.userId);
                    if (object.displayName != null)
                        if (typeof object.displayName !== "string" || object.displayName.length)
                            message.displayName = String(object.displayName);
                    if (object.videoBroadcastId != null)
                        if (typeof object.videoBroadcastId !== "string" || object.videoBroadcastId.length)
                            message.videoBroadcastId = String(object.videoBroadcastId);
                    if (object.ingestRoute !== 0 && (typeof object.ingestRoute !== "string" || $root.creator_stage.realtime.v1.AudienceIngestRoute[object.ingestRoute] !== 0))
                        switch (object.ingestRoute) {
                        default:
                            if (typeof object.ingestRoute === "number") {
                                message.ingestRoute = object.ingestRoute;
                                break;
                            }
                            break;
                        case "AUDIENCE_INGEST_ROUTE_UNSPECIFIED":
                        case 0:
                            message.ingestRoute = 0;
                            break;
                        case "AUDIENCE_INGEST_ROUTE_PEER":
                        case 1:
                            message.ingestRoute = 1;
                            break;
                        case "AUDIENCE_INGEST_ROUTE_DM":
                        case 2:
                            message.ingestRoute = 2;
                            break;
                        }
                    return message;
                };

                /**
                 * Creates a plain object from an AudienceChatMessage message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceChatMessage} message AudienceChatMessage
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AudienceChatMessage.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.sentAt = null;
                        object.body = "";
                        object.userId = "";
                        object.displayName = "";
                        object.videoBroadcastId = "";
                        object.ingestRoute = options.enums === String ? "AUDIENCE_INGEST_ROUTE_UNSPECIFIED" : 0;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.sentAt != null && message.hasOwnProperty("sentAt"))
                        object.sentAt = $root.google.protobuf.Timestamp.toObject(message.sentAt, options);
                    if (message.body != null && message.hasOwnProperty("body"))
                        object.body = message.body;
                    if (message.userId != null && message.hasOwnProperty("userId"))
                        object.userId = message.userId;
                    if (message.displayName != null && message.hasOwnProperty("displayName"))
                        object.displayName = message.displayName;
                    if (message.videoBroadcastId != null && message.hasOwnProperty("videoBroadcastId"))
                        object.videoBroadcastId = message.videoBroadcastId;
                    if (message.ingestRoute != null && message.hasOwnProperty("ingestRoute"))
                        object.ingestRoute = options.enums === String ? $root.creator_stage.realtime.v1.AudienceIngestRoute[message.ingestRoute] === undefined ? message.ingestRoute : $root.creator_stage.realtime.v1.AudienceIngestRoute[message.ingestRoute] : message.ingestRoute;
                    return object;
                };

                /**
                 * Converts this AudienceChatMessage to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AudienceChatMessage.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for AudienceChatMessage
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.AudienceChatMessage
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                AudienceChatMessage.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.AudienceChatMessage";
                };

                return AudienceChatMessage;
            })();

            v1.AudienceQuizResponse = (function() {

                /**
                 * Properties of an AudienceQuizResponse.
                 * @typedef {Object} creator_stage.realtime.v1.AudienceQuizResponse.$Properties
                 * @property {string|null} [id] AudienceQuizResponse id
                 * @property {google.protobuf.Timestamp.$Properties|null} [sentAt] AudienceQuizResponse sentAt
                 * @property {string|null} [quizId] AudienceQuizResponse quizId
                 * @property {string|null} [optionId] AudienceQuizResponse optionId
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of an AudienceQuizResponse.
                 * @memberof creator_stage.realtime.v1
                 * @interface IAudienceQuizResponse
                 * @augments creator_stage.realtime.v1.AudienceQuizResponse.$Properties
                 * @deprecated Use creator_stage.realtime.v1.AudienceQuizResponse.$Properties instead.
                 */

                /**
                 * Shape of an AudienceQuizResponse.
                 * @typedef {creator_stage.realtime.v1.AudienceQuizResponse.$Properties} creator_stage.realtime.v1.AudienceQuizResponse.$Shape
                 */

                /**
                 * Constructs a new AudienceQuizResponse.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents an AudienceQuizResponse.
                 * @constructor
                 * @param {creator_stage.realtime.v1.AudienceQuizResponse.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function AudienceQuizResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * AudienceQuizResponse id.
                 * @member {string} id
                 * @memberof creator_stage.realtime.v1.AudienceQuizResponse
                 * @instance
                 */
                AudienceQuizResponse.prototype.id = "";

                /**
                 * AudienceQuizResponse sentAt.
                 * @member {google.protobuf.Timestamp.$Properties|null|undefined} sentAt
                 * @memberof creator_stage.realtime.v1.AudienceQuizResponse
                 * @instance
                 */
                AudienceQuizResponse.prototype.sentAt = null;

                /**
                 * AudienceQuizResponse quizId.
                 * @member {string} quizId
                 * @memberof creator_stage.realtime.v1.AudienceQuizResponse
                 * @instance
                 */
                AudienceQuizResponse.prototype.quizId = "";

                /**
                 * AudienceQuizResponse optionId.
                 * @member {string} optionId
                 * @memberof creator_stage.realtime.v1.AudienceQuizResponse
                 * @instance
                 */
                AudienceQuizResponse.prototype.optionId = "";

                /**
                 * Creates a new AudienceQuizResponse instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.AudienceQuizResponse
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceQuizResponse.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.AudienceQuizResponse} AudienceQuizResponse instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.AudienceQuizResponse.$Shape): creator_stage.realtime.v1.AudienceQuizResponse & creator_stage.realtime.v1.AudienceQuizResponse.$Shape;
                 *   (properties?: creator_stage.realtime.v1.AudienceQuizResponse.$Properties): creator_stage.realtime.v1.AudienceQuizResponse;
                 * }}
                 */
                AudienceQuizResponse.create = function create(properties) {
                    return new AudienceQuizResponse(properties);
                };

                /**
                 * Encodes the specified AudienceQuizResponse message. Does not implicitly {@link creator_stage.realtime.v1.AudienceQuizResponse.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.AudienceQuizResponse
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceQuizResponse.$Properties} message AudienceQuizResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudienceQuizResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.sentAt != null && Object.hasOwnProperty.call(message, "sentAt"))
                        $root.google.protobuf.Timestamp.encode(message.sentAt, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.quizId != null && Object.hasOwnProperty.call(message, "quizId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.quizId);
                    if (message.optionId != null && Object.hasOwnProperty.call(message, "optionId"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.optionId);
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified AudienceQuizResponse message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.AudienceQuizResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.AudienceQuizResponse
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceQuizResponse.$Properties} message AudienceQuizResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudienceQuizResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an AudienceQuizResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.AudienceQuizResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.AudienceQuizResponse & creator_stage.realtime.v1.AudienceQuizResponse.$Shape} AudienceQuizResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudienceQuizResponse.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.AudienceQuizResponse(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.id = value;
                                else
                                    delete message.id;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.sentAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32(), undefined, _depth + 1, message.sentAt);
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.quizId = value;
                                else
                                    delete message.quizId;
                                continue;
                            }
                        case 4: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.optionId = value;
                                else
                                    delete message.optionId;
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes an AudienceQuizResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.AudienceQuizResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.AudienceQuizResponse & creator_stage.realtime.v1.AudienceQuizResponse.$Shape} AudienceQuizResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudienceQuizResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AudienceQuizResponse message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.AudienceQuizResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AudienceQuizResponse.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.sentAt != null && message.hasOwnProperty("sentAt")) {
                        let error = $root.google.protobuf.Timestamp.verify(message.sentAt, _depth + 1);
                        if (error)
                            return "sentAt." + error;
                    }
                    if (message.quizId != null && message.hasOwnProperty("quizId"))
                        if (!$util.isString(message.quizId))
                            return "quizId: string expected";
                    if (message.optionId != null && message.hasOwnProperty("optionId"))
                        if (!$util.isString(message.optionId))
                            return "optionId: string expected";
                    return null;
                };

                /**
                 * Creates an AudienceQuizResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.AudienceQuizResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.AudienceQuizResponse} AudienceQuizResponse
                 */
                AudienceQuizResponse.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.AudienceQuizResponse)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.AudienceQuizResponse();
                    if (object.id != null)
                        if (typeof object.id !== "string" || object.id.length)
                            message.id = String(object.id);
                    if (object.sentAt != null) {
                        if (typeof object.sentAt !== "object")
                            throw TypeError(".creator_stage.realtime.v1.AudienceQuizResponse.sentAt: object expected");
                        message.sentAt = $root.google.protobuf.Timestamp.fromObject(object.sentAt, _depth + 1);
                    }
                    if (object.quizId != null)
                        if (typeof object.quizId !== "string" || object.quizId.length)
                            message.quizId = String(object.quizId);
                    if (object.optionId != null)
                        if (typeof object.optionId !== "string" || object.optionId.length)
                            message.optionId = String(object.optionId);
                    return message;
                };

                /**
                 * Creates a plain object from an AudienceQuizResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.AudienceQuizResponse
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceQuizResponse} message AudienceQuizResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AudienceQuizResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.sentAt = null;
                        object.quizId = "";
                        object.optionId = "";
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.sentAt != null && message.hasOwnProperty("sentAt"))
                        object.sentAt = $root.google.protobuf.Timestamp.toObject(message.sentAt, options);
                    if (message.quizId != null && message.hasOwnProperty("quizId"))
                        object.quizId = message.quizId;
                    if (message.optionId != null && message.hasOwnProperty("optionId"))
                        object.optionId = message.optionId;
                    return object;
                };

                /**
                 * Converts this AudienceQuizResponse to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.AudienceQuizResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AudienceQuizResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for AudienceQuizResponse
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.AudienceQuizResponse
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                AudienceQuizResponse.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.AudienceQuizResponse";
                };

                return AudienceQuizResponse;
            })();

            v1.AudienceVideoMetadata = (function() {

                /**
                 * Properties of an AudienceVideoMetadata.
                 * @typedef {Object} creator_stage.realtime.v1.AudienceVideoMetadata.$Properties
                 * @property {string|null} [id] AudienceVideoMetadata id
                 * @property {google.protobuf.Timestamp.$Properties|null} [sentAt] AudienceVideoMetadata sentAt
                 * @property {number|null} [liveActiveConnections] AudienceVideoMetadata liveActiveConnections
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of an AudienceVideoMetadata.
                 * @memberof creator_stage.realtime.v1
                 * @interface IAudienceVideoMetadata
                 * @augments creator_stage.realtime.v1.AudienceVideoMetadata.$Properties
                 * @deprecated Use creator_stage.realtime.v1.AudienceVideoMetadata.$Properties instead.
                 */

                /**
                 * Shape of an AudienceVideoMetadata.
                 * @typedef {creator_stage.realtime.v1.AudienceVideoMetadata.$Properties} creator_stage.realtime.v1.AudienceVideoMetadata.$Shape
                 */

                /**
                 * Constructs a new AudienceVideoMetadata.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents an AudienceVideoMetadata.
                 * @constructor
                 * @param {creator_stage.realtime.v1.AudienceVideoMetadata.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function AudienceVideoMetadata(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * AudienceVideoMetadata id.
                 * @member {string} id
                 * @memberof creator_stage.realtime.v1.AudienceVideoMetadata
                 * @instance
                 */
                AudienceVideoMetadata.prototype.id = "";

                /**
                 * AudienceVideoMetadata sentAt.
                 * @member {google.protobuf.Timestamp.$Properties|null|undefined} sentAt
                 * @memberof creator_stage.realtime.v1.AudienceVideoMetadata
                 * @instance
                 */
                AudienceVideoMetadata.prototype.sentAt = null;

                /**
                 * AudienceVideoMetadata liveActiveConnections.
                 * @member {number} liveActiveConnections
                 * @memberof creator_stage.realtime.v1.AudienceVideoMetadata
                 * @instance
                 */
                AudienceVideoMetadata.prototype.liveActiveConnections = 0;

                /**
                 * Creates a new AudienceVideoMetadata instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.AudienceVideoMetadata
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceVideoMetadata.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.AudienceVideoMetadata} AudienceVideoMetadata instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.AudienceVideoMetadata.$Shape): creator_stage.realtime.v1.AudienceVideoMetadata & creator_stage.realtime.v1.AudienceVideoMetadata.$Shape;
                 *   (properties?: creator_stage.realtime.v1.AudienceVideoMetadata.$Properties): creator_stage.realtime.v1.AudienceVideoMetadata;
                 * }}
                 */
                AudienceVideoMetadata.create = function create(properties) {
                    return new AudienceVideoMetadata(properties);
                };

                /**
                 * Encodes the specified AudienceVideoMetadata message. Does not implicitly {@link creator_stage.realtime.v1.AudienceVideoMetadata.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.AudienceVideoMetadata
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceVideoMetadata.$Properties} message AudienceVideoMetadata message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudienceVideoMetadata.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.sentAt != null && Object.hasOwnProperty.call(message, "sentAt"))
                        $root.google.protobuf.Timestamp.encode(message.sentAt, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.liveActiveConnections != null && Object.hasOwnProperty.call(message, "liveActiveConnections"))
                        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.liveActiveConnections);
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified AudienceVideoMetadata message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.AudienceVideoMetadata.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.AudienceVideoMetadata
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceVideoMetadata.$Properties} message AudienceVideoMetadata message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudienceVideoMetadata.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an AudienceVideoMetadata message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.AudienceVideoMetadata
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.AudienceVideoMetadata & creator_stage.realtime.v1.AudienceVideoMetadata.$Shape} AudienceVideoMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudienceVideoMetadata.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.AudienceVideoMetadata(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.id = value;
                                else
                                    delete message.id;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.sentAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32(), undefined, _depth + 1, message.sentAt);
                                continue;
                            }
                        case 3: {
                                if (wireType !== 0)
                                    break;
                                if (value = reader.uint32())
                                    message.liveActiveConnections = value;
                                else
                                    delete message.liveActiveConnections;
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes an AudienceVideoMetadata message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.AudienceVideoMetadata
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.AudienceVideoMetadata & creator_stage.realtime.v1.AudienceVideoMetadata.$Shape} AudienceVideoMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudienceVideoMetadata.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AudienceVideoMetadata message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.AudienceVideoMetadata
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AudienceVideoMetadata.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.sentAt != null && message.hasOwnProperty("sentAt")) {
                        let error = $root.google.protobuf.Timestamp.verify(message.sentAt, _depth + 1);
                        if (error)
                            return "sentAt." + error;
                    }
                    if (message.liveActiveConnections != null && message.hasOwnProperty("liveActiveConnections"))
                        if (!$util.isInteger(message.liveActiveConnections))
                            return "liveActiveConnections: integer expected";
                    return null;
                };

                /**
                 * Creates an AudienceVideoMetadata message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.AudienceVideoMetadata
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.AudienceVideoMetadata} AudienceVideoMetadata
                 */
                AudienceVideoMetadata.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.AudienceVideoMetadata)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.AudienceVideoMetadata();
                    if (object.id != null)
                        if (typeof object.id !== "string" || object.id.length)
                            message.id = String(object.id);
                    if (object.sentAt != null) {
                        if (typeof object.sentAt !== "object")
                            throw TypeError(".creator_stage.realtime.v1.AudienceVideoMetadata.sentAt: object expected");
                        message.sentAt = $root.google.protobuf.Timestamp.fromObject(object.sentAt, _depth + 1);
                    }
                    if (object.liveActiveConnections != null)
                        if (Number(object.liveActiveConnections) !== 0)
                            message.liveActiveConnections = object.liveActiveConnections >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from an AudienceVideoMetadata message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.AudienceVideoMetadata
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceVideoMetadata} message AudienceVideoMetadata
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AudienceVideoMetadata.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.sentAt = null;
                        object.liveActiveConnections = 0;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.sentAt != null && message.hasOwnProperty("sentAt"))
                        object.sentAt = $root.google.protobuf.Timestamp.toObject(message.sentAt, options);
                    if (message.liveActiveConnections != null && message.hasOwnProperty("liveActiveConnections"))
                        object.liveActiveConnections = message.liveActiveConnections;
                    return object;
                };

                /**
                 * Converts this AudienceVideoMetadata to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.AudienceVideoMetadata
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AudienceVideoMetadata.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for AudienceVideoMetadata
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.AudienceVideoMetadata
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                AudienceVideoMetadata.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.AudienceVideoMetadata";
                };

                return AudienceVideoMetadata;
            })();

            /**
             * AudienceMessageType enum.
             * @name creator_stage.realtime.v1.AudienceMessageType
             * @enum {number}
             * @property {number} TYPE_AUDIENCE_MESSAGE=0 TYPE_AUDIENCE_MESSAGE value
             * @property {number} TYPE_POLL_RESPONSE=1 TYPE_POLL_RESPONSE value
             * @property {number} TYPE_VIDEO_METADATA=2 TYPE_VIDEO_METADATA value
             */
            v1.AudienceMessageType = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "TYPE_AUDIENCE_MESSAGE"] = 0;
                values[valuesById[1] = "TYPE_POLL_RESPONSE"] = 1;
                values[valuesById[2] = "TYPE_VIDEO_METADATA"] = 2;
                return values;
            })();

            v1.AudienceChatEvent = (function() {

                /**
                 * Properties of an AudienceChatEvent.
                 * @typedef {Object} creator_stage.realtime.v1.AudienceChatEvent.$Properties
                 * @property {creator_stage.realtime.v1.Role|null} [role] AudienceChatEvent role
                 * @property {creator_stage.realtime.v1.AudienceMessageType|null} [type] AudienceChatEvent type
                 * @property {creator_stage.realtime.v1.AudienceChatMessage.$Properties|null} [chatMessage] AudienceChatEvent chatMessage
                 * @property {creator_stage.realtime.v1.AudienceQuizResponse.$Properties|null} [quizResponse] AudienceChatEvent quizResponse
                 * @property {"chatMessage"|"quizResponse"} [body] AudienceChatEvent body
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of an AudienceChatEvent.
                 * @memberof creator_stage.realtime.v1
                 * @interface IAudienceChatEvent
                 * @augments creator_stage.realtime.v1.AudienceChatEvent.$Properties
                 * @deprecated Use creator_stage.realtime.v1.AudienceChatEvent.$Properties instead.
                 */

                /**
                 * Narrowed shape of an AudienceChatEvent.
                 * @typedef {{
                 *   role?: creator_stage.realtime.v1.Role|null;
                 *   type?: creator_stage.realtime.v1.AudienceMessageType|null;
                 *   chatMessage?: creator_stage.realtime.v1.AudienceChatMessage.$Shape|null;
                 *   quizResponse?: creator_stage.realtime.v1.AudienceQuizResponse.$Shape|null;
                 *   $unknowns?: Array.<Uint8Array>;
                 * } & (
                 *   ({ body?: undefined; chatMessage?: null; quizResponse?: null }|{ body?: "chatMessage"; chatMessage: creator_stage.realtime.v1.AudienceChatMessage.$Shape; quizResponse?: null }|{ body?: "quizResponse"; chatMessage?: null; quizResponse: creator_stage.realtime.v1.AudienceQuizResponse.$Shape })
                 * )} creator_stage.realtime.v1.AudienceChatEvent.$Shape
                 */

                /**
                 * Constructs a new AudienceChatEvent.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents an AudienceChatEvent.
                 * @constructor
                 * @param {creator_stage.realtime.v1.AudienceChatEvent.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function AudienceChatEvent(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * AudienceChatEvent role.
                 * @member {creator_stage.realtime.v1.Role} role
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @instance
                 */
                AudienceChatEvent.prototype.role = 0;

                /**
                 * AudienceChatEvent type.
                 * @member {creator_stage.realtime.v1.AudienceMessageType} type
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @instance
                 */
                AudienceChatEvent.prototype.type = 0;

                /**
                 * AudienceChatEvent chatMessage.
                 * @member {creator_stage.realtime.v1.AudienceChatMessage.$Properties|null|undefined} chatMessage
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @instance
                 */
                AudienceChatEvent.prototype.chatMessage = null;

                /**
                 * AudienceChatEvent quizResponse.
                 * @member {creator_stage.realtime.v1.AudienceQuizResponse.$Properties|null|undefined} quizResponse
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @instance
                 */
                AudienceChatEvent.prototype.quizResponse = null;

                // OneOf field names bound to virtual getters and setters
                let $oneOfFields;

                /**
                 * AudienceChatEvent body.
                 * @member {"chatMessage"|"quizResponse"|undefined} body
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @instance
                 */
                Object.defineProperty(AudienceChatEvent.prototype, "body", {
                    get: $util.oneOfGetter($oneOfFields = ["chatMessage", "quizResponse"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new AudienceChatEvent instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceChatEvent.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.AudienceChatEvent} AudienceChatEvent instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.AudienceChatEvent.$Shape): creator_stage.realtime.v1.AudienceChatEvent & creator_stage.realtime.v1.AudienceChatEvent.$Shape;
                 *   (properties?: creator_stage.realtime.v1.AudienceChatEvent.$Properties): creator_stage.realtime.v1.AudienceChatEvent;
                 * }}
                 */
                AudienceChatEvent.create = function create(properties) {
                    return new AudienceChatEvent(properties);
                };

                /**
                 * Encodes the specified AudienceChatEvent message. Does not implicitly {@link creator_stage.realtime.v1.AudienceChatEvent.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceChatEvent.$Properties} message AudienceChatEvent message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudienceChatEvent.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.role != null && Object.hasOwnProperty.call(message, "role"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.role);
                    if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                    if (message.chatMessage != null && Object.hasOwnProperty.call(message, "chatMessage"))
                        $root.creator_stage.realtime.v1.AudienceChatMessage.encode(message.chatMessage, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                    if (message.quizResponse != null && Object.hasOwnProperty.call(message, "quizResponse"))
                        $root.creator_stage.realtime.v1.AudienceQuizResponse.encode(message.quizResponse, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified AudienceChatEvent message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.AudienceChatEvent.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceChatEvent.$Properties} message AudienceChatEvent message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudienceChatEvent.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an AudienceChatEvent message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.AudienceChatEvent & creator_stage.realtime.v1.AudienceChatEvent.$Shape} AudienceChatEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudienceChatEvent.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.AudienceChatEvent(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                if (value = reader.int32())
                                    message.role = value;
                                else
                                    delete message.role;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                if (value = reader.int32())
                                    message.type = value;
                                else
                                    delete message.type;
                                continue;
                            }
                        case 10: {
                                if (wireType !== 2)
                                    break;
                                message.chatMessage = $root.creator_stage.realtime.v1.AudienceChatMessage.decode(reader, reader.uint32(), undefined, _depth + 1, message.chatMessage);
                                message.body = "chatMessage";
                                continue;
                            }
                        case 11: {
                                if (wireType !== 2)
                                    break;
                                message.quizResponse = $root.creator_stage.realtime.v1.AudienceQuizResponse.decode(reader, reader.uint32(), undefined, _depth + 1, message.quizResponse);
                                message.body = "quizResponse";
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes an AudienceChatEvent message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.AudienceChatEvent & creator_stage.realtime.v1.AudienceChatEvent.$Shape} AudienceChatEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudienceChatEvent.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AudienceChatEvent message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AudienceChatEvent.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    let properties = {};
                    if (message.role != null && message.hasOwnProperty("role"))
                        switch (message.role) {
                        default:
                            return "role: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                        }
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
                    if (message.chatMessage != null && message.hasOwnProperty("chatMessage")) {
                        properties.body = 1;
                        {
                            let error = $root.creator_stage.realtime.v1.AudienceChatMessage.verify(message.chatMessage, _depth + 1);
                            if (error)
                                return "chatMessage." + error;
                        }
                    }
                    if (message.quizResponse != null && message.hasOwnProperty("quizResponse")) {
                        if (properties.body === 1)
                            return "body: multiple values";
                        properties.body = 1;
                        {
                            let error = $root.creator_stage.realtime.v1.AudienceQuizResponse.verify(message.quizResponse, _depth + 1);
                            if (error)
                                return "quizResponse." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates an AudienceChatEvent message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.AudienceChatEvent} AudienceChatEvent
                 */
                AudienceChatEvent.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.AudienceChatEvent)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.AudienceChatEvent();
                    if (object.role !== 0 && (typeof object.role !== "string" || $root.creator_stage.realtime.v1.Role[object.role] !== 0))
                        switch (object.role) {
                        default:
                            if (typeof object.role === "number") {
                                message.role = object.role;
                                break;
                            }
                            break;
                        case "ROLE_UNSPECIFIED":
                        case 0:
                            message.role = 0;
                            break;
                        case "ROLE_CREATOR":
                        case 1:
                            message.role = 1;
                            break;
                        case "ROLE_TEAM":
                        case 2:
                            message.role = 2;
                            break;
                        case "ROLE_AUDIENCE":
                        case 3:
                            message.role = 3;
                            break;
                        }
                    if (object.type !== 0 && (typeof object.type !== "string" || $root.creator_stage.realtime.v1.AudienceMessageType[object.type] !== 0))
                        switch (object.type) {
                        default:
                            if (typeof object.type === "number") {
                                message.type = object.type;
                                break;
                            }
                            break;
                        case "TYPE_AUDIENCE_MESSAGE":
                        case 0:
                            message.type = 0;
                            break;
                        case "TYPE_POLL_RESPONSE":
                        case 1:
                            message.type = 1;
                            break;
                        case "TYPE_VIDEO_METADATA":
                        case 2:
                            message.type = 2;
                            break;
                        }
                    if (object.chatMessage != null) {
                        if (typeof object.chatMessage !== "object")
                            throw TypeError(".creator_stage.realtime.v1.AudienceChatEvent.chatMessage: object expected");
                        message.chatMessage = $root.creator_stage.realtime.v1.AudienceChatMessage.fromObject(object.chatMessage, _depth + 1);
                    }
                    if (object.quizResponse != null) {
                        if (typeof object.quizResponse !== "object")
                            throw TypeError(".creator_stage.realtime.v1.AudienceChatEvent.quizResponse: object expected");
                        message.quizResponse = $root.creator_stage.realtime.v1.AudienceQuizResponse.fromObject(object.quizResponse, _depth + 1);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an AudienceChatEvent message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceChatEvent} message AudienceChatEvent
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AudienceChatEvent.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.role = options.enums === String ? "ROLE_UNSPECIFIED" : 0;
                        object.type = options.enums === String ? "TYPE_AUDIENCE_MESSAGE" : 0;
                    }
                    if (message.role != null && message.hasOwnProperty("role"))
                        object.role = options.enums === String ? $root.creator_stage.realtime.v1.Role[message.role] === undefined ? message.role : $root.creator_stage.realtime.v1.Role[message.role] : message.role;
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.creator_stage.realtime.v1.AudienceMessageType[message.type] === undefined ? message.type : $root.creator_stage.realtime.v1.AudienceMessageType[message.type] : message.type;
                    if (message.chatMessage != null && message.hasOwnProperty("chatMessage")) {
                        object.chatMessage = $root.creator_stage.realtime.v1.AudienceChatMessage.toObject(message.chatMessage, options);
                        if (options.oneofs)
                            object.body = "chatMessage";
                    }
                    if (message.quizResponse != null && message.hasOwnProperty("quizResponse")) {
                        object.quizResponse = $root.creator_stage.realtime.v1.AudienceQuizResponse.toObject(message.quizResponse, options);
                        if (options.oneofs)
                            object.body = "quizResponse";
                    }
                    return object;
                };

                /**
                 * Converts this AudienceChatEvent to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AudienceChatEvent.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for AudienceChatEvent
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.AudienceChatEvent
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                AudienceChatEvent.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.AudienceChatEvent";
                };

                return AudienceChatEvent;
            })();

            v1.BatchedChatMessages = (function() {

                /**
                 * Properties of a BatchedChatMessages.
                 * @typedef {Object} creator_stage.realtime.v1.BatchedChatMessages.$Properties
                 * @property {number|null} [liveActiveConnections] BatchedChatMessages liveActiveConnections
                 * @property {Array.<creator_stage.realtime.v1.AudienceChatMessage.$Properties>|null} [messages] BatchedChatMessages messages
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of a BatchedChatMessages.
                 * @memberof creator_stage.realtime.v1
                 * @interface IBatchedChatMessages
                 * @augments creator_stage.realtime.v1.BatchedChatMessages.$Properties
                 * @deprecated Use creator_stage.realtime.v1.BatchedChatMessages.$Properties instead.
                 */

                /**
                 * Shape of a BatchedChatMessages.
                 * @typedef {creator_stage.realtime.v1.BatchedChatMessages.$Properties} creator_stage.realtime.v1.BatchedChatMessages.$Shape
                 */

                /**
                 * Constructs a new BatchedChatMessages.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents a BatchedChatMessages.
                 * @constructor
                 * @param {creator_stage.realtime.v1.BatchedChatMessages.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function BatchedChatMessages(properties) {
                    this.messages = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * BatchedChatMessages liveActiveConnections.
                 * @member {number} liveActiveConnections
                 * @memberof creator_stage.realtime.v1.BatchedChatMessages
                 * @instance
                 */
                BatchedChatMessages.prototype.liveActiveConnections = 0;

                /**
                 * BatchedChatMessages messages.
                 * @member {Array.<creator_stage.realtime.v1.AudienceChatMessage.$Properties>} messages
                 * @memberof creator_stage.realtime.v1.BatchedChatMessages
                 * @instance
                 */
                BatchedChatMessages.prototype.messages = $util.emptyArray;

                /**
                 * Creates a new BatchedChatMessages instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.BatchedChatMessages
                 * @static
                 * @param {creator_stage.realtime.v1.BatchedChatMessages.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.BatchedChatMessages} BatchedChatMessages instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.BatchedChatMessages.$Shape): creator_stage.realtime.v1.BatchedChatMessages & creator_stage.realtime.v1.BatchedChatMessages.$Shape;
                 *   (properties?: creator_stage.realtime.v1.BatchedChatMessages.$Properties): creator_stage.realtime.v1.BatchedChatMessages;
                 * }}
                 */
                BatchedChatMessages.create = function create(properties) {
                    return new BatchedChatMessages(properties);
                };

                /**
                 * Encodes the specified BatchedChatMessages message. Does not implicitly {@link creator_stage.realtime.v1.BatchedChatMessages.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.BatchedChatMessages
                 * @static
                 * @param {creator_stage.realtime.v1.BatchedChatMessages.$Properties} message BatchedChatMessages message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BatchedChatMessages.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.liveActiveConnections != null && Object.hasOwnProperty.call(message, "liveActiveConnections"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.liveActiveConnections);
                    if (message.messages != null && message.messages.length)
                        for (let i = 0; i < message.messages.length; ++i)
                            $root.creator_stage.realtime.v1.AudienceChatMessage.encode(message.messages[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified BatchedChatMessages message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.BatchedChatMessages.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.BatchedChatMessages
                 * @static
                 * @param {creator_stage.realtime.v1.BatchedChatMessages.$Properties} message BatchedChatMessages message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BatchedChatMessages.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a BatchedChatMessages message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.BatchedChatMessages
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.BatchedChatMessages & creator_stage.realtime.v1.BatchedChatMessages.$Shape} BatchedChatMessages
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BatchedChatMessages.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.BatchedChatMessages(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                if (value = reader.uint32())
                                    message.liveActiveConnections = value;
                                else
                                    delete message.liveActiveConnections;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                if (!(message.messages && message.messages.length))
                                    message.messages = [];
                                message.messages.push($root.creator_stage.realtime.v1.AudienceChatMessage.decode(reader, reader.uint32(), undefined, _depth + 1));
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes a BatchedChatMessages message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.BatchedChatMessages
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.BatchedChatMessages & creator_stage.realtime.v1.BatchedChatMessages.$Shape} BatchedChatMessages
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BatchedChatMessages.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a BatchedChatMessages message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.BatchedChatMessages
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                BatchedChatMessages.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.liveActiveConnections != null && message.hasOwnProperty("liveActiveConnections"))
                        if (!$util.isInteger(message.liveActiveConnections))
                            return "liveActiveConnections: integer expected";
                    if (message.messages != null && message.hasOwnProperty("messages")) {
                        if (!Array.isArray(message.messages))
                            return "messages: array expected";
                        for (let i = 0; i < message.messages.length; ++i) {
                            let error = $root.creator_stage.realtime.v1.AudienceChatMessage.verify(message.messages[i], _depth + 1);
                            if (error)
                                return "messages." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a BatchedChatMessages message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.BatchedChatMessages
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.BatchedChatMessages} BatchedChatMessages
                 */
                BatchedChatMessages.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.BatchedChatMessages)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.BatchedChatMessages();
                    if (object.liveActiveConnections != null)
                        if (Number(object.liveActiveConnections) !== 0)
                            message.liveActiveConnections = object.liveActiveConnections >>> 0;
                    if (object.messages) {
                        if (!Array.isArray(object.messages))
                            throw TypeError(".creator_stage.realtime.v1.BatchedChatMessages.messages: array expected");
                        message.messages = Array(object.messages.length);
                        for (let i = 0; i < object.messages.length; ++i) {
                            if (typeof object.messages[i] !== "object")
                                throw TypeError(".creator_stage.realtime.v1.BatchedChatMessages.messages: object expected");
                            message.messages[i] = $root.creator_stage.realtime.v1.AudienceChatMessage.fromObject(object.messages[i], _depth + 1);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a BatchedChatMessages message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.BatchedChatMessages
                 * @static
                 * @param {creator_stage.realtime.v1.BatchedChatMessages} message BatchedChatMessages
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                BatchedChatMessages.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.messages = [];
                    if (options.defaults)
                        object.liveActiveConnections = 0;
                    if (message.liveActiveConnections != null && message.hasOwnProperty("liveActiveConnections"))
                        object.liveActiveConnections = message.liveActiveConnections;
                    if (message.messages && message.messages.length) {
                        object.messages = Array(message.messages.length);
                        for (let j = 0; j < message.messages.length; ++j)
                            object.messages[j] = $root.creator_stage.realtime.v1.AudienceChatMessage.toObject(message.messages[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this BatchedChatMessages to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.BatchedChatMessages
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                BatchedChatMessages.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for BatchedChatMessages
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.BatchedChatMessages
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                BatchedChatMessages.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.BatchedChatMessages";
                };

                return BatchedChatMessages;
            })();

            v1.AudienceConnectData = (function() {

                /**
                 * Properties of an AudienceConnectData.
                 * @typedef {Object} creator_stage.realtime.v1.AudienceConnectData.$Properties
                 * @property {string|null} [videoBroadcastId] AudienceConnectData videoBroadcastId
                 * @property {string|null} [userId] AudienceConnectData userId
                 * @property {string|null} [displayName] AudienceConnectData displayName
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of an AudienceConnectData.
                 * @memberof creator_stage.realtime.v1
                 * @interface IAudienceConnectData
                 * @augments creator_stage.realtime.v1.AudienceConnectData.$Properties
                 * @deprecated Use creator_stage.realtime.v1.AudienceConnectData.$Properties instead.
                 */

                /**
                 * Shape of an AudienceConnectData.
                 * @typedef {creator_stage.realtime.v1.AudienceConnectData.$Properties} creator_stage.realtime.v1.AudienceConnectData.$Shape
                 */

                /**
                 * Constructs a new AudienceConnectData.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents an AudienceConnectData.
                 * @constructor
                 * @param {creator_stage.realtime.v1.AudienceConnectData.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function AudienceConnectData(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * AudienceConnectData videoBroadcastId.
                 * @member {string} videoBroadcastId
                 * @memberof creator_stage.realtime.v1.AudienceConnectData
                 * @instance
                 */
                AudienceConnectData.prototype.videoBroadcastId = "";

                /**
                 * AudienceConnectData userId.
                 * @member {string} userId
                 * @memberof creator_stage.realtime.v1.AudienceConnectData
                 * @instance
                 */
                AudienceConnectData.prototype.userId = "";

                /**
                 * AudienceConnectData displayName.
                 * @member {string} displayName
                 * @memberof creator_stage.realtime.v1.AudienceConnectData
                 * @instance
                 */
                AudienceConnectData.prototype.displayName = "";

                /**
                 * Creates a new AudienceConnectData instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.AudienceConnectData
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceConnectData.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.AudienceConnectData} AudienceConnectData instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.AudienceConnectData.$Shape): creator_stage.realtime.v1.AudienceConnectData & creator_stage.realtime.v1.AudienceConnectData.$Shape;
                 *   (properties?: creator_stage.realtime.v1.AudienceConnectData.$Properties): creator_stage.realtime.v1.AudienceConnectData;
                 * }}
                 */
                AudienceConnectData.create = function create(properties) {
                    return new AudienceConnectData(properties);
                };

                /**
                 * Encodes the specified AudienceConnectData message. Does not implicitly {@link creator_stage.realtime.v1.AudienceConnectData.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.AudienceConnectData
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceConnectData.$Properties} message AudienceConnectData message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudienceConnectData.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.videoBroadcastId != null && Object.hasOwnProperty.call(message, "videoBroadcastId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.videoBroadcastId);
                    if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.userId);
                    if (message.displayName != null && Object.hasOwnProperty.call(message, "displayName"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.displayName);
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified AudienceConnectData message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.AudienceConnectData.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.AudienceConnectData
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceConnectData.$Properties} message AudienceConnectData message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudienceConnectData.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an AudienceConnectData message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.AudienceConnectData
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.AudienceConnectData & creator_stage.realtime.v1.AudienceConnectData.$Shape} AudienceConnectData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudienceConnectData.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.AudienceConnectData(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.videoBroadcastId = value;
                                else
                                    delete message.videoBroadcastId;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.userId = value;
                                else
                                    delete message.userId;
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.displayName = value;
                                else
                                    delete message.displayName;
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes an AudienceConnectData message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.AudienceConnectData
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.AudienceConnectData & creator_stage.realtime.v1.AudienceConnectData.$Shape} AudienceConnectData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudienceConnectData.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AudienceConnectData message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.AudienceConnectData
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AudienceConnectData.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.videoBroadcastId != null && message.hasOwnProperty("videoBroadcastId"))
                        if (!$util.isString(message.videoBroadcastId))
                            return "videoBroadcastId: string expected";
                    if (message.userId != null && message.hasOwnProperty("userId"))
                        if (!$util.isString(message.userId))
                            return "userId: string expected";
                    if (message.displayName != null && message.hasOwnProperty("displayName"))
                        if (!$util.isString(message.displayName))
                            return "displayName: string expected";
                    return null;
                };

                /**
                 * Creates an AudienceConnectData message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.AudienceConnectData
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.AudienceConnectData} AudienceConnectData
                 */
                AudienceConnectData.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.AudienceConnectData)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.AudienceConnectData();
                    if (object.videoBroadcastId != null)
                        if (typeof object.videoBroadcastId !== "string" || object.videoBroadcastId.length)
                            message.videoBroadcastId = String(object.videoBroadcastId);
                    if (object.userId != null)
                        if (typeof object.userId !== "string" || object.userId.length)
                            message.userId = String(object.userId);
                    if (object.displayName != null)
                        if (typeof object.displayName !== "string" || object.displayName.length)
                            message.displayName = String(object.displayName);
                    return message;
                };

                /**
                 * Creates a plain object from an AudienceConnectData message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.AudienceConnectData
                 * @static
                 * @param {creator_stage.realtime.v1.AudienceConnectData} message AudienceConnectData
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AudienceConnectData.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.videoBroadcastId = "";
                        object.userId = "";
                        object.displayName = "";
                    }
                    if (message.videoBroadcastId != null && message.hasOwnProperty("videoBroadcastId"))
                        object.videoBroadcastId = message.videoBroadcastId;
                    if (message.userId != null && message.hasOwnProperty("userId"))
                        object.userId = message.userId;
                    if (message.displayName != null && message.hasOwnProperty("displayName"))
                        object.displayName = message.displayName;
                    return object;
                };

                /**
                 * Converts this AudienceConnectData to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.AudienceConnectData
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AudienceConnectData.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for AudienceConnectData
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.AudienceConnectData
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                AudienceConnectData.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.AudienceConnectData";
                };

                return AudienceConnectData;
            })();

            /**
             * Role enum.
             * @name creator_stage.realtime.v1.Role
             * @enum {number}
             * @property {number} ROLE_UNSPECIFIED=0 ROLE_UNSPECIFIED value
             * @property {number} ROLE_CREATOR=1 ROLE_CREATOR value
             * @property {number} ROLE_TEAM=2 ROLE_TEAM value
             * @property {number} ROLE_AUDIENCE=3 ROLE_AUDIENCE value
             */
            v1.Role = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "ROLE_UNSPECIFIED"] = 0;
                values[valuesById[1] = "ROLE_CREATOR"] = 1;
                values[valuesById[2] = "ROLE_TEAM"] = 2;
                values[valuesById[3] = "ROLE_AUDIENCE"] = 3;
                return values;
            })();

            /**
             * Type enum.
             * @name creator_stage.realtime.v1.Type
             * @enum {number}
             * @property {number} TYPE_CREATOR_MESSAGE=0 TYPE_CREATOR_MESSAGE value
             * @property {number} TYPE_PIN=1 TYPE_PIN value
             * @property {number} TYPE_UNPIN=2 TYPE_UNPIN value
             * @property {number} TYPE_CTA_PUSH=3 TYPE_CTA_PUSH value
             * @property {number} TYPE_CTA_DISMISS=4 TYPE_CTA_DISMISS value
             * @property {number} TYPE_QUIZ_START=5 TYPE_QUIZ_START value
             * @property {number} TYPE_QUIZ_END=6 TYPE_QUIZ_END value
             */
            v1.Type = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "TYPE_CREATOR_MESSAGE"] = 0;
                values[valuesById[1] = "TYPE_PIN"] = 1;
                values[valuesById[2] = "TYPE_UNPIN"] = 2;
                values[valuesById[3] = "TYPE_CTA_PUSH"] = 3;
                values[valuesById[4] = "TYPE_CTA_DISMISS"] = 4;
                values[valuesById[5] = "TYPE_QUIZ_START"] = 5;
                values[valuesById[6] = "TYPE_QUIZ_END"] = 6;
                return values;
            })();

            v1.CreatorChatMessage = (function() {

                /**
                 * Properties of a CreatorChatMessage.
                 * @typedef {Object} creator_stage.realtime.v1.CreatorChatMessage.$Properties
                 * @property {string|null} [id] CreatorChatMessage id
                 * @property {string|null} [message] CreatorChatMessage message
                 * @property {string|null} [audienceMessageId] CreatorChatMessage audienceMessageId
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of a CreatorChatMessage.
                 * @memberof creator_stage.realtime.v1
                 * @interface ICreatorChatMessage
                 * @augments creator_stage.realtime.v1.CreatorChatMessage.$Properties
                 * @deprecated Use creator_stage.realtime.v1.CreatorChatMessage.$Properties instead.
                 */

                /**
                 * Shape of a CreatorChatMessage.
                 * @typedef {creator_stage.realtime.v1.CreatorChatMessage.$Properties} creator_stage.realtime.v1.CreatorChatMessage.$Shape
                 */

                /**
                 * Constructs a new CreatorChatMessage.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents a CreatorChatMessage.
                 * @constructor
                 * @param {creator_stage.realtime.v1.CreatorChatMessage.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function CreatorChatMessage(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CreatorChatMessage id.
                 * @member {string} id
                 * @memberof creator_stage.realtime.v1.CreatorChatMessage
                 * @instance
                 */
                CreatorChatMessage.prototype.id = "";

                /**
                 * CreatorChatMessage message.
                 * @member {string} message
                 * @memberof creator_stage.realtime.v1.CreatorChatMessage
                 * @instance
                 */
                CreatorChatMessage.prototype.message = "";

                /**
                 * CreatorChatMessage audienceMessageId.
                 * @member {string|null|undefined} audienceMessageId
                 * @memberof creator_stage.realtime.v1.CreatorChatMessage
                 * @instance
                 */
                CreatorChatMessage.prototype.audienceMessageId = null;

                // OneOf field names bound to virtual getters and setters
                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                Object.defineProperty(CreatorChatMessage.prototype, "_audienceMessageId", {
                    get: $util.oneOfGetter($oneOfFields = ["audienceMessageId"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new CreatorChatMessage instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.CreatorChatMessage
                 * @static
                 * @param {creator_stage.realtime.v1.CreatorChatMessage.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.CreatorChatMessage} CreatorChatMessage instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.CreatorChatMessage.$Shape): creator_stage.realtime.v1.CreatorChatMessage & creator_stage.realtime.v1.CreatorChatMessage.$Shape;
                 *   (properties?: creator_stage.realtime.v1.CreatorChatMessage.$Properties): creator_stage.realtime.v1.CreatorChatMessage;
                 * }}
                 */
                CreatorChatMessage.create = function create(properties) {
                    return new CreatorChatMessage(properties);
                };

                /**
                 * Encodes the specified CreatorChatMessage message. Does not implicitly {@link creator_stage.realtime.v1.CreatorChatMessage.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.CreatorChatMessage
                 * @static
                 * @param {creator_stage.realtime.v1.CreatorChatMessage.$Properties} message CreatorChatMessage message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CreatorChatMessage.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                    if (message.audienceMessageId != null && Object.hasOwnProperty.call(message, "audienceMessageId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.audienceMessageId);
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified CreatorChatMessage message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.CreatorChatMessage.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.CreatorChatMessage
                 * @static
                 * @param {creator_stage.realtime.v1.CreatorChatMessage.$Properties} message CreatorChatMessage message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CreatorChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CreatorChatMessage message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.CreatorChatMessage
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.CreatorChatMessage & creator_stage.realtime.v1.CreatorChatMessage.$Shape} CreatorChatMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CreatorChatMessage.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.CreatorChatMessage(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.id = value;
                                else
                                    delete message.id;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.message = value;
                                else
                                    delete message.message;
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                message.audienceMessageId = reader.string();
                                message._audienceMessageId = "audienceMessageId";
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes a CreatorChatMessage message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.CreatorChatMessage
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.CreatorChatMessage & creator_stage.realtime.v1.CreatorChatMessage.$Shape} CreatorChatMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CreatorChatMessage.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CreatorChatMessage message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.CreatorChatMessage
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CreatorChatMessage.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    let properties = {};
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.message != null && message.hasOwnProperty("message"))
                        if (!$util.isString(message.message))
                            return "message: string expected";
                    if (message.audienceMessageId != null && message.hasOwnProperty("audienceMessageId")) {
                        properties._audienceMessageId = 1;
                        if (!$util.isString(message.audienceMessageId))
                            return "audienceMessageId: string expected";
                    }
                    return null;
                };

                /**
                 * Creates a CreatorChatMessage message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.CreatorChatMessage
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.CreatorChatMessage} CreatorChatMessage
                 */
                CreatorChatMessage.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.CreatorChatMessage)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.CreatorChatMessage();
                    if (object.id != null)
                        if (typeof object.id !== "string" || object.id.length)
                            message.id = String(object.id);
                    if (object.message != null)
                        if (typeof object.message !== "string" || object.message.length)
                            message.message = String(object.message);
                    if (object.audienceMessageId != null)
                        message.audienceMessageId = String(object.audienceMessageId);
                    return message;
                };

                /**
                 * Creates a plain object from a CreatorChatMessage message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.CreatorChatMessage
                 * @static
                 * @param {creator_stage.realtime.v1.CreatorChatMessage} message CreatorChatMessage
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CreatorChatMessage.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.message = "";
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.message != null && message.hasOwnProperty("message"))
                        object.message = message.message;
                    if (message.audienceMessageId != null && message.hasOwnProperty("audienceMessageId")) {
                        object.audienceMessageId = message.audienceMessageId;
                        if (options.oneofs)
                            object._audienceMessageId = "audienceMessageId";
                    }
                    return object;
                };

                /**
                 * Converts this CreatorChatMessage to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.CreatorChatMessage
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CreatorChatMessage.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for CreatorChatMessage
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.CreatorChatMessage
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                CreatorChatMessage.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.CreatorChatMessage";
                };

                return CreatorChatMessage;
            })();

            v1.Pin = (function() {

                /**
                 * Properties of a Pin.
                 * @typedef {Object} creator_stage.realtime.v1.Pin.$Properties
                 * @property {string|null} [id] Pin id
                 * @property {string|null} [message] Pin message
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of a Pin.
                 * @memberof creator_stage.realtime.v1
                 * @interface IPin
                 * @augments creator_stage.realtime.v1.Pin.$Properties
                 * @deprecated Use creator_stage.realtime.v1.Pin.$Properties instead.
                 */

                /**
                 * Shape of a Pin.
                 * @typedef {creator_stage.realtime.v1.Pin.$Properties} creator_stage.realtime.v1.Pin.$Shape
                 */

                /**
                 * Constructs a new Pin.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents a Pin.
                 * @constructor
                 * @param {creator_stage.realtime.v1.Pin.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function Pin(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Pin id.
                 * @member {string} id
                 * @memberof creator_stage.realtime.v1.Pin
                 * @instance
                 */
                Pin.prototype.id = "";

                /**
                 * Pin message.
                 * @member {string} message
                 * @memberof creator_stage.realtime.v1.Pin
                 * @instance
                 */
                Pin.prototype.message = "";

                /**
                 * Creates a new Pin instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.Pin
                 * @static
                 * @param {creator_stage.realtime.v1.Pin.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.Pin} Pin instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.Pin.$Shape): creator_stage.realtime.v1.Pin & creator_stage.realtime.v1.Pin.$Shape;
                 *   (properties?: creator_stage.realtime.v1.Pin.$Properties): creator_stage.realtime.v1.Pin;
                 * }}
                 */
                Pin.create = function create(properties) {
                    return new Pin(properties);
                };

                /**
                 * Encodes the specified Pin message. Does not implicitly {@link creator_stage.realtime.v1.Pin.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.Pin
                 * @static
                 * @param {creator_stage.realtime.v1.Pin.$Properties} message Pin message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Pin.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified Pin message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.Pin.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.Pin
                 * @static
                 * @param {creator_stage.realtime.v1.Pin.$Properties} message Pin message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Pin.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Pin message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.Pin
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.Pin & creator_stage.realtime.v1.Pin.$Shape} Pin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Pin.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.Pin(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.id = value;
                                else
                                    delete message.id;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.message = value;
                                else
                                    delete message.message;
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes a Pin message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.Pin
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.Pin & creator_stage.realtime.v1.Pin.$Shape} Pin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Pin.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Pin message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.Pin
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Pin.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.message != null && message.hasOwnProperty("message"))
                        if (!$util.isString(message.message))
                            return "message: string expected";
                    return null;
                };

                /**
                 * Creates a Pin message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.Pin
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.Pin} Pin
                 */
                Pin.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.Pin)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.Pin();
                    if (object.id != null)
                        if (typeof object.id !== "string" || object.id.length)
                            message.id = String(object.id);
                    if (object.message != null)
                        if (typeof object.message !== "string" || object.message.length)
                            message.message = String(object.message);
                    return message;
                };

                /**
                 * Creates a plain object from a Pin message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.Pin
                 * @static
                 * @param {creator_stage.realtime.v1.Pin} message Pin
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Pin.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.message = "";
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.message != null && message.hasOwnProperty("message"))
                        object.message = message.message;
                    return object;
                };

                /**
                 * Converts this Pin to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.Pin
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Pin.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for Pin
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.Pin
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                Pin.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.Pin";
                };

                return Pin;
            })();

            v1.Unpin = (function() {

                /**
                 * Properties of an Unpin.
                 * @typedef {Object} creator_stage.realtime.v1.Unpin.$Properties
                 * @property {string|null} [messageId] Unpin messageId
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of an Unpin.
                 * @memberof creator_stage.realtime.v1
                 * @interface IUnpin
                 * @augments creator_stage.realtime.v1.Unpin.$Properties
                 * @deprecated Use creator_stage.realtime.v1.Unpin.$Properties instead.
                 */

                /**
                 * Shape of an Unpin.
                 * @typedef {creator_stage.realtime.v1.Unpin.$Properties} creator_stage.realtime.v1.Unpin.$Shape
                 */

                /**
                 * Constructs a new Unpin.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents an Unpin.
                 * @constructor
                 * @param {creator_stage.realtime.v1.Unpin.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function Unpin(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Unpin messageId.
                 * @member {string} messageId
                 * @memberof creator_stage.realtime.v1.Unpin
                 * @instance
                 */
                Unpin.prototype.messageId = "";

                /**
                 * Creates a new Unpin instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.Unpin
                 * @static
                 * @param {creator_stage.realtime.v1.Unpin.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.Unpin} Unpin instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.Unpin.$Shape): creator_stage.realtime.v1.Unpin & creator_stage.realtime.v1.Unpin.$Shape;
                 *   (properties?: creator_stage.realtime.v1.Unpin.$Properties): creator_stage.realtime.v1.Unpin;
                 * }}
                 */
                Unpin.create = function create(properties) {
                    return new Unpin(properties);
                };

                /**
                 * Encodes the specified Unpin message. Does not implicitly {@link creator_stage.realtime.v1.Unpin.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.Unpin
                 * @static
                 * @param {creator_stage.realtime.v1.Unpin.$Properties} message Unpin message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Unpin.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.messageId);
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified Unpin message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.Unpin.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.Unpin
                 * @static
                 * @param {creator_stage.realtime.v1.Unpin.$Properties} message Unpin message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Unpin.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an Unpin message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.Unpin
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.Unpin & creator_stage.realtime.v1.Unpin.$Shape} Unpin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Unpin.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.Unpin(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.messageId = value;
                                else
                                    delete message.messageId;
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes an Unpin message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.Unpin
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.Unpin & creator_stage.realtime.v1.Unpin.$Shape} Unpin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Unpin.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an Unpin message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.Unpin
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Unpin.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.messageId != null && message.hasOwnProperty("messageId"))
                        if (!$util.isString(message.messageId))
                            return "messageId: string expected";
                    return null;
                };

                /**
                 * Creates an Unpin message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.Unpin
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.Unpin} Unpin
                 */
                Unpin.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.Unpin)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.Unpin();
                    if (object.messageId != null)
                        if (typeof object.messageId !== "string" || object.messageId.length)
                            message.messageId = String(object.messageId);
                    return message;
                };

                /**
                 * Creates a plain object from an Unpin message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.Unpin
                 * @static
                 * @param {creator_stage.realtime.v1.Unpin} message Unpin
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Unpin.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.messageId = "";
                    if (message.messageId != null && message.hasOwnProperty("messageId"))
                        object.messageId = message.messageId;
                    return object;
                };

                /**
                 * Converts this Unpin to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.Unpin
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Unpin.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for Unpin
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.Unpin
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                Unpin.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.Unpin";
                };

                return Unpin;
            })();

            /**
             * CtaType enum.
             * @name creator_stage.realtime.v1.CtaType
             * @enum {number}
             * @property {number} TYPE_PAYMENT=0 TYPE_PAYMENT value
             */
            v1.CtaType = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "TYPE_PAYMENT"] = 0;
                return values;
            })();

            v1.CTAPush = (function() {

                /**
                 * Properties of a CTAPush.
                 * @typedef {Object} creator_stage.realtime.v1.CTAPush.$Properties
                 * @property {string|null} [id] CTAPush id
                 * @property {string|null} [label] CTAPush label
                 * @property {string|null} [url] CTAPush url
                 * @property {creator_stage.realtime.v1.CtaType|null} [type] CTAPush type
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of a CTAPush.
                 * @memberof creator_stage.realtime.v1
                 * @interface ICTAPush
                 * @augments creator_stage.realtime.v1.CTAPush.$Properties
                 * @deprecated Use creator_stage.realtime.v1.CTAPush.$Properties instead.
                 */

                /**
                 * Shape of a CTAPush.
                 * @typedef {creator_stage.realtime.v1.CTAPush.$Properties} creator_stage.realtime.v1.CTAPush.$Shape
                 */

                /**
                 * Constructs a new CTAPush.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents a CTAPush.
                 * @constructor
                 * @param {creator_stage.realtime.v1.CTAPush.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function CTAPush(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CTAPush id.
                 * @member {string} id
                 * @memberof creator_stage.realtime.v1.CTAPush
                 * @instance
                 */
                CTAPush.prototype.id = "";

                /**
                 * CTAPush label.
                 * @member {string} label
                 * @memberof creator_stage.realtime.v1.CTAPush
                 * @instance
                 */
                CTAPush.prototype.label = "";

                /**
                 * CTAPush url.
                 * @member {string} url
                 * @memberof creator_stage.realtime.v1.CTAPush
                 * @instance
                 */
                CTAPush.prototype.url = "";

                /**
                 * CTAPush type.
                 * @member {creator_stage.realtime.v1.CtaType} type
                 * @memberof creator_stage.realtime.v1.CTAPush
                 * @instance
                 */
                CTAPush.prototype.type = 0;

                /**
                 * Creates a new CTAPush instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.CTAPush
                 * @static
                 * @param {creator_stage.realtime.v1.CTAPush.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.CTAPush} CTAPush instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.CTAPush.$Shape): creator_stage.realtime.v1.CTAPush & creator_stage.realtime.v1.CTAPush.$Shape;
                 *   (properties?: creator_stage.realtime.v1.CTAPush.$Properties): creator_stage.realtime.v1.CTAPush;
                 * }}
                 */
                CTAPush.create = function create(properties) {
                    return new CTAPush(properties);
                };

                /**
                 * Encodes the specified CTAPush message. Does not implicitly {@link creator_stage.realtime.v1.CTAPush.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.CTAPush
                 * @static
                 * @param {creator_stage.realtime.v1.CTAPush.$Properties} message CTAPush message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CTAPush.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.label != null && Object.hasOwnProperty.call(message, "label"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.label);
                    if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.url);
                    if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.type);
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified CTAPush message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.CTAPush.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.CTAPush
                 * @static
                 * @param {creator_stage.realtime.v1.CTAPush.$Properties} message CTAPush message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CTAPush.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CTAPush message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.CTAPush
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.CTAPush & creator_stage.realtime.v1.CTAPush.$Shape} CTAPush
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CTAPush.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.CTAPush(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.id = value;
                                else
                                    delete message.id;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.label = value;
                                else
                                    delete message.label;
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.url = value;
                                else
                                    delete message.url;
                                continue;
                            }
                        case 4: {
                                if (wireType !== 0)
                                    break;
                                if (value = reader.int32())
                                    message.type = value;
                                else
                                    delete message.type;
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes a CTAPush message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.CTAPush
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.CTAPush & creator_stage.realtime.v1.CTAPush.$Shape} CTAPush
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CTAPush.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CTAPush message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.CTAPush
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CTAPush.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.label != null && message.hasOwnProperty("label"))
                        if (!$util.isString(message.label))
                            return "label: string expected";
                    if (message.url != null && message.hasOwnProperty("url"))
                        if (!$util.isString(message.url))
                            return "url: string expected";
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a CTAPush message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.CTAPush
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.CTAPush} CTAPush
                 */
                CTAPush.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.CTAPush)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.CTAPush();
                    if (object.id != null)
                        if (typeof object.id !== "string" || object.id.length)
                            message.id = String(object.id);
                    if (object.label != null)
                        if (typeof object.label !== "string" || object.label.length)
                            message.label = String(object.label);
                    if (object.url != null)
                        if (typeof object.url !== "string" || object.url.length)
                            message.url = String(object.url);
                    if (object.type !== 0 && (typeof object.type !== "string" || $root.creator_stage.realtime.v1.CtaType[object.type] !== 0))
                        switch (object.type) {
                        default:
                            if (typeof object.type === "number") {
                                message.type = object.type;
                                break;
                            }
                            break;
                        case "TYPE_PAYMENT":
                        case 0:
                            message.type = 0;
                            break;
                        }
                    return message;
                };

                /**
                 * Creates a plain object from a CTAPush message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.CTAPush
                 * @static
                 * @param {creator_stage.realtime.v1.CTAPush} message CTAPush
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CTAPush.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.label = "";
                        object.url = "";
                        object.type = options.enums === String ? "TYPE_PAYMENT" : 0;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.label != null && message.hasOwnProperty("label"))
                        object.label = message.label;
                    if (message.url != null && message.hasOwnProperty("url"))
                        object.url = message.url;
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.creator_stage.realtime.v1.CtaType[message.type] === undefined ? message.type : $root.creator_stage.realtime.v1.CtaType[message.type] : message.type;
                    return object;
                };

                /**
                 * Converts this CTAPush to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.CTAPush
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CTAPush.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for CTAPush
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.CTAPush
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                CTAPush.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.CTAPush";
                };

                return CTAPush;
            })();

            v1.CTADismiss = (function() {

                /**
                 * Properties of a CTADismiss.
                 * @typedef {Object} creator_stage.realtime.v1.CTADismiss.$Properties
                 * @property {string|null} [messageId] CTADismiss messageId
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of a CTADismiss.
                 * @memberof creator_stage.realtime.v1
                 * @interface ICTADismiss
                 * @augments creator_stage.realtime.v1.CTADismiss.$Properties
                 * @deprecated Use creator_stage.realtime.v1.CTADismiss.$Properties instead.
                 */

                /**
                 * Shape of a CTADismiss.
                 * @typedef {creator_stage.realtime.v1.CTADismiss.$Properties} creator_stage.realtime.v1.CTADismiss.$Shape
                 */

                /**
                 * Constructs a new CTADismiss.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents a CTADismiss.
                 * @constructor
                 * @param {creator_stage.realtime.v1.CTADismiss.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function CTADismiss(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CTADismiss messageId.
                 * @member {string} messageId
                 * @memberof creator_stage.realtime.v1.CTADismiss
                 * @instance
                 */
                CTADismiss.prototype.messageId = "";

                /**
                 * Creates a new CTADismiss instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.CTADismiss
                 * @static
                 * @param {creator_stage.realtime.v1.CTADismiss.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.CTADismiss} CTADismiss instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.CTADismiss.$Shape): creator_stage.realtime.v1.CTADismiss & creator_stage.realtime.v1.CTADismiss.$Shape;
                 *   (properties?: creator_stage.realtime.v1.CTADismiss.$Properties): creator_stage.realtime.v1.CTADismiss;
                 * }}
                 */
                CTADismiss.create = function create(properties) {
                    return new CTADismiss(properties);
                };

                /**
                 * Encodes the specified CTADismiss message. Does not implicitly {@link creator_stage.realtime.v1.CTADismiss.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.CTADismiss
                 * @static
                 * @param {creator_stage.realtime.v1.CTADismiss.$Properties} message CTADismiss message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CTADismiss.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.messageId);
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified CTADismiss message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.CTADismiss.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.CTADismiss
                 * @static
                 * @param {creator_stage.realtime.v1.CTADismiss.$Properties} message CTADismiss message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CTADismiss.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CTADismiss message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.CTADismiss
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.CTADismiss & creator_stage.realtime.v1.CTADismiss.$Shape} CTADismiss
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CTADismiss.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.CTADismiss(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.messageId = value;
                                else
                                    delete message.messageId;
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes a CTADismiss message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.CTADismiss
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.CTADismiss & creator_stage.realtime.v1.CTADismiss.$Shape} CTADismiss
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CTADismiss.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CTADismiss message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.CTADismiss
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CTADismiss.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.messageId != null && message.hasOwnProperty("messageId"))
                        if (!$util.isString(message.messageId))
                            return "messageId: string expected";
                    return null;
                };

                /**
                 * Creates a CTADismiss message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.CTADismiss
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.CTADismiss} CTADismiss
                 */
                CTADismiss.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.CTADismiss)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.CTADismiss();
                    if (object.messageId != null)
                        if (typeof object.messageId !== "string" || object.messageId.length)
                            message.messageId = String(object.messageId);
                    return message;
                };

                /**
                 * Creates a plain object from a CTADismiss message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.CTADismiss
                 * @static
                 * @param {creator_stage.realtime.v1.CTADismiss} message CTADismiss
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CTADismiss.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.messageId = "";
                    if (message.messageId != null && message.hasOwnProperty("messageId"))
                        object.messageId = message.messageId;
                    return object;
                };

                /**
                 * Converts this CTADismiss to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.CTADismiss
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CTADismiss.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for CTADismiss
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.CTADismiss
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                CTADismiss.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.CTADismiss";
                };

                return CTADismiss;
            })();

            v1.QuizOption = (function() {

                /**
                 * Properties of a QuizOption.
                 * @typedef {Object} creator_stage.realtime.v1.QuizOption.$Properties
                 * @property {string|null} [id] QuizOption id
                 * @property {string|null} [label] QuizOption label
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of a QuizOption.
                 * @memberof creator_stage.realtime.v1
                 * @interface IQuizOption
                 * @augments creator_stage.realtime.v1.QuizOption.$Properties
                 * @deprecated Use creator_stage.realtime.v1.QuizOption.$Properties instead.
                 */

                /**
                 * Shape of a QuizOption.
                 * @typedef {creator_stage.realtime.v1.QuizOption.$Properties} creator_stage.realtime.v1.QuizOption.$Shape
                 */

                /**
                 * Constructs a new QuizOption.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents a QuizOption.
                 * @constructor
                 * @param {creator_stage.realtime.v1.QuizOption.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function QuizOption(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * QuizOption id.
                 * @member {string} id
                 * @memberof creator_stage.realtime.v1.QuizOption
                 * @instance
                 */
                QuizOption.prototype.id = "";

                /**
                 * QuizOption label.
                 * @member {string} label
                 * @memberof creator_stage.realtime.v1.QuizOption
                 * @instance
                 */
                QuizOption.prototype.label = "";

                /**
                 * Creates a new QuizOption instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.QuizOption
                 * @static
                 * @param {creator_stage.realtime.v1.QuizOption.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.QuizOption} QuizOption instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.QuizOption.$Shape): creator_stage.realtime.v1.QuizOption & creator_stage.realtime.v1.QuizOption.$Shape;
                 *   (properties?: creator_stage.realtime.v1.QuizOption.$Properties): creator_stage.realtime.v1.QuizOption;
                 * }}
                 */
                QuizOption.create = function create(properties) {
                    return new QuizOption(properties);
                };

                /**
                 * Encodes the specified QuizOption message. Does not implicitly {@link creator_stage.realtime.v1.QuizOption.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.QuizOption
                 * @static
                 * @param {creator_stage.realtime.v1.QuizOption.$Properties} message QuizOption message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                QuizOption.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.label != null && Object.hasOwnProperty.call(message, "label"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.label);
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified QuizOption message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.QuizOption.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.QuizOption
                 * @static
                 * @param {creator_stage.realtime.v1.QuizOption.$Properties} message QuizOption message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                QuizOption.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a QuizOption message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.QuizOption
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.QuizOption & creator_stage.realtime.v1.QuizOption.$Shape} QuizOption
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                QuizOption.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.QuizOption(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.id = value;
                                else
                                    delete message.id;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.label = value;
                                else
                                    delete message.label;
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes a QuizOption message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.QuizOption
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.QuizOption & creator_stage.realtime.v1.QuizOption.$Shape} QuizOption
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                QuizOption.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a QuizOption message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.QuizOption
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                QuizOption.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.label != null && message.hasOwnProperty("label"))
                        if (!$util.isString(message.label))
                            return "label: string expected";
                    return null;
                };

                /**
                 * Creates a QuizOption message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.QuizOption
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.QuizOption} QuizOption
                 */
                QuizOption.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.QuizOption)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.QuizOption();
                    if (object.id != null)
                        if (typeof object.id !== "string" || object.id.length)
                            message.id = String(object.id);
                    if (object.label != null)
                        if (typeof object.label !== "string" || object.label.length)
                            message.label = String(object.label);
                    return message;
                };

                /**
                 * Creates a plain object from a QuizOption message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.QuizOption
                 * @static
                 * @param {creator_stage.realtime.v1.QuizOption} message QuizOption
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                QuizOption.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.label = "";
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.label != null && message.hasOwnProperty("label"))
                        object.label = message.label;
                    return object;
                };

                /**
                 * Converts this QuizOption to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.QuizOption
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                QuizOption.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for QuizOption
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.QuizOption
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                QuizOption.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.QuizOption";
                };

                return QuizOption;
            })();

            v1.Quiz = (function() {

                /**
                 * Properties of a Quiz.
                 * @typedef {Object} creator_stage.realtime.v1.Quiz.$Properties
                 * @property {string|null} [id] Quiz id
                 * @property {string|null} [quizId] Quiz quizId
                 * @property {string|null} [videoBroadcastId] Quiz videoBroadcastId
                 * @property {string|null} [question] Quiz question
                 * @property {Array.<creator_stage.realtime.v1.QuizOption.$Properties>|null} [options] Quiz options
                 * @property {number|null} [durationSecs] Quiz durationSecs
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of a Quiz.
                 * @memberof creator_stage.realtime.v1
                 * @interface IQuiz
                 * @augments creator_stage.realtime.v1.Quiz.$Properties
                 * @deprecated Use creator_stage.realtime.v1.Quiz.$Properties instead.
                 */

                /**
                 * Shape of a Quiz.
                 * @typedef {creator_stage.realtime.v1.Quiz.$Properties} creator_stage.realtime.v1.Quiz.$Shape
                 */

                /**
                 * Constructs a new Quiz.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents a Quiz.
                 * @constructor
                 * @param {creator_stage.realtime.v1.Quiz.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function Quiz(properties) {
                    this.options = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Quiz id.
                 * @member {string} id
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @instance
                 */
                Quiz.prototype.id = "";

                /**
                 * Quiz quizId.
                 * @member {string} quizId
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @instance
                 */
                Quiz.prototype.quizId = "";

                /**
                 * Quiz videoBroadcastId.
                 * @member {string} videoBroadcastId
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @instance
                 */
                Quiz.prototype.videoBroadcastId = "";

                /**
                 * Quiz question.
                 * @member {string} question
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @instance
                 */
                Quiz.prototype.question = "";

                /**
                 * Quiz options.
                 * @member {Array.<creator_stage.realtime.v1.QuizOption.$Properties>} options
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @instance
                 */
                Quiz.prototype.options = $util.emptyArray;

                /**
                 * Quiz durationSecs.
                 * @member {number} durationSecs
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @instance
                 */
                Quiz.prototype.durationSecs = 0;

                /**
                 * Creates a new Quiz instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @static
                 * @param {creator_stage.realtime.v1.Quiz.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.Quiz} Quiz instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.Quiz.$Shape): creator_stage.realtime.v1.Quiz & creator_stage.realtime.v1.Quiz.$Shape;
                 *   (properties?: creator_stage.realtime.v1.Quiz.$Properties): creator_stage.realtime.v1.Quiz;
                 * }}
                 */
                Quiz.create = function create(properties) {
                    return new Quiz(properties);
                };

                /**
                 * Encodes the specified Quiz message. Does not implicitly {@link creator_stage.realtime.v1.Quiz.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @static
                 * @param {creator_stage.realtime.v1.Quiz.$Properties} message Quiz message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Quiz.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.quizId != null && Object.hasOwnProperty.call(message, "quizId"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.quizId);
                    if (message.videoBroadcastId != null && Object.hasOwnProperty.call(message, "videoBroadcastId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.videoBroadcastId);
                    if (message.question != null && Object.hasOwnProperty.call(message, "question"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.question);
                    if (message.options != null && message.options.length)
                        for (let i = 0; i < message.options.length; ++i)
                            $root.creator_stage.realtime.v1.QuizOption.encode(message.options[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.durationSecs != null && Object.hasOwnProperty.call(message, "durationSecs"))
                        writer.uint32(/* id 6, wireType 0 =*/48).int32(message.durationSecs);
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified Quiz message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.Quiz.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @static
                 * @param {creator_stage.realtime.v1.Quiz.$Properties} message Quiz message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Quiz.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Quiz message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.Quiz & creator_stage.realtime.v1.Quiz.$Shape} Quiz
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Quiz.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.Quiz(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.id = value;
                                else
                                    delete message.id;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.quizId = value;
                                else
                                    delete message.quizId;
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.videoBroadcastId = value;
                                else
                                    delete message.videoBroadcastId;
                                continue;
                            }
                        case 4: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.question = value;
                                else
                                    delete message.question;
                                continue;
                            }
                        case 5: {
                                if (wireType !== 2)
                                    break;
                                if (!(message.options && message.options.length))
                                    message.options = [];
                                message.options.push($root.creator_stage.realtime.v1.QuizOption.decode(reader, reader.uint32(), undefined, _depth + 1));
                                continue;
                            }
                        case 6: {
                                if (wireType !== 0)
                                    break;
                                if (value = reader.int32())
                                    message.durationSecs = value;
                                else
                                    delete message.durationSecs;
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes a Quiz message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.Quiz & creator_stage.realtime.v1.Quiz.$Shape} Quiz
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Quiz.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Quiz message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Quiz.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.quizId != null && message.hasOwnProperty("quizId"))
                        if (!$util.isString(message.quizId))
                            return "quizId: string expected";
                    if (message.videoBroadcastId != null && message.hasOwnProperty("videoBroadcastId"))
                        if (!$util.isString(message.videoBroadcastId))
                            return "videoBroadcastId: string expected";
                    if (message.question != null && message.hasOwnProperty("question"))
                        if (!$util.isString(message.question))
                            return "question: string expected";
                    if (message.options != null && message.hasOwnProperty("options")) {
                        if (!Array.isArray(message.options))
                            return "options: array expected";
                        for (let i = 0; i < message.options.length; ++i) {
                            let error = $root.creator_stage.realtime.v1.QuizOption.verify(message.options[i], _depth + 1);
                            if (error)
                                return "options." + error;
                        }
                    }
                    if (message.durationSecs != null && message.hasOwnProperty("durationSecs"))
                        if (!$util.isInteger(message.durationSecs))
                            return "durationSecs: integer expected";
                    return null;
                };

                /**
                 * Creates a Quiz message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.Quiz} Quiz
                 */
                Quiz.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.Quiz)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.Quiz();
                    if (object.id != null)
                        if (typeof object.id !== "string" || object.id.length)
                            message.id = String(object.id);
                    if (object.quizId != null)
                        if (typeof object.quizId !== "string" || object.quizId.length)
                            message.quizId = String(object.quizId);
                    if (object.videoBroadcastId != null)
                        if (typeof object.videoBroadcastId !== "string" || object.videoBroadcastId.length)
                            message.videoBroadcastId = String(object.videoBroadcastId);
                    if (object.question != null)
                        if (typeof object.question !== "string" || object.question.length)
                            message.question = String(object.question);
                    if (object.options) {
                        if (!Array.isArray(object.options))
                            throw TypeError(".creator_stage.realtime.v1.Quiz.options: array expected");
                        message.options = Array(object.options.length);
                        for (let i = 0; i < object.options.length; ++i) {
                            if (typeof object.options[i] !== "object")
                                throw TypeError(".creator_stage.realtime.v1.Quiz.options: object expected");
                            message.options[i] = $root.creator_stage.realtime.v1.QuizOption.fromObject(object.options[i], _depth + 1);
                        }
                    }
                    if (object.durationSecs != null)
                        if (Number(object.durationSecs) !== 0)
                            message.durationSecs = object.durationSecs | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a Quiz message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @static
                 * @param {creator_stage.realtime.v1.Quiz} message Quiz
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Quiz.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.options = [];
                    if (options.defaults) {
                        object.id = "";
                        object.quizId = "";
                        object.videoBroadcastId = "";
                        object.question = "";
                        object.durationSecs = 0;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.quizId != null && message.hasOwnProperty("quizId"))
                        object.quizId = message.quizId;
                    if (message.videoBroadcastId != null && message.hasOwnProperty("videoBroadcastId"))
                        object.videoBroadcastId = message.videoBroadcastId;
                    if (message.question != null && message.hasOwnProperty("question"))
                        object.question = message.question;
                    if (message.options && message.options.length) {
                        object.options = Array(message.options.length);
                        for (let j = 0; j < message.options.length; ++j)
                            object.options[j] = $root.creator_stage.realtime.v1.QuizOption.toObject(message.options[j], options);
                    }
                    if (message.durationSecs != null && message.hasOwnProperty("durationSecs"))
                        object.durationSecs = message.durationSecs;
                    return object;
                };

                /**
                 * Converts this Quiz to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Quiz.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for Quiz
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.Quiz
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                Quiz.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.Quiz";
                };

                return Quiz;
            })();

            v1.QuizOptionCount = (function() {

                /**
                 * Properties of a QuizOptionCount.
                 * @typedef {Object} creator_stage.realtime.v1.QuizOptionCount.$Properties
                 * @property {string|null} [optionId] QuizOptionCount optionId
                 * @property {number|null} [count] QuizOptionCount count
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of a QuizOptionCount.
                 * @memberof creator_stage.realtime.v1
                 * @interface IQuizOptionCount
                 * @augments creator_stage.realtime.v1.QuizOptionCount.$Properties
                 * @deprecated Use creator_stage.realtime.v1.QuizOptionCount.$Properties instead.
                 */

                /**
                 * Shape of a QuizOptionCount.
                 * @typedef {creator_stage.realtime.v1.QuizOptionCount.$Properties} creator_stage.realtime.v1.QuizOptionCount.$Shape
                 */

                /**
                 * Constructs a new QuizOptionCount.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents a QuizOptionCount.
                 * @constructor
                 * @param {creator_stage.realtime.v1.QuizOptionCount.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function QuizOptionCount(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * QuizOptionCount optionId.
                 * @member {string} optionId
                 * @memberof creator_stage.realtime.v1.QuizOptionCount
                 * @instance
                 */
                QuizOptionCount.prototype.optionId = "";

                /**
                 * QuizOptionCount count.
                 * @member {number} count
                 * @memberof creator_stage.realtime.v1.QuizOptionCount
                 * @instance
                 */
                QuizOptionCount.prototype.count = 0;

                /**
                 * Creates a new QuizOptionCount instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.QuizOptionCount
                 * @static
                 * @param {creator_stage.realtime.v1.QuizOptionCount.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.QuizOptionCount} QuizOptionCount instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.QuizOptionCount.$Shape): creator_stage.realtime.v1.QuizOptionCount & creator_stage.realtime.v1.QuizOptionCount.$Shape;
                 *   (properties?: creator_stage.realtime.v1.QuizOptionCount.$Properties): creator_stage.realtime.v1.QuizOptionCount;
                 * }}
                 */
                QuizOptionCount.create = function create(properties) {
                    return new QuizOptionCount(properties);
                };

                /**
                 * Encodes the specified QuizOptionCount message. Does not implicitly {@link creator_stage.realtime.v1.QuizOptionCount.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.QuizOptionCount
                 * @static
                 * @param {creator_stage.realtime.v1.QuizOptionCount.$Properties} message QuizOptionCount message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                QuizOptionCount.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.optionId != null && Object.hasOwnProperty.call(message, "optionId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.optionId);
                    if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.count);
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified QuizOptionCount message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.QuizOptionCount.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.QuizOptionCount
                 * @static
                 * @param {creator_stage.realtime.v1.QuizOptionCount.$Properties} message QuizOptionCount message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                QuizOptionCount.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a QuizOptionCount message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.QuizOptionCount
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.QuizOptionCount & creator_stage.realtime.v1.QuizOptionCount.$Shape} QuizOptionCount
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                QuizOptionCount.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.QuizOptionCount(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.optionId = value;
                                else
                                    delete message.optionId;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                if (value = reader.int32())
                                    message.count = value;
                                else
                                    delete message.count;
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes a QuizOptionCount message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.QuizOptionCount
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.QuizOptionCount & creator_stage.realtime.v1.QuizOptionCount.$Shape} QuizOptionCount
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                QuizOptionCount.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a QuizOptionCount message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.QuizOptionCount
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                QuizOptionCount.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.optionId != null && message.hasOwnProperty("optionId"))
                        if (!$util.isString(message.optionId))
                            return "optionId: string expected";
                    if (message.count != null && message.hasOwnProperty("count"))
                        if (!$util.isInteger(message.count))
                            return "count: integer expected";
                    return null;
                };

                /**
                 * Creates a QuizOptionCount message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.QuizOptionCount
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.QuizOptionCount} QuizOptionCount
                 */
                QuizOptionCount.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.QuizOptionCount)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.QuizOptionCount();
                    if (object.optionId != null)
                        if (typeof object.optionId !== "string" || object.optionId.length)
                            message.optionId = String(object.optionId);
                    if (object.count != null)
                        if (Number(object.count) !== 0)
                            message.count = object.count | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a QuizOptionCount message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.QuizOptionCount
                 * @static
                 * @param {creator_stage.realtime.v1.QuizOptionCount} message QuizOptionCount
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                QuizOptionCount.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.optionId = "";
                        object.count = 0;
                    }
                    if (message.optionId != null && message.hasOwnProperty("optionId"))
                        object.optionId = message.optionId;
                    if (message.count != null && message.hasOwnProperty("count"))
                        object.count = message.count;
                    return object;
                };

                /**
                 * Converts this QuizOptionCount to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.QuizOptionCount
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                QuizOptionCount.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for QuizOptionCount
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.QuizOptionCount
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                QuizOptionCount.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.QuizOptionCount";
                };

                return QuizOptionCount;
            })();

            v1.QuizResults = (function() {

                /**
                 * Properties of a QuizResults.
                 * @typedef {Object} creator_stage.realtime.v1.QuizResults.$Properties
                 * @property {string|null} [id] QuizResults id
                 * @property {string|null} [quizId] QuizResults quizId
                 * @property {Array.<creator_stage.realtime.v1.QuizOptionCount.$Properties>|null} [counts] QuizResults counts
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of a QuizResults.
                 * @memberof creator_stage.realtime.v1
                 * @interface IQuizResults
                 * @augments creator_stage.realtime.v1.QuizResults.$Properties
                 * @deprecated Use creator_stage.realtime.v1.QuizResults.$Properties instead.
                 */

                /**
                 * Shape of a QuizResults.
                 * @typedef {creator_stage.realtime.v1.QuizResults.$Properties} creator_stage.realtime.v1.QuizResults.$Shape
                 */

                /**
                 * Constructs a new QuizResults.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents a QuizResults.
                 * @constructor
                 * @param {creator_stage.realtime.v1.QuizResults.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function QuizResults(properties) {
                    this.counts = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * QuizResults id.
                 * @member {string} id
                 * @memberof creator_stage.realtime.v1.QuizResults
                 * @instance
                 */
                QuizResults.prototype.id = "";

                /**
                 * QuizResults quizId.
                 * @member {string} quizId
                 * @memberof creator_stage.realtime.v1.QuizResults
                 * @instance
                 */
                QuizResults.prototype.quizId = "";

                /**
                 * QuizResults counts.
                 * @member {Array.<creator_stage.realtime.v1.QuizOptionCount.$Properties>} counts
                 * @memberof creator_stage.realtime.v1.QuizResults
                 * @instance
                 */
                QuizResults.prototype.counts = $util.emptyArray;

                /**
                 * Creates a new QuizResults instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.QuizResults
                 * @static
                 * @param {creator_stage.realtime.v1.QuizResults.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.QuizResults} QuizResults instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.QuizResults.$Shape): creator_stage.realtime.v1.QuizResults & creator_stage.realtime.v1.QuizResults.$Shape;
                 *   (properties?: creator_stage.realtime.v1.QuizResults.$Properties): creator_stage.realtime.v1.QuizResults;
                 * }}
                 */
                QuizResults.create = function create(properties) {
                    return new QuizResults(properties);
                };

                /**
                 * Encodes the specified QuizResults message. Does not implicitly {@link creator_stage.realtime.v1.QuizResults.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.QuizResults
                 * @static
                 * @param {creator_stage.realtime.v1.QuizResults.$Properties} message QuizResults message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                QuizResults.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.quizId != null && Object.hasOwnProperty.call(message, "quizId"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.quizId);
                    if (message.counts != null && message.counts.length)
                        for (let i = 0; i < message.counts.length; ++i)
                            $root.creator_stage.realtime.v1.QuizOptionCount.encode(message.counts[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified QuizResults message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.QuizResults.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.QuizResults
                 * @static
                 * @param {creator_stage.realtime.v1.QuizResults.$Properties} message QuizResults message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                QuizResults.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a QuizResults message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.QuizResults
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.QuizResults & creator_stage.realtime.v1.QuizResults.$Shape} QuizResults
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                QuizResults.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.QuizResults(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.id = value;
                                else
                                    delete message.id;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.quizId = value;
                                else
                                    delete message.quizId;
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                if (!(message.counts && message.counts.length))
                                    message.counts = [];
                                message.counts.push($root.creator_stage.realtime.v1.QuizOptionCount.decode(reader, reader.uint32(), undefined, _depth + 1));
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes a QuizResults message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.QuizResults
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.QuizResults & creator_stage.realtime.v1.QuizResults.$Shape} QuizResults
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                QuizResults.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a QuizResults message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.QuizResults
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                QuizResults.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.quizId != null && message.hasOwnProperty("quizId"))
                        if (!$util.isString(message.quizId))
                            return "quizId: string expected";
                    if (message.counts != null && message.hasOwnProperty("counts")) {
                        if (!Array.isArray(message.counts))
                            return "counts: array expected";
                        for (let i = 0; i < message.counts.length; ++i) {
                            let error = $root.creator_stage.realtime.v1.QuizOptionCount.verify(message.counts[i], _depth + 1);
                            if (error)
                                return "counts." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a QuizResults message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.QuizResults
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.QuizResults} QuizResults
                 */
                QuizResults.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.QuizResults)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.QuizResults();
                    if (object.id != null)
                        if (typeof object.id !== "string" || object.id.length)
                            message.id = String(object.id);
                    if (object.quizId != null)
                        if (typeof object.quizId !== "string" || object.quizId.length)
                            message.quizId = String(object.quizId);
                    if (object.counts) {
                        if (!Array.isArray(object.counts))
                            throw TypeError(".creator_stage.realtime.v1.QuizResults.counts: array expected");
                        message.counts = Array(object.counts.length);
                        for (let i = 0; i < object.counts.length; ++i) {
                            if (typeof object.counts[i] !== "object")
                                throw TypeError(".creator_stage.realtime.v1.QuizResults.counts: object expected");
                            message.counts[i] = $root.creator_stage.realtime.v1.QuizOptionCount.fromObject(object.counts[i], _depth + 1);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a QuizResults message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.QuizResults
                 * @static
                 * @param {creator_stage.realtime.v1.QuizResults} message QuizResults
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                QuizResults.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.counts = [];
                    if (options.defaults) {
                        object.id = "";
                        object.quizId = "";
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.quizId != null && message.hasOwnProperty("quizId"))
                        object.quizId = message.quizId;
                    if (message.counts && message.counts.length) {
                        object.counts = Array(message.counts.length);
                        for (let j = 0; j < message.counts.length; ++j)
                            object.counts[j] = $root.creator_stage.realtime.v1.QuizOptionCount.toObject(message.counts[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this QuizResults to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.QuizResults
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                QuizResults.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for QuizResults
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.QuizResults
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                QuizResults.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.QuizResults";
                };

                return QuizResults;
            })();

            v1.CreatorChatEvent = (function() {

                /**
                 * Properties of a CreatorChatEvent.
                 * @typedef {Object} creator_stage.realtime.v1.CreatorChatEvent.$Properties
                 * @property {creator_stage.realtime.v1.Role|null} [role] CreatorChatEvent role
                 * @property {creator_stage.realtime.v1.Type|null} [type] CreatorChatEvent type
                 * @property {google.protobuf.Timestamp.$Properties|null} [sentAt] CreatorChatEvent sentAt
                 * @property {string|null} [targetUserId] CreatorChatEvent targetUserId
                 * @property {string|null} [videoBroadcastId] CreatorChatEvent videoBroadcastId
                 * @property {creator_stage.realtime.v1.CreatorChatMessage.$Properties|null} [creatorChatMessage] CreatorChatEvent creatorChatMessage
                 * @property {creator_stage.realtime.v1.Pin.$Properties|null} [pin] CreatorChatEvent pin
                 * @property {creator_stage.realtime.v1.Unpin.$Properties|null} [unpin] CreatorChatEvent unpin
                 * @property {creator_stage.realtime.v1.CTAPush.$Properties|null} [ctaPush] CreatorChatEvent ctaPush
                 * @property {creator_stage.realtime.v1.CTADismiss.$Properties|null} [ctaDismiss] CreatorChatEvent ctaDismiss
                 * @property {creator_stage.realtime.v1.Quiz.$Properties|null} [quizStart] CreatorChatEvent quizStart
                 * @property {creator_stage.realtime.v1.QuizResults.$Properties|null} [quizEnd] CreatorChatEvent quizEnd
                 * @property {"creatorChatMessage"|"pin"|"unpin"|"ctaPush"|"ctaDismiss"|"quizStart"|"quizEnd"} [body] CreatorChatEvent body
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of a CreatorChatEvent.
                 * @memberof creator_stage.realtime.v1
                 * @interface ICreatorChatEvent
                 * @augments creator_stage.realtime.v1.CreatorChatEvent.$Properties
                 * @deprecated Use creator_stage.realtime.v1.CreatorChatEvent.$Properties instead.
                 */

                /**
                 * Narrowed shape of a CreatorChatEvent.
                 * @typedef {{
                 *   role?: creator_stage.realtime.v1.Role|null;
                 *   type?: creator_stage.realtime.v1.Type|null;
                 *   sentAt?: google.protobuf.Timestamp.$Shape|null;
                 *   targetUserId?: string|null;
                 *   videoBroadcastId?: string|null;
                 *   creatorChatMessage?: creator_stage.realtime.v1.CreatorChatMessage.$Shape|null;
                 *   pin?: creator_stage.realtime.v1.Pin.$Shape|null;
                 *   unpin?: creator_stage.realtime.v1.Unpin.$Shape|null;
                 *   ctaPush?: creator_stage.realtime.v1.CTAPush.$Shape|null;
                 *   ctaDismiss?: creator_stage.realtime.v1.CTADismiss.$Shape|null;
                 *   quizStart?: creator_stage.realtime.v1.Quiz.$Shape|null;
                 *   quizEnd?: creator_stage.realtime.v1.QuizResults.$Shape|null;
                 *   $unknowns?: Array.<Uint8Array>;
                 * } & (
                 *   ({ body?: undefined; creatorChatMessage?: null; pin?: null; unpin?: null; ctaPush?: null; ctaDismiss?: null; quizStart?: null; quizEnd?: null }|{ body?: "creatorChatMessage"; creatorChatMessage: creator_stage.realtime.v1.CreatorChatMessage.$Shape; pin?: null; unpin?: null; ctaPush?: null; ctaDismiss?: null; quizStart?: null; quizEnd?: null }|{ body?: "pin"; creatorChatMessage?: null; pin: creator_stage.realtime.v1.Pin.$Shape; unpin?: null; ctaPush?: null; ctaDismiss?: null; quizStart?: null; quizEnd?: null }|{ body?: "unpin"; creatorChatMessage?: null; pin?: null; unpin: creator_stage.realtime.v1.Unpin.$Shape; ctaPush?: null; ctaDismiss?: null; quizStart?: null; quizEnd?: null }|{ body?: "ctaPush"; creatorChatMessage?: null; pin?: null; unpin?: null; ctaPush: creator_stage.realtime.v1.CTAPush.$Shape; ctaDismiss?: null; quizStart?: null; quizEnd?: null }|{ body?: "ctaDismiss"; creatorChatMessage?: null; pin?: null; unpin?: null; ctaPush?: null; ctaDismiss: creator_stage.realtime.v1.CTADismiss.$Shape; quizStart?: null; quizEnd?: null }|{ body?: "quizStart"; creatorChatMessage?: null; pin?: null; unpin?: null; ctaPush?: null; ctaDismiss?: null; quizStart: creator_stage.realtime.v1.Quiz.$Shape; quizEnd?: null }|{ body?: "quizEnd"; creatorChatMessage?: null; pin?: null; unpin?: null; ctaPush?: null; ctaDismiss?: null; quizStart?: null; quizEnd: creator_stage.realtime.v1.QuizResults.$Shape })
                 * )} creator_stage.realtime.v1.CreatorChatEvent.$Shape
                 */

                /**
                 * Constructs a new CreatorChatEvent.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents a CreatorChatEvent.
                 * @constructor
                 * @param {creator_stage.realtime.v1.CreatorChatEvent.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function CreatorChatEvent(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CreatorChatEvent role.
                 * @member {creator_stage.realtime.v1.Role} role
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @instance
                 */
                CreatorChatEvent.prototype.role = 0;

                /**
                 * CreatorChatEvent type.
                 * @member {creator_stage.realtime.v1.Type} type
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @instance
                 */
                CreatorChatEvent.prototype.type = 0;

                /**
                 * CreatorChatEvent sentAt.
                 * @member {google.protobuf.Timestamp.$Properties|null|undefined} sentAt
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @instance
                 */
                CreatorChatEvent.prototype.sentAt = null;

                /**
                 * CreatorChatEvent targetUserId.
                 * @member {string} targetUserId
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @instance
                 */
                CreatorChatEvent.prototype.targetUserId = "";

                /**
                 * CreatorChatEvent videoBroadcastId.
                 * @member {string} videoBroadcastId
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @instance
                 */
                CreatorChatEvent.prototype.videoBroadcastId = "";

                /**
                 * CreatorChatEvent creatorChatMessage.
                 * @member {creator_stage.realtime.v1.CreatorChatMessage.$Properties|null|undefined} creatorChatMessage
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @instance
                 */
                CreatorChatEvent.prototype.creatorChatMessage = null;

                /**
                 * CreatorChatEvent pin.
                 * @member {creator_stage.realtime.v1.Pin.$Properties|null|undefined} pin
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @instance
                 */
                CreatorChatEvent.prototype.pin = null;

                /**
                 * CreatorChatEvent unpin.
                 * @member {creator_stage.realtime.v1.Unpin.$Properties|null|undefined} unpin
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @instance
                 */
                CreatorChatEvent.prototype.unpin = null;

                /**
                 * CreatorChatEvent ctaPush.
                 * @member {creator_stage.realtime.v1.CTAPush.$Properties|null|undefined} ctaPush
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @instance
                 */
                CreatorChatEvent.prototype.ctaPush = null;

                /**
                 * CreatorChatEvent ctaDismiss.
                 * @member {creator_stage.realtime.v1.CTADismiss.$Properties|null|undefined} ctaDismiss
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @instance
                 */
                CreatorChatEvent.prototype.ctaDismiss = null;

                /**
                 * CreatorChatEvent quizStart.
                 * @member {creator_stage.realtime.v1.Quiz.$Properties|null|undefined} quizStart
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @instance
                 */
                CreatorChatEvent.prototype.quizStart = null;

                /**
                 * CreatorChatEvent quizEnd.
                 * @member {creator_stage.realtime.v1.QuizResults.$Properties|null|undefined} quizEnd
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @instance
                 */
                CreatorChatEvent.prototype.quizEnd = null;

                // OneOf field names bound to virtual getters and setters
                let $oneOfFields;

                /**
                 * CreatorChatEvent body.
                 * @member {"creatorChatMessage"|"pin"|"unpin"|"ctaPush"|"ctaDismiss"|"quizStart"|"quizEnd"|undefined} body
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @instance
                 */
                Object.defineProperty(CreatorChatEvent.prototype, "body", {
                    get: $util.oneOfGetter($oneOfFields = ["creatorChatMessage", "pin", "unpin", "ctaPush", "ctaDismiss", "quizStart", "quizEnd"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new CreatorChatEvent instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @static
                 * @param {creator_stage.realtime.v1.CreatorChatEvent.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.CreatorChatEvent} CreatorChatEvent instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.CreatorChatEvent.$Shape): creator_stage.realtime.v1.CreatorChatEvent & creator_stage.realtime.v1.CreatorChatEvent.$Shape;
                 *   (properties?: creator_stage.realtime.v1.CreatorChatEvent.$Properties): creator_stage.realtime.v1.CreatorChatEvent;
                 * }}
                 */
                CreatorChatEvent.create = function create(properties) {
                    return new CreatorChatEvent(properties);
                };

                /**
                 * Encodes the specified CreatorChatEvent message. Does not implicitly {@link creator_stage.realtime.v1.CreatorChatEvent.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @static
                 * @param {creator_stage.realtime.v1.CreatorChatEvent.$Properties} message CreatorChatEvent message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CreatorChatEvent.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.role != null && Object.hasOwnProperty.call(message, "role"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.role);
                    if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                    if (message.sentAt != null && Object.hasOwnProperty.call(message, "sentAt"))
                        $root.google.protobuf.Timestamp.encode(message.sentAt, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.targetUserId != null && Object.hasOwnProperty.call(message, "targetUserId"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.targetUserId);
                    if (message.videoBroadcastId != null && Object.hasOwnProperty.call(message, "videoBroadcastId"))
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.videoBroadcastId);
                    if (message.creatorChatMessage != null && Object.hasOwnProperty.call(message, "creatorChatMessage"))
                        $root.creator_stage.realtime.v1.CreatorChatMessage.encode(message.creatorChatMessage, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                    if (message.pin != null && Object.hasOwnProperty.call(message, "pin"))
                        $root.creator_stage.realtime.v1.Pin.encode(message.pin, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                    if (message.unpin != null && Object.hasOwnProperty.call(message, "unpin"))
                        $root.creator_stage.realtime.v1.Unpin.encode(message.unpin, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                    if (message.ctaPush != null && Object.hasOwnProperty.call(message, "ctaPush"))
                        $root.creator_stage.realtime.v1.CTAPush.encode(message.ctaPush, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                    if (message.ctaDismiss != null && Object.hasOwnProperty.call(message, "ctaDismiss"))
                        $root.creator_stage.realtime.v1.CTADismiss.encode(message.ctaDismiss, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
                    if (message.quizStart != null && Object.hasOwnProperty.call(message, "quizStart"))
                        $root.creator_stage.realtime.v1.Quiz.encode(message.quizStart, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
                    if (message.quizEnd != null && Object.hasOwnProperty.call(message, "quizEnd"))
                        $root.creator_stage.realtime.v1.QuizResults.encode(message.quizEnd, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified CreatorChatEvent message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.CreatorChatEvent.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @static
                 * @param {creator_stage.realtime.v1.CreatorChatEvent.$Properties} message CreatorChatEvent message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CreatorChatEvent.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CreatorChatEvent message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.CreatorChatEvent & creator_stage.realtime.v1.CreatorChatEvent.$Shape} CreatorChatEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CreatorChatEvent.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.CreatorChatEvent(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                if (value = reader.int32())
                                    message.role = value;
                                else
                                    delete message.role;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                if (value = reader.int32())
                                    message.type = value;
                                else
                                    delete message.type;
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                message.sentAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32(), undefined, _depth + 1, message.sentAt);
                                continue;
                            }
                        case 4: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.targetUserId = value;
                                else
                                    delete message.targetUserId;
                                continue;
                            }
                        case 5: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.videoBroadcastId = value;
                                else
                                    delete message.videoBroadcastId;
                                continue;
                            }
                        case 10: {
                                if (wireType !== 2)
                                    break;
                                message.creatorChatMessage = $root.creator_stage.realtime.v1.CreatorChatMessage.decode(reader, reader.uint32(), undefined, _depth + 1, message.creatorChatMessage);
                                message.body = "creatorChatMessage";
                                continue;
                            }
                        case 11: {
                                if (wireType !== 2)
                                    break;
                                message.pin = $root.creator_stage.realtime.v1.Pin.decode(reader, reader.uint32(), undefined, _depth + 1, message.pin);
                                message.body = "pin";
                                continue;
                            }
                        case 12: {
                                if (wireType !== 2)
                                    break;
                                message.unpin = $root.creator_stage.realtime.v1.Unpin.decode(reader, reader.uint32(), undefined, _depth + 1, message.unpin);
                                message.body = "unpin";
                                continue;
                            }
                        case 13: {
                                if (wireType !== 2)
                                    break;
                                message.ctaPush = $root.creator_stage.realtime.v1.CTAPush.decode(reader, reader.uint32(), undefined, _depth + 1, message.ctaPush);
                                message.body = "ctaPush";
                                continue;
                            }
                        case 14: {
                                if (wireType !== 2)
                                    break;
                                message.ctaDismiss = $root.creator_stage.realtime.v1.CTADismiss.decode(reader, reader.uint32(), undefined, _depth + 1, message.ctaDismiss);
                                message.body = "ctaDismiss";
                                continue;
                            }
                        case 15: {
                                if (wireType !== 2)
                                    break;
                                message.quizStart = $root.creator_stage.realtime.v1.Quiz.decode(reader, reader.uint32(), undefined, _depth + 1, message.quizStart);
                                message.body = "quizStart";
                                continue;
                            }
                        case 16: {
                                if (wireType !== 2)
                                    break;
                                message.quizEnd = $root.creator_stage.realtime.v1.QuizResults.decode(reader, reader.uint32(), undefined, _depth + 1, message.quizEnd);
                                message.body = "quizEnd";
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    if (_end !== undefined)
                        throw Error("missing end group");
                    return message;
                };

                /**
                 * Decodes a CreatorChatEvent message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.CreatorChatEvent & creator_stage.realtime.v1.CreatorChatEvent.$Shape} CreatorChatEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CreatorChatEvent.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CreatorChatEvent message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CreatorChatEvent.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    let properties = {};
                    if (message.role != null && message.hasOwnProperty("role"))
                        switch (message.role) {
                        default:
                            return "role: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                        }
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            break;
                        }
                    if (message.sentAt != null && message.hasOwnProperty("sentAt")) {
                        let error = $root.google.protobuf.Timestamp.verify(message.sentAt, _depth + 1);
                        if (error)
                            return "sentAt." + error;
                    }
                    if (message.targetUserId != null && message.hasOwnProperty("targetUserId"))
                        if (!$util.isString(message.targetUserId))
                            return "targetUserId: string expected";
                    if (message.videoBroadcastId != null && message.hasOwnProperty("videoBroadcastId"))
                        if (!$util.isString(message.videoBroadcastId))
                            return "videoBroadcastId: string expected";
                    if (message.creatorChatMessage != null && message.hasOwnProperty("creatorChatMessage")) {
                        properties.body = 1;
                        {
                            let error = $root.creator_stage.realtime.v1.CreatorChatMessage.verify(message.creatorChatMessage, _depth + 1);
                            if (error)
                                return "creatorChatMessage." + error;
                        }
                    }
                    if (message.pin != null && message.hasOwnProperty("pin")) {
                        if (properties.body === 1)
                            return "body: multiple values";
                        properties.body = 1;
                        {
                            let error = $root.creator_stage.realtime.v1.Pin.verify(message.pin, _depth + 1);
                            if (error)
                                return "pin." + error;
                        }
                    }
                    if (message.unpin != null && message.hasOwnProperty("unpin")) {
                        if (properties.body === 1)
                            return "body: multiple values";
                        properties.body = 1;
                        {
                            let error = $root.creator_stage.realtime.v1.Unpin.verify(message.unpin, _depth + 1);
                            if (error)
                                return "unpin." + error;
                        }
                    }
                    if (message.ctaPush != null && message.hasOwnProperty("ctaPush")) {
                        if (properties.body === 1)
                            return "body: multiple values";
                        properties.body = 1;
                        {
                            let error = $root.creator_stage.realtime.v1.CTAPush.verify(message.ctaPush, _depth + 1);
                            if (error)
                                return "ctaPush." + error;
                        }
                    }
                    if (message.ctaDismiss != null && message.hasOwnProperty("ctaDismiss")) {
                        if (properties.body === 1)
                            return "body: multiple values";
                        properties.body = 1;
                        {
                            let error = $root.creator_stage.realtime.v1.CTADismiss.verify(message.ctaDismiss, _depth + 1);
                            if (error)
                                return "ctaDismiss." + error;
                        }
                    }
                    if (message.quizStart != null && message.hasOwnProperty("quizStart")) {
                        if (properties.body === 1)
                            return "body: multiple values";
                        properties.body = 1;
                        {
                            let error = $root.creator_stage.realtime.v1.Quiz.verify(message.quizStart, _depth + 1);
                            if (error)
                                return "quizStart." + error;
                        }
                    }
                    if (message.quizEnd != null && message.hasOwnProperty("quizEnd")) {
                        if (properties.body === 1)
                            return "body: multiple values";
                        properties.body = 1;
                        {
                            let error = $root.creator_stage.realtime.v1.QuizResults.verify(message.quizEnd, _depth + 1);
                            if (error)
                                return "quizEnd." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a CreatorChatEvent message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.CreatorChatEvent} CreatorChatEvent
                 */
                CreatorChatEvent.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.CreatorChatEvent)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.CreatorChatEvent();
                    if (object.role !== 0 && (typeof object.role !== "string" || $root.creator_stage.realtime.v1.Role[object.role] !== 0))
                        switch (object.role) {
                        default:
                            if (typeof object.role === "number") {
                                message.role = object.role;
                                break;
                            }
                            break;
                        case "ROLE_UNSPECIFIED":
                        case 0:
                            message.role = 0;
                            break;
                        case "ROLE_CREATOR":
                        case 1:
                            message.role = 1;
                            break;
                        case "ROLE_TEAM":
                        case 2:
                            message.role = 2;
                            break;
                        case "ROLE_AUDIENCE":
                        case 3:
                            message.role = 3;
                            break;
                        }
                    if (object.type !== 0 && (typeof object.type !== "string" || $root.creator_stage.realtime.v1.Type[object.type] !== 0))
                        switch (object.type) {
                        default:
                            if (typeof object.type === "number") {
                                message.type = object.type;
                                break;
                            }
                            break;
                        case "TYPE_CREATOR_MESSAGE":
                        case 0:
                            message.type = 0;
                            break;
                        case "TYPE_PIN":
                        case 1:
                            message.type = 1;
                            break;
                        case "TYPE_UNPIN":
                        case 2:
                            message.type = 2;
                            break;
                        case "TYPE_CTA_PUSH":
                        case 3:
                            message.type = 3;
                            break;
                        case "TYPE_CTA_DISMISS":
                        case 4:
                            message.type = 4;
                            break;
                        case "TYPE_QUIZ_START":
                        case 5:
                            message.type = 5;
                            break;
                        case "TYPE_QUIZ_END":
                        case 6:
                            message.type = 6;
                            break;
                        }
                    if (object.sentAt != null) {
                        if (typeof object.sentAt !== "object")
                            throw TypeError(".creator_stage.realtime.v1.CreatorChatEvent.sentAt: object expected");
                        message.sentAt = $root.google.protobuf.Timestamp.fromObject(object.sentAt, _depth + 1);
                    }
                    if (object.targetUserId != null)
                        if (typeof object.targetUserId !== "string" || object.targetUserId.length)
                            message.targetUserId = String(object.targetUserId);
                    if (object.videoBroadcastId != null)
                        if (typeof object.videoBroadcastId !== "string" || object.videoBroadcastId.length)
                            message.videoBroadcastId = String(object.videoBroadcastId);
                    if (object.creatorChatMessage != null) {
                        if (typeof object.creatorChatMessage !== "object")
                            throw TypeError(".creator_stage.realtime.v1.CreatorChatEvent.creatorChatMessage: object expected");
                        message.creatorChatMessage = $root.creator_stage.realtime.v1.CreatorChatMessage.fromObject(object.creatorChatMessage, _depth + 1);
                    }
                    if (object.pin != null) {
                        if (typeof object.pin !== "object")
                            throw TypeError(".creator_stage.realtime.v1.CreatorChatEvent.pin: object expected");
                        message.pin = $root.creator_stage.realtime.v1.Pin.fromObject(object.pin, _depth + 1);
                    }
                    if (object.unpin != null) {
                        if (typeof object.unpin !== "object")
                            throw TypeError(".creator_stage.realtime.v1.CreatorChatEvent.unpin: object expected");
                        message.unpin = $root.creator_stage.realtime.v1.Unpin.fromObject(object.unpin, _depth + 1);
                    }
                    if (object.ctaPush != null) {
                        if (typeof object.ctaPush !== "object")
                            throw TypeError(".creator_stage.realtime.v1.CreatorChatEvent.ctaPush: object expected");
                        message.ctaPush = $root.creator_stage.realtime.v1.CTAPush.fromObject(object.ctaPush, _depth + 1);
                    }
                    if (object.ctaDismiss != null) {
                        if (typeof object.ctaDismiss !== "object")
                            throw TypeError(".creator_stage.realtime.v1.CreatorChatEvent.ctaDismiss: object expected");
                        message.ctaDismiss = $root.creator_stage.realtime.v1.CTADismiss.fromObject(object.ctaDismiss, _depth + 1);
                    }
                    if (object.quizStart != null) {
                        if (typeof object.quizStart !== "object")
                            throw TypeError(".creator_stage.realtime.v1.CreatorChatEvent.quizStart: object expected");
                        message.quizStart = $root.creator_stage.realtime.v1.Quiz.fromObject(object.quizStart, _depth + 1);
                    }
                    if (object.quizEnd != null) {
                        if (typeof object.quizEnd !== "object")
                            throw TypeError(".creator_stage.realtime.v1.CreatorChatEvent.quizEnd: object expected");
                        message.quizEnd = $root.creator_stage.realtime.v1.QuizResults.fromObject(object.quizEnd, _depth + 1);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a CreatorChatEvent message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @static
                 * @param {creator_stage.realtime.v1.CreatorChatEvent} message CreatorChatEvent
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CreatorChatEvent.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.role = options.enums === String ? "ROLE_UNSPECIFIED" : 0;
                        object.type = options.enums === String ? "TYPE_CREATOR_MESSAGE" : 0;
                        object.sentAt = null;
                        object.targetUserId = "";
                        object.videoBroadcastId = "";
                    }
                    if (message.role != null && message.hasOwnProperty("role"))
                        object.role = options.enums === String ? $root.creator_stage.realtime.v1.Role[message.role] === undefined ? message.role : $root.creator_stage.realtime.v1.Role[message.role] : message.role;
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.creator_stage.realtime.v1.Type[message.type] === undefined ? message.type : $root.creator_stage.realtime.v1.Type[message.type] : message.type;
                    if (message.sentAt != null && message.hasOwnProperty("sentAt"))
                        object.sentAt = $root.google.protobuf.Timestamp.toObject(message.sentAt, options);
                    if (message.targetUserId != null && message.hasOwnProperty("targetUserId"))
                        object.targetUserId = message.targetUserId;
                    if (message.videoBroadcastId != null && message.hasOwnProperty("videoBroadcastId"))
                        object.videoBroadcastId = message.videoBroadcastId;
                    if (message.creatorChatMessage != null && message.hasOwnProperty("creatorChatMessage")) {
                        object.creatorChatMessage = $root.creator_stage.realtime.v1.CreatorChatMessage.toObject(message.creatorChatMessage, options);
                        if (options.oneofs)
                            object.body = "creatorChatMessage";
                    }
                    if (message.pin != null && message.hasOwnProperty("pin")) {
                        object.pin = $root.creator_stage.realtime.v1.Pin.toObject(message.pin, options);
                        if (options.oneofs)
                            object.body = "pin";
                    }
                    if (message.unpin != null && message.hasOwnProperty("unpin")) {
                        object.unpin = $root.creator_stage.realtime.v1.Unpin.toObject(message.unpin, options);
                        if (options.oneofs)
                            object.body = "unpin";
                    }
                    if (message.ctaPush != null && message.hasOwnProperty("ctaPush")) {
                        object.ctaPush = $root.creator_stage.realtime.v1.CTAPush.toObject(message.ctaPush, options);
                        if (options.oneofs)
                            object.body = "ctaPush";
                    }
                    if (message.ctaDismiss != null && message.hasOwnProperty("ctaDismiss")) {
                        object.ctaDismiss = $root.creator_stage.realtime.v1.CTADismiss.toObject(message.ctaDismiss, options);
                        if (options.oneofs)
                            object.body = "ctaDismiss";
                    }
                    if (message.quizStart != null && message.hasOwnProperty("quizStart")) {
                        object.quizStart = $root.creator_stage.realtime.v1.Quiz.toObject(message.quizStart, options);
                        if (options.oneofs)
                            object.body = "quizStart";
                    }
                    if (message.quizEnd != null && message.hasOwnProperty("quizEnd")) {
                        object.quizEnd = $root.creator_stage.realtime.v1.QuizResults.toObject(message.quizEnd, options);
                        if (options.oneofs)
                            object.body = "quizEnd";
                    }
                    return object;
                };

                /**
                 * Converts this CreatorChatEvent to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CreatorChatEvent.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for CreatorChatEvent
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.CreatorChatEvent
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                CreatorChatEvent.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.CreatorChatEvent";
                };

                return CreatorChatEvent;
            })();

            return v1;
        })();

        return realtime;
    })();

    return creator_stage;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @typedef {Object} google.protobuf.Timestamp.$Properties
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @augments google.protobuf.Timestamp.$Properties
             * @deprecated Use google.protobuf.Timestamp.$Properties instead.
             */

            /**
             * Shape of a Timestamp.
             * @typedef {google.protobuf.Timestamp.$Properties} google.protobuf.Timestamp.$Shape
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @constructor
             * @param {google.protobuf.Timestamp.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function Timestamp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp.$Properties=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             * @type {{
             *   (properties: google.protobuf.Timestamp.$Shape): google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape;
             *   (properties?: google.protobuf.Timestamp.$Properties): google.protobuf.Timestamp;
             * }}
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp.$Properties} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp.$Properties} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.google.protobuf.Timestamp(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.seconds = value;
                            else
                                delete message.seconds;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.int32())
                                message.nanos = value;
                            else
                                delete message.nanos;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if (typeof object.seconds === "object" ? object.seconds.low || object.seconds.high : Number(object.seconds) !== 0)
                        if ($util.Long)
                            (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                        else if (typeof object.seconds === "string")
                            message.seconds = parseInt(object.seconds, 10);
                        else if (typeof object.seconds === "number")
                            message.seconds = object.seconds;
                        else if (typeof object.seconds === "object")
                            message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    if (Number(object.nanos) !== 0)
                        message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.seconds = typeof message.seconds === "number" ? BigInt(message.seconds) : $util.Long.fromBits(message.seconds.low >>> 0, message.seconds.high >>> 0, false).toBigInt();
                    else if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Timestamp
             * @function getTypeUrl
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Timestamp.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/google.protobuf.Timestamp";
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

export {
  $root as default
};
