import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUserGroups } from '../../models';

export const create = async (
  group: Omit<IUserGroups, 'userGroupId'>
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.user_groups)
      .insert(group)
      .returning('userGroupId');

    if (typeof result === 'object') {
      return result.userGroupId;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Unexpected response format when creating user group');
  } catch (error) {
    console.error(error);
    return new Error('Error creating user group');
  }
};
