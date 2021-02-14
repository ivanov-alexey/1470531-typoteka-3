'use strict';

const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);
const {
  avatarSettings,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  FILE_NAMES_PATH,
  FILE_SURNAMES_PATH,
  postsAmount,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  MAX_CATEGORIES,
  Message,
  TimeInMilliseconds,
  ExitCode,
} = require(`../../../constants`);
const {getDate} = require(`../../../utils/get-date`);
const {shuffle} = require(`../../../utils/shuffle`);
const {getRandomInt} = require(`../../../utils/get-random-int`);
const {getLogger} = require(`../../../libs/logger`);

const logger = getLogger();

const getCategories = (data) => [
  ...new Set(
      Array(getRandomInt(0, MAX_CATEGORIES))
      .fill({})
      .map(() => data[getRandomInt(0, data.length - 1)])
  ),
];

const generateComments = (count, comments, names, surnames) =>
  Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      text: shuffle(comments).slice(0, getRandomInt(1, comments.length)).join(` `),
      author: `${names[getRandomInt(0, names.length - 1)]} ${
        surnames[getRandomInt(0, surnames.length - 1)]
      }`,
      avatar: `avatar-${getRandomInt(avatarSettings.min, avatarSettings.max)}.png`,
      date: getRandomInt(Date.now() - TimeInMilliseconds.year, Date.now()),
    }));

const readContent = async (path) => {
  try {
    const content = await fs.readFile(path, `utf-8`);

    return content.trim().split(`\n`);
  } catch (err) {
    logger.error(err);

    return [];
  }
};

const getArticles = (count, titles, sentences, categories, comments, names, surnames) => {
  const amount = !count || Number.isNaN(+count) ? postsAmount.min : Number.parseInt(count, 10);

  if (amount > postsAmount.max) {
    throw new Error(Message.postsQuotaExceed);
  }

  return JSON.stringify(
      Array(amount)
      .fill({})
      .map(() => ({
        id: nanoid(MAX_ID_LENGTH),
        title: titles[getRandomInt(0, titles.length - 1)],
        createdDate: getDate(),
        createdDateTime: getDate(),
        announce: shuffle(sentences).slice(0, 5).join(` `),
        fullText: shuffle(sentences)
          .slice(0, getRandomInt(1, sentences.length - 1))
          .join(` `),
        category: getCategories(categories),
        comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments, names, surnames),
      }))
  );
};

module.exports = {
  name: `--generate`,
  async run(count) {
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);
    const names = await readContent(FILE_NAMES_PATH);
    const surnames = await readContent(FILE_SURNAMES_PATH);

    const content = getArticles(count, titles, sentences, categories, comments, names, surnames);

    try {
      await fs.writeFile(FILE_NAME, content);
      logger.success(Message.fileCreationSuccess);

      return ExitCode.success;
    } catch (err) {
      logger.error(err);

      return ExitCode.error;
    }
  },
};
