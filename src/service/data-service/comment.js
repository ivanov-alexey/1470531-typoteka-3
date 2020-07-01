'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  create(article, comment) {
    const newComment = {
      comment,
      id: nanoid(MAX_ID_LENGTH)
    };

    article.comments.push(newComment);

    return comment;
  }

  drop(article, commentId) {
    const dropComment = article.comments
      .find((item) => item.id === commentId);

    if (!dropComment) {
      return null;
    }

    article.comments = article.comments
      .filter((item) => item.id !== commentId);

    return dropComment;
  }

  findAll(article) {
    return article.comments;
  }
}

module.exports = CommentService;
