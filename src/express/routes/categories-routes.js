'use strict';

const {Router} = require(`express`);
const ArticleService = require(`../data-service/article-service`);

const categoriesRoutes = new Router();

categoriesRoutes.get(`/`, async (req, res) => {
  const categories = await ArticleService.getCategories();

  res.render(`my/all-categories`, {
    categories
  });
});

module.exports = categoriesRoutes;
