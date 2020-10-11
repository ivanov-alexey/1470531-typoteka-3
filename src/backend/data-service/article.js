"use strict";

const {MAX_ARTICLES_PER_PAGE} = require('../../constants');
const {db: {Article, Category, Comment}} = require('../configs/db-connect');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

class ArticleService {
  async create(article) {
    // TODO: добавить user_id
    try {
      return await Article.create({
        announce: article.announce,
        'full_text': article.full_text,
        picture: article.picture,
        title: article.title,
        'publication_date': article.publication_date || new Date(),
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findAll(offset = 0, limit = MAX_ARTICLES_PER_PAGE) {
    try {
      return await Article.findAll({
        attributes: [
          `id`,
          `announce`,
          [`full_text`, `fullText`],
          `picture`,
          `title`,
          [`publication_date`, 'publicationDate'],
        ],
        include: [{
          model: Category,
          as: `categories`,
          attributes: [
            `id`,
            `title`,
          ],
        },
        {
          model: Comment,
          as: `comments`,
          attributes: [
            `id`,
            `text`,
            `createdAt`
          ],
        }],
        order: [[`publication_date`, `DESC`]],
        offset,
        limit
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findMostDiscussed() {
    try {
      const result = [];
      const allArticles = await Article.findAll();

      for (const article of allArticles) {
        const {id} = article;
        const currentArticle = await Article.findByPk(id);
        const count = await currentArticle.countComments();
        const {dataValues} = currentArticle;

        result.push({
          id: dataValues.id,
          announce: dataValues.announce.slice(0, 100).concat(`...`),
          count,
        });
      }

      return result.sort((prev, next) => next.count - prev.count).slice(0, 4);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findOne(id) {
    try {
      return await Article.findByPk(id, {
        attributes: [
          `id`,
          `announce`,
          [`full_text`, `fullText`],
          `picture`,
          `title`,
          [`publication_date`, 'publicationDate'],
        ],
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async update(id, {announce, fullText, picture, title}) {
    try {
      await Article.update(
        {
          announce,
          fullText,
          title,
          picture,
        },
        {
          where: {id},
        }
      );

      return await Article.findByPk(id);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async drop(id) {
    try {
      const article = await Article.findByPk(id);

      if (!article) {
        return null;
      }

      await Article.destroy({
        where: {
          id,
        },
      });

      return article;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

module.exports = ArticleService;
