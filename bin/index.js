#!/usr/bin/env node
/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var spawn = require("../lib")

//------------------------------------------------------------------------------
// Main
//------------------------------------------------------------------------------
/*eslint no-process-exit: off */

var argv = process.argv
var versionRange = argv[2]
var command = argv[3]
var args = argv.slice(4)

if (versionRange === "--help" || versionRange === "-h") {
    require("./help").printHelp(process.stdout)
    process.exit(0)
}

if (versionRange === "--version" || versionRange === "-v") {
    require("./version").printVersion(process.stdout)
    process.exit(0)
}

if (!versionRange) {
    require("./help").printHelp(process.stderr)
    process.exit(1)
}

if (!command) {
    process.exit(spawn.isNodeVersionSatisfies(versionRange) ? 0 : 1)
}

var cp = spawn(
    versionRange,
    command,
    args,
    {stdio: "inherit"}
)

if (cp != null) {
    cp.on("close", function(exitCode) {
        process.exit(exitCode)
    })
}
