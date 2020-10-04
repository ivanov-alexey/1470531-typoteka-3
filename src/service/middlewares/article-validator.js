'use strict';

const {HttpCode, TextRestriction} = require(`../../constants`);

const articleKeys = [`category`, `announce`, `fullText`, `title`];

module.exports = (req, res, next) => {
  const article = req.body;
  const keys = Object.keys(article);
  const keysExists = articleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res
      .status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  if (article.title && article.title.length < TextRestriction.shortMin) {
    res
      .status(HttpCode.BAD_REQUEST)
      .send(`Title too short`);
  }

  if (article.title && article.title.length < TextRestriction.shortMax) {
    res
      .status(HttpCode.BAD_REQUEST)
      .send(`Title too long`);
  }

  if (article.announce && article.announce.length < TextRestriction.shortMin) {
    res
      .status(HttpCode.BAD_REQUEST)
      .send(`Announce too short`);
  }

  if (article.announce && article.announce.length < TextRestriction.shortMax) {
    res
      .status(HttpCode.BAD_REQUEST)
      .send(`Announce too long`);
  }

  if (article.category && !article.category.length) {
    res
      .status(HttpCode.BAD_REQUEST)
      .send(`Category is empty`);
  }

  if (article.fullText && article.fullText.length > TextRestriction.longMax) {
    res
      .status(HttpCode.BAD_REQUEST)
      .send(`Publication is too long`);
  }

  next();
};
