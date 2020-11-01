'use strict';

const request = require('supertest');
const fillDb = require('../../cli/commands/filldb');
const {createApp} = require('../../cli/commands/server');
const {connectToDb, closeDbConnection, sequelize} = require('../../configs/db-config');

let server;

beforeAll(async () => {
  server = await createApp();

  await fillDb.run(3);
  await connectToDb();

  const sql = `
    UPDATE articles
    set title = 'Title for test search query for api server'
    WHERE articles.id = 1;
      `;
  const type = sequelize.QueryTypes.SELECT;
  await sequelize.query(sql, {type});
});

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

afterAll(async () => {
  await closeDbConnection();
});

describe(`Search API end-points`, () => {
  test(`Should return status 200 on GET request`, async () => {
    const res = await request(server).get(encodeURI(`/api/search?query=test`));

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
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
