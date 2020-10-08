'use strict';

const {Router} = require(`express`);
const ArticleService = require(`../data-service/article-service`);
const CategoryService = require(`../data-service/category-service`);
const CommentService = require(`../data-service/comment-service`);
const {getErrorTemplate} = require(`../../utils`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger();

const mainRoute = new Router();

mainRoute.get(`/`, async (req, res) => {
  try {
    const allArticles = await ArticleService.getAll();
    const categories = await CategoryService.getAll();
    const popularArticles = await ArticleService.findMostDiscussed();
    const allComments = await CommentService.getAll();
    const lastComments = allComments.slice(0, 4);
    const articles = allArticles.slice(0, 8);

    res.render(`main`, {
      articles,
      categories,
      popularArticles,
      lastComments
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = mainRoute;
