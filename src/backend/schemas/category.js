'use strict';

const Joi = require('joi');
const {TextRestriction} = require('../../constants');

const categorySchema = Joi.object({
  title: Joi.string()
    .min(TextRestriction.categoryMin)
    .max(TextRestriction.categoryMax)
    .required()
});

module.exports = categorySchema;
