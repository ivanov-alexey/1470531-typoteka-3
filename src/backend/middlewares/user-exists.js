'use strict';

const {getLogger} = require(`../../libs/logger`);
const {HttpCode} = require(`../../constants`);

const logger = getLogger();

const userExists = (service) => async (req, res, next) => {
  const {email} = req.body;

  try {
    const users = await service.countByEmail(email);

    if (users) {
      res.status(HttpCode.BAD_REQUEST).json({
        message: [`User with this email is already registered`],
        data: req.body,
      });

      return;
    }
  } catch (err) {
    logger.error(err);
  }

  next();
};

module.exports = userExists;
