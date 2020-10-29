'use strict';

const {Router} = require('express');
const ArticleService = require('../data-service/article-service');
const CategoryService = require('../data-service/category-service');
const CommentService = require('../data-service/comment-service');
const {MAX_ARTICLES_PER_PAGE} = require('../../constants');
const {getErrorTemplate} = require('../../utils/get-error-template');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

const mainRoute = new Router();

mainRoute.get(`/`, async (req, res) => {
  const {page = 1} = req.query;
  const pageNumber = parseInt(page, 10);
  const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * MAX_ARTICLES_PER_PAGE;

  try {
    const {articles, count} = await ArticleService.getAll(offset, MAX_ARTICLES_PER_PAGE);
    const categories = await CategoryService.getAll();
    const popularArticles = await ArticleService.findMostDiscussed();
    const {comments} = await CommentService.getAll(0, 4);
    const pagesCount = Math.ceil(count / MAX_ARTICLES_PER_PAGE);

    res.render(`main`, {
      articles,
      categories,
      popularArticles,
      lastComments: comments,
      pagesCount,
      activePage: pageNumber,
      prevIsActive: pageNumber !== 1,
      nextIsActive: pageNumber < pagesCount,
      mainPath: '/',
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = mainRoute;
