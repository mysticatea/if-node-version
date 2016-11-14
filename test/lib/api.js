/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var resolvePath = require("path").resolve
var Promise = require("pinkie-promise")
var BufferStream = require("./buffer-stream")
var spawnIfNodeVersionSatisfies = require("../../lib")

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var OKJS_FILE = resolvePath(__dirname, "ok.js")
var NGJS_FILE = resolvePath(__dirname, "ng.js")

function run(range, options) {
    return new Promise(function(resolve, reject) {
        var fail = Boolean(options && options.fail)
        var cp = spawnIfNodeVersionSatisfies(
            range,
            process.execPath,
            [fail ? NGJS_FILE : OKJS_FILE],
            {stdio: "pipe"}
        )

        if (cp == null) {
            resolve(cp)
            return
        }

        var stdout = new BufferStream()
        var stderr = new BufferStream()

        cp.stdout.pipe(stdout)
        cp.stderr.pipe(stderr)

        cp.on("close", function(exitCode) {
            resolve({
                exitCode: exitCode,
                stdout: stdout.value,
                stderr: stderr.value,
            })
        })
        cp.on("error", reject)
    })
}

function runSync(range, options) {
    var fail = Boolean(options && options.fail)
    var result = spawnIfNodeVersionSatisfies.sync(
        range,
        process.execPath,
        [fail ? NGJS_FILE : OKJS_FILE]
    )
    return result && {
        exitCode: result.status,
        stdout: result.stdout.toString(),
        stderr: result.stderr.toString(),
    }
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports.run = run
module.exports.runSync = runSync
