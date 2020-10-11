'use strict';

const {ExitCode} = require(`../../constants`);
const {logger} = require(`src/utils/logger`);

const packageJsonFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    logger.info(packageJsonFile.version);

    return ExitCode.success;
  }
};
