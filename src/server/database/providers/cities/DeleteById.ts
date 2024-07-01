import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.city).where('id', '=', id).del();

    if (result > 0) return;

    return new Error('City not found');
  } catch (error) {
    return new Error('Error deleting the city');
  }
};
