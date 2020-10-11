'use strict';

const fs = require(`fs`).promises;
const {FILE_NAME} = require(`src/constants`);
const {getLogger} = require(`src/lib/logger`);

const logger = getLogger();

let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME);

    data = JSON.parse(fileContent);
  } catch (err) {
    logger.error(err);

    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

module.exports = getMockData;
