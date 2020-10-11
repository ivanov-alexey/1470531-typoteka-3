'use strict';

require(`dotenv`).config();

module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  logLevel: process.env.LOG_LEVEL,
};
