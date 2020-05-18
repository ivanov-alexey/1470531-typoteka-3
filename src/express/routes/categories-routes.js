'use strict';

const {Router} = require(`express`);

const categoriesRoutes = new Router();

categoriesRoutes.get(`/`, (req, res) => res.send(`/categories`));

module.exports = categoriesRoutes;
