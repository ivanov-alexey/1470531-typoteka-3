'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const commentValidator = require(`../middlewares/comment-validator`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger();
const route = new Router();

module.exports = (app, service) => {
  app.use(`/comments`, route);

  route.get(`/`, async (req, res) => {
    try {
      const comments = await service.findAll();

      return res
        .status(HttpCode.OK)
        .json(comments);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on GET /comments`);
    }
  });

  route.post(`/add`, commentValidator, async (req, res) => {
    try {
      const comment = await service.create(req.body);

      return res
        .status(HttpCode.CREATED)
        .json(comment);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on POST /comments/add`);
    }
  });

  route.delete(`/:id`, async (req, res) => {
    try {
      const {id} = req.params;
      const comment = await service.drop(id);

      if (!comment) {
        return res
          .status(HttpCode.NOT_FOUND)
          .send(`Not found`);
      }

      return res
        .status(HttpCode.OK)
        .json(comment);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on DELETE /comments/:id`);
    }
  });
};
