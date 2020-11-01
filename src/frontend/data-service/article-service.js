'use strict';

const {DateTime} = require('luxon');
const {getErrorMessage} = require('../../utils/get-error-message');
const apiRequest = require('./api-request');
const {MAX_ARTICLES_PER_PAGE} = require('../../constants');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

class ArticleService {
  static async getAll(offset = 0, limit = MAX_ARTICLES_PER_PAGE) {
    try {
      const response = await apiRequest.get(`/articles?offset=${offset}&limit=${limit}`);

      return response.data;
    } catch (err) {
      logger.error(`Request /articles error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async getOne(id) {
    try {
      const response = await apiRequest.get(`/articles/${id}`);

      return response.data;
    } catch (err) {
      logger.error(`Request /articles/:id error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async findMostDiscussed() {
    try {
      const response = await apiRequest.get(`/articles?popular=true`);

      return response.data;
    } catch (err) {
      logger.error(`Request /articles?popular=true error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async create(article) {
    try {
      return await apiRequest.post(`/articles/add`, {
        title: article.title || '',
        category:
          typeof article.category === `string` ? [article.category] : article.category || ``,
        picture: article.picture || '',
        announce: article.announce || '',
        fullText: article.fullText || '',
        publicationDate: article.publicationDate || DateTime.local().toString(),
      });
    } catch (error) {
      return {
        article: error.response && error.response.data && error.response.data.data,
        errors: error.response && error.response.data && error.response.data.message,
      };
    }
  }

  static async drop(id) {
    try {
      const response = await apiRequest.delete(`/articles/${id}`);

      return response.data;
    } catch (err) {
      logger.error(`Request /comments/:id error: `, err.message);

      return getErrorMessage(err);
    }
  }
}

module.exports = ArticleService;
