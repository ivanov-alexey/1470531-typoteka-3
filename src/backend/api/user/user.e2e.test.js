'use strict';

const request = require(`supertest`);
const fillDb = require(`../../cli/commands/filldb`);
const {createApp} = require(`../../cli/commands/server`);
const {connectToDb, closeDbConnection} = require(`../../../configs/db-config`);
const {userPassword} = require(`../../../configs/env-config`);

let server;
const correctUserAuthStub = {
  'firstname': `John`,
  'lastname': `Smith`,
  'email': `mail@mail.com`,
  'password': `123456`,
  'avatar': `some.img`,
};
const incorrectUserAuthStub = {
  'firstname': `John`,
  'email': `mail@mail.com`,
  'password': `123456`,
  'avatar': `som`,
};
const correctUserLoginStub = {
  'email': `user1@mail.io`,
  'password': `${userPassword}`,
};
const incorrectUserEmailStub = {
  'email': `m@m`,
  'password': `${userPassword}`,
};
const incorrectUserPasswordStub = {
  'email': `user1@mail.io`,
  'password': ``,
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
    const res = await request(server).post(`/api/users/add`).send(correctUserAuthStub);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBeUndefined();
  });

  test(`Should return status 400 for create user bad request`, async () => {
    const res = await request(server).post(`/api/users/add`).send(incorrectUserAuthStub);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toHaveLength(1);
    expect(res.body.message[0]).toMatch(`User with this email is already registered`);
  });

  test(`Should return status 200 for login user request`, async () => {
    const res = await request(server).post(`/api/users`).send(correctUserLoginStub);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeUndefined();
    expect(res.body).not.toBeNull();
  });

  test(`Should return status 400 for login with wrong email`, async () => {
    const res = await request(server).post(`/api/users`).send(incorrectUserEmailStub);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toHaveLength(1);
    expect(res.body.message[0]).toMatch(`"email" must be a valid email`);
  });

  test(`Should return status 400 for login with empty password`, async () => {
    const res = await request(server).post(`/api/users`).send(incorrectUserPasswordStub);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toHaveLength(1);
    expect(res.body.message[0]).toMatch(`"password" is not allowed to be empty`);
  });
});
