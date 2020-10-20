'use strict';

const {getErrorMessage} = require('../../utils/get-error-message');
const apiRequest = require('./api-request');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

class CategoryService {
  static async create(title) {
    try {
      const response = await apiRequest.post(`/categories/add`, {title});

      return response.data;
    } catch (error) {
      return {
        categories: error.response && error.response.data && error.response.data.data,
        errors: error.response && error.response.data && error.response.data.message
      };
    }
  }

  static async getAll() {
    try {
      const response = await apiRequest.get(`/categories`);

      return response.data.filter((category) => category.count);
    } catch (err) {
      logger.error(`Request /categories error: `, err.message);

      return getErrorMessage(err);
    }
  }
}

module.exports = CategoryService;
