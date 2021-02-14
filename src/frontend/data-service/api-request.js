'use strict';

const axios = require(`axios`);
const {API_URL, TimeInMilliseconds} = require(`../../constants`);

const apiRequest = axios.create({
  baseURL: API_URL,
  timeout: TimeInMilliseconds.second * 30,
});

module.exports = apiRequest;
