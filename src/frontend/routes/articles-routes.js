'use strict';

const {Router} = require('express');
const ArticleService = require('../data-service/article-service');
const CategoryService = require('../data-service/category-service');
const CommentService = require('../data-service/comment-service');
const upload = require('../../configs/upload-folder');
const {getErrorTemplate} = require('../../utils/get-error-template');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

const articlesRoutes = new Router();
// TODO: добавить ссылки в шаблонах на создание статей
// TODO: добавить шаблон
articlesRoutes.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));

// TODO: поправить выбор даты при создании статьи
articlesRoutes.get(`/add`, async (req, res) => {
  try {
    const categories = await CategoryService.getAll();

    res.render(`my/new-post`, {
      isEdit: false,
      isError: false,
      categories,
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

// TODO: починить загрузку файлов
articlesRoutes.post(`/add`, upload.single(`image`), async (req, res) => {
  const newArticle = {
    announce: req.body.announce,
    category: req.body.category,
    publicationDate: req.body.currentDate,
    fullText: req.body.fullText,
    title: req.body.title,
    picture: (req.file && req.file.filename) || ``,
  };

  try {
    const categories = await CategoryService.getAll();
    const {errors, article} = await ArticleService.create(newArticle);

    if (errors) {
      res.render(`my/new-post`, {
        article,
        isError: true,
        errors,
        isEdit: true,
        categories,
      });

      return;
    }

    res.redirect(`/my`);
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

articlesRoutes.get(`/edit/:id`, async (req, res) => {
  try {
    const {id} = req.params;
    const article = await ArticleService.getOne(id);
    const categories = await CategoryService.getAll();

    res.render(`my/new-post`, {
      article,
      categories,
      isEdit: true,
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

articlesRoutes.get(`/:id`, async (req, res) => {
  try {
    const {id} = req.params;
    const article = await ArticleService.getOne(id);
    const categories = await CategoryService.getAll();
    const comments = await CommentService.getByArticleId(id);

    res.render(`post`, {
      article,
      categories,
      comments,
      currentComment: '',
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

// TODO: еще нужен ID пользователя
articlesRoutes.post(`/:id/comments`, async (req, res) => {
  try {
    const {id} = req.params;
    const {text} = req.body;
    const {errors, comment} = await CommentService.create(id, text);

    if (errors) {
      const article = await ArticleService.getOne(id);
      const categories = await CategoryService.getAll();
      const comments = await CommentService.getByArticleId(id);

      res.render(`post`, {
        article,
        categories,
        comments,
        isError: true,
        errors,
        currentComment: comment.text,
      });

      return;
    }

    res.redirect(`/articles/${id}`);
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = articlesRoutes;
