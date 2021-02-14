'use strict';

const {Cli} = require(`./cli`);
const {USER_ARGV_INDEX, DEFAULT_COMMAND} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [command, value] = userArguments;

if (userArguments.length === 0 || !Cli[command]) {
  const code = Cli[DEFAULT_COMMAND].run();
  process.exit(code);
}

const main = async () => {
  if (command !== `--server`) {
    const code = await Cli[command].run(value);

    process.exit(code);
  }

  await Cli[command].run(value);
};

main();
