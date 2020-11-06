'use strict';

const {MAX_ARTICLES_PER_PAGE} = require('../../constants');
const {sequelize} = require('../../configs/db-config');
const {
  db: {Article, Category, Comment},
} = require('../../configs/db-config');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

class ArticleService {
  async create({announce, fullText, picture, title, publicationDate}) {
    // TODO: добавить user_id
    // TODO: добавить category_id
    try {
      return await Article.create({
        announce,
        picture,
        title,
        'full_text': fullText,
        'publication_date': publicationDate,
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findAll(offset = 0, limit = MAX_ARTICLES_PER_PAGE) {
    try {
      const count = await Article.count();
      const articles = await Article.findAll({
        attributes: [
          `id`,
          `announce`,
          [`full_text`, `fullText`],
          `picture`,
          `title`,
          [`publication_date`, 'publicationDate'],
        ],
        include: [
          {
            model: Category,
            as: `categories`,
            attributes: [`id`, `title`],
          },
          {
            model: Comment,
            as: `comments`,
            attributes: [`id`, `text`, `createdAt`],
          },
        ],
        order: [[`publication_date`, `DESC`]],
        offset,
        limit,
      });

      return {
        count,
        articles,
      };
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findMostDiscussed() {
    try {
      const sql = `
        SELECT a.id,
               a.announce,
               count(c.article_id) AS "commentsCount"
        FROM articles AS a
        INNER JOIN comments c on a.id = c.article_id
        GROUP BY a.id
        ORDER BY "commentsCount" DESC
        LIMIT 4;
      `;
      const type = sequelize.QueryTypes.SELECT;
      const articles = await sequelize.query(sql, {type});

      return articles.map((article) => ({
        ...article,
        announce: article.announce.slice(0, 100).concat(`...`),
      }));
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
