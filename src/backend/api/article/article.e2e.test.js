'use strict';
const {DateTime} = require(`luxon`);

const request = require(`supertest`);
const fillDb = require(`../../cli/commands/filldb`);
const {createApp} = require(`../../cli/commands/server`);
const {connectToDb, closeDbConnection} = require(`../../../configs/db-config`);

let server;
const articleStub = {
  'title': `As post each that just leaf no. He connection interested so we an sympathize advantages.`,
  'publicationDate': DateTime.local().toString(),
  'announce': `Am finished rejoiced drawings so he elegance. Set lose dear upon had two its what seen.`,
  'fullText': `Another journey chamber way yet females man. Way extensive and dejection get delivered deficient sincerity gentleman age.`,
  'category': [`category`],
  'picture': ``,
};

beforeAll(async () => {
  server = await createApp();

  await fillDb.run(3);
  await connectToDb();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

afterAll(async () => {
  await closeDbConnection();
});

describe(`Offers API end-points`, () => {
  test(`Should return status 200 and array of articles on GET request`, async () => {
    const res = await request(server).get(`/api/articles?offset=0&limit=8`);

    expect(res.statusCode).toBe(200);
    expect(res.body.articles).toHaveProperty(`length`);
    expect(res.body.articles.length).toBeGreaterThan(0);
  });

  test(`Should return status 400 for wrong request`, async () => {
    const res = await request(server).get(`/api/articles/?offset=zero&limit=ten`);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({});
  });

  test(`Should return status 201 for create article request`, async () => {
    const res = await request(server).post(`/api/articles/add`).send(articleStub);

    expect(res.statusCode).toBe(201);
  });

  test(`Should return status 400 for create article bad request`, async () => {
    const res = await request(server).post(`/api/articles/add`).send({});

    expect(res.statusCode).toBe(400);
  });

  test(`Should return status 200 for delete article request`, async () => {
    const res = await request(server).delete(`/api/articles/1`);

    expect(res.statusCode).toBe(200);
  });

  test(`Should return status 404 for delete article request with wrong ID`, async () => {
    const res = await request(server).delete(`/api/articles/wrongId`);

    expect(res.statusCode).toBe(404);
  });

  test(`Should return status 200 for put request`, async () => {
    const res = await request(server)
      .put(`/api/articles/2`)
      .send({
        'title': `He connection interested so we an sympathize advantages.`,
        'publicationDate': DateTime.local().toString(),
        'announce': `Set lose dear upon had two its what seen. Am finished rejoiced drawings so he elegance. `,
        'fullText': `Way extensive and dejection get delivered deficient sincerity gentleman age. Another journey chamber way yet females man. `,
        'category': [`category`],
        'picture': ``,
      });

    expect(res.statusCode).toBe(200);
  });

  test(`Should return status 400 for put request with wrong data`, async () => {
    const res = await request(server).put(`/api/articles/3`).send({
      'title': `title`,
    });
    expect(res.statusCode).toBe(400);
  });
});

describe(`Offers comments API end-points`, () => {
  test(`Should return status 200 and array of comments on GET request`, async () => {
    const res = await request(server).get(`/api/articles/2/comments`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty(`length`);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test(`Should return status 404 for request of article comments with wrong article ID`, async () => {
    const res = await request(server).get(`/api/articles/wrongId/comments`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({data: {}, message: `Id is incorrect`});
  });

  test(`Should return status 200 for delete comment request`, async () => {
    const deleteRes = await request(server).delete(`/api/articles/2/comments/1`);

    expect(deleteRes.statusCode).toBe(200);
  });

  test(`Should return status 400 for delete comment request`, async () => {
    const res = await request(server).delete(`/api/articles/2/comments/wrongId`);

    expect(res.statusCode).toBe(400);
  });

  test(`Should return status 201 and array of comments on POST request`, async () => {
    const res = await request(server).post(`/api/articles/2/comments/add`).send({
      'text': `As post each that just leaf no.`,
    });

    expect(res.statusCode).toBe(201);
  });

  test(`Should return status 400 for empty comment on POST request`, async () => {
    const res = await request(server).post(`/api/articles/2/comments/add`).send({});

    expect(res.statusCode).toBe(400);
  });
});

describe(`Articles categories API end-points`, () => {
  test(`Should return status 200 and array of articles on GET request`, async () => {
    const res = await request(server).get(`/api/articles/categories/1`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty(`length`);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test(`Should return status 404 for request of article comments with wrong article ID`, async () => {
    const res = await request(server).get(`/api/articles/categories/wrongId`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({data: {}, message: `Id is incorrect`});
  });
});
