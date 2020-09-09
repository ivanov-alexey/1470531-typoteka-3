'use strict';

class CategoryService {
  constructor(articles) {
    this.articles = articles;
  }

  findAll() {
    const categories = this.articles
      .map((article) => article.category);

    return [...new Set(categories.flat())];
  }
}

module.exports = CategoryService;
