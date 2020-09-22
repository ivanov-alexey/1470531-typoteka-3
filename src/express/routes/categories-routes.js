'use strict';

const {Router} = require(`express`);
const ArticleService = require(`../data-service/article-service`);
const {getErrorTemplate} = require(`../../utils`);

const categoriesRoutes = new Router();

categoriesRoutes.get(`/`, async (req, res) => {
  try {
    const categories = await ArticleService.getCategories();

    res.render(`my/all-categories`, {
      categories
    });
  } catch (err) {
    console.error(err);
    res.render(getErrorTemplate(err));
  }

});

module.exports = categoriesRoutes;
