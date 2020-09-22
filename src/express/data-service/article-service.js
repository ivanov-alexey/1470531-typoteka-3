'use strict';

const axios = require(`axios`);
const {getErrorMessage} = require(`../../utils`);
const {API_URL, TimeInMilliseconds} = require(`../../constants`);

const instance = axios.create({
  baseURL: API_URL,
  timeout: TimeInMilliseconds * 30
});

class ArticleService {
  constructor(article) {
    this.article = article;
  }

  static async getAllArticles() {
    try {
      const response = await instance.get(`/articles`);

      return response.data;
    } catch (err) {
      console.error(`Request /articles error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async getArticle(id) {
    try {
      const response = await instance.get(`/articles/${id}`);

      return response.data;
    } catch (err) {
      console.error(`Request /articles/:id error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async getCategories() {
    try {
      const response = await instance.get(`/categories`);

      return response.data;
    } catch (err) {
      console.error(`Request /categories error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async getCategoriesWithArticlesCounter() {
    try {
      const articles = await ArticleService.getAllArticles();
      const categoriesInArticles = [...new Set(articles.map((article) => article.category).flat())];

      return categoriesInArticles.map((category) => ({
        name: category,
        count: categoriesInArticles.filter((item) => item === category).length
      }));
    } catch (err) {
      console.error(`Request /articles error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async getMostDiscussed() {
    try {
      const articles = await ArticleService.getAllArticles();

      return articles
        .sort((prev, next) => next.comments.length - prev.comments.length)
        .slice(0, 4)
        .map((article) => {
          const croppedAnnounce = article.announce.slice(0, 100).trim();
          const announce = croppedAnnounce
            .slice(0, croppedAnnounce.endsWith(`,`) ? croppedAnnounce.length - 1 : croppedAnnounce.length) + `...`;

          return {
            id: article.id,
            announce,
            commentsLength: article.comments.length
          };
        });
    } catch (err) {
      console.error(`Request /articles error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async getComments() {
    try {
      const articles = await ArticleService.getAllArticles();

      return articles
        .map((article) =>
          article.comments
            .map((comment) => ({...comment, articleTitle: article.title, articleId: article.id}))
        )
        .flat();
    } catch (err) {
      console.error(`Request /articles error: `, err.message);

      return getErrorMessage(err);
    }
  }

  static async getSearchResults(query) {
    try {
      const response = await instance.get(`${query}`);

      return response.data;
    } catch (err) {
      console.error(`Request /search error: `, err.message);

      return getErrorMessage(err);
    }
  }

  async createNewArticle() {
    try {
      return await instance.post(`/articles/add`, {
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
