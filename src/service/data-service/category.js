'use strict';

const {db: {Category}} = require(`../db/connect`);

class CategoryService {
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
      return console.error(err);
    }
  }
}

module.exports = CategoryService;
