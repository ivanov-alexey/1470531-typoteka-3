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

const getArticleDate = () => {
  const currentDate = new Date().valueOf();
  const threeMonthsAgo = new Date().setMonth(new Date().getMonth() - 2).valueOf();
  const randomDate = new Date(getRandomInt(currentDate, threeMonthsAgo));

  const year = randomDate.getFullYear();
  const month = randomDate.getMonth();
  const day = randomDate.getDate();
  const hours = randomDate.getHours();
  const minutes = randomDate.getMinutes();

  return {
    date: `${year}.${month}.${day}, ${hours}:${minutes}`,
    dateTime: `${year}-${month}-${day}T${hours}:${minutes}`
  };
};

const logger = {
  info: (message) => console.info(chalk.blue(message)),
  data: (message) => console.info(chalk.gray(message)),
  success: (message) => console.info(chalk.green(message)),
  error: (message) => console.error(chalk.red(message)),
};

module.exports = {
  getRandomInt,
  getArticleDate,
  shuffle,
  logger
};
