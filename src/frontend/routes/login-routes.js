'use strict';

const {Router} = require('express');
const UserService = require('../data-service/user-service');
const {getErrorTemplate} = require('../../utils/get-error-template');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

const loginRoutes = new Router();

loginRoutes.get(`/`, (req, res) => res.render(`authorization/login`));

loginRoutes.post(`/`, async (req, res) => {
  const user = {
    email: req.body.email || '',
    password: req.body.password || '',
  };

  try {
    const {errors = [], isPasswordCorrect = false} = await UserService.check(user);

    if (errors.length || !isPasswordCorrect) {
      res.render(`authorization/login`, {
        errors: errors.length ? errors : null,
        user,
        loginError: true,
      });

      return;
    }

    res.redirect(`/my`);
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = loginRoutes;
