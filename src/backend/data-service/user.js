'use strict';

const bcrypt = require('bcrypt');
const {PASSWORD_SALT_ROUNDS} = require('../../constants');
const {
  db: {User},
} = require('../../configs/db-config');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

class UserService {
  async create({avatar, email, firstname, lastname, password}) {
    try {
      const usersCount = await User.count();
      const hash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);

      return await User.create({
        avatar,
        email,
        firstname,
        lastname,
        password: hash,
        role: usersCount ? 'reader' : 'admin',
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async countByEmail(email) {
    try {
      return User.count({
        where: {
          email,
        },
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

module.exports = UserService;
