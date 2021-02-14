'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {id} = req.params;
  const article = service.findOne(id);

  if (!article) {
    res.status(HttpCode.NOT_FOUND).send(`Article with id = ${id} not found`);
  }

  res.locals.article = article;

  next();
};
