'use strict';

const help = require(`src/backend/cli/commands/help`);
const version = require(`src/backend/cli/commands/version`);
const generate = require(`src/backend/cli/commands/generate`);
const server = require(`src/backend/cli/commands/server`);
const filldb = require(`src/backend/cli/commands/filldb`);

const Cli = {
  [help.name]: help,
  [version.name]: version,
  [generate.name]: generate,
  [server.name]: server,
  [filldb.name]: filldb,
};

module.exports = {
  Cli
};
