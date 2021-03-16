'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../constants`);
const newEntityValidator = require(`../../middlewares/new-entity-validator`);
const categorySchema = require(`../../schemas/category`);
const idValidator = require(`../../middlewares/id-validator`);
const {getLogger} = require(`../../../libs/logger`);

const logger = getLogger();
const route = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    try {
      const categories = await service.findAll();

      res.status(HttpCode.OK).json(categories);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on GET /categories`);
    }
  });

  route.post(`/add`, newEntityValidator(categorySchema), async (req, res) => {
    try {
      const {title} = req.body;
      const category = await service.create(title);

      res.status(HttpCode.CREATED).json(category);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on POST /categories/add`);
    }
  });

  route.delete(`/:id`, idValidator, async (req, res) => {
    try {
      const {id} = req.params;
      const category = await service.drop(id);

      if (!category) {
        res.status(HttpCode.NOT_FOUND).send(`Not found`);
      }

      res.status(HttpCode.OK).json(category);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on DELETE /categories/:id`);
    }
  });

  route.put(`/:id`, [idValidator, newEntityValidator(categorySchema)], async (req, res) => {
    try {
      const {id} = req.params;
      const {title} = req.body;
      const existCategory = await service.findOne(id);

      if (!existCategory) {
        res.status(HttpCode.NOT_FOUND).send(`Not found with ${id}`);
      }

      const updatedCategory = await service.update(id, title);

      res.status(HttpCode.OK).json(updatedCategory);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on PUT /categories/:id`);
    }
  });
};
