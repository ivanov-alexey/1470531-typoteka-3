'use strict';

const request = require(`supertest`);
const {createApp} = require(`src/backend/cli/commands/server`);
const artciclesStubs = require(`test-stuff/articles-stubs`);

let server;
const articleStub = {
  "id": `1`,
  "comments": [
    {
      "id": `commentId`,
      "text": `comment-text`
    }
  ],
  "title": `title`,
  "createdDate": `2020-4-11 18:45:43`,
  "announce": `announce-1`,
  "fullText": `fullText-1`,
  "category": [
    `category`,
  ]
};

beforeAll(async () => {
  server = await createApp(artciclesStubs);
});

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe(`Offers API end-points`, () => {
  test(`Should return status 200 and array of articles on GET request`, async () => {
    const res = await request(server).get((`/api/articles`));

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty(`length`);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test(`Should return status 404 for wrong request`, async () => {
    const res = await request(server).get(`/api/articles/wrongId`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({});
  });

  test(`Should return status 201 for create article request`, async () => {
    const res = await request(server)
      .post(`/api/articles`)
      .send(articleStub);

    expect(res.statusCode).toBe(201);
  });

  test(`Should return status 400 for create article bad request`, async () => {
    const res = await request(server)
      .post(`/api/articles`)
      .send({});

    expect(res.statusCode).toBe(400);
  });

  test(`Should return status 200 for delete article request`, async () => {
    const res = await request(server).delete(`/api/articles/articleId-3`);

    expect(res.statusCode).toBe(200);
  });

  test(`Should return status 404 for delete article request with wrong ID`, async () => {
    const res = await request(server).delete(`/api/articles/wrongId`);

    expect(res.statusCode).toBe(404);
  });

  test(`Should return status 200 for put request`, async () => {
    const res = await request(server)
      .put(`/api/articles/articleId-1`)
      .send({
        "id": `1`,
        "comments": [
          {
            "id": `commentId`,
            "text": `comment-text`
          }
        ],
        "title": `title`,
        "createdDate": `2020-4-11 18:45:43`,
        "announce": `announce-1`,
        "fullText": `fullText-1`,
        "category": [
          `category`,
        ]
      });
    expect(res.statusCode).toBe(200);
  });

  test(`Should return status 400 for put request with wrong data`, async () => {
    const res = await request(server)
      .put(`/api/articles/articleId-1`)
      .send({
        "id": `articleId-1`,
        "title": `title`,
      });
    expect(res.statusCode).toBe(400);
  });
});

describe(`Offers comments API end-points`, () => {
  test(`Should return status 200 and array of comments on GET request`, async () => {
    const res = await request(server).get((`/api/articles/articleId-1/comments`));

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty(`length`);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test(`Should return status 404 for request of article comments with wrong article ID`, async () => {
    const res = await request(server).get((`/api/articles/wrongId/comments`));

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({});
  });

  test(`Should return status 200 for delete comment request`, async () => {
    const deleteRes = await request(server).delete((`/api/articles/articleId-1/comments/commentId-2`));
    const articlesRes = await request(server).get((`/api/articles/articleId-1/comments`));

    expect(deleteRes.statusCode).toBe(200);
    expect(articlesRes.body.length).toBe(1);
  });

  test(`Should return status 404 for delete comment request`, async () => {
    const res = await request(server).delete((`/api/articles/articleId-1/comments/wrongId`));

    expect(res.statusCode).toBe(404);
  });

  test(`Should return status 201 and array of comments on POST request`, async () => {
    const res = await request(server)
      .post((`/api/articles/articleId-1/comments`))
      .send({
        "text": `comment-text-1`
      });

    expect(res.statusCode).toBe(201);
  });

  test(`Should return status 400 for empty comment on POST request`, async () => {
    const res = await request(server)
      .post((`/api/articles/articleId-1/comments`))
      .send({});

    expect(res.statusCode).toBe(400);
  });
});
