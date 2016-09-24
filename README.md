# if-node-version

[![npm version](https://img.shields.io/npm/v/if-node-version.svg)](https://www.npmjs.com/package/if-node-version)
[![Downloads/month](https://img.shields.io/npm/dm/if-node-version.svg)](http://www.npmtrends.com/if-node-version)
[![Build Status](https://travis-ci.org/mysticatea/if-node-version.svg?branch=master)](https://travis-ci.org/mysticatea/if-node-version)
[![Coverage Status](https://codecov.io/gh/mysticatea/if-node-version/branch/master/graph/badge.svg)](https://codecov.io/gh/mysticatea/if-node-version)
[![Dependency Status](https://david-dm.org/mysticatea/if-node-version.svg)](https://david-dm.org/mysticatea/if-node-version)

Run a shell command if it's on the node of specified versions.

```bash
$ if-node-version ">=4" eslint lib test
```

```bash
$ if-node-version "<6" node ./scripts/fallback.js
```

Maybe this helps you together with [npm-scripts].

## Installation

`if-node-version` can be installed with [npm].

```bash
$ npm install --save-dev if-node-version
```

- `if-node-version` requires Node.js `>=0.10.0`

## Usage

### CLI

```
Usage:
    $ if-node-version <VersionRange> <Command> [...args]

        Run a shell command if it's on the node of specified versions.
        Otherwise, do nothing.

        Exit code is the exit code of the <Command>.

    $ if-node-version <VersionRange>

        Check if it's on the node of specified versions.

        Exit code is 0 if it's on the node of specified versions.
        Otherwise, exit code is 1.

    $ if-node-version --help

        Show this help text.

    $ if-node-version --version

        Show the version number of `if-node-version` command.

Parameters:
    <VersionRange> .... A text which specifies the version range of Node.js
                        This text format is defined by node-semver module:
                        https://www.npmjs.com/package/semver#ranges
    <Command> ......... The shell command to execute.
    [...args] ......... Parameters of the shell command.

Examples:
    $ if-node-version ">=4" eslint lib test
    $ if-node-version "<6" node ./scripts/fallback.js
```

### Node API

```js
var spawnIfNodeVersion = require("if-node-version")
```

#### spawnIfNodeVersion(versionRange, command, args, options)

Spawn a child process with specified parameters if the node version satisfies a given version range.

This function returns [child_process.ChildProcess] object.

- `versionRange` `{string}` - A text which specifies the version range of Node.js. This text format is defined by node-semver module: https://www.npmjs.com/package/semver#ranges
- `command` `{string}` - The command to run.
- `args` `{Array.<string>}` - List of string arguments.
- `options` `{object}` - An option object. See [the document of `child_process.spawn`]

#### spawnIfNodeVersion.sync(versionRange, command, args, options)

This is synchronous version of `spawnIfNodeVersion(versionRange, command, args, options)`.

This function returns the object as same as [child_process.spawnSync].

**Note:** If you use this function on node `0.10`, you will also need to install [spawn-sync].

## Changelogs

- [GitHub Releases]

## Contributing

Welcome your contributions!<br>
Please use GitHub's issues/PRs.

### Tools to develop

- `npm install` installs dependencies.
- `npm test` runs tests and measures coverage.
- `npm run coverage` opens the coverage result of `npm test`.
- `npm run clean` removes the coverage result of `npm test`.
- `npm run lint` analyzes codes by ESLint.
- `npm run watch` runs tests (without coverage measurement) when source code is modified.


[npm]: https://www.npmjs.com/
[npm-scripts]: https://docs.npmjs.com/misc/scripts
[child_process.ChildProcess]: https://nodejs.org/api/child_process.html#child_process_class_childprocess
[the document of `child_process.spawn`]: https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
[child_process.spawnSync]: https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options
[spawn-sync]: https://www.npmjs.com/package/spawn-sync
[GitHub Releases]: https://github.com/mysticatea/if-node-version/releases
