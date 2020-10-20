'use strict';

const {Router} = require('express');
const {HttpCode} = require('../../../constants');
const newEntityValidator = require('../../middlewares/new-entity-validator');
const articleExist = require('../../middlewares/article-exists');
const articleSchema = require('../../schemas/article');
const commentSchema = require('../../schemas/comment');
const {getLogger} = require('../../../libs/logger');

const logger = getLogger();
const route = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    try {
      const {popular, offset, limit} = req.query;
      const offsetNum = parseInt(offset, 10);
      const limitNum = parseInt(limit, 10);
      const articles = popular ? await articleService.findMostDiscussed() : await articleService.findAll(offsetNum, limitNum);

      res.status(HttpCode.OK).json(articles);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on GET /articles`);
    }
  });

  route.get(`/:id`, async (req, res) => {
    try {
      const {id} = req.params;
      const article = await articleService.findOne(id);

      if (!article) {
        res.status(HttpCode.NOT_FOUND).send(`Not found with ${id}`);
      }

      res.status(HttpCode.OK).json(article);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on GET /articles/:id`);
    }
  });

  route.post(`/add`, newEntityValidator(articleSchema), async (req, res) => {
    try {
      const article = await articleService.create(req.body);

      res.status(HttpCode.CREATED).json(article);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on POST /articles/add`);
    }
  });

  route.put(`/:id`, newEntityValidator(articleSchema), async (req, res) => {
    try {
      const {id} = req.params;
      const article = await articleService.findOne(id);

      if (!article) {
        res.status(HttpCode.NOT_FOUND).send(`Not found with ${id}`);

        return;
      }

      const updatedArticle = await articleService.update(id, req.body);

      res.status(HttpCode.OK).json(updatedArticle);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on GET /articles/:id`);
    }
  });

  route.delete(`/:id`, async (req, res) => {
    try {
      const {id} = req.params;
      const article = await articleService.drop(id);

      if (!article) {
        res.status(HttpCode.NOT_FOUND).send(`Not found`);

        return;
      }

      res.status(HttpCode.OK).json(article);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on DELETE /articles/:id`);
    }
  });

  route.get(`/:id/comments`, articleExist(articleService), async (req, res) => {
    try {
      const {id} = req.params;
      const comments = await commentService.findByArticleId(id);

      res.status(HttpCode.OK).json(comments);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on GET /articles/:id/comments`);
    }
  });

  route.delete(`/:id/comments/:commentId`, articleExist(articleService), async (req, res) => {
    try {
      const {commentId} = req.params;
      const deletedComment = await commentService.drop(commentId);

      if (!deletedComment) {
        res.status(HttpCode.NOT_FOUND).send(`Not found`);

        return;
      }

      res.status(HttpCode.OK).json(deletedComment);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on GET /articles/:id/comments/:commentId`);
    }
  });

  route.post(`/:id/comments/add`, [articleExist(articleService), newEntityValidator(commentSchema)], async (req, res) => {
    try {
      const {
        article: {id},
      } = res.locals;
      const comment = await commentService.create(id, req.body);

      res.status(HttpCode.CREATED).json(comment);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on POST /articles/:id/comments/:commentId`);
    }
  });
};
