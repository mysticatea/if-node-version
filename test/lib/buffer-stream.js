/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var Writable = require("stream").Writable
var inherits = require("util").inherits

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function BufferStream() {
    Writable.call(this)
    this.value = ""
}
inherits(BufferStream, Writable)

Object.defineProperty(BufferStream.prototype, "_write", {
    value: function _write(chunk, encoding, callback) {
        this.value += chunk.toString()
        callback()
    },
    configurable: true,
    enumerable: false,
    writable: true,
})

module.exports = BufferStream
