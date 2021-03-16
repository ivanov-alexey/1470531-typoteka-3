'use strict';

const {HttpCode} = require(`../../constants`);

const emptyFile = (req, res, next) => {
  const {picture} = req.body;

  if (!picture) {
    res.status(HttpCode.BAD_REQUEST).json({
      message: [`Image must have jpg or png format`],
      data: req.body,
    });

    return;
  }

  next();
};

module.exports = emptyFile;
