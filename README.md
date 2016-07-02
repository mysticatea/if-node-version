# if-node-version

[![npm version](https://img.shields.io/npm/v/if-node-version.svg)](https://www.npmjs.com/package/if-node-version)
[![Downloads/month](https://img.shields.io/npm/dm/if-node-version.svg)](http://www.npmtrends.com/if-node-version)
[![Build Status](https://travis-ci.org/mysticatea/if-node-version.svg?branch=master)](https://travis-ci.org/mysticatea/if-node-version)
[![Coverage Status](https://coveralls.io/repos/mysticatea/if-node-version/badge.svg?branch=master&service=github)](https://coveralls.io/github/mysticatea/if-node-version?branch=master)
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
    $ if-node-version --help
    $ if-node-version --version

    Run a shell command if it's on the node of specified versions.

Parameters:
    <VersionRange> .... A text which specifies the version range of Node.js.
                        This text format is defined by node-semver module:
                        https://www.npmjs.com/package/semver#ranges
    <Command> ......... A shell command.
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

[npm]: https://www.npmjs.com/
[npm-scripts]: https://docs.npmjs.com/misc/scripts
[child_process.ChildProcess]: https://nodejs.org/api/child_process.html#child_process_class_childprocess
[the document of `child_process.spawn`]: https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
[child_process.spawnSync]: https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options
[spawn-sync]: https://www.npmjs.com/package/spawn-sync
