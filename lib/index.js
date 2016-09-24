/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var semver = require("semver")
var spawn = require("cross-spawn")

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function isNodeVersionSatisfies(range) {
    return semver.satisfies(process.versions.node, range)
}

function spawnIfNodeVersionSatisfies(
    versionRange,
    command,
    args,
    options
) {
    if (isNodeVersionSatisfies(versionRange)) {
        return spawn(command, args, options)
    }
    return null
}

function spawnIfNodeVersionSatisfiesSync(
    versionRange,
    command,
    args,
    options
) {
    if (isNodeVersionSatisfies(versionRange)) {
        return spawn.sync(command, args, options)
    }
    return null
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = spawnIfNodeVersionSatisfies
module.exports.sync = spawnIfNodeVersionSatisfiesSync
module.exports.isNodeVersionSatisfies = isNodeVersionSatisfies
