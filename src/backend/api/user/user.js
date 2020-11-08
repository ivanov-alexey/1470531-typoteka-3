'use strict';

const {Router} = require('express');
const {HttpCode} = require('../../../constants');
const newEntityValidator = require('../../middlewares/new-entity-validator');
const newUserSchema = require('../../schemas/new-user');
const userExists = require('../../middlewares/user-exists');
const userSchema = require('../../schemas/user');
const {getLogger} = require('../../../libs/logger');

const logger = getLogger();
const route = new Router();

module.exports = (app, service) => {
  app.use(`/users`, route);

  route.post(`/`, newEntityValidator(userSchema), async (req, res) => {
    try {
      const isUserExist = await service.checkUserExists(req.body);

      res.status(HttpCode.OK).json(isUserExist);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on POST /users/add`);
    }
  });

  route.post(`/add`, [userExists(service), newEntityValidator(newUserSchema)], async (req, res) => {
    try {
      const newUser = await service.create(req.body);

      res.status(HttpCode.CREATED).json(newUser);
    } catch (err) {
      logger.error(err);

      res.status(HttpCode.BAD_REQUEST).send(`Bad request on POST /users/add`);
    }
  });
};
