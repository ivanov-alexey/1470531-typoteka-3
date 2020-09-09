'use strict';

const {Router} = require(`express`);
const ArticleService = require(`../data-service/article-service`);
const {sortByField} = require(`../../utils`);

const mainRoute = new Router();

mainRoute.get(`/`, async (req, res) => {
  const allArticles = await ArticleService.getAllArticles();
  const categories = await ArticleService.getCategoriesWithArticlesCounter();
  const popularArticles = await ArticleService.getMostDiscussed();
  const allComments = await ArticleService.getComments();
  const lastComments = sortByField(allComments, `date`).slice(0, 4);
  const articles = allArticles.slice(0, 8);

  res.render(`main`, {
    articles,
    categories,
    popularArticles,
    lastComments
  });
});

module.exports = mainRoute;
