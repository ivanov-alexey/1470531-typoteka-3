'use strict';

const {Router} = require('express');
const ArticleService = require('../data-service/article-service');
const CommentService = require('../data-service/comment-service');
const {MAX_ARTICLES_PER_PAGE} = require('../../constants');
const {MAX_COMMENTS_PER_PAGE} = require('../../constants');
const {getErrorTemplate} = require('../../utils/get-error-template');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

const myRoutes = new Router();

// TODO: пофиксить время во всех шаблонах
myRoutes.get(`/`, async (req, res) => {
  const {page = 1} = req.query;
  const pageNumber = parseInt(page, 10);
  const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * MAX_ARTICLES_PER_PAGE;

  try {
    const {articles, count} = await ArticleService.getAll(offset, MAX_ARTICLES_PER_PAGE);
    const pagesCount = Math.ceil(count / MAX_ARTICLES_PER_PAGE);

    res.render(`my/my`, {
      articles,
      pagesCount,
      activePage: pageNumber,
      prevIsActive: pageNumber !== 1,
      nextIsActive: pageNumber < pagesCount,
      myPath: '/my'
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

myRoutes.post(`/`, async (req, res) => {
  const {page = 1} = req.query;
  const pageNumber = parseInt(page, 10);
  const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * MAX_ARTICLES_PER_PAGE;

  try {
    const {method, articleId} = req.body;

    if (method === 'DELETE') {
      await ArticleService.drop(parseInt(articleId, 10));
      const {articles, count} = await ArticleService.getAll(offset, MAX_ARTICLES_PER_PAGE);
      const pagesCount = Math.ceil(count / MAX_ARTICLES_PER_PAGE);

      res.render(`my/my`, {
        articles,
        pagesCount,
        activePage: pageNumber,
        prevIsActive: pageNumber !== 1,
        nextIsActive: pageNumber < pagesCount,
        myPath: '/my'
      })
    }
  } catch (err) {
    console.error(err);
  }
})

// TODO: создание комментариев
// TODO: удаление комментариев
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
