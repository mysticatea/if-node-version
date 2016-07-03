/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var assert = require("assert")
var semver = require("semver")
var cli = require("./lib/cli")

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var version = process.versions.node
var run = cli.run
var runToCheck = cli.runToCheck

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

describe("If no argument,", function() {
    var result = null

    before(function() {
        return run([]).then(function(ret) {
            result = ret
        })
    })

    it("should exit with a non-zero code", function() {
        assert(typeof result.exitCode === "number")
        assert(result.exitCode !== 0)
    })

    it("should print no message into stdout", function() {
        assert(result.stdout === "")
    })

    it("should print help message into stderr", function() {
        assert(/Usage:/.test(result.stderr))
    })
})

describe("If '--help' is given,", function() {
    var result = null

    before(function() {
        return run(["--help"]).then(function(ret) {
            result = ret
        })
    })

    it("should exit with zero", function() {
        assert(result.exitCode === 0)
    })

    it("should print help message into stdout", function() {
        assert(/Usage:/.test(result.stdout))
    })

    it("should print no message into stderr", function() {
        assert(result.stderr === "")
    })
})

describe("If '-h' is given,", function() {
    var result = null

    before(function() {
        return run(["-h"]).then(function(ret) {
            result = ret
        })
    })

    it("should exit with zero", function() {
        assert(result.exitCode === 0)
    })

    it("should print help message into stdout", function() {
        assert(/Usage:/.test(result.stdout))
    })

    it("should print no message into stderr", function() {
        assert(result.stderr === "")
    })
})

describe("If '--version' is given,", function() {
    var result = null

    before(function() {
        return run(["--version"]).then(function(ret) {
            result = ret
        })
    })

    it("should exit with zero", function() {
        assert(result.exitCode === 0)
    })

    it("should print version text into stdout", function() {
        assert(result.stdout[0] === "v")
        assert(semver.valid(result.stdout.slice(1)))
    })

    it("should print no message into stderr", function() {
        assert(result.stderr === "")
    })
})

describe("Under Node.js v" + version + ",", function() {
    var ranges = [
        ">=0.10",
        ">=0.12",
        ">=4",
        ">=6",
        "<0.10",
        "<0.12",
        "<4",
        "<6",
        "^0.10",
        "^0.12",
        "^4",
        "^6",
        "^0.10 || ^0.12 || ^4 || ^6",
    ]

    ranges.forEach(function(range) {
        describe("if '" + range + "' is given", function() {
            describe("with a good command,", function() {
                var result = null

                before(function() {
                    return runToCheck(range).then(function(ret) {
                        result = ret
                    })
                })

                it("should exit with zero", function() {
                    assert(result.exitCode === 0)
                })

                if (semver.satisfies(version, range)) {
                    it("should run the specified command", function() {
                        assert(result.stdout === "OK")
                    })
                }
                else {
                    it("should NOT run the specified command", function() {
                        assert(result.stdout === "")
                    })
                }
            })

            describe("with a bad command,", function() {
                var result = null

                before(function() {
                    return runToCheck(range, {fail: true}).then(function(ret) {
                        result = ret
                        console.log(result.stderr)
                    })
                })

                if (semver.satisfies(version, range)) {
                    it("should exit with a non-zero code", function() {
                        assert(result.exitCode === 1)
                    })
                    it("should run the specified command", function() {
                        assert(result.stdout === "NG")
                    })
                }
                else {
                    it("should exit with zero", function() {
                        assert(result.exitCode === 0)
                    })
                    it("should NOT run the specified command", function() {
                        assert(result.stdout === "")
                    })
                }
            })
        })
    })
})
