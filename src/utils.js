'use strict';

const chalk = require(`chalk`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const logger = {
  info: (message) => console.info(chalk.blue(message)),
  data: (message) => console.info(chalk.gray(message)),
  success: (message) => console.info(chalk.green(message)),
  error: (message) => console.error(chalk.red(message)),
};

module.exports = {
  getRandomInt,
  shuffle,
  logger
};