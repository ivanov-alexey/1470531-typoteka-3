'use strict';

const {getErrorMessage} = require(`../../utils`);
const apiRequest = require(`./api-request`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger();

class CategoryService {
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
