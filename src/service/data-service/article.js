'use strict';

const {db: {Article}} = require(`../db/connect`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger();

class ArticleService {
  async create({announce, fullText, picture, title}) {
    try {
      return await Article.create({
        announce,
        fullText,
        picture,
        title
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findAll() {
    try {
      return await Article.findAll({
        order: [
          [`created_at`, `DESC`]
        ],
        raw: true
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findOne(id) {
    try {
      return await Article.findByPk(id, {raw: true});
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async update(id, {announce, fullText, picture, title}) {
    try {
      await Article.update({
        announce,
        fullText,
        title,
        picture
      }, {
        where: {id}
      });

      return await Article.findByPk(id);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async drop(id) {
    try {
      const article = await Article.findByPk(id, {raw: true});

      if (!article) {
        return null;
      }

      await Article.destroy({
        where: {
          id
        }
      });

      return article;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

module.exports = ArticleService;
