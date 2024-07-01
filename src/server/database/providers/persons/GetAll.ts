import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';

export const getAll = async (
  page: number,
  limit: number,
  filter: string
): Promise<IPerson[] | Error> => {
  try {
    const result = await Knex(ETableNames.person)
      .select('*')
      .where('fullName', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    return new Error('Error to get all the persons');
  }
};
