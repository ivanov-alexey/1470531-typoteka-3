'use strict';

const {Op} = require(`sequelize`);
const {db: {Article}} = require(`src/backend/configs/db-connect`);

class SearchService {
  async findAll(searchText) {
    try {
      return await Article.findAll({
        where: {
          title: {
            [Op.substring]: `%${searchText}%`
          }
        },
        raw: true
      });
    } catch (err) {
      return console.error(err);
    }
  }
}

module.exports = SearchService;
