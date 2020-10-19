'use strict';

const Joi = require('joi');

const limitSchema = Joi.object({
  limit: Joi.number().optional(),
  offset: Joi.number().optional(),
}).optional();

module.exports = limitSchema;
