'use strict';

const {Router} = require(`express`);
const ArticleService = require(`../data-service/article-service`);
const {getErrorTemplate} = require(`../../utils`);
const {sortByField} = require(`../../utils`);

const myRoutes = new Router();

myRoutes.get(`/`, async (req, res) => {
  try {
    const allArticles = await ArticleService.getAllArticles();
    const articles = sortByField(allArticles, `createdDate`);

    res.render(`my/my`, {
      articles
    });
  } catch (err) {
    console.error(err);
    res.render(getErrorTemplate(err));
  }
});

myRoutes.get(`/comments`, async (req, res) => {
  try {
    const allComments = await ArticleService.getComments();
    const comments = sortByField(allComments, `createdDate`);

    res.render(`my/comments`, {
      comments
    });
  } catch (err) {
    console.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = myRoutes;
