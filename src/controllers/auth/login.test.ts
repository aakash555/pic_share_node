import 'mocha';
import { expect } from 'chai';
import { agent as request } from 'supertest';
import { getRepository, Connection, Repository } from 'typeorm';

import { dbCreateConnection } from 'orm/dbCreateConnection';
import { User } from 'orm/entities/User';

import { app } from '../../';

describe('Login', () => {
  let dbConnection: Connection;
  let userRepository: Repository<User>;
  const userName = 'ABC';
  const newUserName = 'David';
  const user = new User();
  user.username = 'ABC';

  before(async () => {
    dbConnection = await dbCreateConnection();
    userRepository = getRepository(User);
  });

  beforeEach(async () => {
    await userRepository.save(user);
  });

  afterEach(async () => {
    await userRepository.delete(user.id);
  });

  after(async () => {
    const newUser = await userRepository.findOne({ where: { username: newUserName } });
    await userRepository.delete(newUser.id);
  });

  it('should return a login message', async () => {
    const res = await request(app).post('/v1/auth/login').send({ username: userName });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('User logged in successfully');
    // expect(res.body.data).not.to.be.empty;
    // expect(res.body.data).to.be.an('string');
  });

  it('should report error when the username is empty', async () => {
    const res = await request(app).post('/v1/auth/login').send({ username: '' });
    expect(res.status).to.equal(400);
    expect(res.body.errorType).to.equal('Validation');
    expect(res.body.errorMessage).to.equal('Login validation error');
    expect(res.body.errors).to.an('null');
    expect(res.body.errorRaw).to.an('null');
    expect(res.body.errorsValidation).to.eql([
      {
        username: 'Username is empty',
      },
    ]);
  });

  it('should add a new user if it does not exist', async () => {
    const res = await request(app).post('/v1/auth/login').send({ username: newUserName });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('User successfully created');
    // expect(res.body.data).not.to.be.empty;
    // expect(res.body.data).to.be.an('string');
  });
});
