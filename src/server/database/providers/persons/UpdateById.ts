import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';

export const updateById = async (
  id: number,
  person: Omit<IPerson, 'id'>
): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.city)
      .where('id', '=', person.cityId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('The city used in registry was not found');
    }

    const result = await Knex(ETableNames.person)
      .update(person)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Error updating the person');
  } catch (error) {
    return new Error('Some error updating the person');
  }
};
