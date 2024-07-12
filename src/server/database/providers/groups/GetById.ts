import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IGroups } from '../../models';

export const getById = async (id: number): Promise<IGroups | Error> => {
  try {
    const result = await Knex(ETableNames.groups)
      .where('groupId', '=', id)
      .first();

    if (result) return result;

    return new Error('Group not found');
  } catch (error) {
    console.error(error);
    return new Error('Error fetching Group');
  }
};
