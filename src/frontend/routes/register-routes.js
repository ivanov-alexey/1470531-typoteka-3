'use strict';

const {Router} = require('express');
const UserService = require('../data-service/user-service');
const upload = require('../../configs/upload-folder');
const {getErrorTemplate} = require('../../utils/get-error-template');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

const registerRoutes = new Router();

registerRoutes.get(`/`, (req, res) => res.render(`authorization/sign-up`));

registerRoutes.post(`/`, upload.single(`avatar`), async (req, res) => {
  const {email = '', firstname = '', lastname = '', password = '', repeatPassword = ''} = req.body;

  try {
    const user = {
      email,
      firstname,
      lastname,
      password,
      avatar: (req.file && req.file.filename) || '',
    };
    const {errors = []} = await UserService.create(user);
    const errorMessages =
      password !== repeatPassword ? [...errors, 'Passwords do not match'] : errors;

    if (errorMessages.length) {
      res.render(`authorization/sign-up`, {
        errors: errorMessages,
        user,
      });

      return;
    }

    res.redirect(`/login`);
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = registerRoutes;
