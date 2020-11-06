'use strict';

const {MAX_COMMENTS_PER_PAGE} = require('../../constants');
const {
  db: {Comment, User},
} = require('../../configs/db-config');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

class CommentService {
  async create(articleId, userId, text) {
    try {
      return await Comment.create({
        text,
        'user_id': userId,
        'article_id': articleId,
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findByArticleId(articleId) {
    try {
      const comments = await Comment.findAll({
        attributes: [`id`, `text`, [`created_at`, 'createdAt']],
        where: {
          'article_id': articleId,
        },
        include: [
          {
            model: User,
            as: `user`,
            attributes: [`avatar`, `firstname`, `lastname`],
          },
        ],
        order: [[`created_at`, `DESC`]],
      });

      return comments.map(({id, text, createdAt, user}) => ({
        id,
        text,
        createdAt,
        avatar: user.avatar,
        author: `${user.firstname} ${user.lastname}`,
      }));
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findAll(offset = 0, limit = MAX_COMMENTS_PER_PAGE) {
    try {
      const count = await Comment.count();
      const rawComments = await Comment.findAll({
        attributes: [`id`, `text`, [`created_at`, 'createdAt']],
        include: [
          {
            model: User,
            as: `user`,
            attributes: [`avatar`, `firstname`, `lastname`],
          },
        ],
        order: [[`created_at`, `DESC`]],
        offset,
        limit,
      });

      const comments = rawComments.map(({id, text, createdAt, user}) => ({
        id,
        text,
        createdAt,
        avatar: user.avatar,
        author: `${user.firstname} ${user.lastname}`,
      }));

      return {
        count,
        comments,
      };
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async drop(id) {
    try {
      const comment = await Comment.findByPk(id);

      if (!comment) {
        return null;
      }

      await Comment.destroy({
        where: {
          id,
        },
      });

      return comment;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

module.exports = CommentService;
