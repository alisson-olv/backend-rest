import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';
import { IUser } from '../../src/server/database/models';

describe('Persons - UpdateById', () => {
  let cityId: undefined | number = undefined;
  let token: string = '';
  const endPointSignInUser = '/users/signin';
  const endPointSignUpUser = '/users/signup';
  const user: Omit<IUser, 'id'> = {
    email: 'chicopersoncreate@hotmail.com',
    name: 'Chico',
    password: '1234567',
  };

  beforeAll(async () => {
    // create user
    await testServer.post(endPointSignUpUser).send(user);

    const signInUser = await testServer.post(endPointSignInUser).send(user);

    token = signInUser.body.acessToken;

    const res = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${token}` })
      .send({
        name: 'Any City',
      });

    cityId = res.body;
  });

  it('Should update one Person', async () => {
    const res = await testServer
      .post('/persons')
      .set({ authorization: `Bearer ${token}` })
      .send({
        cityId,
        email: 'binho_alisson@hotmail.com',
        fullName: 'Alisson Souza',
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdated = await testServer
      .put(`/persons/${res.body}`)
      .set({ authorization: `Bearer ${token}` })
      .send({
        cityId,
        email: 'binho@hotmail.com',
        fullName: 'Alisson',
      });

    expect(resUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Should not update a Person that does not exist', async () => {
    const res = await testServer
      .put('/persons/99999')
      .set({ authorization: `Bearer ${token}` })
      .send({
        cityId,
        email: 'binho_alisson@hotmail.com',
        fullName: 'Alisson Souza',
      });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
