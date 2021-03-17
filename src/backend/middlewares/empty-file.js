'use strict';

const {HttpCode} = require(`../../constants`);

const emptyFile = (req, res, next) => {
  const {picture} = req.body;

  if (!picture) {
    res.status(HttpCode.BAD_REQUEST).json({
      message: [`Image should be in jpg or png format`],
      data: req.body,
    });

    return;
  }

  next();
};

module.exports = emptyFile;
