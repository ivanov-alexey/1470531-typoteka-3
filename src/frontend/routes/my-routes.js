'use strict';

const {Router} = require('express');
const ArticleService = require('../data-service/article-service');
const CommentService = require('../data-service/comment-service');
const {MAX_COMMENTS_PER_PAGE} = require('../../constants');
const {getErrorTemplate} = require('../../utils/get-error-template');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

const myRoutes = new Router();

myRoutes.get(`/`, async (req, res) => {
  try {
    const articles = await ArticleService.getAll();

    res.render(`my/my`, {
      articles,
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

myRoutes.get(`/comments`, async (req, res) => {
  const {page = 1} = req.query;
  const pageNumber = parseInt(page, 10);
  const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * MAX_COMMENTS_PER_PAGE;

  try {
    const {count, comments} = await CommentService.getAll(offset, MAX_COMMENTS_PER_PAGE);
    const pagesCount = Math.ceil(count / MAX_COMMENTS_PER_PAGE);

    res.render(`my/comments`, {
      comments,
      pagesCount,
      activePage: pageNumber,
      prevIsActive: pageNumber !== 1,
      nextIsActive: pageNumber < pagesCount,
      commentsPath: './comments'
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = myRoutes;
