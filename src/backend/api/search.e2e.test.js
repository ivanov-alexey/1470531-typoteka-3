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

describe(`Search API end-points`, () => {
  test(`Should return status 200 on GET request`, async () => {
    const res = await request(server).get(encodeURI(`/api/search?query=title`));

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(3);
  });

  test(`Should return status 400 for empty request`, async () => {
    const res = await request(server).get(encodeURI(`/api/search?query=`));

    expect(res.statusCode).toBe(400);
  });

  test(`Should return status 404 for wrong request`, async () => {
    const res = await request(server).get(encodeURI(`/api/search?query=${null}`));

    expect(res.statusCode).toBe(404);
  });
});


