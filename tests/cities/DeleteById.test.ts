import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { IUser } from '../../src/server/database/models';

describe('Cities - DeleteById', () => {
  let token: string = '';
  const endPointSignInUser = '/users/signin';
  const endPointSignUpUser = '/users/signup';
  const user: Omit<IUser, 'id'> = {
    email: 'chicodelete@hotmail.com',
    name: 'Chico',
    password: '1234567',
  };

  beforeAll(async () => {
    // create user
    await testServer.post(endPointSignUpUser).send(user);

    const signInUser = await testServer.post(endPointSignInUser).send(user);

    token = signInUser.body.acessToken;
  });

  it('Should delete one City by it Id', async () => {
    const res = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${token}` })
      .send({
        name: 'São Paulo',
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resDeleted = await testServer
      .delete(`/cities/${res.body}`)
      .set({ authorization: `Bearer ${token}` })
      .send();

    expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Should dont delete a City that dont exists', async () => {
    const res = await testServer
      .delete('/cities/99999')
      .set({ authorization: `Bearer ${token}` })
      .send();

    expect(res.status).toEqual(StatusCodes.NOT_FOUND);
    expect(res.body).toHaveProperty('errors.default');
  });
});
