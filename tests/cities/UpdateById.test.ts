import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';
import { IUser } from '../../src/server/database/models';

describe('Cities - UpdateById', () => {
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

  it('Should update one City', async () => {
    const res = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${token}` })
      .send({
        name: 'São Paulo',
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdated = await testServer
      .put(`/cities/${res.body}`)
      .set({ authorization: `Bearer ${token}` })
      .send({
        name: 'Santos',
      });

    expect(resUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Should not update a City that does not exist', async () => {
    const res = await testServer
      .put('/cities/99999')
      .set({ authorization: `Bearer ${token}` })
      .send({
        name: 'São Paulo',
      });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
