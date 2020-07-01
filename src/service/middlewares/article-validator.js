'use strict';

const {HttpCode} = require(`../../constants`);

const articleKeys = [`category`, `announce`, `fullText`, `title`];

module.exports = (req, res, next) => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const keysExists = articleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
