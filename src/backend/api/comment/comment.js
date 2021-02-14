'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../constants`);
const newEntityValidator = require(`../../middlewares/new-entity-validator`);
const commentSchema = require(`../../schemas/comment`);
const idValidator = require(`../../middlewares/idValidator`);
const {getLogger} = require(`../../../libs/logger`);

const logger = getLogger();
const route = new Router();

module.exports = (app, service) => {
  app.use(`/comments`, route);

  route.get(`/`, async (req, res) => {
    try {
      const {offset, limit} = req.query;
      const offsetNum = parseInt(offset, 10);
      const limitNum = parseInt(limit, 10);
      const comments = await service.findAll(offsetNum, limitNum);

      res.status(HttpCode.OK).json(comments);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on GET /comments`);
    }
  });

  route.post(`/add`, newEntityValidator(commentSchema), async (req, res) => {
    try {
      const comment = await service.create(req.body);

      res.status(HttpCode.CREATED).json(comment);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on POST /comments/add`);
    }
  });

  route.delete(`/:id`, idValidator, async (req, res) => {
    try {
      const {id} = req.params;
      const comment = await service.drop(id);

      if (!comment) {
        res.status(HttpCode.NOT_FOUND).send(`Not found`);
      }

      res.status(HttpCode.OK).json(comment);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on DELETE /comments/:id`);
    }
  });
};
