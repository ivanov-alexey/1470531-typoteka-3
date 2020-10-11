'use strict';

const {Router} = require(`express`);
const category = require(`../api/category`);
const article = require(`../api/article`);
const search = require(`../api/search`);
const comment = require(`../api/comment`);
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
