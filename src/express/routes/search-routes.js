'use strict';

const {Router} = require(`express`);
const ArticleService = require(`../data-service/article-service`);

const searchRoutes = new Router();

searchRoutes.get(`/`, async (req, res) => {
  const articles = await ArticleService.getSearchResults(req.originalUrl);
  const {query = ``} = req.query;

  res.render(`search`, {
    articles,
    query
  });
});

module.exports = searchRoutes;
