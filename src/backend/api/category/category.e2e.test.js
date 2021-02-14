'use strict';

const request = require(`supertest`);
const fillDb = require(`../../cli/commands/filldb`);
const {createApp} = require(`../../cli/commands/server`);
const {connectToDb, closeDbConnection} = require(`../../../configs/db-config`);

let server;

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
