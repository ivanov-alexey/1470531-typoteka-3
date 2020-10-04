'use strict';

const {HttpCode} = require(`../../constants`);

const categoryKeys = [`title`];

module.exports = (req, res, next) => {
  const category = req.body;
  const keys = Object.keys(category);
  const keysExists = categoryKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Title not exist`);
  }

  if (category.title && category.title.length < 5) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Title too short`);
  }

  if (category.title && category.title.length > 30) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Title too long`);
  }

  next();
};
