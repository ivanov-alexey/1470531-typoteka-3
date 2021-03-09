'use strict';

const bcrypt = require(`bcrypt`);
const {userPassword} = require(`../../../configs/env-config`);
const {PASSWORD_SALT_ROUNDS} = require(`../../../constants`);
const fs = require(`fs`).promises;
const {
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  FILE_NAMES_PATH,
  FILE_SURNAMES_PATH,
  postsAmount,
  MIN_CATEGORIES,
  MAX_CATEGORIES,
  MIN_USERS,
  MAX_USERS,
  Message,
  ExitCode,
} = require(`../../../constants`);
const {getDate} = require(`../../../utils/get-date`);
const {shuffle} = require(`../../../utils/shuffle`);
const {getRandomInt} = require(`../../../utils/get-random-int`);
const {
  initDb,
  sequelize,
  db: {Article, Category, Comment, User},
} = require(`../../../configs/db-config`);
const {getLogger} = require(`../../../libs/logger`);

const env = process.env.NODE_ENV || `development`;

const logger = getLogger();

const readContent = async (path) => {
  try {
    const content = await fs.readFile(path, `utf-8`);

    return content.trim().split(`\n`);
  } catch (err) {
    logger.error(err);

    return [];
  }
};

const normalizeCount = (count) => {
  const amount = !count || Number.isNaN(+count) ? postsAmount.min : Number.parseInt(count, 10);

  if (amount > postsAmount.max) {
    throw new Error(Message.postsQuotaExceed);
  }

  return amount;
};

const getCategories = (amount, data) => [
  ...new Set(
      Array(amount)
      .fill({})
      .map(() => ({
        title: data[getRandomInt(0, data.length - 1)],
      }))
  ),
];

const getUsers = (amount, firstNames, lastNames, hash) =>
  Array(amount)
    .fill({})
    .map((item, index) => {
      const id = index + 1;

      return {
        'avatar': `avatar-${id}.png`,
        'email': `user${id}@mail.io`,
        'firstname': firstNames[getRandomInt(0, firstNames.length - 1)],
        'lastname': lastNames[getRandomInt(0, lastNames.length - 1)],
        'password': hash,
        'role': id === 1 ? `admin` : `reader`,
      };
    });

const getComments = (amount, text, numberOfArticles, numberOfUsers) =>
  Array(amount)
    .fill({})
    .map(() => ({
      'text': shuffle(text).slice(0, getRandomInt(1, text.length)).join(` `),
      'article_id': getRandomInt(1, numberOfArticles),
      'user_id': getRandomInt(1, numberOfUsers),
    }));

const getArticles = (amount, sentences, titles, numberOfUsers) =>
  Array(amount)
    .fill({})
    .map(() => ({
      'announce': shuffle(sentences).slice(0, 5).join(` `),
      'fullText': shuffle(sentences)
        .slice(0, getRandomInt(1, sentences.length - 1))
        .join(` `),
      'picture': null,
      'title': titles[getRandomInt(0, titles.length - 1)],
      'publicationDate': getDate(),
      'user_id': getRandomInt(1, numberOfUsers),
    }));

const run = async (count) => {
  try {
    const numberOfCategories = getRandomInt(MIN_CATEGORIES, MAX_CATEGORIES);
    const numberOfUsers = getRandomInt(MIN_USERS, MAX_USERS);
    const numberOfArticles = normalizeCount(count);
    const numberOfComments = numberOfArticles * 4;

    const titlesData = await readContent(FILE_TITLES_PATH);
    const categoriesData = await readContent(FILE_CATEGORIES_PATH);
    const sentencesData = await readContent(FILE_SENTENCES_PATH);
    const commentsData = await readContent(FILE_COMMENTS_PATH);
    const firstNamesData = await readContent(FILE_NAMES_PATH);
    const lastNamesData = await readContent(FILE_SURNAMES_PATH);

    const hash = await bcrypt.hash(userPassword, PASSWORD_SALT_ROUNDS);

    const categories = getCategories(numberOfCategories, categoriesData);
    const users = getUsers(numberOfUsers, firstNamesData, lastNamesData, hash);
    const articles = getArticles(numberOfArticles, sentencesData, titlesData, numberOfUsers);
    const comments = getComments(numberOfComments, commentsData, numberOfArticles, numberOfUsers);

    await initDb();

    await User.bulkCreate(users);
    await Article.bulkCreate(articles);
    await Comment.bulkCreate(comments);
    await Category.bulkCreate(categories);

    const allArticles = await Article.findAll();
    const allCategories = await Category.findAll();

    for (const article of allArticles) {
      const randomCategory = allCategories[getRandomInt(0, allCategories.length)];

      await article.addCategory(randomCategory);
    }

    if (env === `development`) {
      await sequelize.close();
    }

    logger.info(`Database filled successfully`);

    return ExitCode.success;
  } catch (err) {
    logger.error(err);

    return ExitCode.error;
  }
};

module.exports = {
  name: `--filldb`,
  run,
};
