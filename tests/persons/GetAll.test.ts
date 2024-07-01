import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { IUser } from '../../src/server/database/models';

describe('Persons - GetAll', () => {
  let cityId: undefined | number = undefined;
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

    const resCity = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${token}` })
      .send({
        name: 'Any City Name',
      });

    cityId = resCity.body;
  });

  it('Should get all Persons', async () => {
    const res = await testServer
      .post('/persons')
      .set({ authorization: `Bearer ${token}` })
      .send({
        cityId,
        email: 'binho_getAll@hotmail.com',
        fullName: 'Alisson Souza',
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resSearched = await testServer
      .get('/persons')
      .set({ authorization: `Bearer ${token}` })
      .send();

    expect(Number(resSearched.header['x-total-count'])).toBeGreaterThan(0);
    expect(resSearched.statusCode).toEqual(StatusCodes.OK);
    expect(resSearched.body.length).toBeGreaterThan(0);
  });
});
