'use strict';

const Joi = require('joi');
const {TextRestriction} = require('../../constants');

const newUserSchema = Joi.object({
  avatar: Joi.string().min(TextRestriction.linkMin).max(TextRestriction.linkMax).required(),
  email: Joi.string().email().required(),
  firstname: Joi.string().min(TextRestriction.nameMin).max(TextRestriction.nameMax).required(),
  lastname: Joi.string().min(TextRestriction.nameMin).max(TextRestriction.nameMax).required(),
  password: Joi.string()
    .min(TextRestriction.passwordMin)
    .max(TextRestriction.passwordMax)
    .required(),
});

module.exports = newUserSchema;
