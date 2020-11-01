'use strict';

module.exports.sortByField = (articles, field) =>
  articles.sort((prev, next) => next[field] - prev[field]);
