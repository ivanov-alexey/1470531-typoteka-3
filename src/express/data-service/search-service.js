'use strict';

const {getErrorMessage} = require(`../../utils`);
const apiRequest = require(`./api-request`);

class SearchService {
  static async getResults(query) {
    try {
      const response = await apiRequest.get(`${query}`);

      return response.data;
    } catch (err) {
      console.error(`Request /search error: `, err.message);

      return getErrorMessage(err);
    }
  }
}

module.exports = SearchService;
