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

var spawnIfNodeVersionSatisfies = require("../lib")

//------------------------------------------------------------------------------
// Main
//------------------------------------------------------------------------------
/*eslint-disable no-process-exit*/

var argv = process.argv
var versionRange = argv[2]
var command = argv[3]
var args = argv.slice(4)

if (versionRange === "--help" || versionRange === "-h") {
    require("./help").printHelp(process.stdout)
    return
}

if (versionRange === "--version" || versionRange === "-v") {
    require("./version").printVersion(process.stdout)
    return
}

if (argv.length < 4) {
    require("./help").printHelp(process.stderr)
    process.exit(1)
}

var cp = spawnIfNodeVersionSatisfies(
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
