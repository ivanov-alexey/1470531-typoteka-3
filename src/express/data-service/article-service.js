'use strict';

const {getErrorMessage} = require(`../../utils`);
const apiRequest = require(`./api-request`);

class ArticleService {
  constructor(article) {
    this.article = article;
  }

  static async getAll() {
    try {
      const response = await apiRequest.get(`/articles`);

      return response.data;
    } catch (err) {
      console.error(`Request /articles error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async getOne(id) {
    try {
      const response = await apiRequest.get(`/articles/${id}`);

      return response.data;
    } catch (err) {
      console.error(`Request /articles/:id error: `, err.message);

      return getErrorMessage(err);
    }
  }

  // TODO: fix
  // static async getMostDiscussed() {
  //   try {
  //     const articles = await ArticleService.getAll();
  //
  //     return articles
  //       .sort((prev, next) => next.comments.length - prev.comments.length)
  //       .slice(0, 4)
  //       .map((article) => {
  //         const croppedAnnounce = article.announce.slice(0, 100).trim();
  //         const announce = croppedAnnounce
  //           .slice(0, croppedAnnounce.endsWith(`,`) ? croppedAnnounce.length - 1 : croppedAnnounce.length) + `...`;
  //
  //         return {
  //           id: article.id,
  //           announce,
  //           commentsLength: article.comments.length
  //         };
  //       });
  //   } catch (err) {
  //     console.error(`Request /articles error: `, err.message);
  //
  //     return getErrorMessage(err);
  //   }
  // }

  async create() {
    try {
      return await apiRequest.post(`/articles/add`, {
        title: this.article.title,
        category: typeof this.article.category === `string` ? [this.article.category] : this.article.category || ``,
        picture: this.article.picture,
        announce: this.article.announce,
        fullText: this.article.fullText,
      });

    } catch (err) {
      console.error(`Request /articles/add error: `, err.message);

      return getErrorMessage(err);
    }
  }
}

module.exports = ArticleService;
