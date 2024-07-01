import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const count = async (filter = ''): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.city)
      .where('name', 'like', `%${filter}%`)
      .count<[{ count: number }]>('* as count');
    if (Number.isInteger(Number(count))) return Number(count);

    return new Error('Some error getting the quantity of cities');
  } catch (error) {
    return new Error('Error getting the quantity of cities');
  }
};
