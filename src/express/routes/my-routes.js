'use strict';

const {Router} = require(`express`);

const myRoutes = new Router();

myRoutes.get(`/`, (req, res) => res.send(`/my`));
myRoutes.get(`/comments`, (req, res) => res.send(`/my/comments`));

module.exports = myRoutes;

/*
* / — главная страница;
/register — регистрация;
/login — вход;
/search — поиск;
/my — мои публикации;
/my/comments — комментарии к публикациям;
/articles/category/:id — публикации определённой категории;
/articles/add — страница создания новой публикации;
/articles/edit/:id — редактирование публикации;
/articles/:id — страница публикации;
/categories — категории.*/
