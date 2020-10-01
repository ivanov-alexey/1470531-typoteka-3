'use strict';

const {db: {Comment}} = require(`../db/connect`);

class CommentService {
  async create(userId, text) {
    try {
      return await Comment.create({
        text,
        'user_id': userId
      });
    } catch (err) {
      return console.error(err);
    }
  }

  async drop(commentId) {
    try {
      const comment = await Comment.findByPk(commentId, {raw: true});

      if (!comment) {
        return null;
      }

      await Comment.destroy({
        where: {
          id: commentId
        }
      });

      return comment;
    } catch (err) {
      return console.error(err);
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
        createdAt: comment[`created_at`],
        text: comment.text
      }));
    } catch (err) {
      return console.error(err);
    }
  }
}

module.exports = CommentService;
