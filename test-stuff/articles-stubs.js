'use strict';

const CATEGORIES = [`category-1`, `category-2`, `category-3`, `category-4`, `category-5`];
const articlesStubs = [
  {
    "id": `articleId-1`,
    "title": `title-1`,
    "createdDate": `2020-4-11 18:45:43`,
    "announce": `announce-1`,
    "fullText": `fullText-1`,
    "category": [
      CATEGORIES[0],
      CATEGORIES[1],
      CATEGORIES[2]
    ],
    "comments": [
      {
        "id": `commentId-1`,
        "text": `comment 1`
      },
      {
        "id": `commentId-2`,
        "text": `comment 2`
      }
    ]
  },
  {
    "id": `articleId-2`,
    "title": `title-2`,
    "createdDate": `2020-5-16 4:11:53`,
    "announce": `announce-2`,
    "fullText": `fullText-2`,
    "category": [
      CATEGORIES[2],
      CATEGORIES[3],
      CATEGORIES[4]
    ],
    "comments": [
      {
        "id": `commentId-3`,
        "text": `comment-text-3`
      }
    ]
  },
  {
    "id": `articleId-3`,
    "title": `title-3`,
    "createdDate": `2020-4-28 2:51:1`,
    "announce": `announce-3`,
    "fullText": `fullText-3`,
    "category": [
      CATEGORIES[4],
    ],
    "comments": [
      {
        "id": `commentId-3`,
        "text": `comment-text-3`
      }
    ]
  }
];

module.exports = articlesStubs;
