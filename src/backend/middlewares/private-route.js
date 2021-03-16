'use strict';

const {ADMIN_ID} = require(`../../constants`);

module.exports.privateRoute = (req, res, next) => {
  const {isLoggedIn, user = {}} = req.session;

  if (!isLoggedIn) {
    res.redirect(`/login`);

    return;
  }

  if (user && user.id !== ADMIN_ID) {
    res.redirect(`/`);

    return;
  }

  next();
};
