'use strict';

const {Op} = require(`sequelize`);
const {
  db: {Article},
} = require(`../../configs/db-config`);
const {getLogger} = require(`../../libs/logger`);

const logger = getLogger();

class SearchService {
  async findAll(searchText) {
    try {
      return await Article.findAll({
        where: {
          title: {
            [Op.substring]: `%${searchText}%`,
          },
        },
      });
    } catch (err) {
      return logger.error(err);
    }
  }
}

module.exports = SearchService;
