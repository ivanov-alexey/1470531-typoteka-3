'use strict';

const {HttpCode} = require(`../../constants`);

const idValidator = (req, res, next) => {
  const {id} = req.params;
  const parsedId = parseInt(id, 10);

  if (!id || !Number.isInteger(parsedId)) {
    res.status(HttpCode.NOT_FOUND).json({
      message: `Id is incorrect`,
      data: req.body,
    });

    return;
  }

  next();
};

module.exports = idValidator;
