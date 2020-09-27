'use strict';

const express = require(`express`);
const {
  API_PREFIX,
  DEFAULT_API_PORT,
  HttpCode,
  Message
} = require(`../../constants`);
const createApi = require(`../api`);
const getMockData = require(`../lib/get-mock-data`);
const {getLogger} = require(`../lib/logger`);
const {connectToDb} = require(`../db/connect`);

const logger = getLogger();

const createApp = async (data) => {
  const app = express();
  const apiRoutes = await createApi(data);

  app.use((req, res, next) => {
    logger.debug(`Requested url: ${req.url}`);

    res.on(`finish`, () => {
      logger.info(`Response status code: ${res.statusCode}`);
    });

    next();
  });

  app.use(express.json());
  app.use(API_PREFIX, apiRoutes);

  app.use((req, res) => {
    logger.error(`Not found url: ${req.url}`);

    return res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found`);
  });

  return app;
};

const run = async (args) => {
  const port = Number.parseInt(args, 10) || DEFAULT_API_PORT;
  const mockData = await getMockData();
  const app = await createApp(mockData);

  try {
    app.listen(DEFAULT_API_PORT, (err) => {
      if (err) {
        logger.error(Message.serverStartError(port, err));
      }

      logger.info(Message.listenOnPort(port));
    });

    connectToDb();
  } catch (err) {
    logger.error(Message.serverStartError(port, err));
  }
};

module.exports = {
  name: `--server`,
  run,
  createApp
};
