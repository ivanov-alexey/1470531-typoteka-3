'use strict';

const Joi = require('joi');
const {TextRestriction} = require('../../constants');

const commentSchema = Joi.object({
  text: Joi.string()
    .min(TextRestriction.commentMin)
    .max(TextRestriction.commentMax)
    .required(),
  userId: Joi.number()
    .required(),
  publicationDate: Joi.string()
    .isoDate()
    .required()
});

module.exports = commentSchema;
