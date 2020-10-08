'use strict';

const chalk = require(`chalk`);
const DateTime = require(`luxon`).DateTime;
const {Message, HttpCode, TextRestriction, TimeConfig} = require(`./constants`);

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

const getDate = () => DateTime.fromObject({
  year: getRandomInt(TimeConfig.minYear, TimeConfig.maxYear),
  month: getRandomInt(TimeConfig.minMonth, TimeConfig.maxMonth),
  day: getRandomInt(TimeConfig.minDay, TimeConfig.maxDay),
  hour: getRandomInt(TimeConfig.minHour, TimeConfig.maxHour),
  minute: getRandomInt(TimeConfig.minMinute, TimeConfig.maxMinute),
  second: getRandomInt(TimeConfig.minSecond, TimeConfig.maxSecond)
}).toISO();

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

const getErrorMessage = (error) => {
  if (error.response && error.response.status !== HttpCode.NOT_FOUND) {
    throw new Error(Message.serverError);
  }

  throw new Error(Message.connectionError);
};

const getErrorTemplate = ({message}) => message === Message.serverError ? `errors/500` : `errors/400`;

module.exports = {
  getRandomInt,
  getDate,
  getErrorTemplate,
  getErrorMessage,
  generateErrors,
  sortByField,
  shuffle,
  logger
};
