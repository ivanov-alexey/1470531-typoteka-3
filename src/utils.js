'use strict';

const chalk = require(`chalk`);

const getRandomInt = (min = 0, max = 1) => {
  const rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getFirstZeroIfNeed = (number) => number < 10 ? `0${number}` : number;

const getArticleDate = (dateTime = false) => {
  const currentDate = new Date().valueOf();
  const threeMonthsAgo = new Date().setMonth(new Date().getMonth() - 2).valueOf();
  const randomDate = new Date(getRandomInt(currentDate, threeMonthsAgo));

  const year = randomDate.getFullYear();
  const month = randomDate.getMonth();
  const day = randomDate.getDate();
  const hours = randomDate.getHours();
  const minutes = randomDate.getMinutes();

  return dateTime
    ? `${year}-${getFirstZeroIfNeed(month)}-${getFirstZeroIfNeed(day)}T${getFirstZeroIfNeed(hours)}:${getFirstZeroIfNeed(minutes)}`
    : `${year}.${getFirstZeroIfNeed(month)}.${getFirstZeroIfNeed(day)}, ${getFirstZeroIfNeed(hours)}:${getFirstZeroIfNeed(minutes)}`;
};

const sortByField = (articles, field) => articles.sort((prev, next) => next[field] - prev[field]);

const logger = {
  info: (message) => console.info(chalk.blue(message)),
  data: (message) => console.info(chalk.gray(message)),
  success: (message) => console.info(chalk.green(message)),
  error: (message) => console.error(chalk.red(message)),
};

module.exports = {
  getRandomInt,
  getArticleDate,
  sortByField,
  shuffle,
  logger
};
