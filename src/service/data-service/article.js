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
      const result = [];
      const allArticles = await Article.findAll({
        order: [
          [`created_at`, `DESC`]
        ],
        raw: true
      });

      for (const article of allArticles) {
        const {id} = article;
        const currentArticle = await Article.findByPk(id);
        const rawComments = await currentArticle.getComments();
        const rawCategories = await currentArticle.getCategories();
        const comments = rawComments.map(({dataValues}) => ({...dataValues}));
        const category = rawCategories.map(({dataValues}) => ({...dataValues}));

        result.push({...currentArticle.dataValues, comments, category});
      }

      return result;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findMostDiscussed() {
    try {
      const result = [];
      const allArticles = await Article.findAll({
        raw: true
      });

      for (const article of allArticles) {
        const {id} = article;
        const currentArticle = await Article.findByPk(id);
        const count = await currentArticle.countComments();
        const {dataValues} = currentArticle;

        result.push({
          id: dataValues.id,
          announce: dataValues.announce.slice(0, 100).concat(`...`),
          count
        });
      }

      console.log(`result`, result);

      return result.sort((prev, next) => next.count - prev.count).slice(0, 4);
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
