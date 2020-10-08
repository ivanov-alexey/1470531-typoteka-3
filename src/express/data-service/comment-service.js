'use strict';

const {getErrorMessage} = require(`../../utils`);
const apiRequest = require(`./api-request`);
const {getLogger} = require(`../lib/logger`);

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

  static async getAll() {
    try {
      const response = await apiRequest.get(`/comments`);

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
