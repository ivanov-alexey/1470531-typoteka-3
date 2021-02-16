'use strict';

const {Router} = require(`express`);
const ArticleService = require(`../data-service/article-service`);
const CategoryService = require(`../data-service/category-service`);
const CommentService = require(`../data-service/comment-service`);
const upload = require(`../../configs/upload-folder`);
const {privateRoute} = require(`../../backend/middlewares/privateRoute`);
const {getErrorTemplate} = require(`../../utils/get-error-template`);
const {getLogger} = require(`../../libs/logger`);

const logger = getLogger();

const articlesRoutes = new Router();
// TODO: добавить ссылки в шаблонах на создание статей
// TODO: добавить шаблон
articlesRoutes.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));

// TODO: поправить выбор даты при создании статьи
articlesRoutes.get(`/add`, privateRoute, async (req, res) => {
  const {user, isLoggedIn} = req.session;

  try {
    const categories = await CategoryService.getAll();

    res.render(`my/new-post`, {
      user,
      isLoggedIn,
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
articlesRoutes.post(`/add`, privateRoute, upload.single(`image`), async (req, res) => {
  const {user, isLoggedIn} = req.session;
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
        user,
        isLoggedIn,
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

articlesRoutes.get(`/edit/:id`, privateRoute, async (req, res) => {
  const {user, isLoggedIn} = req.session;
  const {id} = req.params;

  try {
    const article = await ArticleService.getOne(id);
    const categories = await CategoryService.getAll();

    res.render(`my/new-post`, {
      user,
      isLoggedIn,
      article,
      categories,
      isEdit: true,
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

// TODO: клик на категории на странице поста
articlesRoutes.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const {user, isLoggedIn} = req.session;

  try {
    const article = await ArticleService.getOne(id);
    const categories = await CategoryService.getAll();
    const comments = await CommentService.getByArticleId(id);

    res.render(`post`, {
      isLoggedIn,
      user,
      article,
      categories,
      comments,
      currentComment: ``,
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

articlesRoutes.post(`/:id/comments`, async (req, res) => {
  const {user, isLoggedIn} = req.session;
  const {id} = req.params;
  const {text} = req.body;

  try {
    const {errors, comment} = await CommentService.create(id, user.id, text);

    if (errors) {
      const article = await ArticleService.getOne(id);
      const categories = await CategoryService.getAll();
      const comments = await CommentService.getByArticleId(id);

      res.render(`post`, {
        user,
        isLoggedIn,
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
