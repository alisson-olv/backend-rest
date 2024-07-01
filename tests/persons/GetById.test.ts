import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { IUser } from '../../src/server/database/models';

describe('Persons - GetById', () => {
  let cityId: undefined | number = undefined;
  let token: string = '';
  const endPointSignInUser = '/users/signin';
  const endPointSignUpUser = '/users/signup';
  const user: Omit<IUser, 'id'> = {
    email: 'chicopersongetbyid@hotmail.com',
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

  it('Should find a Person by its id', async () => {
    const res = await testServer
      .post('/persons')
      .set({ authorization: `Bearer ${token}` })
      .send({
        cityId,
        email: 'binho_alisson@hotmail.com',
        fullName: 'Alisson Souza',
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resSearched = await testServer
      .get(`/persons/${res.body}`)
      .set({ authorization: `Bearer ${token}` })
      .send();

    expect(resSearched.status).toEqual(StatusCodes.OK);
    expect(resSearched.body).toHaveProperty('email');
    expect(resSearched.body).toHaveProperty('cityId');
    expect(resSearched.body).toHaveProperty('fullName');
  });

  it('Should not find a Person that does not exist', async () => {
    const res = await testServer
      .get('/persons/99999')
      .set({ authorization: `Bearer ${token}` })
      .send();

    expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
