'use strict';

const {Cli} = require(`./cli`);
const {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCode
} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [command, amount] = userArguments;

if (userArguments.length === 0 || !Cli[command]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[command].run(amount);
