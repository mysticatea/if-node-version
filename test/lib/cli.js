/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fork = require("child_process").fork
var resolvePath = require("path").resolve
var Promise = require("pinkie-promise")
var BufferStream = require("./buffer-stream")

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var BIN_FILE = resolvePath(__dirname, "../../bin/index.js")
var OKJS_FILE = resolvePath(__dirname, "ok.js")
var NGJS_FILE = resolvePath(__dirname, "ng.js")

function run(args) {
    return new Promise(function(resolve, reject) {
        var cp = fork(BIN_FILE, args, {silent: true})
        var stdout = new BufferStream()
        var stderr = new BufferStream()

        cp.stdout.pipe(stdout)
        cp.stderr.pipe(stderr)

        cp.on("close", function(exitCode) {
            resolve({
                exitCode: exitCode,
                stdout: stdout.value,
                stderr: stderr.value,
                error: null,
            })
        })
        cp.on("error", reject)
    })
}

function runToCheck(range, options) {
    var fail = Boolean(options && options.fail)
    return run([
        range,
        process.execPath,
        fail ? NGJS_FILE : OKJS_FILE,
    ])
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports.run = run
module.exports.runToCheck = runToCheck
