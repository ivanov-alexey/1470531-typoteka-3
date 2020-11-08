'use strict';

const express = require('express');
const helmet = require('helmet');
const expressSession = require('express-session');
const createApi = require('../../api/index');
const {connectToDb, sessionStore} = require('../../../configs/db-config');
const {API_PREFIX, HttpCode, DEFAULT_API_PORT, Message} = require('../../../constants');
const {getLogger} = require('../../../libs/logger');
const {secret} = require('../../../configs/env-config');

const logger = getLogger();

const createApp = async () => {
  const app = express();
  const apiRoutes = await createApi();

  app.set(`json spaces`, 2);

  app.use(helmet());

  app.use(
    expressSession({
      secret,
      resave: false,
      store: sessionStore,
      proxy: true,
      saveUninitialized: false,
    })
  );

  sessionStore.sync();

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

    res.status(HttpCode.NOT_FOUND).send(`Not found`);
  });

  return app;
};

const run = async (args) => {
  const port = Number.parseInt(args, 10) || DEFAULT_API_PORT;
  const app = await createApp();

  try {
    app.listen(DEFAULT_API_PORT, (err) => {
      if (err) {
        logger.error(Message.serverStartError(port, err));
      }

      logger.info(Message.listenOnPort(port));
    });

    await connectToDb();
  } catch (err) {
    logger.error(Message.serverStartError(port, err));
  }
};

module.exports = {
  name: `--server`,
  run,
  createApp,
};
