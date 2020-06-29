'use strict';

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const PUBLIC_DIR = `public`;
const TEMPLATES_DIR = `templates`;

const MAX_ID_LENGTH = 6;

const MAX_COMMENTS = 5;

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

const Message = {
  fileCreationSuccess: `Operation success. File created.`,
  notFound: `Sorry, page not found`,
  postsQuotaExceed: `Не больше 1000 публикаций`,
  listenOnPort: (port) => `Listening for connections on http://localhost:${port}`
};

const DEFAULT_API_PORT = 3000;

const DEFAULT_FRONT_PORT = 8080;

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  DEFAULT_COMMAND,
  DEFAULT_COUNT,
  DEFAULT_API_PORT,
  DEFAULT_FRONT_PORT,
  ExitCode,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  PUBLIC_DIR,
  TEMPLATES_DIR,
  HttpCode,
  MAX_COMMENTS,
  MAX_ID_LENGTH,
  Message,
  postsAmount,
  USER_ARGV_INDEX
};

