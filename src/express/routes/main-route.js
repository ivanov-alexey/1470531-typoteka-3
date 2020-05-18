'use strict';

const {Router} = require(`express`);

const mainRoute = new Router();

mainRoute.get(`/`, (req, res) => res.send(`/`));

module.exports = mainRoute;
