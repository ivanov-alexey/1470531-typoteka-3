'use strict';

require(`dotenv`).config();
const {Sequelize} = require(`sequelize`);
const {host, user, database, password, port} = require(`../config`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger();

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: `postgres`,
});

const connectToDb = async () => {
  try {
    logger.info(`Connecting to database "${database}" on ${host}:${port}`);

    await sequelize.authenticate();

    return logger.info(`Connection to database "${database}" successfully established`);
  } catch (err) {
    logger.error(`Failed to establish a connection to the database "${database}" due to:
    ${err}`);

    throw err;
  }
};

module.exports = {
  connectToDb
};
