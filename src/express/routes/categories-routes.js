'use strict';

const {Router} = require(`express`);
const CategoryService = require(`../data-service/category-service`);
const {getErrorTemplate} = require(`../../utils`);
const {getLogger} = require(`../../service/lib/logger`);

const logger = getLogger();

const categoriesRoutes = new Router();

categoriesRoutes.get(`/`, async (req, res) => {
  try {
    const categories = await CategoryService.getAll();

    res.render(`categories`, {
      categories
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = categoriesRoutes;
