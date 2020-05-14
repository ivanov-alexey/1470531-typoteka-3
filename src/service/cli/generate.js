'use strict';

const fs = require(`fs`).promises;
const {
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  postsAmount,
  Messages,
  ExitCode
} = require(`../../constants`);
const {getRandomInt, shuffle, logger} = require(`../../utils`);

const getCategories = (data) => [...new Set(
    Array(getRandomInt(0, data.length - 1)).fill({}).map(
        () => data[getRandomInt(0, data.length - 1)]
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

const readContent = async (path) => {
  try {
    const content = await fs.readFile(path, `utf-8`);

    return content.trim().split(`\n`);
  } catch (err) {
    logger.error(err);

    return [];
  }
};

const getOffers = (count, titles, sentences, categories) => {
  const amount = !count || Number.isNaN(+count)
    ? postsAmount.min
    : Number.parseInt(count, 10);

  if (amount > postsAmount.max) {
    throw new Error(Messages.postsQuotaExceed);
  }

  return JSON.stringify(
      Array(amount)
        .fill({})
        .map(() => ({
          title: titles[getRandomInt(0, titles.length - 1)],
          createdDate: getDate(),
          announce: shuffle(sentences).slice(0, 5).join(` `),
          fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
          category: getCategories(categories)
        }))
  );
};

module.exports = {
  name: `--generate`,
  async run(count) {
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);

    const content = getOffers(count, titles, sentences, categories);

    try {
      await fs.writeFile(FILE_NAME, content);
      logger.success(Messages.fileCreationSuccess);

      return ExitCode.success;
    } catch (err) {
      logger.error(err);

      return ExitCode.error;
    }
  }
};
