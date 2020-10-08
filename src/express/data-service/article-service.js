'use strict';

const {getErrorMessage} = require(`../../utils`);
const apiRequest = require(`./api-request`);
const {getLogger} = require(`../../service/lib/logger`);

const logger = getLogger();

class ArticleService {
  constructor(article) {
    this.article = article;
  }

  static async getAll() {
    try {
      const response = await apiRequest.get(`/articles`);

      return response.data;
    } catch (err) {
      logger.error(`Request /articles error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async getOne(id) {
    try {
      const response = await apiRequest.get(`/articles/${id}`);

      return response.data;
    } catch (err) {
      logger.error(`Request /articles/:id error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async findMostDiscussed() {
    try {
      const response = await apiRequest.get(`/articles?popular=true`);

      return response.data;
    } catch (err) {
      logger.error(`Request /articles?popular=true error: `, err.message);

      return getErrorMessage(err);
    }
  }

  async create() {
    try {
      return await apiRequest.post(`/articles/add`, {
        "title": this.article.title,
        "category": typeof this.article.category === `string` ? [this.article.category] : this.article.category || ``,
        "picture": this.article.picture,
        "announce": this.article.announce,
        "full_text": this.article.full_text,
        "publication_date": this.article.publication_date || new Date()
      });

    } catch (err) {
      logger.error(`Request /articles/add error: `, err.message);

      return getErrorMessage(err);
    }
  }
}

module.exports = ArticleService;
