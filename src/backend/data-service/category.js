'use strict';

const {
  sequelize,
  db: {Category},
} = require('../configs/db-config');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

class CategoryService {
  async create(title) {
    try {
      return await Category.create({
        title,
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findAll() {
    try {
      const sql = `
      SELECT c.id                  AS "id",
             c.title               AS "title",
             count(ca.category_id) AS "count"
      FROM categories AS c
      LEFT JOIN category_article AS ca ON ca.category_id = c.id
      GROUP BY c.id;
      `;
      const type = sequelize.QueryTypes.SELECT;

      return await sequelize.query(sql, {type});
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findOne(id) {
    try {
      return await Category.findByPk(id, {raw: true});
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async update(id, title) {
    try {
      await Category.update(
        {
          title,
        },
        {
          where: {id},
        }
      );

      return await Category.findByPk(id);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async drop(id) {
    try {
      const category = await Category.findByPk(id, {raw: true});

      if (!category) {
        return null;
      }

      await Category.destroy({
        where: {
          id,
        },
      });

      return category;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

module.exports = CategoryService;
