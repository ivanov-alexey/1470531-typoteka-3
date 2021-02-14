'use strict';

const {Message} = require(`../constants`);

module.exports.getErrorTemplate = ({message}) =>
  message === Message.serverError ? `errors/500` : `errors/400`;
