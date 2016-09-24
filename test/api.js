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
var api = require("./lib/api")

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var version = process.versions.node
var run = api.run
var runSync = api.runSync

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

describe("[Node API] Under Node.js v" + version + ",", function() {
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
            describe("with good command,", function() {
                describe("async version", function() {
                    var result = null

                    before(function() {
                        return run(range).then(function(ret) {
                            result = ret
                        })
                    })

                    if (semver.satisfies(version, range)) {
                        it("should exit with zero", function() {
                            assert(result.exitCode === 0)
                        })
                        it("should run the specified command", function() {
                            assert(result.stdout === "OK")
                        })
                    }
                    else {
                        it("should NOT run the specified command", function() {
                            assert(result == null)
                        })
                    }
                })

                describe("sync version", function() {
                    var result = null

                    before(function() {
                        result = runSync(range)
                    })

                    if (semver.satisfies(version, range)) {
                        it("should exit with zero", function() {
                            assert(result.exitCode === 0)
                        })
                        it("should run the specified command", function() {
                            assert(result.stdout === "OK")
                        })
                    }
                    else {
                        it("should NOT run the specified command", function() {
                            assert(result == null)
                        })
                    }
                })
            })

            describe("with bad command,", function() {
                describe("async version", function() {
                    var result = null

                    before(function() {
                        return run(range, {fail: true}).then(function(ret) {
                            result = ret
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
                        it("should NOT run the specified command", function() {
                            assert(result == null)
                        })
                    }
                })

                describe("sync version", function() {
                    var result = null

                    before(function() {
                        result = runSync(range, {fail: true})
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
                        it("should NOT run the specified command", function() {
                            assert(result == null)
                        })
                    }
                })
            })
        })
    })
})
