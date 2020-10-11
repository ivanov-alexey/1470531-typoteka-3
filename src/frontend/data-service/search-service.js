'use strict';

const {getErrorMessage} = require(`../../utils`);
const apiRequest = require(`./api-request`);
const {getLogger} = require(`./src/backend`);

const logger = getLogger();

class SearchService {
  static async getResults(query) {
    try {
      const response = await apiRequest.get(`${query}`);

      return response.data;
    } catch (err) {
      logger.error(`Request /search error: `, err.message);

      return getErrorMessage(err);
    }
  }
}

module.exports = SearchService;
