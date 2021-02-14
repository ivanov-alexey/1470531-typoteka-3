'use strict';

require(`dotenv`).config();

module.exports = {
  development: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: `postgres`,
    // logging: true,
  },
  test: {
    host: process.env.DB_TEST_HOST,
    port: process.env.DB_TEST_PORT,
    database: process.env.DB_TEST_NAME,
    user: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASSWORD,
    dialect: `postgres`,
    logging: false,
  },
};
