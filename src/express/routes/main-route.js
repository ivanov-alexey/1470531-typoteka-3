'use strict';

const {Router} = require(`express`);
const ArticleService = require(`../data-service/article-service`);

const mainRoute = new Router();

mainRoute.get(`/`, async (req, res) => {
  const allArticles = await ArticleService.getAllArticles();
  const categories = await ArticleService.getCategoriesWithArticlesCounter();
  const popularArticles = await ArticleService.getMostDiscussed();
  const lastComments = await ArticleService.getLastComments();
  const articles = allArticles.slice(0, 8);

  res.render(`main`, {
    articles,
    categories,
    popularArticles,
    lastComments
  });
});

module.exports = mainRoute;
