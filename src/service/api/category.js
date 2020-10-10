'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const categoryValidator = require(`../middlewares/category-validator`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger();
const route = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    try {
      const categories = await service.findAll();

      return res
        .status(HttpCode.OK)
        .json(categories);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on GET /categories`);
    }
  });

  route.post(`/add`, categoryValidator, async (req, res) => {
    try {
      const category = await service.create(req.body);

      return res
        .status(HttpCode.CREATED)
        .json(category);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on POST /categories/add`);
    }
  });

  route.delete(`/:id`, async (req, res) => {
    try {
      const {id} = req.params;
      const category = await service.drop(id);

      if (!category) {
        return res
          .status(HttpCode.NOT_FOUND)
          .send(`Not found`);
      }

      return res
        .status(HttpCode.OK)
        .json(category);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on DELETE /categories/:id`);
    }
  });

  route.put(`/:id`, categoryValidator, async (req, res) => {
    try {
      const {id} = req.params;
      const existCategory = await service.findOne(id);

      if (!existCategory) {
        return res
          .status(HttpCode.NOT_FOUND)
          .send(`Not found with ${id}`);
      }

      const updatedCategory = await service.update(id, req.body);

      return res
        .status(HttpCode.OK)
        .json(updatedCategory);
    } catch (err) {
      logger.error(err);

      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Bad request on PUT /categories/:id`);
    }
  });
};
