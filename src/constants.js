'use strict';

const API_PREFIX = `/api`;

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;
const FILE_NAMES_PATH = `./data/names.txt`;
const FILE_SURNAMES_PATH = `./data/surnames.txt`;

const PUBLIC_DIR = `public`;
const TEMPLATES_DIR = `templates`;

const MAX_ID_LENGTH = 6;

const MIN_CATEGORIES = 3;
const MAX_CATEGORIES = 6;
const MIN_USERS = 2;
const MAX_USERS = 10;
const MAX_COMMENTS = 5;

const postsAmount = {
  min: 1,
  max: 1000
};

const TimeConfig = {
  minYear: 2018,
  maxYear: 2020,
  minMonth: 1,
  maxMonth: 12,
  minDay: 1,
  maxDay: 30,
  minHour: 0,
  maxHour: 23,
  minMinute: 0,
  maxMinute: 59,
  minSecond: 0,
  maxSecond: 59
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
  listenOnPort: (port) => `Listening for connections on http://localhost:${port}`,
  serverStartError: (port, error) => `Server can't start on http://localhost:${port} with error: ${error}`,
  serverError: `Server error`,
  connectionError: `Connection error`
};

const TimeInMilliseconds = {
  second: 1000,
  minute: 1000 * 60,
  year: 31556952000
};

const avatarSettings = {
  min: 1,
  max: 5,
};

const DEFAULT_API_PORT = 3000;
const API_URL = `http://localhost:3000/api`;

const DEFAULT_FRONT_PORT = 8080;

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const TextRestriction = {
  commentMin: 20,
  categoryMin: 5,
  categoryMax: 30,
  shortMin: 30,
  shortMax: 250,
  longMax: 1000
};

module.exports = {
  API_PREFIX,
  API_URL,
  avatarSettings,
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
  FILE_NAMES_PATH,
  FILE_SURNAMES_PATH,
  PUBLIC_DIR,
  TEMPLATES_DIR,
  TextRestriction,
  TimeInMilliseconds,
  TimeConfig,
  HttpCode,
  MIN_CATEGORIES,
  MAX_CATEGORIES,
  MIN_USERS,
  MAX_USERS,
  MAX_COMMENTS,
  MAX_ID_LENGTH,
  Message,
  postsAmount,
  USER_ARGV_INDEX
};

