'use strict';

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const postsAmount = {
  min: 1,
  max: 1000
};

const USER_ARGV_INDEX = 2;

const DEFAULT_COMMAND = `--help`;

const ExitCode = {
  success: 0,
  error: 1
};

const Messages = {
  postsQuotaExceed: `Не больше 1000 публикаций`,
  fileCreationSuccess: `Operation success. File created.`,
};

module.exports = {
  DEFAULT_COUNT,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  postsAmount,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCode,
  Messages
};

