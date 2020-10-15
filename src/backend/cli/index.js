'use strict';

const help = require('./commands/help');
const version = require('./commands/version');
const generate = require('./commands/generate');
const server = require('./commands/server');
const filldb = require('./commands/filldb');

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
