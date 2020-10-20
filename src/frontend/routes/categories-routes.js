'use strict';

const {Router} = require('express');
const CategoryService = require('../data-service/category-service');
const {getErrorTemplate} = require('../../utils/get-error-template');
const {getLogger} = require('../../libs/logger');

const logger = getLogger();

const categoriesRoutes = new Router();

// TODO: добавление/удаление категорий

categoriesRoutes.get(`/`, async (req, res) => {
  try {
    const categories = await CategoryService.getAll();

    res.render(`categories`, {
      categories,
    });
  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

categoriesRoutes.post(`/`, async (req, res) => {
  try {
    const {title = '', method = '', categoryId = ''} = req.body;

    if (method === 'ADD') {
      const {errors} = await CategoryService.create(title);
      const categories = await CategoryService.getAll();

      if (errors) {
        res.render(`categories`, {
          isError: true,
          errors,
          isEdit: true,
          categories,
        });

        return;
      }

      res.render(`categories`, {
        categories,
      });

      return;
    }

    if (method === 'DELETE') {

      console.log('categoryId', categoryId);
    }


  } catch (err) {
    logger.error(err);
    res.render(getErrorTemplate(err));
  }
});

module.exports = categoriesRoutes;
