import { signIn } from './../../src/server/controllers/users/SignIn';
import { IUser } from '../../src/server/database/models';
import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';

const endPointSignInUser = '/users/signin';
const endPointSignUpUser = '/users/signup';

describe('Users - SignIn', () => {
  const user: Omit<IUser, 'id'> = {
    email: 'chico1@hotmail.com',
    name: 'chico moedas',
    password: '1234567',
  };

  beforeAll(async () => {
    await testServer.post(endPointSignUpUser).send(user);
  });

  it('Should signIn a user with valid credentials', async () => {
    const res = await testServer.post(endPointSignInUser).send(user);

    expect(res.status).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty('acessToken');
  });

  it('Should not signIn a user with invalid credentials', async () => {
    const res = await testServer.post(endPointSignInUser).send({
      email: 'chico1@hotmail.com',
      password: 'wrongpassword',
    });

    expect(res.status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty('errors.default');
  });

  it('Should not signIn a user with invalid type of email', async () => {
    const res = await testServer.post(endPointSignInUser).send({
      email: 'chico.hotmail.com',
      password: '1234567',
    });

    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
  });
});
