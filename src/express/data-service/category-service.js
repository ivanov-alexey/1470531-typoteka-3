'use strict';

const {getErrorMessage} = require(`../../utils`);
const apiRequest = require(`./api-request`);

class CategoryService {
  static async getAll() {
    try {
      const response = await apiRequest.get(`/categories`);

      return response.data;
    } catch (err) {
      console.error(`Request /categories error: `, err.message);

      return getErrorMessage(err);
    }
  }
}

module.exports = CategoryService;
