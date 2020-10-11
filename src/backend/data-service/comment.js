"use strict";

const {
  db: {Comment},
} = require(`src/backend/configs/db-connect`);
const {getLogger} = require(`./src/lib`);

const logger = getLogger();

class CommentService {
  async create(userId, text) {
    try {
      return await Comment.create({
        text,
        'user_id': userId,
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
          'article_id': articleId,
        },
        include: `user`,
        order: [[`created_at`, `DESC`]],
        raw: true,
      });

      return comments.map((comment) => ({
        id: comment.id,
        author: `${comment[`user.firstname`]} ${comment[`user.lastname`]}`,
        avatar: comment[`user.avatar`],
        createdAt: comment.createdAt,
        text: comment.text,
      }));
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findAll() {
    try {
      const result = [];
      const allComments = await Comment.findAll({
        order: [[`created_at`, `DESC`]],
      });

      for (const comment of allComments) {
        const {id} = comment;
        const rawComment = await Comment.findByPk(id);
        const rawUser = await rawComment.getUser();
        const rawArticle = await rawComment.getArticle();
        const currentComment = rawComment.dataValues;
        const user = rawUser.dataValues;
        const article = rawArticle.dataValues;

        result.push({
          id: currentComment.id,
          articleId: article.id,
          author: `${user.firstname} ${user.lastname}`,
          avatar: user.avatar,
          createdAt: currentComment.createdAt,
          text: currentComment.text,
        });
      }

      return result;
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
