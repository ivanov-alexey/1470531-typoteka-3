'use strict';

const {Router} = require(`express`);
const path = require(`path`);
const multer = require(`multer`);
const ArticleService = require(`../data-service/article-service`);
const CategoryService = require(`../data-service/category-service`);
const CommentService = require(`../data-service/comment-service`);
const {getErrorTemplate} = require(`../../utils`);
const {TextRestriction} = require(`../../constants`);
const {generateErrors} = require(`../../utils`);
const {getLogger} = require(`../../service/lib/logger`);

const logger = getLogger();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), `src`, `express`, `public`, `img`));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + `-` + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({storage});

const articlesRoutes = new Router();

// TODO: fix
articlesRoutes.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));

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

articlesRoutes.post(`/add`, upload.single(`image`), async (req, res) => {
  const newArticle = {
    announce: req.body.announce || ``,
    category: req.body.category || ``,
    publicationDate: req.body.currentDate || new Date(),
    fullText: req.body.fullText || ``,
    title: req.body.title || ``,
    picture: (req.file && req.file.filename) || ``,
  };

  try {
    const categories = await CategoryService.getAll();
    const article = new ArticleService(newArticle);
    const wrongAnnounce =
      newArticle.announce.length < TextRestriction.shortMin || newArticle.announce.length > TextRestriction.shortMax;
    const wrongTitle =
      newArticle.title.length < TextRestriction.shortMin || newArticle.title.length > TextRestriction.shortMax;

    if (
      wrongAnnounce ||
      wrongTitle ||
      !newArticle.category.length ||
      newArticle.full_text.length > TextRestriction.longMax
    ) {
      res.render(`my/new-post`, {
        article: newArticle,
        isError: true,
        errors: generateErrors(newArticle),
        isEdit: true,
        categories,
      });
    }

    await article.create();

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
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = articlesRoutes;
