'use strict';

const Joi = require(`joi`);
const {TextRestriction} = require(`../../constants`);

const articleSchema = Joi.object({
  announce: Joi.string().min(TextRestriction.shortMin).max(TextRestriction.shortMax).required(),
  fullText: Joi.string().min(TextRestriction.longMin).max(TextRestriction.longMax).required(),
  picture: Joi.string().allow(null, ``).required(),
  title: Joi.string().min(TextRestriction.shortMin).max(TextRestriction.shortMax).required(),
  publicationDate: Joi.string().isoDate().required(),
  categories: Joi.array().min(1).items(Joi.string()).required(),
  userId: Joi.number(),
});

module.exports = articleSchema;
