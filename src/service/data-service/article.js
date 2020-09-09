'use strict';

const {nanoid} = require(`nanoid`);
const {getArticleDate} = require(`../../utils`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticleService {
  constructor(articles) {
    this.articles = articles;
  }

  create(article) {
    const newArticle = {
      id: nanoid(MAX_ID_LENGTH),
      comments: [],
      createdDate: getArticleDate(),
      createdDateTime: getArticleDate(true),
      ...article,
    };

    this.articles.push(newArticle);

    return newArticle;
  }

  drop(id) {
    const article = this.articles.find((item) => item.id === id);

    if (!article) {
      return null;
    }

    this.articles = this.articles.filter((item) => item.id !== id);

    return article;
  }

  findAll() {
    return this.articles;
  }

  findOne(id) {
    return this.articles.find((item) => item.id === id);
  }

  update(id, article) {
    const oldArticle = this.articles.find((item) => item.id === id);

    return {...oldArticle, ...article};
  }
}

module.exports = ArticleService;
