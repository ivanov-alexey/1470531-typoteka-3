'use strict';

const {getErrorMessage} = require('../../utils/get-error-message');
const apiRequest = require('./api-request');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

class CommentService {
  static async create() {
    try {
      const response = await apiRequest.post(`/comments/add`);

      return response.data;
    } catch (err) {
      logger.error(`Request /comments/add error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async getAll(offset, limit) {
    try {
      const response = await apiRequest.get(`/comments?offset=${offset}&limit=${limit}`);

      return response.data;
    } catch (err) {
      logger.error(`Request /comments error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async getByArticleId(id) {
    try {
      const response = await apiRequest.get(`/articles/${id}/comments`);

      return response.data;
    } catch (err) {
      logger.error(`Request /comments error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async drop(id) {
    try {
      const response = await apiRequest.delete(`/comments/${id}`);

      return response.data;
    } catch (err) {
      logger.error(`Request /comments/:id error: `, err.message);

      return getErrorMessage(err);
    }
  }
}

module.exports = CommentService;
