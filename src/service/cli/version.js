'use strict';

const chalk = require(`chalk`);
const {ExitCode} = require(`../../constants`);

const packageJsonFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    console.info(chalk.blue(packageJsonFile.version));

    return ExitCode.success;
  }
};
