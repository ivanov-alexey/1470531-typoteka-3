'use strict';

const {Router} = require('express');

const logoutRoutes = new Router();

logoutRoutes.get(`/`, async (req, res) => {
  req.session.destroy(() => {
    res.redirect(`/login`);
  });
});

module.exports = logoutRoutes;
