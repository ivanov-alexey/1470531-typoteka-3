'use strict';

const Joi = require('joi');

const idSchema = Joi.object({
  id: Joi.number().optional(),
}).optional();

module.exports = idSchema;
