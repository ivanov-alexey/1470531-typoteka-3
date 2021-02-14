'use strict';

module.exports.privateRoute = (req, res, next) => {
  const {isLoggedIn} = req.session;

  if (!isLoggedIn) {
    return res.redirect(`/login`);
  }

  return next();
};
