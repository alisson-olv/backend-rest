import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUserGroups } from '../../models';

export const getById = async (id: number): Promise<IUserGroups | Error> => {
  try {
    const result = await Knex(ETableNames.user_groups)
      .where('userGroupId', id)
      .first();

    if (result) return result;

    return new Error('User group not found');
  } catch (error) {
    console.error(error);
    return new Error('Error fetching user group');
  }
};
