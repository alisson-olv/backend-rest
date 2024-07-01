import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';

export const create = async (
  city: Omit<ICity, 'id'>
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.city).insert(city).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Unexpected response format when creating a new city');
  } catch (error) {
    // TODO - How to monitore error logs with framework
    return Error('Error creating a new city');
  }
};
