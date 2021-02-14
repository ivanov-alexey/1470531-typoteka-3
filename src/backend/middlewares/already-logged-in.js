'use strict';

module.exports.alreadyLoggedIn = (req, res, next) => {
  const {user = {}} = req.session;

  if (user && user.id) {
    return res.redirect(`/my`);
  }

  return next();
};
