'use strict';

const {HttpCode, TextRestriction} = require(`../../constants`);

const commentKeys = [`text`];

module.exports = (req, res, next) => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const keysExists = commentKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res
      .status(HttpCode.BAD_REQUEST)
      .send(`Text not exist`);
  }

  if (comment.text && comment.text.length < TextRestriction.commentMin) {
    res
      .status(HttpCode.BAD_REQUEST)
      .send(`Comment too short`);
  }

  next();
};
