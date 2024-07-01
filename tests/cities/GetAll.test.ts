import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { IUser } from '../../src/server/database/models';

describe('Cities - GetAll', () => {
  let token: string = '';
  const endPointSignInUser = '/users/signin';
  const endPointSignUpUser = '/users/signup';
  const user: Omit<IUser, 'id'> = {
    email: 'chicogetall@hotmail.com',
    name: 'Chico',
    password: '1234567',
  };

  beforeAll(async () => {
    // create user
    await testServer.post(endPointSignUpUser).send(user);

    const signInUser = await testServer.post(endPointSignInUser).send(user);

    token = signInUser.body.acessToken;
  });

  it('Should get all Cities', async () => {
    const res = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${token}` })
      .send({
        name: 'São Paulo',
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resSearched = await testServer
      .get('/cities')
      .set({ authorization: `Bearer ${token}` })
      .send();

    expect(Number(resSearched.header['x-total-count'])).toBeGreaterThan(0);
    expect(resSearched.statusCode).toEqual(StatusCodes.OK);
    expect(resSearched.body.length).toBeGreaterThan(0);
  });
});
