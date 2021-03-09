'use strict';

const {consoleLogger} = require(`../../../utils/console-logger`);
const {ExitCode} = require(`../../../constants`);

const packageJsonFile = require(`../../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    consoleLogger.info(packageJsonFile.version);

    return ExitCode.success;
  },
};
