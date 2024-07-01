import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';
import { IUser } from '../../src/server/database/models';

describe('Cities - GetById', () => {
  let token: string = '';
  const endPointSignInUser = '/users/signin';
  const endPointSignUpUser = '/users/signup';
  const user: Omit<IUser, 'id'> = {
    email: 'chicogetbyid@hotmail.com',
    name: 'Chico',
    password: '1234567',
  };

  beforeAll(async () => {
    // create user
    await testServer.post(endPointSignUpUser).send(user);

    const signInUser = await testServer.post(endPointSignInUser).send(user);

    token = signInUser.body.acessToken;
  });

  it('Should find a City by its id', async () => {
    const res = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${token}` })
      .send({
        name: 'São Paulo',
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resSearched = await testServer
      .get(`/cities/${res.body}`)
      .set({ authorization: `Bearer ${token}` })
      .send();

    expect(resSearched.statusCode).toEqual(StatusCodes.OK);
    expect(resSearched.body).toHaveProperty('name');
  });

  it('Should not find a City that does not exist', async () => {
    const res = await testServer
      .get('/cities/99999')
      .set({ authorization: `Bearer ${token}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
