'use strict';

const {HttpCode, Message} = require(`../constants`);

module.exports.getErrorMessage = (error) => {
  if (error.response && error.response.status !== HttpCode.NOT_FOUND) {
    throw new Error(Message.serverError);
  }

  throw new Error(Message.connectionError);
};
