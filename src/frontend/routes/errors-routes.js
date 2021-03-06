'use strict';

const {Router} = require(`express`);

const errorsRoutes = new Router();

errorsRoutes.get(`/400`, async (req, res) => {
  const {user, isLoggedIn} = req.session;

  res.render(`errors/400`, {
    user,
    isLoggedIn,
  });
});

errorsRoutes.get(`/500`, async (req, res) => {
  const {user, isLoggedIn} = req.session;

  res.render(`errors/500`, {
    user,
    isLoggedIn,
  });
});

module.exports = errorsRoutes;
