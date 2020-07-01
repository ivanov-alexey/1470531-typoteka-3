'use strict';

const {Router} = require(`express`);
const category = require(`../api/category`);
const article = require(`../api/article`);
const search = require(`../api/search`);
const CategoryService = require(`../data-service/category`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);
const SearchService = require(`../data-service/search`);

const createApi = async (data) => {
  const app = new Router();

  category(app, new CategoryService(data));
  search(app, new SearchService(data));
  article(app, new ArticleService(data), new CommentService());

  return app;
};

module.exports = createApi;
