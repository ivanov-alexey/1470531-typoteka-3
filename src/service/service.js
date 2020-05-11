'use strict';

const {Cli} = require(`./cli`);
const {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND
} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [command, amount] = userArguments;

if (userArguments.length === 0 || !Cli[command]) {
  const code = Cli[DEFAULT_COMMAND].run();
  process.exit(code);
}

const main = async () => {
  const code = await Cli[command].run(amount);
  process.exit(code);
};

main();
