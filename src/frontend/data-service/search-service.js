'use strict';

const {getErrorMessage} = require('../../utils/get-error-message');
const apiRequest = require('./api-request');
const {getLogger} = require('../../libs/logger');

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
