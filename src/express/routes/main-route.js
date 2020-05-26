'use strict';

const {Router} = require(`express`);

const mainRoute = new Router();

mainRoute.get(`/`, (req, res) => res.render(`main`));

module.exports = mainRoute;
