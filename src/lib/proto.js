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
             * Type enum.
             * @name creator_stage.realtime.v1.Type
             * @enum {number}
             * @property {number} TYPE_UNSPECIFIED=0 TYPE_UNSPECIFIED value
             * @property {number} TYPE_PIN=1 TYPE_PIN value
             * @property {number} TYPE_UNPIN=2 TYPE_UNPIN value
             * @property {number} TYPE_CTA_PUSH=3 TYPE_CTA_PUSH value
             * @property {number} TYPE_CTA_DISMISS=4 TYPE_CTA_DISMISS value
             */
            v1.Type = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "TYPE_UNSPECIFIED"] = 0;
                values[valuesById[1] = "TYPE_PIN"] = 1;
                values[valuesById[2] = "TYPE_UNPIN"] = 2;
                values[valuesById[3] = "TYPE_CTA_PUSH"] = 3;
                values[valuesById[4] = "TYPE_CTA_DISMISS"] = 4;
                return values;
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

            v1.CTAPush = (function() {

                /**
                 * Properties of a CTAPush.
                 * @typedef {Object} creator_stage.realtime.v1.CTAPush.$Properties
                 * @property {string|null} [label] CTAPush label
                 * @property {string|null} [url] CTAPush url
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
                    if (message.label != null && Object.hasOwnProperty.call(message, "label"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.label);
                    if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.url);
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
                                    message.label = value;
                                else
                                    delete message.label;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.url = value;
                                else
                                    delete message.url;
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
                    if (message.label != null && message.hasOwnProperty("label"))
                        if (!$util.isString(message.label))
                            return "label: string expected";
                    if (message.url != null && message.hasOwnProperty("url"))
                        if (!$util.isString(message.url))
                            return "url: string expected";
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
                    if (object.label != null)
                        if (typeof object.label !== "string" || object.label.length)
                            message.label = String(object.label);
                    if (object.url != null)
                        if (typeof object.url !== "string" || object.url.length)
                            message.url = String(object.url);
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
                        object.label = "";
                        object.url = "";
                    }
                    if (message.label != null && message.hasOwnProperty("label"))
                        object.label = message.label;
                    if (message.url != null && message.hasOwnProperty("url"))
                        object.url = message.url;
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
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.CTADismiss();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = undefined;
                            break;
                        }
                        reader.skipType(tag & 7, _depth, tag);
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
                    return new $root.creator_stage.realtime.v1.CTADismiss();
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
                CTADismiss.toObject = function toObject() {
                    return {};
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

            v1.ActivityEvent = (function() {

                /**
                 * Properties of an ActivityEvent.
                 * @typedef {Object} creator_stage.realtime.v1.ActivityEvent.$Properties
                 * @property {creator_stage.realtime.v1.Type|null} [type] ActivityEvent type
                 * @property {google.protobuf.Timestamp.$Properties|null} [at] ActivityEvent at
                 * @property {creator_stage.realtime.v1.ChatMessage.$Properties|null} [pin] ActivityEvent pin
                 * @property {creator_stage.realtime.v1.Unpin.$Properties|null} [unpin] ActivityEvent unpin
                 * @property {creator_stage.realtime.v1.CTAPush.$Properties|null} [ctaPush] ActivityEvent ctaPush
                 * @property {creator_stage.realtime.v1.CTADismiss.$Properties|null} [ctaDismiss] ActivityEvent ctaDismiss
                 * @property {"pin"|"unpin"|"ctaPush"|"ctaDismiss"} [body] ActivityEvent body
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of an ActivityEvent.
                 * @memberof creator_stage.realtime.v1
                 * @interface IActivityEvent
                 * @augments creator_stage.realtime.v1.ActivityEvent.$Properties
                 * @deprecated Use creator_stage.realtime.v1.ActivityEvent.$Properties instead.
                 */

                /**
                 * Narrowed shape of an ActivityEvent.
                 * @typedef {{
                 *   type?: creator_stage.realtime.v1.Type|null;
                 *   at?: google.protobuf.Timestamp.$Shape|null;
                 *   pin?: creator_stage.realtime.v1.ChatMessage.$Shape|null;
                 *   unpin?: creator_stage.realtime.v1.Unpin.$Shape|null;
                 *   ctaPush?: creator_stage.realtime.v1.CTAPush.$Shape|null;
                 *   ctaDismiss?: creator_stage.realtime.v1.CTADismiss.$Shape|null;
                 *   $unknowns?: Array.<Uint8Array>;
                 * } & (
                 *   ({ body?: undefined; pin?: null; unpin?: null; ctaPush?: null; ctaDismiss?: null }|{ body?: "pin"; pin: creator_stage.realtime.v1.ChatMessage.$Shape; unpin?: null; ctaPush?: null; ctaDismiss?: null }|{ body?: "unpin"; pin?: null; unpin: creator_stage.realtime.v1.Unpin.$Shape; ctaPush?: null; ctaDismiss?: null }|{ body?: "ctaPush"; pin?: null; unpin?: null; ctaPush: creator_stage.realtime.v1.CTAPush.$Shape; ctaDismiss?: null }|{ body?: "ctaDismiss"; pin?: null; unpin?: null; ctaPush?: null; ctaDismiss: creator_stage.realtime.v1.CTADismiss.$Shape })
                 * )} creator_stage.realtime.v1.ActivityEvent.$Shape
                 */

                /**
                 * Constructs a new ActivityEvent.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents an ActivityEvent.
                 * @constructor
                 * @param {creator_stage.realtime.v1.ActivityEvent.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function ActivityEvent(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ActivityEvent type.
                 * @member {creator_stage.realtime.v1.Type} type
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @instance
                 */
                ActivityEvent.prototype.type = 0;

                /**
                 * ActivityEvent at.
                 * @member {google.protobuf.Timestamp.$Properties|null|undefined} at
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @instance
                 */
                ActivityEvent.prototype.at = null;

                /**
                 * ActivityEvent pin.
                 * @member {creator_stage.realtime.v1.ChatMessage.$Properties|null|undefined} pin
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @instance
                 */
                ActivityEvent.prototype.pin = null;

                /**
                 * ActivityEvent unpin.
                 * @member {creator_stage.realtime.v1.Unpin.$Properties|null|undefined} unpin
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @instance
                 */
                ActivityEvent.prototype.unpin = null;

                /**
                 * ActivityEvent ctaPush.
                 * @member {creator_stage.realtime.v1.CTAPush.$Properties|null|undefined} ctaPush
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @instance
                 */
                ActivityEvent.prototype.ctaPush = null;

                /**
                 * ActivityEvent ctaDismiss.
                 * @member {creator_stage.realtime.v1.CTADismiss.$Properties|null|undefined} ctaDismiss
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @instance
                 */
                ActivityEvent.prototype.ctaDismiss = null;

                // OneOf field names bound to virtual getters and setters
                let $oneOfFields;

                /**
                 * ActivityEvent body.
                 * @member {"pin"|"unpin"|"ctaPush"|"ctaDismiss"|undefined} body
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @instance
                 */
                Object.defineProperty(ActivityEvent.prototype, "body", {
                    get: $util.oneOfGetter($oneOfFields = ["pin", "unpin", "ctaPush", "ctaDismiss"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new ActivityEvent instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @static
                 * @param {creator_stage.realtime.v1.ActivityEvent.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.ActivityEvent} ActivityEvent instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.ActivityEvent.$Shape): creator_stage.realtime.v1.ActivityEvent & creator_stage.realtime.v1.ActivityEvent.$Shape;
                 *   (properties?: creator_stage.realtime.v1.ActivityEvent.$Properties): creator_stage.realtime.v1.ActivityEvent;
                 * }}
                 */
                ActivityEvent.create = function create(properties) {
                    return new ActivityEvent(properties);
                };

                /**
                 * Encodes the specified ActivityEvent message. Does not implicitly {@link creator_stage.realtime.v1.ActivityEvent.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @static
                 * @param {creator_stage.realtime.v1.ActivityEvent.$Properties} message ActivityEvent message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ActivityEvent.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                    if (message.at != null && Object.hasOwnProperty.call(message, "at"))
                        $root.google.protobuf.Timestamp.encode(message.at, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.pin != null && Object.hasOwnProperty.call(message, "pin"))
                        $root.creator_stage.realtime.v1.ChatMessage.encode(message.pin, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                    if (message.unpin != null && Object.hasOwnProperty.call(message, "unpin"))
                        $root.creator_stage.realtime.v1.Unpin.encode(message.unpin, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                    if (message.ctaPush != null && Object.hasOwnProperty.call(message, "ctaPush"))
                        $root.creator_stage.realtime.v1.CTAPush.encode(message.ctaPush, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                    if (message.ctaDismiss != null && Object.hasOwnProperty.call(message, "ctaDismiss"))
                        $root.creator_stage.realtime.v1.CTADismiss.encode(message.ctaDismiss, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified ActivityEvent message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.ActivityEvent.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @static
                 * @param {creator_stage.realtime.v1.ActivityEvent.$Properties} message ActivityEvent message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ActivityEvent.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an ActivityEvent message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.ActivityEvent & creator_stage.realtime.v1.ActivityEvent.$Shape} ActivityEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ActivityEvent.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.ActivityEvent(), value;
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
                                    message.type = value;
                                else
                                    delete message.type;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.at = $root.google.protobuf.Timestamp.decode(reader, reader.uint32(), undefined, _depth + 1, message.at);
                                continue;
                            }
                        case 10: {
                                if (wireType !== 2)
                                    break;
                                message.pin = $root.creator_stage.realtime.v1.ChatMessage.decode(reader, reader.uint32(), undefined, _depth + 1, message.pin);
                                message.body = "pin";
                                continue;
                            }
                        case 11: {
                                if (wireType !== 2)
                                    break;
                                message.unpin = $root.creator_stage.realtime.v1.Unpin.decode(reader, reader.uint32(), undefined, _depth + 1, message.unpin);
                                message.body = "unpin";
                                continue;
                            }
                        case 12: {
                                if (wireType !== 2)
                                    break;
                                message.ctaPush = $root.creator_stage.realtime.v1.CTAPush.decode(reader, reader.uint32(), undefined, _depth + 1, message.ctaPush);
                                message.body = "ctaPush";
                                continue;
                            }
                        case 13: {
                                if (wireType !== 2)
                                    break;
                                message.ctaDismiss = $root.creator_stage.realtime.v1.CTADismiss.decode(reader, reader.uint32(), undefined, _depth + 1, message.ctaDismiss);
                                message.body = "ctaDismiss";
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
                 * Decodes an ActivityEvent message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.ActivityEvent & creator_stage.realtime.v1.ActivityEvent.$Shape} ActivityEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ActivityEvent.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an ActivityEvent message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ActivityEvent.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    let properties = {};
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            break;
                        }
                    if (message.at != null && message.hasOwnProperty("at")) {
                        let error = $root.google.protobuf.Timestamp.verify(message.at, _depth + 1);
                        if (error)
                            return "at." + error;
                    }
                    if (message.pin != null && message.hasOwnProperty("pin")) {
                        properties.body = 1;
                        {
                            let error = $root.creator_stage.realtime.v1.ChatMessage.verify(message.pin, _depth + 1);
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
                    return null;
                };

                /**
                 * Creates an ActivityEvent message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.ActivityEvent} ActivityEvent
                 */
                ActivityEvent.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.ActivityEvent)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.ActivityEvent();
                    if (object.type !== 0 && (typeof object.type !== "string" || $root.creator_stage.realtime.v1.Type[object.type] !== 0))
                        switch (object.type) {
                        default:
                            if (typeof object.type === "number") {
                                message.type = object.type;
                                break;
                            }
                            break;
                        case "TYPE_UNSPECIFIED":
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
                        }
                    if (object.at != null) {
                        if (typeof object.at !== "object")
                            throw TypeError(".creator_stage.realtime.v1.ActivityEvent.at: object expected");
                        message.at = $root.google.protobuf.Timestamp.fromObject(object.at, _depth + 1);
                    }
                    if (object.pin != null) {
                        if (typeof object.pin !== "object")
                            throw TypeError(".creator_stage.realtime.v1.ActivityEvent.pin: object expected");
                        message.pin = $root.creator_stage.realtime.v1.ChatMessage.fromObject(object.pin, _depth + 1);
                    }
                    if (object.unpin != null) {
                        if (typeof object.unpin !== "object")
                            throw TypeError(".creator_stage.realtime.v1.ActivityEvent.unpin: object expected");
                        message.unpin = $root.creator_stage.realtime.v1.Unpin.fromObject(object.unpin, _depth + 1);
                    }
                    if (object.ctaPush != null) {
                        if (typeof object.ctaPush !== "object")
                            throw TypeError(".creator_stage.realtime.v1.ActivityEvent.ctaPush: object expected");
                        message.ctaPush = $root.creator_stage.realtime.v1.CTAPush.fromObject(object.ctaPush, _depth + 1);
                    }
                    if (object.ctaDismiss != null) {
                        if (typeof object.ctaDismiss !== "object")
                            throw TypeError(".creator_stage.realtime.v1.ActivityEvent.ctaDismiss: object expected");
                        message.ctaDismiss = $root.creator_stage.realtime.v1.CTADismiss.fromObject(object.ctaDismiss, _depth + 1);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an ActivityEvent message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @static
                 * @param {creator_stage.realtime.v1.ActivityEvent} message ActivityEvent
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ActivityEvent.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.type = options.enums === String ? "TYPE_UNSPECIFIED" : 0;
                        object.at = null;
                    }
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.creator_stage.realtime.v1.Type[message.type] === undefined ? message.type : $root.creator_stage.realtime.v1.Type[message.type] : message.type;
                    if (message.at != null && message.hasOwnProperty("at"))
                        object.at = $root.google.protobuf.Timestamp.toObject(message.at, options);
                    if (message.pin != null && message.hasOwnProperty("pin")) {
                        object.pin = $root.creator_stage.realtime.v1.ChatMessage.toObject(message.pin, options);
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
                    return object;
                };

                /**
                 * Converts this ActivityEvent to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ActivityEvent.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for ActivityEvent
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.ActivityEvent
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                ActivityEvent.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.ActivityEvent";
                };

                return ActivityEvent;
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

            v1.ChatMessage = (function() {

                /**
                 * Properties of a ChatMessage.
                 * @typedef {Object} creator_stage.realtime.v1.ChatMessage.$Properties
                 * @property {string|null} [id] ChatMessage id
                 * @property {string|null} [videoBroadcastId] ChatMessage videoBroadcastId
                 * @property {string|null} [userId] ChatMessage userId
                 * @property {creator_stage.realtime.v1.Role|null} [role] ChatMessage role
                 * @property {string|null} [displayName] ChatMessage displayName
                 * @property {string|null} [body] ChatMessage body
                 * @property {google.protobuf.Timestamp.$Properties|null} [sentAt] ChatMessage sentAt
                 * @property {boolean|null} [pinned] ChatMessage pinned
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of a ChatMessage.
                 * @memberof creator_stage.realtime.v1
                 * @interface IChatMessage
                 * @augments creator_stage.realtime.v1.ChatMessage.$Properties
                 * @deprecated Use creator_stage.realtime.v1.ChatMessage.$Properties instead.
                 */

                /**
                 * Shape of a ChatMessage.
                 * @typedef {creator_stage.realtime.v1.ChatMessage.$Properties} creator_stage.realtime.v1.ChatMessage.$Shape
                 */

                /**
                 * Constructs a new ChatMessage.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents a ChatMessage.
                 * @constructor
                 * @param {creator_stage.realtime.v1.ChatMessage.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function ChatMessage(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ChatMessage id.
                 * @member {string} id
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @instance
                 */
                ChatMessage.prototype.id = "";

                /**
                 * ChatMessage videoBroadcastId.
                 * @member {string} videoBroadcastId
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @instance
                 */
                ChatMessage.prototype.videoBroadcastId = "";

                /**
                 * ChatMessage userId.
                 * @member {string} userId
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @instance
                 */
                ChatMessage.prototype.userId = "";

                /**
                 * ChatMessage role.
                 * @member {creator_stage.realtime.v1.Role} role
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @instance
                 */
                ChatMessage.prototype.role = 0;

                /**
                 * ChatMessage displayName.
                 * @member {string} displayName
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @instance
                 */
                ChatMessage.prototype.displayName = "";

                /**
                 * ChatMessage body.
                 * @member {string} body
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @instance
                 */
                ChatMessage.prototype.body = "";

                /**
                 * ChatMessage sentAt.
                 * @member {google.protobuf.Timestamp.$Properties|null|undefined} sentAt
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @instance
                 */
                ChatMessage.prototype.sentAt = null;

                /**
                 * ChatMessage pinned.
                 * @member {boolean} pinned
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @instance
                 */
                ChatMessage.prototype.pinned = false;

                /**
                 * Creates a new ChatMessage instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @static
                 * @param {creator_stage.realtime.v1.ChatMessage.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.ChatMessage} ChatMessage instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.ChatMessage.$Shape): creator_stage.realtime.v1.ChatMessage & creator_stage.realtime.v1.ChatMessage.$Shape;
                 *   (properties?: creator_stage.realtime.v1.ChatMessage.$Properties): creator_stage.realtime.v1.ChatMessage;
                 * }}
                 */
                ChatMessage.create = function create(properties) {
                    return new ChatMessage(properties);
                };

                /**
                 * Encodes the specified ChatMessage message. Does not implicitly {@link creator_stage.realtime.v1.ChatMessage.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @static
                 * @param {creator_stage.realtime.v1.ChatMessage.$Properties} message ChatMessage message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChatMessage.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.videoBroadcastId != null && Object.hasOwnProperty.call(message, "videoBroadcastId"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.videoBroadcastId);
                    if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.userId);
                    if (message.role != null && Object.hasOwnProperty.call(message, "role"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.role);
                    if (message.displayName != null && Object.hasOwnProperty.call(message, "displayName"))
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.displayName);
                    if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                        writer.uint32(/* id 6, wireType 2 =*/50).string(message.body);
                    if (message.sentAt != null && Object.hasOwnProperty.call(message, "sentAt"))
                        $root.google.protobuf.Timestamp.encode(message.sentAt, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                    if (message.pinned != null && Object.hasOwnProperty.call(message, "pinned"))
                        writer.uint32(/* id 8, wireType 0 =*/64).bool(message.pinned);
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified ChatMessage message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.ChatMessage.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @static
                 * @param {creator_stage.realtime.v1.ChatMessage.$Properties} message ChatMessage message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ChatMessage message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.ChatMessage & creator_stage.realtime.v1.ChatMessage.$Shape} ChatMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChatMessage.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.ChatMessage(), value;
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
                                    message.videoBroadcastId = value;
                                else
                                    delete message.videoBroadcastId;
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.userId = value;
                                else
                                    delete message.userId;
                                continue;
                            }
                        case 4: {
                                if (wireType !== 0)
                                    break;
                                if (value = reader.int32())
                                    message.role = value;
                                else
                                    delete message.role;
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
                                    message.body = value;
                                else
                                    delete message.body;
                                continue;
                            }
                        case 7: {
                                if (wireType !== 2)
                                    break;
                                message.sentAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32(), undefined, _depth + 1, message.sentAt);
                                continue;
                            }
                        case 8: {
                                if (wireType !== 0)
                                    break;
                                if (value = reader.bool())
                                    message.pinned = value;
                                else
                                    delete message.pinned;
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
                 * Decodes a ChatMessage message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.ChatMessage & creator_stage.realtime.v1.ChatMessage.$Shape} ChatMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChatMessage.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ChatMessage message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ChatMessage.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.videoBroadcastId != null && message.hasOwnProperty("videoBroadcastId"))
                        if (!$util.isString(message.videoBroadcastId))
                            return "videoBroadcastId: string expected";
                    if (message.userId != null && message.hasOwnProperty("userId"))
                        if (!$util.isString(message.userId))
                            return "userId: string expected";
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
                    if (message.displayName != null && message.hasOwnProperty("displayName"))
                        if (!$util.isString(message.displayName))
                            return "displayName: string expected";
                    if (message.body != null && message.hasOwnProperty("body"))
                        if (!$util.isString(message.body))
                            return "body: string expected";
                    if (message.sentAt != null && message.hasOwnProperty("sentAt")) {
                        let error = $root.google.protobuf.Timestamp.verify(message.sentAt, _depth + 1);
                        if (error)
                            return "sentAt." + error;
                    }
                    if (message.pinned != null && message.hasOwnProperty("pinned"))
                        if (typeof message.pinned !== "boolean")
                            return "pinned: boolean expected";
                    return null;
                };

                /**
                 * Creates a ChatMessage message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.ChatMessage} ChatMessage
                 */
                ChatMessage.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.ChatMessage)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.ChatMessage();
                    if (object.id != null)
                        if (typeof object.id !== "string" || object.id.length)
                            message.id = String(object.id);
                    if (object.videoBroadcastId != null)
                        if (typeof object.videoBroadcastId !== "string" || object.videoBroadcastId.length)
                            message.videoBroadcastId = String(object.videoBroadcastId);
                    if (object.userId != null)
                        if (typeof object.userId !== "string" || object.userId.length)
                            message.userId = String(object.userId);
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
                    if (object.displayName != null)
                        if (typeof object.displayName !== "string" || object.displayName.length)
                            message.displayName = String(object.displayName);
                    if (object.body != null)
                        if (typeof object.body !== "string" || object.body.length)
                            message.body = String(object.body);
                    if (object.sentAt != null) {
                        if (typeof object.sentAt !== "object")
                            throw TypeError(".creator_stage.realtime.v1.ChatMessage.sentAt: object expected");
                        message.sentAt = $root.google.protobuf.Timestamp.fromObject(object.sentAt, _depth + 1);
                    }
                    if (object.pinned != null)
                        if (object.pinned)
                            message.pinned = Boolean(object.pinned);
                    return message;
                };

                /**
                 * Creates a plain object from a ChatMessage message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @static
                 * @param {creator_stage.realtime.v1.ChatMessage} message ChatMessage
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ChatMessage.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.videoBroadcastId = "";
                        object.userId = "";
                        object.role = options.enums === String ? "ROLE_UNSPECIFIED" : 0;
                        object.displayName = "";
                        object.body = "";
                        object.sentAt = null;
                        object.pinned = false;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.videoBroadcastId != null && message.hasOwnProperty("videoBroadcastId"))
                        object.videoBroadcastId = message.videoBroadcastId;
                    if (message.userId != null && message.hasOwnProperty("userId"))
                        object.userId = message.userId;
                    if (message.role != null && message.hasOwnProperty("role"))
                        object.role = options.enums === String ? $root.creator_stage.realtime.v1.Role[message.role] === undefined ? message.role : $root.creator_stage.realtime.v1.Role[message.role] : message.role;
                    if (message.displayName != null && message.hasOwnProperty("displayName"))
                        object.displayName = message.displayName;
                    if (message.body != null && message.hasOwnProperty("body"))
                        object.body = message.body;
                    if (message.sentAt != null && message.hasOwnProperty("sentAt"))
                        object.sentAt = $root.google.protobuf.Timestamp.toObject(message.sentAt, options);
                    if (message.pinned != null && message.hasOwnProperty("pinned"))
                        object.pinned = message.pinned;
                    return object;
                };

                /**
                 * Converts this ChatMessage to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ChatMessage.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for ChatMessage
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.ChatMessage
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                ChatMessage.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.ChatMessage";
                };

                return ChatMessage;
            })();

            v1.BatchedChatMessages = (function() {

                /**
                 * Properties of a BatchedChatMessages.
                 * @typedef {Object} creator_stage.realtime.v1.BatchedChatMessages.$Properties
                 * @property {Array.<creator_stage.realtime.v1.ChatMessage.$Properties>|null} [messages] BatchedChatMessages messages
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
                 * BatchedChatMessages messages.
                 * @member {Array.<creator_stage.realtime.v1.ChatMessage.$Properties>} messages
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
                    if (message.messages != null && message.messages.length)
                        for (let i = 0; i < message.messages.length; ++i)
                            $root.creator_stage.realtime.v1.ChatMessage.encode(message.messages[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
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
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.BatchedChatMessages();
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
                                if (!(message.messages && message.messages.length))
                                    message.messages = [];
                                message.messages.push($root.creator_stage.realtime.v1.ChatMessage.decode(reader, reader.uint32(), undefined, _depth + 1));
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
                    if (message.messages != null && message.hasOwnProperty("messages")) {
                        if (!Array.isArray(message.messages))
                            return "messages: array expected";
                        for (let i = 0; i < message.messages.length; ++i) {
                            let error = $root.creator_stage.realtime.v1.ChatMessage.verify(message.messages[i], _depth + 1);
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
                    if (object.messages) {
                        if (!Array.isArray(object.messages))
                            throw TypeError(".creator_stage.realtime.v1.BatchedChatMessages.messages: array expected");
                        message.messages = Array(object.messages.length);
                        for (let i = 0; i < object.messages.length; ++i) {
                            if (typeof object.messages[i] !== "object")
                                throw TypeError(".creator_stage.realtime.v1.BatchedChatMessages.messages: object expected");
                            message.messages[i] = $root.creator_stage.realtime.v1.ChatMessage.fromObject(object.messages[i], _depth + 1);
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
                    if (message.messages && message.messages.length) {
                        object.messages = Array(message.messages.length);
                        for (let j = 0; j < message.messages.length; ++j)
                            object.messages[j] = $root.creator_stage.realtime.v1.ChatMessage.toObject(message.messages[j], options);
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

            v1.ChatPublishRequest = (function() {

                /**
                 * Properties of a ChatPublishRequest.
                 * @typedef {Object} creator_stage.realtime.v1.ChatPublishRequest.$Properties
                 * @property {string|null} [body] ChatPublishRequest body
                 * @property {string|null} [targetUserId] ChatPublishRequest targetUserId
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of a ChatPublishRequest.
                 * @memberof creator_stage.realtime.v1
                 * @interface IChatPublishRequest
                 * @augments creator_stage.realtime.v1.ChatPublishRequest.$Properties
                 * @deprecated Use creator_stage.realtime.v1.ChatPublishRequest.$Properties instead.
                 */

                /**
                 * Shape of a ChatPublishRequest.
                 * @typedef {creator_stage.realtime.v1.ChatPublishRequest.$Properties} creator_stage.realtime.v1.ChatPublishRequest.$Shape
                 */

                /**
                 * Constructs a new ChatPublishRequest.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents a ChatPublishRequest.
                 * @constructor
                 * @param {creator_stage.realtime.v1.ChatPublishRequest.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function ChatPublishRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ChatPublishRequest body.
                 * @member {string} body
                 * @memberof creator_stage.realtime.v1.ChatPublishRequest
                 * @instance
                 */
                ChatPublishRequest.prototype.body = "";

                /**
                 * ChatPublishRequest targetUserId.
                 * @member {string} targetUserId
                 * @memberof creator_stage.realtime.v1.ChatPublishRequest
                 * @instance
                 */
                ChatPublishRequest.prototype.targetUserId = "";

                /**
                 * Creates a new ChatPublishRequest instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.ChatPublishRequest
                 * @static
                 * @param {creator_stage.realtime.v1.ChatPublishRequest.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.ChatPublishRequest} ChatPublishRequest instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.ChatPublishRequest.$Shape): creator_stage.realtime.v1.ChatPublishRequest & creator_stage.realtime.v1.ChatPublishRequest.$Shape;
                 *   (properties?: creator_stage.realtime.v1.ChatPublishRequest.$Properties): creator_stage.realtime.v1.ChatPublishRequest;
                 * }}
                 */
                ChatPublishRequest.create = function create(properties) {
                    return new ChatPublishRequest(properties);
                };

                /**
                 * Encodes the specified ChatPublishRequest message. Does not implicitly {@link creator_stage.realtime.v1.ChatPublishRequest.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.ChatPublishRequest
                 * @static
                 * @param {creator_stage.realtime.v1.ChatPublishRequest.$Properties} message ChatPublishRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChatPublishRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.body);
                    if (message.targetUserId != null && Object.hasOwnProperty.call(message, "targetUserId"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.targetUserId);
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified ChatPublishRequest message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.ChatPublishRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.ChatPublishRequest
                 * @static
                 * @param {creator_stage.realtime.v1.ChatPublishRequest.$Properties} message ChatPublishRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChatPublishRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ChatPublishRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.ChatPublishRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.ChatPublishRequest & creator_stage.realtime.v1.ChatPublishRequest.$Shape} ChatPublishRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChatPublishRequest.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.ChatPublishRequest(), value;
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
                                    message.body = value;
                                else
                                    delete message.body;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                if ((value = reader.string()).length)
                                    message.targetUserId = value;
                                else
                                    delete message.targetUserId;
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
                 * Decodes a ChatPublishRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.ChatPublishRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.ChatPublishRequest & creator_stage.realtime.v1.ChatPublishRequest.$Shape} ChatPublishRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChatPublishRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ChatPublishRequest message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.ChatPublishRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ChatPublishRequest.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.body != null && message.hasOwnProperty("body"))
                        if (!$util.isString(message.body))
                            return "body: string expected";
                    if (message.targetUserId != null && message.hasOwnProperty("targetUserId"))
                        if (!$util.isString(message.targetUserId))
                            return "targetUserId: string expected";
                    return null;
                };

                /**
                 * Creates a ChatPublishRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.ChatPublishRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.ChatPublishRequest} ChatPublishRequest
                 */
                ChatPublishRequest.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.ChatPublishRequest)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.ChatPublishRequest();
                    if (object.body != null)
                        if (typeof object.body !== "string" || object.body.length)
                            message.body = String(object.body);
                    if (object.targetUserId != null)
                        if (typeof object.targetUserId !== "string" || object.targetUserId.length)
                            message.targetUserId = String(object.targetUserId);
                    return message;
                };

                /**
                 * Creates a plain object from a ChatPublishRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.ChatPublishRequest
                 * @static
                 * @param {creator_stage.realtime.v1.ChatPublishRequest} message ChatPublishRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ChatPublishRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.body = "";
                        object.targetUserId = "";
                    }
                    if (message.body != null && message.hasOwnProperty("body"))
                        object.body = message.body;
                    if (message.targetUserId != null && message.hasOwnProperty("targetUserId"))
                        object.targetUserId = message.targetUserId;
                    return object;
                };

                /**
                 * Converts this ChatPublishRequest to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.ChatPublishRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ChatPublishRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for ChatPublishRequest
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.ChatPublishRequest
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                ChatPublishRequest.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.ChatPublishRequest";
                };

                return ChatPublishRequest;
            })();

            v1.AnalyticsHeartbeat = (function() {

                /**
                 * Properties of an AnalyticsHeartbeat.
                 * @typedef {Object} creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties
                 * @property {number|null} [viewerCount] AnalyticsHeartbeat viewerCount
                 * @property {number|null} [chatVelocity] AnalyticsHeartbeat chatVelocity
                 * @property {number|null} [engagementRate] AnalyticsHeartbeat engagementRate
                 * @property {google.protobuf.Timestamp.$Properties|null} [at] AnalyticsHeartbeat at
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */

                /**
                 * Properties of an AnalyticsHeartbeat.
                 * @memberof creator_stage.realtime.v1
                 * @interface IAnalyticsHeartbeat
                 * @augments creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties
                 * @deprecated Use creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties instead.
                 */

                /**
                 * Shape of an AnalyticsHeartbeat.
                 * @typedef {creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties} creator_stage.realtime.v1.AnalyticsHeartbeat.$Shape
                 */

                /**
                 * Constructs a new AnalyticsHeartbeat.
                 * @memberof creator_stage.realtime.v1
                 * @classdesc Represents an AnalyticsHeartbeat.
                 * @constructor
                 * @param {creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
                 */
                function AnalyticsHeartbeat(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * AnalyticsHeartbeat viewerCount.
                 * @member {number} viewerCount
                 * @memberof creator_stage.realtime.v1.AnalyticsHeartbeat
                 * @instance
                 */
                AnalyticsHeartbeat.prototype.viewerCount = 0;

                /**
                 * AnalyticsHeartbeat chatVelocity.
                 * @member {number} chatVelocity
                 * @memberof creator_stage.realtime.v1.AnalyticsHeartbeat
                 * @instance
                 */
                AnalyticsHeartbeat.prototype.chatVelocity = 0;

                /**
                 * AnalyticsHeartbeat engagementRate.
                 * @member {number} engagementRate
                 * @memberof creator_stage.realtime.v1.AnalyticsHeartbeat
                 * @instance
                 */
                AnalyticsHeartbeat.prototype.engagementRate = 0;

                /**
                 * AnalyticsHeartbeat at.
                 * @member {google.protobuf.Timestamp.$Properties|null|undefined} at
                 * @memberof creator_stage.realtime.v1.AnalyticsHeartbeat
                 * @instance
                 */
                AnalyticsHeartbeat.prototype.at = null;

                /**
                 * Creates a new AnalyticsHeartbeat instance using the specified properties.
                 * @function create
                 * @memberof creator_stage.realtime.v1.AnalyticsHeartbeat
                 * @static
                 * @param {creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties=} [properties] Properties to set
                 * @returns {creator_stage.realtime.v1.AnalyticsHeartbeat} AnalyticsHeartbeat instance
                 * @type {{
                 *   (properties: creator_stage.realtime.v1.AnalyticsHeartbeat.$Shape): creator_stage.realtime.v1.AnalyticsHeartbeat & creator_stage.realtime.v1.AnalyticsHeartbeat.$Shape;
                 *   (properties?: creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties): creator_stage.realtime.v1.AnalyticsHeartbeat;
                 * }}
                 */
                AnalyticsHeartbeat.create = function create(properties) {
                    return new AnalyticsHeartbeat(properties);
                };

                /**
                 * Encodes the specified AnalyticsHeartbeat message. Does not implicitly {@link creator_stage.realtime.v1.AnalyticsHeartbeat.verify|verify} messages.
                 * @function encode
                 * @memberof creator_stage.realtime.v1.AnalyticsHeartbeat
                 * @static
                 * @param {creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties} message AnalyticsHeartbeat message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AnalyticsHeartbeat.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.viewerCount != null && Object.hasOwnProperty.call(message, "viewerCount"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.viewerCount);
                    if (message.chatVelocity != null && Object.hasOwnProperty.call(message, "chatVelocity"))
                        writer.uint32(/* id 2, wireType 1 =*/17).double(message.chatVelocity);
                    if (message.engagementRate != null && Object.hasOwnProperty.call(message, "engagementRate"))
                        writer.uint32(/* id 3, wireType 1 =*/25).double(message.engagementRate);
                    if (message.at != null && Object.hasOwnProperty.call(message, "at"))
                        $root.google.protobuf.Timestamp.encode(message.at, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified AnalyticsHeartbeat message, length delimited. Does not implicitly {@link creator_stage.realtime.v1.AnalyticsHeartbeat.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof creator_stage.realtime.v1.AnalyticsHeartbeat
                 * @static
                 * @param {creator_stage.realtime.v1.AnalyticsHeartbeat.$Properties} message AnalyticsHeartbeat message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AnalyticsHeartbeat.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an AnalyticsHeartbeat message from the specified reader or buffer.
                 * @function decode
                 * @memberof creator_stage.realtime.v1.AnalyticsHeartbeat
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {creator_stage.realtime.v1.AnalyticsHeartbeat & creator_stage.realtime.v1.AnalyticsHeartbeat.$Shape} AnalyticsHeartbeat
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AnalyticsHeartbeat.decode = function decode(reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw Error("max depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.creator_stage.realtime.v1.AnalyticsHeartbeat(), value;
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
                                    message.viewerCount = value;
                                else
                                    delete message.viewerCount;
                                continue;
                            }
                        case 2: {
                                if (wireType !== 1)
                                    break;
                                if ((value = reader.double()) !== 0)
                                    message.chatVelocity = value;
                                else
                                    delete message.chatVelocity;
                                continue;
                            }
                        case 3: {
                                if (wireType !== 1)
                                    break;
                                if ((value = reader.double()) !== 0)
                                    message.engagementRate = value;
                                else
                                    delete message.engagementRate;
                                continue;
                            }
                        case 4: {
                                if (wireType !== 2)
                                    break;
                                message.at = $root.google.protobuf.Timestamp.decode(reader, reader.uint32(), undefined, _depth + 1, message.at);
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
                 * Decodes an AnalyticsHeartbeat message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof creator_stage.realtime.v1.AnalyticsHeartbeat
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {creator_stage.realtime.v1.AnalyticsHeartbeat & creator_stage.realtime.v1.AnalyticsHeartbeat.$Shape} AnalyticsHeartbeat
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AnalyticsHeartbeat.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AnalyticsHeartbeat message.
                 * @function verify
                 * @memberof creator_stage.realtime.v1.AnalyticsHeartbeat
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AnalyticsHeartbeat.verify = function verify(message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.viewerCount != null && message.hasOwnProperty("viewerCount"))
                        if (!$util.isInteger(message.viewerCount))
                            return "viewerCount: integer expected";
                    if (message.chatVelocity != null && message.hasOwnProperty("chatVelocity"))
                        if (typeof message.chatVelocity !== "number")
                            return "chatVelocity: number expected";
                    if (message.engagementRate != null && message.hasOwnProperty("engagementRate"))
                        if (typeof message.engagementRate !== "number")
                            return "engagementRate: number expected";
                    if (message.at != null && message.hasOwnProperty("at")) {
                        let error = $root.google.protobuf.Timestamp.verify(message.at, _depth + 1);
                        if (error)
                            return "at." + error;
                    }
                    return null;
                };

                /**
                 * Creates an AnalyticsHeartbeat message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof creator_stage.realtime.v1.AnalyticsHeartbeat
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {creator_stage.realtime.v1.AnalyticsHeartbeat} AnalyticsHeartbeat
                 */
                AnalyticsHeartbeat.fromObject = function fromObject(object, _depth) {
                    if (object instanceof $root.creator_stage.realtime.v1.AnalyticsHeartbeat)
                        return object;
                    if (_depth === undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let message = new $root.creator_stage.realtime.v1.AnalyticsHeartbeat();
                    if (object.viewerCount != null)
                        if (Number(object.viewerCount) !== 0)
                            message.viewerCount = object.viewerCount >>> 0;
                    if (object.chatVelocity != null)
                        if (Number(object.chatVelocity) !== 0)
                            message.chatVelocity = Number(object.chatVelocity);
                    if (object.engagementRate != null)
                        if (Number(object.engagementRate) !== 0)
                            message.engagementRate = Number(object.engagementRate);
                    if (object.at != null) {
                        if (typeof object.at !== "object")
                            throw TypeError(".creator_stage.realtime.v1.AnalyticsHeartbeat.at: object expected");
                        message.at = $root.google.protobuf.Timestamp.fromObject(object.at, _depth + 1);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an AnalyticsHeartbeat message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof creator_stage.realtime.v1.AnalyticsHeartbeat
                 * @static
                 * @param {creator_stage.realtime.v1.AnalyticsHeartbeat} message AnalyticsHeartbeat
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AnalyticsHeartbeat.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.viewerCount = 0;
                        object.chatVelocity = 0;
                        object.engagementRate = 0;
                        object.at = null;
                    }
                    if (message.viewerCount != null && message.hasOwnProperty("viewerCount"))
                        object.viewerCount = message.viewerCount;
                    if (message.chatVelocity != null && message.hasOwnProperty("chatVelocity"))
                        object.chatVelocity = options.json && !isFinite(message.chatVelocity) ? String(message.chatVelocity) : message.chatVelocity;
                    if (message.engagementRate != null && message.hasOwnProperty("engagementRate"))
                        object.engagementRate = options.json && !isFinite(message.engagementRate) ? String(message.engagementRate) : message.engagementRate;
                    if (message.at != null && message.hasOwnProperty("at"))
                        object.at = $root.google.protobuf.Timestamp.toObject(message.at, options);
                    return object;
                };

                /**
                 * Converts this AnalyticsHeartbeat to JSON.
                 * @function toJSON
                 * @memberof creator_stage.realtime.v1.AnalyticsHeartbeat
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AnalyticsHeartbeat.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for AnalyticsHeartbeat
                 * @function getTypeUrl
                 * @memberof creator_stage.realtime.v1.AnalyticsHeartbeat
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                AnalyticsHeartbeat.getTypeUrl = function getTypeUrl(prefix) {
                    if (prefix === undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/creator_stage.realtime.v1.AnalyticsHeartbeat";
                };

                return AnalyticsHeartbeat;
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
