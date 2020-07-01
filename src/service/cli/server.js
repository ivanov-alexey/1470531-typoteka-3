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
const {logger} = require(`../../utils`);

const createApp = async (data) => {
  const app = express();
  const apiRoutes = await createApi(data);

  app.use(express.json());
  app.use(API_PREFIX, apiRoutes);

  app.use((req, res) => res
    .status(HttpCode.NOT_FOUND)
    .send(`Not found`));

  return app;
};

const run = async (args) => {
  const port = Number.parseInt(args, 10) || DEFAULT_API_PORT;
  const mockData = await getMockData();
  const app = await createApp(mockData);

  try {
    app.listen(DEFAULT_API_PORT, (err) => {
      if (err) {
        return logger.error(err);
      }

      return logger.success(Message.listenOnPort(port));
    });
  } catch (err) {
    logger.error(err);
  }
};

module.exports = {
  name: `--server`,
  run,
  createApp
};
