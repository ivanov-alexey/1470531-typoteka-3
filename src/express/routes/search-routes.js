'use strict';

const {Router} = require(`express`);
const ArticleService = require(`../data-service/article-service`);
const {getErrorTemplate} = require(`../../utils`);

const searchRoutes = new Router();

searchRoutes.get(`/`, async (req, res) => {
  try {
    const articles = await ArticleService.getSearchResults(req.originalUrl);
    const {query = ``} = req.query;

    res.render(`search`, {
      articles,
      query
    });
  } catch (err) {
    console.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = searchRoutes;
