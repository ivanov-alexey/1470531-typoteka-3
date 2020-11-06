'use strict';

const request = require('supertest');
const fillDb = require('../../cli/commands/filldb');
const {createApp} = require('../../cli/commands/server');
const {connectToDb, closeDbConnection} = require('../../../configs/db-config');

let server;
const correctUserStub = {
  'firstname': `John`,
  'lastname': 'Smith',
  'email': `mail@mail.com`,
  'password': `123456`,
  'avatar': 'some.img',
};

const incorrectUserStub = {
  'firstname': `John`,
  'email': `mail@mail.com`,
  'password': `123456`,
  'avatar': 'som',
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

describe(`Users API end-points`, () => {
  test(`Should return status 201 for create user request`, async () => {
    const res = await request(server).post(`/api/users/add`).send(correctUserStub);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBeUndefined();
  });

  test(`Should return status 400 for create user bad request`, async () => {
    const res = await request(server).post(`/api/users/add`).send(incorrectUserStub);

    console.log('res.body.message', res.body.message);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toHaveLength(1);
    expect(res.body.message[0]).toMatch('User with this email is already registered');
  });
});
