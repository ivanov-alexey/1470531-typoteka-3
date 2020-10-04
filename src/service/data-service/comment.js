'use strict';

const {db: {Comment}} = require(`../db/connect`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger();

class CommentService {
  async create(userId, text) {
    try {
      return await Comment.create({
        text,
        'user_id': userId
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findByArticleId(articleId) {
    try {
      const comments = await Comment.findAll({
        where: {
          "article_id": articleId
        },
        include: `user`,
        order: [
          [`created_at`, `DESC`]
        ],
        raw: true
      });

      return comments.map((comment) => ({
        id: comment.id,
        author: `${comment[`user.firstname`]} ${comment[`user.lastname`]}`,
        avatar: comment[`user.avatar`],
        createdAt: comment.createdAt,
        text: comment.text
      }));
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findAll() {
    try {
      return await Comment.findAll({
        raw: true
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async drop(id) {
    try {
      const comment = await Comment.findByPk(id, {raw: true});

      if (!comment) {
        return null;
      }

      await Comment.destroy({
        where: {
          id
        }
      });

      return comment;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

module.exports = CommentService;
