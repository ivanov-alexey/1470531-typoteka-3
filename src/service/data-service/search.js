'use strict';

class SearchService {
  constructor(articles) {
    this.articles = articles;
  }

  findAll(searchText) {
    return this.articles
      .filter((article) => article.title.includes(searchText));
  }
}

module.exports = SearchService;
