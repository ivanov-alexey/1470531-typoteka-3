'use strict';

const Joi = require(`joi`);
const {TextRestriction} = require(`../../constants`);

const commentSchema = Joi.object({
  userId: Joi.number(),
  text: Joi.string().min(TextRestriction.commentMin).max(TextRestriction.commentMax).required(),
});

module.exports = commentSchema;
