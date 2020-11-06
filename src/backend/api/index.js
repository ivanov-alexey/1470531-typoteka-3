'use strict';

const {Router} = require('express');
const category = require('./category/category');
const article = require('./article/article');
const search = require('./search/search');
const comment = require('./comment/comment');
const user = require('./user/user');
const CategoryService = require('../data-service/category');
const ArticleService = require('../data-service/article');
const CommentService = require('../data-service/comment');
const SearchService = require('../data-service/search');
const UserService = require('../data-service/user');

const createApi = async () => {
  const app = new Router();

  category(app, new CategoryService());
  search(app, new SearchService());
  article(app, new ArticleService(), new CommentService());
  comment(app, new CommentService());
  user(app, new UserService());

  return app;
};

module.exports = createApi;
