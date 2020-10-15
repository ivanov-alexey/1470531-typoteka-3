'use strict';

const {HttpCode, TextRestriction} = require('../../constants');

const articleKeys = [
  `category`,
  `announce`,
  `full_text`,
  `title`,
  `picture`,
  `publication_date`,
  `publication_date`,
  `publication_date`,
];

module.exports = (req, res, next) => {
  const article = req.body;
  const keys = Object.keys(article);
  const keysExists = articleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST).send(`Field not exist`);
  }

  if (article.title && article.title.length < TextRestriction.shortMin) {
    res.status(HttpCode.BAD_REQUEST).send(`Title too short`);
  }

  if (article.title && article.title.length > TextRestriction.shortMax) {
    res.status(HttpCode.BAD_REQUEST).send(`Title too long`);
  }

  if (article.announce && article.announce.length < TextRestriction.shortMin) {
    res.status(HttpCode.BAD_REQUEST).send(`Announce too short`);
  }

  if (article.announce && article.announce.length > TextRestriction.shortMax) {
    res.status(HttpCode.BAD_REQUEST).send(`Announce too long`);
  }

  if (article.category && !article.category.length) {
    res.status(HttpCode.BAD_REQUEST).send(`Category is empty`);
  }

  if (article.fullText && article.fullText.length > TextRestriction.longMax) {
    res.status(HttpCode.BAD_REQUEST).send(`Publication is too long`);
  }

  if (!article.publication_date) {
    res.status(HttpCode.BAD_REQUEST).send(`publication_date is required`);
  }

  next();
};
