import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';

export const updateById = async (
  id: number,
  city: Omit<ICity, 'id'>
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.city)
      .update(city)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Some error updating the city');
  } catch (error) {
    return new Error('Error updating the city');
  }
};
