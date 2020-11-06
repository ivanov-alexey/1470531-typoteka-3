'use strict';

const Joi = require('joi');
const {TextRestriction} = require('../../constants');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(TextRestriction.passwordMin)
    .max(TextRestriction.passwordMax)
    .required(),
});

module.exports = userSchema;
