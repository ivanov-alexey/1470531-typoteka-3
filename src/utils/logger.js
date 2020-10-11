'use strict';

const chalk = require(`chalk`);

module.exports.logger = {
  info: (message) => console.info(chalk.blue(message)),
  data: (message) => console.info(chalk.gray(message)),
  success: (message) => console.info(chalk.green(message)),
  error: (message) => console.error(chalk.red(message)),
};
