'use strict';

const {
  db: {Category},
} = require(`../db/connect`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger();

class CategoryService {
  async create({title}) {
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
      const result = [];
      const allCategories = await Category.findAll();

      for (const category of allCategories) {
        const {id} = category;
        const currentCategory = await Category.findByPk(id);
        const count = await currentCategory.countArticles();
        const {dataValues} = currentCategory;

        result.push({...dataValues, count});
      }

      return result;
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

  async update(id, {title}) {
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
