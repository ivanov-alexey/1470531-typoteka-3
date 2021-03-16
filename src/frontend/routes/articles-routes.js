'use strict';

const {Router} = require(`express`);
const {io} = require(`../server`);
const {socketEvent} = require(`../../constants`);
const ArticleService = require(`../data-service/article-service`);
const CategoryService = require(`../data-service/category-service`);
const CommentService = require(`../data-service/comment-service`);
const upload = require(`../../configs/upload-folder`);
const {getFormattedTime} = require(`../../utils/get-formatted-time`);
const {privateRoute} = require(`src/backend/middlewares/private-route`);
const {getErrorTemplate} = require(`../../utils/get-error-template`);
const {getLogger} = require(`../../libs/logger`);

const logger = getLogger();

const articlesRoutes = new Router();

articlesRoutes.get(`/category/:id`, async (req, res) => {
  const {id} = req.params;
  const {user, isLoggedIn} = req.session;

  try {
    const categories = await CategoryService.getAll();
    const articles = await ArticleService.getByCategory(id);

    res.render(`articles-by-category`, {
      user,
      isLoggedIn,
      id: parseInt(id, 10),
      categories: categories.filter((category) => category.count > 0),
      articles: getFormattedTime(articles, `publicationDate`),
      title: categories.find((category) => category.id === parseInt(id, 10)).title
    });
  } catch (err) {
    logger.error(err);
    res.redirect(getErrorTemplate(err));
  }
});

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
    res.redirect(getErrorTemplate(err));
  }
});

articlesRoutes.post(`/add`, privateRoute, upload.single(`image`), async (req, res) => {
  const {user, isLoggedIn} = req.session;
  const {announce, categories, currentDate, fullText, title} = req.body;
  const newArticle = {
    announce,
    categories,
    publicationDate: currentDate || new Date(),
    fullText,
    title,
    picture: (req.file && req.file.filename) || ``,
    userId: user.id
  };

  try {
    const allCategories = await CategoryService.getAll();
    const {errors, article} = await ArticleService.create(newArticle);

    if (errors) {
      res.render(`my/new-post`, {
        user,
        isLoggedIn,
        article,
        isError: true,
        errors,
        isEdit: true,
        categories: allCategories,
      });

      return;
    }

    res.redirect(`/my`);
  } catch (err) {
    logger.error(err);
    res.redirect(getErrorTemplate(err));
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
    res.redirect(getErrorTemplate(err));
  }
});

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
      comments: getFormattedTime(comments, `createdAt`),
      currentComment: ``,
    });
  } catch (err) {
    logger.error(err);
    res.redirect(getErrorTemplate(err));
  }
});

articlesRoutes.post(`/:id/comments`, async (req, res) => {
  const {user, isLoggedIn} = req.session;
  const {id} = req.params;
  const {text} = req.body;

  try {
    const {errors, comment} = await CommentService.create(id, user.id, text);
    const popularArticles = await ArticleService.findMostDiscussed();
    const allComments = await CommentService.getAll(0, 4);

    if (errors) {
      const article = await ArticleService.getOne(id);
      const categories = await CategoryService.getAll();
      const comments = await CommentService.getByArticleId(id);

      res.render(`post`, {
        user,
        isLoggedIn,
        article,
        categories,
        comments: getFormattedTime(comments, `createdAt`),
        isError: true,
        errors,
        currentComment: comment.text,
      });

      return;
    }

    io.emit(socketEvent.newComments, {
      articles: popularArticles,
      comments: allComments.comments
    });
    res.redirect(`/articles/${id}`);
  } catch (err) {
    logger.error(err);
    res.redirect(getErrorTemplate(err));
  }
});

module.exports = articlesRoutes;
