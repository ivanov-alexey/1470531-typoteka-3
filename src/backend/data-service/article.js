'use strict';

const {MAX_ARTICLES_PER_PAGE} = require(`../../constants`);
const {sequelize} = require(`../../configs/db-config`);
const {
  db: {Article, Category, Comment},
} = require(`../../configs/db-config`);
const {getLogger} = require(`../../libs/logger`);

const logger = getLogger();

class ArticleService {
  async create(data) {
    const {announce, fullText, picture, title, publicationDate, categories, userId} = data;

    try {
      const article = await Article.create({
        announce,
        picture,
        title,
        fullText,
        publicationDate,
        userId
      });

      if (categories.length) {
        await article.addCategories(categories, {through: `category_article`});
      }

      return article;
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
          `fullText`,
          `picture`,
          `title`,
          `publicationDate`,
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
        order: [[`publicationDate`, `DESC`]],
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

  async findByCategory(id) {
    try {
      const sql = `
        SELECT a.id,
               a.title,
               a.announce,
               a.publication_date    AS "publicationDate",
               a.picture,
               count(com.article_id) AS "commentsCount",
               (
                 SELECT string_agg(c.title, ', ') AS "categories_title"
                 FROM category_article AS ca
                        LEFT JOIN categories AS c ON ca.category_id = c.id
                   AND ca.article_id = a.id
               )
        FROM articles AS a
               INNER JOIN users AS u

                          ON a.user_id = u.id
               LEFT JOIN comments AS com ON a.id = com.article_id
               INNER JOIN category_article ca2 on a.id = ca2.article_id
               LEFT JOIN categories c2 on c2.id = ca2.category_id
        WHERE c2.id = ?
        GROUP BY a.id, u.firstname, u.lastname, u, email;
      `;
      const type = sequelize.QueryTypes.SELECT;
      const articles = await sequelize.query(sql, {
        type,
        replacements: [id]
      });

      return articles.map((article) => ({
        ...article,
        categories: article[`categories_title`].split(`, `)
      }));
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
          `fullText`,
          `picture`,
          `title`,
          `publicationDate`,
        ],
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async update(id, {announce, fullText, picture, title, categories}) {
    try {
      const article = await Article.update(
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

      if (categories.length) {
        await article.addCategories(categories);
      }

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
