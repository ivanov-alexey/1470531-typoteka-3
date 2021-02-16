'use strict';

const {Router} = require(`express`);
const ArticleService = require(`../data-service/article-service`);
const CommentService = require(`../data-service/comment-service`);
const {getFormattedTime} = require(`../../utils/get-formatted-time`);
const {privateRoute} = require(`../../backend/middlewares/privateRoute`);
const {MAX_ARTICLES_PER_PAGE} = require(`../../constants`);
const {MAX_COMMENTS_PER_PAGE} = require(`../../constants`);
const {getErrorTemplate} = require(`../../utils/get-error-template`);
const {getLogger} = require(`../../libs/logger`);

const logger = getLogger();

const myRoutes = new Router();

myRoutes.get(`/`, privateRoute, async (req, res) => {
  const {page = 1} = req.query;
  const {user, isLoggedIn} = req.session;
  const pageNumber = parseInt(page, 10);
  const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * MAX_ARTICLES_PER_PAGE;

  try {
    const {articles, count} = await ArticleService.getAll(offset, MAX_ARTICLES_PER_PAGE);
    const pagesCount = Math.ceil(count / MAX_ARTICLES_PER_PAGE);


    res.render(`my/my`, {
      user,
      isLoggedIn,
      articles: getFormattedTime(articles, `publicationDate`),
      pagesCount,
      activePage: pageNumber,
      prevIsActive: pageNumber !== 1,
      nextIsActive: pageNumber < pagesCount,
      myPath: `/my`,
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

myRoutes.post(`/`, privateRoute, async (req, res) => {
  const {user, isLoggedIn} = req.session;
  const {page = 1} = req.query;
  const pageNumber = parseInt(page, 10);
  const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * MAX_ARTICLES_PER_PAGE;

  try {
    const {method, articleId} = req.body;

    if (method === `DELETE`) {
      await ArticleService.drop(parseInt(articleId, 10));
      const {articles, count} = await ArticleService.getAll(offset, MAX_ARTICLES_PER_PAGE);
      const pagesCount = Math.ceil(count / MAX_ARTICLES_PER_PAGE);

      res.render(`my/my`, {
        user,
        isLoggedIn,
        articles: getFormattedTime(articles, `publicationDate`),
        pagesCount,
        activePage: pageNumber,
        prevIsActive: pageNumber !== 1,
        nextIsActive: pageNumber < pagesCount,
        myPath: `/my`,
      });
    }
  } catch (err) {
    console.error(err);
  }
});

myRoutes.get(`/comments`, privateRoute, async (req, res) => {
  const {user, isLoggedIn} = req.session;
  const {page = 1} = req.query;
  const pageNumber = parseInt(page, 10);
  const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * MAX_COMMENTS_PER_PAGE;

  try {
    const {count, comments} = await CommentService.getAll(offset, MAX_COMMENTS_PER_PAGE);
    const pagesCount = Math.ceil(count / MAX_COMMENTS_PER_PAGE);

    res.render(`my/comments`, {
      user,
      isLoggedIn,
      comments: getFormattedTime(comments, `createdAt`),
      pagesCount,
      activePage: pageNumber,
      prevIsActive: pageNumber !== 1,
      nextIsActive: pageNumber < pagesCount,
      commentsPath: `./comments`,
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

myRoutes.post(`/comments`, privateRoute, async (req, res) => {
  const {id} = req.body;

  try {
    await CommentService.drop(id);

    res.redirect(`/my/comments`);
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = myRoutes;
