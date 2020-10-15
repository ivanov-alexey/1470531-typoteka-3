'use strict';

const {Router} = require('express');
const ArticleService = require('../data-service/article-service');
const CommentService = require('../data-service/comment-service');
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
  try {
    const comments = await CommentService.getAll();

    res.render(`my/comments`, {
      comments,
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = myRoutes;
