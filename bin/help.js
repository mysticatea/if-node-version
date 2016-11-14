/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require("fs")
var path = require("path")

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var help = fs.readFileSync(path.join(__dirname, "help.txt"), "utf8")

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports.printHelp = function printHelp(output) {
    output.write(help)
}
