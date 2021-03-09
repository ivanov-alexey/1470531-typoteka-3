"use strict";

const socketEvent = {
  newComments: `newComments`,
};

const socket = io(`http://localhost:8080`);
const hot = document.querySelector(`.hot__list`);
const last = document.querySelector(`.last__list`);

const fillHot = (articles) => {
  hot.innerHTML = ``;

  articles.forEach(({id, announce, commentsCount}) =>
    hot.insertAdjacentHTML(`beforeend`, `
      <li class="hot__list-item">
        <a class="hot__list-link" href="/articles/${id}">
          ${announce}
          <sup class="hot__link-sup">${commentsCount}</sup>
        </a>
      </li>
    `)
  );
};

const fillLast = (comments) => {
  last.innerHTML = ``;

  comments.forEach(({articleId, author, avatar, text}) =>
    last.insertAdjacentHTML(`beforeend`, `
      <li class="last__list-item">
        <img class="last__list-image" src="img/${avatar}" width="20" height="20" alt="Аватар пользователя">
        <b class="last__list-name">${author}</b>
        <a class="last__list-link" href="/articles/${articleId}">${text}</a>
      </li>
    `)
  );
};

socket.addEventListener(socketEvent.newComments, (message) => {
  const {articles, comments} = message;

  fillHot(articles);
  fillLast(comments);
});
