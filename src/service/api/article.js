'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExist = require(`../middlewares/article-exists`);
const commentValidator = require(`../middlewares/comment-validator`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger();
const route = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    try {
      const articles = await articleService.findAll();

      return res
        .status(HttpCode.OK)
        .json(articles);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on GET /articles`);
    }
  });

  route.get(`/:id`, async (req, res) => {
    try {
      const {id} = req.params;
      const article = await articleService.findOne(id);

      if (!article) {
        return res
          .status(HttpCode.NOT_FOUND)
          .send(`Not found with ${id}`);
      }

      return res
        .status(HttpCode.OK)
        .json(article);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on GET /articles/:id`);
    }
  });

  route.post(`/add`, articleValidator, async (req, res) => {
    try {
      const article = await articleService.create(req.body);

      return res
        .status(HttpCode.CREATED)
        .json(article);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on POST /articles/add`);
    }
  });

  route.put(`/:id`, articleValidator, async (req, res) => {
    try {
      const {id} = req.params;
      const article = await articleService.findOne(id);

      if (!article) {
        return res
          .status(HttpCode.NOT_FOUND)
          .send(`Not found with ${id}`);
      }

      const updatedArticle = await articleService.update(id, req.body);

      return res
        .status(HttpCode.OK)
        .json(updatedArticle);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on GET /articles/:id`);
    }
  });

  route.delete(`/:id`, async (req, res) => {
    try {
      const {id} = req.params;
      const article = await articleService.drop(id);

      if (!article) {
        return res
          .status(HttpCode.NOT_FOUND)
          .send(`Not found`);
      }

      return res
        .status(HttpCode.OK)
        .json(article);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on DELETE /articles/:id`);
    }
  });

  route.get(`/:id/comments`, articleExist(articleService), async (req, res) => {
    try {
      const {id} = req.params;
      const comments = await commentService.findByArticleId(id);

      return res.status(HttpCode.OK).json(comments);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on GET /articles/:id/comments`);
    }
  });

  route.delete(`/:id/comments/:commentId`, articleExist(articleService), async (req, res) => {
    try {
      const {commentId} = req.params;
      const deletedComment = await commentService.drop(commentId);

      if (!deletedComment) {
        return res
          .status(HttpCode.NOT_FOUND)
          .send(`Not found`);
      }

      return res
        .status(HttpCode.OK)
        .json(deletedComment);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on GET /articles/:id/comments/:commentId`);
    }
  });

  route.post(`/:id/comments/add`, [articleExist(articleService), commentValidator], async (req, res) => {
    try {
      // TODO: добавить userId, articleId?
      const {article: {id}} = res.locals;
      const comment = await commentService.create(id, req.body);

      return res.status(HttpCode.CREATED)
        .json(comment);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on POST /articles/:id/comments/:commentId`);
    }
  });
};
