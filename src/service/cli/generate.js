'use strict';

const fs = require(`fs`);
const chalk = require(`chalk`);
const {
  FILE_NAME,
  TITLES,
  TEXTS,
  CATEGORIES,
  postsAmount,
  Messages,
  ExitCode
} = require(`../../constants`);
const {getRandomInt, shuffle} = require(`../../utils`);

const getCategories = () => [...new Set(
    Array(getRandomInt(0, CATEGORIES.length - 1)).fill({}).map(
        () => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]
    )
)];

const getDate = () => {
  const currentDate = new Date().valueOf();
  const threeMonthsAgo = new Date().setMonth(new Date().getMonth() - 2).valueOf();
  const randomDate = new Date(getRandomInt(currentDate, threeMonthsAgo));

  const year = randomDate.getFullYear();
  const month = randomDate.getMonth();
  const day = randomDate.getDate();
  const hours = randomDate.getHours();
  const minutes = randomDate.getMinutes();
  const seconds = randomDate.getSeconds();

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
    console.info(chalk.red(Messages.postsQuotaExceed));

    return process.exit(ExitCode.error);
  }

  if (countOffers) {
    content = JSON.stringify(getOffers(Number.parseInt(count, 10)));
  }

  return fs.writeFile(`../../${FILE_NAME}`, content, (err) => {
    if (err) {
      console.error(chalk.red(`Can't write data to file...`, err));

      return process.exit(ExitCode.error);
    }

    console.info(chalk.green(`Operation success. File created.`));

    return process.exit(ExitCode.success);
  });
};

module.exports = {
  name: `--generate`,
  run(args) {
    generateOffers(args);
  }
};
