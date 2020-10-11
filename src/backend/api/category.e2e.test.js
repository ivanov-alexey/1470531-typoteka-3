'use strict';

const request = require(`supertest`);
const {createApp} = require(`../cli/server`);
const artciclesStubs = require(`../../../test-stuff/articles-stubs`);

let server;

beforeAll(async () => {
  server = await createApp(artciclesStubs);
});

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe(`Categories API end-points`, () => {
  test(`Should return status 200 on GET request`, async () => {
    const res = await request(server).get(`/api/categories`);

    expect(res.statusCode).toBe(200);
  });

  test(`Should have at least one category`, async () => {
    const res = await request(server).get(`/api/categories`);

    expect(res.body.length).toBeGreaterThan(0);
  });
});
