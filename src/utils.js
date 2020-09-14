'use strict';

const chalk = require(`chalk`);
const {Message, TextRestriction} = require(`./constants`);

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

const generateErrors = (article) => {
  const errors = [];

  if (article.announce.length < TextRestriction.shortMin || article.announce.length > TextRestriction.shortMax) {
    errors.push(`Введите корректный текст анонса`);
  }

  if (article.title.length < TextRestriction.shortMin || article.title.length > TextRestriction.shortMax) {
    errors.push(`Введите корректный текст заголовка`);
  }

  if (article.fullText.length > TextRestriction.longMax) {
    errors.push(`Введите корректный текст статьи`);
  }

  if (!article.category.length) {
    errors.push(`Выберите категорию`);
  }

  return errors;
};

const getErrorTemplate = ({message}) => message === Message.serverError ? `errors/500` : `errors/400`;

module.exports = {
  getRandomInt,
  getArticleDate,
  getErrorTemplate,
  generateErrors,
  sortByField,
  shuffle,
  logger
};
