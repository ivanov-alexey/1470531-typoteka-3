'use strict';

const {TextRestriction} = require('../constants');

module.exports.generateErrors = (article) => {
  const errors = [];

  if (article.announce.length < TextRestriction.shortMin || article.announce.length > TextRestriction.shortMax) {
    errors.push(`Введите корректный текст анонса`);
  }

  if (article.title.length < TextRestriction.shortMin || article.title.length > TextRestriction.shortMax) {
    errors.push(`Введите корректный текст заголовка`);
  }

  if (article.fullText.length > TextRestriction.longMax) {
    errors.push(`Введите корректный текст статьи`);
  }

  if (!article.category.length) {
    errors.push(`Выберите категорию`);
  }

  return errors;
};
