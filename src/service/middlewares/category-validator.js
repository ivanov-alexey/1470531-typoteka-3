'use strict';

const {HttpCode, TextRestriction} = require(`../../constants`);

const categoryKeys = [`title`];

module.exports = (req, res, next) => {
  const category = req.body;
  const keys = Object.keys(category);
  const keysExists = categoryKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .send(`Title not exist`);
  }

  if (category.title && category.title.length < TextRestriction.categoryMin) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .send(`Title too short`);
  }

  if (category.title && category.title.length > TextRestriction.categoryMax) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .send(`Title too long`);
  }

  return next();
};