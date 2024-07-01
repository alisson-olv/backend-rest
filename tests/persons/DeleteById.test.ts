import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { IUser } from '../../src/server/database/models';

describe('Persons - DeleteById', () => {
  let cityId: undefined | number = undefined;
  let token: string = '';
  const endPointSignInUser = '/users/signin';
  const endPointSignUpUser = '/users/signup';
  const user: Omit<IUser, 'id'> = {
    email: 'chicopersondelete@hotmail.com',
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

  it('Should delete one Person by it Id', async () => {
    const res = await testServer
      .post('/persons')
      .set({ authorization: `Bearer ${token}` })
      .send({
        cityId,
        email: 'binho_alisson@hotmail.com',
        fullName: 'Alisson Souza',
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resDeleted = await testServer
      .delete(`/persons/${res.body}`)
      .set({ authorization: `Bearer ${token}` })
      .send();

    expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Should dont delete a Persons that dont exists', async () => {
    const res = await testServer
      .delete('/persons/99999')
      .set({ authorization: `Bearer ${token}` })
      .send();

    expect(res.status).toEqual(StatusCodes.NOT_FOUND);
    expect(res.body).toHaveProperty('errors.default');
  });
});
