'use strict';

require(`dotenv`).config();

module.exports = {
  logLevel: process.env.LOG_LEVEL,
  userPassword: process.env.DEFAULT_USER_PASSWORD,
  secret: process.env.SECRET,
};
