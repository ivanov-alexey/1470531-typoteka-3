'use strict';

const {Router} = require(`express`);
const SearchService = require(`../data-service/search-service`);
const {getErrorTemplate} = require(`../../utils/get-error-template`);
const {getLogger} = require(`../../libs/logger`);

const logger = getLogger();

const searchRoutes = new Router();

searchRoutes.get(`/`, async (req, res) => {
  try {
    const {query = ``} = req.query;

    if (query) {
      const articles = await SearchService.getResults(req.originalUrl);

      res.render(`search`, {
        articles,
        query,
      });

      return;
    }

    res.render(`search`, {
      articles: [],
      query,
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = searchRoutes;
