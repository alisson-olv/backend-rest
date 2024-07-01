import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../src/server/database/models';
import { testServer } from '../jest.setup';

const endPointSignUpUser = '/users/signup';

describe('Users - SignUp', () => {
  it('Should create a new user', async () => {
    const user: Omit<IUser, 'id'> = {
      email: 'binho_alisson@hotmail.com',
      name: 'Alisson',
      password: '1234567',
    };

    const res = await testServer.post(endPointSignUpUser).send(user);

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(res.body).toEqual(expect.any(Number));
  });

  it('Should create a new user 2', async () => {
    const user: Omit<IUser, 'id'> = {
      email: 'binho_alisson22@hotmail.com',
      name: 'Alisson',
      password: '1234567',
    };

    const res = await testServer.post(endPointSignUpUser).send(user);

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(res.body).toEqual(expect.any(Number));
  });

  it('Should not create a user with duplicated email', async () => {
    const user1: Omit<IUser, 'id'> = {
      email: 'binho_alisson25@hotmail.com',
      name: 'Alisson Souza',
      password: '1234567',
    };

    const user2: Omit<IUser, 'id'> = {
      email: 'binho_alisson25@hotmail.com',
      name: 'Alisson Souza',
      password: '1234567',
    };

    const res1 = await testServer.post(endPointSignUpUser).send(user1);
    const res2 = await testServer.post(endPointSignUpUser).send(user2);

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should not create a user without email', async () => {
    const user: Omit<IUser, 'id' | 'email'> = {
      name: 'Alisson',
      password: '1234567',
    };

    const res = await testServer.post(endPointSignUpUser).send(user);

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
  });

  it('Should not create a user without name', async () => {
    const user: Omit<IUser, 'id' | 'name'> = {
      email: 'Alisson@hotmail.com',
      password: '1234567',
    };

    const res = await testServer.post(endPointSignUpUser).send(user);

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.name');
  });

  it('Should not create a user without password', async () => {
    const user: Omit<IUser, 'id' | 'password'> = {
      name: 'Alisson',
      email: 'alisson@hotmail.com',
    };

    const res = await testServer.post(endPointSignUpUser).send(user);

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.password');
  });

  it('Should not create a user with invalid type of email', async () => {
    const user: Omit<IUser, 'id'> = {
      name: 'Alisson',
      email: 'alisson.hotmail.com',
      password: '1234567',
    };

    const res = await testServer.post(endPointSignUpUser).send(user);

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
  });
});
