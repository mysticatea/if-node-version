/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require("path")
var version = require(path.resolve(__dirname, "../package.json")).version

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

exports.printVersion = function printVersion() {
    console.log("v" + version)
}
