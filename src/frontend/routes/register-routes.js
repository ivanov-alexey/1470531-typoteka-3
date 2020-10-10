'use strict';

const {Router} = require(`express`);

const registerRoutes = new Router();

registerRoutes.get(`/`, (req, res) => res.render(`authorization/sign-up`));

module.exports = registerRoutes;
