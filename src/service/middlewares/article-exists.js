'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {id} = req.params;
  const article = service.findOne(id);

  if (!article) {
    return res
      .status(HttpCode.NOT_FOUND)
      .send(`Article with id = ${id} not found`);
  }

  res.locals.article = article;

  return next();
};
