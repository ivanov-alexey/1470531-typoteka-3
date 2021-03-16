'use strict';

const {Router} = require(`express`);
const SearchService = require(`../data-service/search-service`);
const {getFormattedTime} = require(`../../utils/get-formatted-time`);
const {getErrorTemplate} = require(`../../utils/get-error-template`);
const {getLogger} = require(`../../libs/logger`);

const logger = getLogger();

const searchRoutes = new Router();

searchRoutes.get(`/`, async (req, res) => {
  const {user, isLoggedIn} = req.session;
  const {query = ``} = req.query;

  try {
    if (query) {
      const articles = await SearchService.getResults(req.originalUrl);

      res.render(`search`, {
        user,
        isLoggedIn,
        articles: getFormattedTime(articles, `publicationDate`),
        query,
      });

      return;
    }

    res.render(`search`, {
      user,
      isLoggedIn,
      articles: [],
      query,
    });
  } catch (err) {
    logger.error(err);
    res.redirect(getErrorTemplate(err));
  }
});

module.exports = searchRoutes;
