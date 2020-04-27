'use strict';

const fs = require(`fs`);
const {
  FILE_NAME,
  TITLES,
  TEXTS,
  CATEGORIES,
  postsAmount,
  Messages
} = require(`../../constants`);
const {getRandomInt, shuffle} = require(`../../utils`);

const getCategories = () => [...new Set(
    Array(getRandomInt(0, CATEGORIES.length - 1)).fill({}).map(
        () => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]
    )
)];

const getDate = () => {
  const currentDate = new Date();
  const currentMonth = new Date().getMonth();

  const date = new Date(
      currentDate.getFullYear(),
      getRandomInt(currentMonth, currentMonth - 3),
      currentDate.getDay(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds()
  );

  return `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  // "2019-12-01 14:45:00";
};

const getOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: getDate(),
    announce: shuffle(TEXTS).slice(0, 5).join(` `),
    fullText: shuffle(TEXTS).slice(0, getRandomInt(1, TEXTS.length - 1)).join(` `),
    category: getCategories()
  }))
);

const generateOffers = (count) => {
  let content;

  if (!count || typeof count !== `number`) {
    content = JSON.stringify(getOffers(postsAmount.min));
  }

  const countOffers = Number.parseInt(count, 10);

  if (countOffers > postsAmount.max) {
    return console.info(Messages.postsQuotaExceed);
  }

  if (countOffers) {
    content = JSON.stringify(getOffers(Number.parseInt(count, 10)));
  }

  console.log(`content`, content);

  return fs.writeFile(FILE_NAME, content, (err) => {
    if (err) {
      return console.error(`Can't write data to file...`);
    }

    return console.info(`Operation success. File created.`);
  });
};

module.exports = {
  name: `--generate`,
  run(args) {
    generateOffers(args);
  }
};
