'use strict';

const {ExitCode} = require(`../../constants`);
const {logger} = require(`src/utils/logger`);

const message = `
Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    server <command>

    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json
    --server <port>       запускает сервер на выбранном порту
`;

module.exports = {
  name: `--help`,
  run() {
    logger.data(message);

    return ExitCode.success;
  }
};
