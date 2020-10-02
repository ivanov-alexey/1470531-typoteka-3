'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    try {
      const categories = await service.findAll();

      return res
        .status(HttpCode.OK)
        .json(categories);
    } catch (err) {
      res.status(HttpCode.BAD_REQUEST); // TODO: уточнить
      return console.error(err);
    }
  });
};
