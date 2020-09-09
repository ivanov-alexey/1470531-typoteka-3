'use strict';

const {Router} = require(`express`);
const ArticleService = require(`../data-service/article-service`);
const {sortByField} = require(`../../utils`);

const myRoutes = new Router();

myRoutes.get(`/`, async (req, res) => {
  const allArticles = await ArticleService.getAllArticles();
  const articles = sortByField(allArticles, `createdDate`);

  res.render(`my/my`, {
    articles
  });
});

myRoutes.get(`/comments`, async (req, res) => {
  const allComments = await ArticleService.getComments();
  const comments = sortByField(allComments, `createdDate`);

  res.render(`my/comments`, {
    comments
  });
});

module.exports = myRoutes;
