'use strict';

const {Router} = require(`express`);
const ArticleService = require(`../data-service/article-service`);

const articlesRoutes = new Router();

articlesRoutes.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));

articlesRoutes.get(`/add`, (req, res) => res.render(`my/new-post`));

articlesRoutes.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await ArticleService.getArticle(id);

  res.render(`my/new-post`, {
    article
  });
});

articlesRoutes.get(`/:id`, (req, res) => res.render(`post`));

module.exports = articlesRoutes;
