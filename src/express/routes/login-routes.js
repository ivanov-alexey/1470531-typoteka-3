'use strict';

const {Router} = require(`express`);

const loginRoutes = new Router();

loginRoutes.get(`/`, (req, res) => res.render(`authorization/login`));

module.exports = loginRoutes;
