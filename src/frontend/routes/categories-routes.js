'use strict';

const {Router} = require(`express`);
const CategoryService = require(`../data-service/category-service`);
const {privateRoute} = require(`../../backend/middlewares/privateRoute`);
const {getErrorTemplate} = require(`../../utils/get-error-template`);
const {getLogger} = require(`../../libs/logger`);

const logger = getLogger();

const categoriesRoutes = new Router();

categoriesRoutes.get(`/`, privateRoute, async (req, res) => {
  const {user, isLoggedIn} = req.session;

  try {
    const categories = await CategoryService.getAll();

    res.render(`categories`, {
      user,
      isLoggedIn,
      categories,
    });
  } catch (err) {
    logger.error(err);
    res.redirect(getErrorTemplate(err));
  }
});

categoriesRoutes.post(`/`, privateRoute, async (req, res) => {
  const {user, isLoggedIn} = req.session;
  const {title = ``, type = ``, method = ``, categoryId = ``} = req.body;

  try {
    if (method === `ADD`) {
      const {errors} = await CategoryService.create(title);
      const categories = await CategoryService.getAll();

      if (errors) {
        res.render(`categories`, {
          user,
          isLoggedIn,
          isError: true,
          errors,
          isEdit: true,
          categories,
        });

        return;
      }

      res.render(`categories`, {
        user,
        isLoggedIn,
        categories,
      });

      return;
    }

    if (type === `update`) {
      await CategoryService.update(categoryId, title);
      const categories = await CategoryService.getAll();

      res.render(`categories`, {
        user,
        isLoggedIn,
        categories,
      });
    }

    if (type === `delete`) {
      await CategoryService.drop(categoryId);
      const categories = await CategoryService.getAll();

      res.render(`categories`, {
        user,
        isLoggedIn,
        categories,
      });
    }
  } catch (err) {
    logger.error(err);
    res.redirect(getErrorTemplate(err));
  }
});

module.exports = categoriesRoutes;
