'use strict';

const {Router} = require(`express`);
const path = require(`path`);
const multer = require(`multer`);
const ArticleService = require(`../data-service/article-service`);
const {getErrorTemplate} = require(`../../utils`);
const {HttpCode, TextRestriction} = require(`../../constants`);
const {generateErrors} = require(`../../utils`);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), `src`, `express`, `public`, `img`));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + `-` + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({storage});
const articlesRoutes = new Router();

articlesRoutes.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));

articlesRoutes.get(`/add`, async (req, res) => {
  try {
    const categories = await ArticleService.getCategories();

    res.render(`my/new-post`, {
      isEdit: false,
      isError: false,
      categories
    });
  } catch (err) {
    console.error(err);
    res.render(getErrorTemplate(err));
  }
});

articlesRoutes.post(`/add`, upload.single(`image`), async (req, res) => {
  const newArticle = {
    announce: req.body.announce || ``,
    category: req.body.category || ``,
    currentDate: req.body.currentDate || new Date(),
    fullText: req.body.fullText || ``,
    title: req.body.title || ``,
    picture: req.file && req.file.filename || ``
  };

  try {
    const categories = await ArticleService.getCategories();
    const article = new ArticleService(newArticle);
    const response = await article.saveNewArticle();
    const wrongAnnounce = newArticle.announce.length < TextRestriction.shortMin || newArticle.announce.length > TextRestriction.shortMax;
    const wrongTitle = newArticle.title.length < TextRestriction.shortMin || newArticle.title.length > TextRestriction.shortMax;

    if (wrongAnnounce
        || wrongTitle
        || !newArticle.category.length
        || newArticle.fullText.length > TextRestriction.longMax
        || response && response.statusCode === HttpCode.BAD_REQUEST
    ) {
      return res.render(`my/new-post`, {
        article: newArticle,
        isError: true,
        errors: generateErrors(newArticle),
        isEdit: true,
        categories
      });
    }

    return res.redirect(`/my`);
  } catch (err) {
    console.error(err);
    return res.render(getErrorTemplate(err));
  }
});

articlesRoutes.get(`/edit/:id`, async (req, res) => {
  try {
    const {id} = req.params;
    const article = await ArticleService.getArticle(id);

    res.render(`my/new-post`, {
      article,
      isEdit: true
    });
  } catch (err) {
    console.error(err);
    res.render(getErrorTemplate(err));
  }
});

articlesRoutes.get(`/:id`, async (req, res) => {
  try {
    const {id} = req.params;
    const article = await ArticleService.getArticle(id);
    const categories = await ArticleService.getCategoriesWithArticlesCounter();

    res.render(`post`, {
      article,
      categories
    });
  } catch (err) {
    console.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = articlesRoutes;
