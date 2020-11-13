'use strict';

const {HttpCode} = require('../../constants');

const authentificate = (store) => async (req, res, next) => {
  const {email} = req.body;
  const existsUser = await store.countByEmail(email);

  if (!existsUser) {
    res.status(HttpCode.BAD_REQUEST).json({
      message: ['User not found'],
      data: req.body,
    });

    return;
  }

  if (!(await store.checkUserExists(req.body))) {
    res.status(HttpCode.BAD_REQUEST).json({
      message: ['Wrong password'],
      data: req.body,
    });

    return;
  }

  req.session.isLogged = true;
  req.session.username = email;

  next();
};

module.exports = authentificate;
