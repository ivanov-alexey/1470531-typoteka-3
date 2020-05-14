'use strict';

const {ExitCode} = require(`../../constants`);
const {logger} = require(`../../utils`);

const message = `
Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    server <command>

    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json
`;

module.exports = {
  name: `--help`,
  run() {
    logger.data(message);

    return ExitCode.success;
  }
};
