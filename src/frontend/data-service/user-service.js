'use strict';

const apiRequest = require('./api-request');

class UserService {
  static async create(user) {
    try {
      const response = await apiRequest.post(`/users/add`, user);

      return response.data;
    } catch (error) {
      return {
        users: error.response && error.response.data && error.response.data.data,
        errors: error.response && error.response.data && error.response.data.message,
      };
    }
  }
}

module.exports = UserService;
