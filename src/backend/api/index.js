'use strict';

const {Router} = require(`express`);
const category = require(`src/backend/api/category/category`);
const article = require(`src/backend/api/article/article`);
const search = require(`src/backend/api/search/search`);
const comment = require(`src/backend/api/comment/comment`);
const CategoryService = require(`../data-service/category`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);
const SearchService = require(`../data-service/search`);

const createApi = async () => {
  const app = new Router();

  category(app, new CategoryService());
  search(app, new SearchService());
  article(app, new ArticleService(), new CommentService());
  comment(app, new CommentService());

  return app;
};

module.exports = createApi;
