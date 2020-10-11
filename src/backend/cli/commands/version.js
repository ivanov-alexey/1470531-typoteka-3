'use strict';

const {ExitCode} = require(`src/constants`);
const {consoleLogger} = require(`src/utils/console-logger`);

const packageJsonFile = require(`package.json`);

module.exports = {
  name: `--version`,
  run() {
    consoleLogger.info(packageJsonFile.version);

    return ExitCode.success;
  }
};
