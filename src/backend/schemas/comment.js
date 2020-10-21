'use strict';

const Joi = require('joi');
const {TextRestriction} = require('../../constants');

const commentSchema = Joi.object({
  text: Joi.string()
    .min(TextRestriction.commentMin)
    .max(TextRestriction.commentMax)
    .required(),
  articleId: Joi.number()
    .required()
  ,userId: Joi.number()
    .required(),
});

module.exports = commentSchema;
